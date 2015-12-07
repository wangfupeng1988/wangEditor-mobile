// 绑定编辑区域事件
window.___E_mod(function (E, $) {

	E.fn.bindTxtEvent = function () {
		var self = this;
		var $txt = self.$txt;
		var $menuContainer = self.$menuContainer;
		var menuContainer = $menuContainer.get(0);
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;
		var menuContainerOpenBtn = $menuContainerOpenBtn.get(0);
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

			if ($target.hasClass('wangEditor-mobile-txt')) {
				// 如果当前选中的编辑区域，则隐藏菜单，返回
				self.hideMenuContainer();
				return;
			}

			// 计算点击次数（N次不command即隐藏菜单为 openBtn 形式）
			self.setTapNumForHideMenu('tap');

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

			// -----------兼容 android begin-----------
			// 在部分安卓浏览器中，点击menucontainer相关的按钮
			// 会先触发 blur 然后再触发自己的tap
			// 这里做一步判断

			var focusTxtFn = self.focusTxt;

			var explicitOriginalTarget = e.explicitOriginalTarget;
			if (menuContainer.contains(explicitOriginalTarget) || menuContainerOpenBtn.contains(explicitOriginalTarget)) {
				// firefox 中，
				// e.explicitOriginalTarget 包含再菜单容器中，说明
				// 是由菜单容器的按钮点击触发的该事件
				setTimeout(focusTxtFn.call(self), 300);
				e.preventDefault();
				return;
			}

			var relatedTarget = e.relatedTarget;
			if (relatedTarget != null) {
				// chrome中
				// e.relatedTarget != null 说明是
				// 点击menucontainer相关的按钮触发的，阻止并返回
				setTimeout(focusTxtFn.call(self), 300);
				e.preventDefault();
				return;
			}

			// -----------兼容 android begin-----------

			// 存储源码代码
			self.saveSourceCode();

			// 隐藏菜单 fn
			self.hideMenuContainer();
			
		});

		// 阻止 click 事件，防止 tap 点透
		$txt.on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
	};

});