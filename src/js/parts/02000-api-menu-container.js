// menucontainer api
window.___E_mod(function (E, $) {

	var positionFirst = true;  // 第一次计算位置
	var firstTop = 0;
	// -------------------计算菜单的位置，显示菜单-------------------
	E.fn.setMenuContainerPosition = function () {
		var self = this;

		// 目标元素
		var $targetElem = self.eventTarget();
		// 编辑区域
		var $txt = self.$txt;
		// 菜单
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;

		// 获取tap事件中target元素的位置和尺寸
		var targetElemOffset = $targetElem.offset();
		var targetElemTop = targetElemOffset.top;
		var targetElemHeight = targetElemOffset.height;

		// 获取编辑区域 $txt 的位置和尺寸
		var scrollTop = $txt.get(0).scrollTop;
		var txtOffset = $txt.offset();
		var txtTop = txtOffset.top;
		var txtHeight = txtOffset.height;
		var txtLeft = txtOffset.left;

		// 获取目标元素下方的位置
		var targetElemBottom = targetElemTop + targetElemHeight;
		// 获取 $txt 下方的位置
		var txtBottom = txtTop + txtHeight;

		// 用于存储最后的结果
		var top = 0;
		var style = {};

		if (txtBottom - targetElemBottom >= 60) {
			// 如果目标元素距离编辑区域下方的距离大于60，菜单显示在下方

			// 显示上方的 tip
			self.showTipTop();

			// 设置top
			top = targetElemBottom - txtTop + scrollTop;
			// 下移 10px
			top  = top + 10;


		} else {
			// 如果目标元素距离编辑区域下方的距离小于60，菜单显示在上方

			// 显示下方的 tip
			self.showTipBottom();

			// 设置top
			top = targetElemTop - txtTop + scrollTop;
			// 上移 50px
			top = top - 50;
		}

		// 如果 top 小于 0，则修改为 0（小于0说明隐藏在上方了）
		if (top < scrollTop) {
			top = scrollTop;
		}

		if (positionFirst) {
			// 第一次计算位置，直接设置样式
			style = {
				top: top + 'px',
				left: '3px'
			};

			// 将当前的top存储下来
			firstTop = top;

			positionFirst = false;
		} else {
			// 之后计算位置，通过margin解决（有动画效果）
			style = {
				'margin-top': (top - firstTop) + 'px'
			};
		}

		// 设置菜单的样式，定位
		$menuContainer.css(style); 
		$menuContainerOpenBtn.css(style);

		// 显示menucontainer
		self.showMenuContainer();
	};


	var menuContainerTip = 'top';  // 记录tip状态。默认为 top
	// -------------------显示上面的tip三角-------------------
	E.fn.showTipTop = function () {
		if (menuContainerTip === 'top') {
			return;
		}

		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;

		$menuContainer.removeClass('wangEditor-mobile-menu-container1')
					  .addClass('wangEditor-mobile-menu-container');
		$menuContainerOpenBtn.removeClass('wangEditor-mobile-menu-container-open-btn1')
							 .addClass('wangEditor-mobile-menu-container-open-btn');
		
		// 记录状态
		menuContainerTip = 'top';
	};
	// -------------------显示下面的tip三角-------------------
	E.fn.showTipBottom = function () {
		if (menuContainerTip === 'bottom') {
			return;
		}
		
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;

		$menuContainer.removeClass('wangEditor-mobile-menu-container')
					  .addClass('wangEditor-mobile-menu-container1');
		$menuContainerOpenBtn.removeClass('wangEditor-mobile-menu-container-open-btn')
							 .addClass('wangEditor-mobile-menu-container-open-btn1');
		
		// 记录状态
		menuContainerTip = 'bottom';
	};

	// -------------------显示菜单-------------------
	E.fn.showMenuContainer = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;

		if (self.menuDisplayShow === false) {
			if (self.showMenu) {
				// 要显示的是菜单容器，而非 openbtn

				$menuContainer.show();
				$menuContainer.css('opacity', '0.9');   // 此处要动画效果
			} else {
				$menuContainerOpenBtn.show();
				$menuContainerOpenBtn.css('opacity', '0.6');
			}

			// 记录状态
			self.menuDisplayShow = true;
		}
	};

	// -------------------隐藏菜单-------------------
	E.fn.hideMenuContainer = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;
		var $txt = self.$txt;
		
		var $focusElem = self.$focusElem;
		var $otherFocusElem = $txt.find('.focus-elem'); // 得重新查找，可能发生变化

		if (self.menuDisplayShow) {
			$menuContainerOpenBtn.hide();
			$menuContainerOpenBtn.css('opacity', '0');

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

	// -------------------通过openbtn显示菜单-------------------
	E.fn.showMenuByOpenBtn = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;

		// 记录状态
		self.showMenu = true;
			
		$menuContainer.show();
		$menuContainer.css('opacity', '0.9');

		$menuContainerOpenBtn.hide();
		$menuContainerOpenBtn.css('opacity', '0');

		// 开始点击次数的记录
		self.tapNumForHideMenu = 0;
	};

	// -------------------通过openbtn隐藏菜单-------------------
	E.fn.hideMenuByOpenBtn = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;
		
		// 记录状态
		self.showMenu = false;
		
		// 直接调用隐藏menucontainer的方法即可
		self.hideMenuContainer();

		// 取消点击次数的记录
		self.tapNumForHideMenu = null;
	};
});