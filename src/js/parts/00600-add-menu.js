// 增加自带的菜单数据对象
window.___E_mod(function (E, $) {

	E.fn.addMenus = function () {
		var self = this;
		var menus;

		// ------------- menus container ------------- 
		var $menuContainer = $('<div contentEditable="false" class="wangEditor-mobile-menu-container"></div>');
		var $menuContainerTip = $('<div class="tip"></div>');  // 三角形
		$menuContainer.append($menuContainerTip);

		self.$menuContainer = $menuContainer;
		self.$menuContainerTip = $menuContainerTip;

		// ------------- menus 数据集合 ------------- 
		self.menus = {};
		menus = self.menus;

		self.addMenuBold('bold');
		self.addMenuHead('head');
		self.addMenuColor('color');
		self.addMenuQuote('quote');
		self.addMenuList('list');
		self.addMenuCheck('check');
	};

});