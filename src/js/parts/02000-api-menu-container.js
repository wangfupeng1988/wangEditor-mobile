// menucontainer api
window.___E_mod(function (E, $) {

	var positionFirst = true;  // 第一次计算位置
	var firstTop = 0;
	// -------------------计算菜单的位置，显示菜单-------------------
	E.fn.setMenuContainerPosition = function () {
		var self = this;

		// 目标元素
		var $targetElem = self.eventTarget();
		var targetElemTop = $targetElem.offset().top;

		// 编辑区域
		var $txt = self.$txt;
		var txtTop = $txt.offset().top;
		var txtLeft = $txt.offset().left;

		// 菜单
		var $menuContainer = self.$menuContainer;
		var menuHeight = $menuContainer.height();

		// 计算 top 结果
		var top = targetElemTop;
		if (top < txtTop) {
			// 停靠在编辑器区域上方
			top = txtTop;
		}
		top = top - 55;  // 上移 55px 即菜单栏的高度


		// 设置菜单的样式，定位
		$menuContainer.css({
			'top': top,
			'left': txtLeft + 2
		}); 

		// 显示menucontainer
		self.showMenuContainer();
	};

	// -------------------显示菜单-------------------
	E.fn.showMenuContainer = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;

		if (self.menuDisplayShow === false) {
			$menuContainer.show();
			$menuContainer.css('opacity', '0.9');   // 此处要动画效果

			// 记录状态
			self.menuDisplayShow = true;
		}
	};

	// -------------------隐藏菜单-------------------
	E.fn.hideMenuContainer = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $txt = self.$txt;
		
		var $focusElem = self.$focusElem;
		var $otherFocusElem = $txt.find('.focus-elem'); // 得重新查找，可能发生变化

		if (self.menuDisplayShow) {

			$menuContainer.hide();
			// 此处隐藏之后，在设置透明度。不要动画效果了，效果不好
			$menuContainer.css('opacity', '0');

			// 记录状态
			self.menuDisplayShow = false;

			// 隐藏 focuselem
			if ($focusElem) {
				$focusElem.removeClass('focus-elem');
				$otherFocusElem.removeClass('focus-elem');
			}
		}
	};
});