// $txt api
window.___E_mod(function (E, $) {

	// focus API
	E.fn.focusTxt = function () {
		var self = this;
		var $txt = self.$txt;

		if (!self.isFocus) {
			$txt.focus();
		}
	};

	// 保存、获取 $txt tap时event对象的target元素
	E.fn.eventTarget = function ($elem) {
		var self = this;
		if ($elem == null) {
			return self.$eventTargetElem;
		} else {
			self.$eventTargetElem = $elem;
		}
	};

	// 保存源代码
	E.fn.saveSourceCode = function () {
		var self = this;
		var $txt = self.$txt;
		var $textarea = self.$textarea;
		var sourceCode = '';

		var $txtClone = $txt.clone();
		var $focusElem1 = $txtClone.find('.focus-elem');

		// 如果 menuContainer 和 menuContainerOpenBtn 都在编辑区域内
		// 则保存源码时要注意踢出这两个！！

		// 将当前的 $focusElem 清除样式
		$focusElem1.removeClass('focus-elem');

		// 获取源码
		sourceCode = $txtClone.html();
		$textarea.val(sourceCode);
	};

	// 在编辑区域最后插入空行
	E.fn.insertEmpltyLink = function () {
		var self = this;
		var $txt = self.$txt;
		var $children = $txt.children();

		if ($children.length === 0) {
			$txt.append($('<p><br></p>'));
			return;
		}

		if ($children.last().html() !== '<br>') {
			$txt.append($('<p><br></p>'));
		}
	};

	// 记录编辑器的点击次数
	E.fn.setTapNumForHideMenu = function (type) {
		// type: 'tap' / 'command'
		
		var self = this;
		var currentNum = self.tapNumForHideMenu;
		var configNum = self.config.tapNumForHideMenu;

		if (currentNum == null) {
			return;
		}
		// self.tapNumForHideMenu 将再 openBtn 显示菜单时，赋值为 0
		
		if (type === 'tap') {
			self.tapNumForHideMenu = currentNum + 1;

			if (currentNum >= configNum) {
				// 超出了界限，就执行 openBtn 隐藏菜单，取消计数
				// 此时将 self.tapNumForHideMenu 的值赋值为 null
				self.hideMenuByOpenBtn();
			}
		} else if (type === 'command') {
			self.tapNumForHideMenu = currentNum - 1;
		}
	};

});