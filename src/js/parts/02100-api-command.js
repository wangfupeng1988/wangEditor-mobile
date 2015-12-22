// 编辑器的命令事件
window.___E_mod(function (E, $) {

	// 符合这个正则表达式的命令，恢复选区时，不要恢复外围选区（如插入图片）
	var regRestoreNoWrapSelection = /insertimage/i;

	// 传统事件
	E.fn.command = function (commandName, bool, commandValue, e, callback) {
		var self = this;

		// 验证该命令是否不能恢复外围选区，将传入到 customCommand 中
		var regResult = regRestoreNoWrapSelection.test(commandName);

		var fn = function () {
			document.execCommand(commandName, !!bool, commandValue);
		};

		// 执行事件
		self.customCommand(regResult, fn, e, callback);
	};

	// 自定义事件
	E.fn.customCommand = function (isRestoreNoWrapSelection, fn, e, callback) {
		var self = this;
		var currentRange = self.currentRange();
		var currentWrapRange = self.currentWrapRange();
		var $txt = self.$txt;

		/*
			isRestoreNoWrapSelection 参数的作用：
			1. 有些 command 是需要选中整个外围选区再进行操作的，一般是修改样式，例如加粗。
			   针对加粗这种样式操作，如果不默认选中一个选区，是看不到任何效果的。
			2. 但是有些 command 一定不能选中外围选区，一般是插入操作，例如插入图片。
			   如果选中了一段区域，再执行插入图片，插入图片之后，刚才的那段选区就没有了。

			因此，isRestoreNoWrapSelection 的作用就是来判断，是否要选中外围选区。
		*/
		if (isRestoreNoWrapSelection) {
			// 恢复选区（非整个外围选区）
			self.restoreSelection(currentRange);
		} else {
			// 恢复选区（整个外围选区）
			self.restoreSelection(currentWrapRange);
		}

		// 执行命令
		fn();

		// 如果 $txt 最后没有空行，则增加一个
		self.insertEmpltyLink();

		// 重新保存选区，因为部分浏览器会自动清空选区
		self.saveSelection();

		// 恢复选区（非外围选区）
		self.restoreSelection(currentRange);

		// 阻止默认行为，阻止冒泡
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		// 回调函数
		if (callback) {
			callback.call(self);
		}

		// 隐藏菜单栏
		self.hideMenuContainer();
	};
});