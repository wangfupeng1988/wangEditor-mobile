// 绑定编辑区域事件
window.___E_mod(function (E, $) {

	E.fn.bindTxtEvent = function () {
		var self = this;
		var $txt = self.$txt;
		var $menuContainer = self.$menuContainer;
		var menuContainer = $menuContainer.get(0);
		var srollTime = Date.now();

		// 处理点击 $txt 的选区
		// $txt 的 tap 事件中调用
		function selectionHeadle () {
			var focusElem;
			var $focusElem;

			// 保存选中区域
			self.saveSelection();

			// 获取当前选中的元素，并设置一个高亮样式
			focusElem = self.getWrapRangeElem();
			if (focusElem) {
				$focusElem = $(focusElem);
				// 增加样式
				$focusElem.addClass('focus-elem');
				self.$focusElem = $focusElem;
			}

			// 更新菜单样式
			self.updateMenuStyle();

		} // 处理点击 $txt 的选区

		// tap时，记录选区，并显示菜单
		$txt.on('focus', function () {
			// 记录编辑器区域已经focus
			self.isFocus = true;
		});
		$txt.on('singleTap', function (e) {
			if (self.checkTapTime(e, '$txt') === false) {
				return;
			}

			// 如果当前不是focus状态，则返回
			if (!self.isFocus) {
				return;
			}

			// 获取 target 并保存
			var $target = $(e.target);
			self.eventTarget($target);

			if ($target.hasClass('focus-elem')) {
				// 如果当前点击的就是上一次点击的元素，则隐藏菜单栏，返回
				self.hideMenuContainer();
				return;
			}

			if ($target.get(0).nodeName === 'IMG') {
				// 点击图片时，隐藏菜单，返回
				self.hideMenuContainer();
				return;
			}

			if ($target.get(0) === $txt.get(0)) {
				// 如果当前选中的编辑区域，则隐藏菜单，返回
				self.hideMenuContainer();
				return;
			}

			// 根据点击的位置，对菜单栏进行定位
			self.setMenuContainerPosition();

			// 如果有上一次选中的元素，则清除样式
			var $focusElem = self.$focusElem;
			if ($focusElem) {
				$focusElem.removeClass('focus-elem');
			}
			
			// 等待 xxx ms    处理点击 $txt 的选区
			setTimeout(selectionHeadle, self.txtTapDelay);
			self.txtTapDelay = 100;

			// 最后，阻止冒泡，阻止document接收到（document的tap事件要隐藏菜单）
			e.stopPropagation();
		});

		// 滚动时隐藏菜单栏
		$txt.on('scroll', function (e) {

			// 给滚动事件增加一个时间间隔的限制
			if (Date.now() - srollTime <= 50) {
				return;
			} else {
				srollTime = Date.now();
			}

			// 隐藏菜单
			self.hideMenuContainer();

			// 阻止冒泡
			e.stopPropagation();
		});

		// 打字时隐藏菜单栏
		$txt.on('keydown', function (e) {
			// 隐藏菜单
			self.hideMenuContainer();

			// 删除并且没有内容的时候，就禁止再删除了
			var html = $txt.html();
			if (e.keyCode === 8 && /^<(\w+)[^<>]*><br><\/\1>$/.test(html)) {
				e.preventDefault();
			}
		});

		// longtap doubletap 隐藏菜单
		$txt.on('longTap, doubleTap', function () {
			// 隐藏菜单
			self.hideMenuContainer();
		});

		// blur时，隐藏菜单栏
		// 存储源代码
		$txt.on('blur', function (e) {

			// 记录编辑区域已经 blur
			self.isFocus = false;

			var explicitOriginalTarget = e.explicitOriginalTarget;
			if (menuContainer.contains(explicitOriginalTarget)) {
				// firefox 中，点击菜单会导致 $txt blur
				// e.explicitOriginalTarget 有值，并且包含在菜单容器中，证明是 ff 点击菜单所致的 blur
				
				e.preventDefault();
				return;

			} else {
				// 其他浏览器，点击菜单，都不会出现 blur 的情况
				// 这是正常情况下的 blur

				// 存储源码代码
				self.saveSourceCode();

				// 隐藏菜单 fn
				self.hideMenuContainer();
			}
		}); // $txt-blur end
	};

});