// menus api
window.___E_mod(function (E, $) {
	
	// 更新菜单样式
	E.fn.updateMenuStyle = function () {
		var self = this;
		var menus = self.menus;

		// 遍历所有菜单，更新他们的样式
		$.each(menus, function (key, menu) {
			var fn = menu.updateStyle;
			if (fn) {
				fn.call(menu);
			}
		});
	};

});