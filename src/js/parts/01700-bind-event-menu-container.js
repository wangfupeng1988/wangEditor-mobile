// 绑定菜单容器事件
window.___E_mod(function (E, $) {

	// ----------------- 绑定menucontiner事件
	E.fn.bindMenuContainerEvent = function () {
		
		// tap时focus $text
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuClose = self.$menuClose;

		//tap时，阻止冒泡，因为上层的 $txt 会监测 tap 事件
		$menuContainer.on('tap', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});

		// 绑定 menucontainer 右上角的关闭按钮事件
		$menuClose.on('singleTap', function (e) {
			if (self.checkTapTime() === false) {
				return;
			}

			// 显示菜单（下次显示openBtn）
			self.hideMenuByOpenBtn();

			// 阻止冒泡
			e.preventDefault();
			e.stopPropagation();
		});
	};

	// ----------------- 绑定 menucontainer openbtn 的事件
	E.fn.bindMenuContainerOpenBtnEvent = function () {
		var self = this;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;
		var $menuContainer = self.$menuContainer;

		// 点击 openbtn 显示菜单
		$menuContainerOpenBtn.find('a').on('singleTap', function (e) {
			if (self.checkTapTime() === false) {
				return;
			}

			// openBtn显示菜单
			self.showMenuByOpenBtn();

			// 阻止冒泡
			e.preventDefault();
			e.stopPropagation();
		});
	};

});