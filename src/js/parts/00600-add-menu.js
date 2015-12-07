// 增加自带的菜单数据对象
window.___E_mod(function (E, $) {

	E.fn.addMenus = function () {
		var self = this;

		// ------------- menus container  
		var $menuContainer = $('<div class="wangEditor-mobile-menu-container" contentEditable="false"></div>');
		var $menuItemContainer = $('<div class="item-container"></div>');
		var $menuContainerTip = $('<div class="tip"></div>');  // 三角形
		// var $menuCloseContainer = $('<div class="close"></div>');
		// var $menuClose = $('<a href="#"></a>');

		// 增加小三角 tip
		$menuContainer.append($menuContainerTip);

		// 增加关闭按钮
		// $menuClose.append($('<i class="icon-wangEditor-m-close"></i>'));
		// $menuCloseContainer.append($menuClose);
		// $menuContainer.append($menuCloseContainer);

		// 菜单项的容器
		$menuContainer.append($menuItemContainer);

		// -------- menus container 打开按钮
		var $menuContainerOpenBtn = $('<div class="wangEditor-mobile-menu-container-open-btn"  contentEditable="false"></div>');
		var $menuContainerOpenBtnItemContaier = $('<div class="item-container"> <div class="item"><a href="#"><i class="icon-wangEditor-m-ellipsis-h"></i></a></div> </div>');
		$menuContainerOpenBtn.append($menuContainerOpenBtnItemContaier);
		$menuContainerOpenBtn.append($menuContainerTip.clone());

		// 添加到数据对象
		self.$menuContainer = $menuContainer;
		self.$menuItemContainer = $menuItemContainer;
		self.$menuContainerOpenBtn = $menuContainerOpenBtn;
		// self.$menuClose = $menuClose;

		// ------------- menus 数据集合 ------------- 
		self.menus = {};		
		self.addMenuBold('bold');
		self.addMenuHead('head');
		self.addMenuColor('color');
		self.addMenuQuote('quote');
		self.addMenuList('list');
		self.addMenuCheck('check');
		self.addMenuHappy('happy');
		self.addMenuImg('img');
	};

});