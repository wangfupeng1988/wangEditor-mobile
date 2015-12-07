// menucontainer api
window.___E_mod(function (E, $) {

	// -------------------显示菜单-------------------
	E.fn.setMenuContainerPosition = function () {
		var self = this;
		var $targetElem = self.eventTarget();
		
		// 获取tap事件中target元素的位置和尺寸
		var targetElemOffset = $targetElem.offset();
		var targetElemTop = targetElemOffset.top;
		var targetElemHeight = targetElemOffset.height;

		// 获取目标元素最下方的位置
		var y = targetElemTop + targetElemHeight;

		// 获取编辑区域 $txt 的位置和尺寸
		var $txt = self.$txt;
		var txtOffset = $txt.offset();
		var txtTop = txtOffset.top;
		var txtLeft = txtOffset.left;
		var txtHeight = txtOffset.height;

		// 如果超出了 $txt 的范围，则限制一下 y 的大小，限制在 $txt 最底部
		if (y > txtTop + txtHeight) {
			y = txtTop + txtHeight - 10;
		}
		

		// 获取编辑区域 $txt 的最后一个子元素（如果没有就强行加一个空行）
		var $children = $txt.children();
		var $lastChild;
		if ($children.length === 0) {
			$lastChild = $('<p><br></p>');
			$txt.append($lastChild);
		} else {
			$lastChild = $children.last();
		}
		// 获取最后一个子元素的尺寸和位置
		var lastChildOffset = $lastChild.offset();
		var lastChildTop = lastChildOffset.top;
		var lastChildHeight = lastChildOffset.height;

		// 菜单容器
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;

		// top 先默认为手指点击的y值
		var top = y;
		if (top > lastChildTop + lastChildHeight) {
			// 如果手指点击的地方在 $txt 最后一个子元素的下方，
			// 则将 top 值定义为 $txt 最后一个子元素的最底部
			top = lastChildTop + lastChildHeight;
		}

		// 其他样式的结果值
		var left = txtLeft + 1;
		var marginTop = 20;
		var style = {
			'top': top + 'px',
			'left': left + 'px',
			'margin-top': marginTop + 'px'
		};

		// 定位
		$menuContainer.css(style); 
		$menuContainerOpenBtn.css(style);

		// 显示menucontainer
		self.showMenuContainer();
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