// menucontainer api
window.___extendJS(function (E, $) {

	// 显示菜单
	// 每次显示菜单，都要更新菜单按钮的样式
	E.fn.setMenuContainerPosition = function (touchEvent, $focusElem) {
		var self = this;

		var x = touchEvent.pageX;
		var y = touchEvent.pageY;
		
		// var focusElemOffset = $focusElem.offset();
		// var focusElemTop = focusElemOffset.top;
		// var focusElemHeight = focusElemOffset.height;

		var $txt = self.$txt;
		var $children = $txt.children();
		var $lastChild;
		if ($children.length === 0) {
			$lastChild = $('<p><br></p>');
			$txt.append($lastChild);
		} else {
			$lastChild = $children.last();
		}
		var lastChildOffset = $lastChild.offset();
		var lastChildTop = lastChildOffset.top;
		var lastChildHeight = lastChildOffset.height;

		var $menuContainer = self.$menuContainer;
		var menuContainerWidth;
		var $menuContainerTip = self.$menuContainerTip;
		var tipMarginLeft;

		// top 先默认为手指点击的y值
		var top = y;
		if (y > lastChildTop + lastChildHeight) {
			// 如果手指点击的地方在 $txt 最后一个子元素的下方，
			// 则将 top 值定义为 $txt 最后一个子元素的最底部
			top = lastChildTop + lastChildHeight;
		}

		// 其他样式的结果值
		var left = x;
		var marginTop = 20;
		var marginLeft = 0 - x + 10;

		// 定位
		$menuContainer.css({
			'top': top + 'px',
			'left': left + 'px',
			'margin-left': marginLeft + 'px',
			'margin-top': marginTop + 'px'
		}); 

		// 显示menucontainer
		self.showMenuContainer();

		// 最后定位显示tip三角形
		tipMarginLeft = 0 - marginLeft - 10;
		if (tipMarginLeft <= 10) {
			tipMarginLeft = 10;
		}
		menuContainerWidth = $menuContainer.offset().width;
		if (tipMarginLeft > (menuContainerWidth - 30)) {
			tipMarginLeft = menuContainerWidth - 30;
		}
		$menuContainerTip.css('margin-left', tipMarginLeft + 'px');
	};

	// 显示菜单
	E.fn.showMenuContainer = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;

		if (self.isMenuShow === false) {
			$menuContainer.show();
			$menuContainer.css('opacity', '0.9');

			// 记录状态
			self.isMenuShow = true;
		}
	};

	// 隐藏菜单
	E.fn.hideMenuContainer = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $txt = self.$txt;
		
		var $focusElem = self.$focusElem;
		var $otherFocusElem = $txt.find('.focus-elem'); // 得重新查找，可能发生变化

		if (self.isMenuShow) {
			$menuContainer.hide();
			$menuContainer.css('opacity', '0');

			// 记录状态
			self.isMenuShow = false;

			// 隐藏 focuselem
			if ($focusElem) {
				$focusElem.removeClass('focus-elem');
				$otherFocusElem.removeClass('focus-elem');
			}
		}
	};
	
});