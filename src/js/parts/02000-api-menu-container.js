// menucontainer api
window.___E_mod(function (E, $) {

	// 显示菜单
	// 每次显示菜单，都要更新菜单按钮的样式
	E.fn.setMenuContainerPosition = function (touchEvent) {
		var self = this;
		var $targetElem = self.eventTarget();

		// 获取 touchstart 事件中手指触屏的位置
		var y = touchEvent.pageY;
		
		// 获取tap事件中target元素的位置和尺寸
		var targetElemOffset = $targetElem.offset();
		var targetElemTop = targetElemOffset.top;
		var targetElemHeight = targetElemOffset.height;


		// -----------------------兼容 android begin ---------------------------
		// 因为部分 android 获取不到 touchEvent.pageY，菜单栏总是定位在最上方

		// 如果 touchstart 事件中手指触屏的位置无效（都是 0）
		// 则将 y 设置为target元素的位置
		if (y === 0) {
			y = targetElemTop + targetElemHeight;
		}

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

		// -----------------------兼容 android end ---------------------------
		

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

		// 菜单容器和菜单容器的小三角tip
		var $menuContainer = self.$menuContainer;

		// top 先默认为手指点击的y值
		var top = y;
		if (top > lastChildTop + lastChildHeight) {
			// 如果手指点击的地方在 $txt 最后一个子元素的下方，
			// 则将 top 值定义为 $txt 最后一个子元素的最底部
			top = lastChildTop + lastChildHeight;
		}

		// 其他样式的结果值
		var left = txtLeft + 3;
		var marginTop = 20;

		// 定位
		$menuContainer.css({
			'top': top + 'px',
			'left': left + 'px',
			'margin-top': marginTop + 'px'
		}); 

		// 显示menucontainer
		self.showMenuContainer();
	};

	// 显示菜单
	E.fn.showMenuContainer = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;

		if (self.isMenuShow === false) {
			$menuContainer.show();
			// 此处要动画效果
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
			// 此处隐藏之后，在设置透明度。不要动画效果了，效果不好
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