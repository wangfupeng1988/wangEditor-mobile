// 编辑器的命令事件
window.___E_mod(function (E, $) {

	// 传统事件
	E.fn.command = function (commandName, bool, commandValue, e, callback) {
		var self = this;
		
		var fn = function () {
			document.execCommand(commandName, !!bool, commandValue);
		};

		// 执行事件
		self.customCommand(fn, e, callback);
	};

	// 自定义事件
	E.fn.customCommand = function (fn, e, callback) {
		var self = this;
		var currentRange = self.currentRange();
		var currentWrapRange = self.currentWrapRange();
		var $txt = self.$txt;

		// 恢复选区（整个外围选区）
		self.restoreSelection(currentWrapRange);

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