// 渲染菜单栏
window.___extendJS(function (E, $) {

	E.fn.renderMenu = function () {
		var self = this;
		var menus = self.menus;
		var $menuContainer = self.$menuContainer;
		var $txt = self.$txt;
		var $gap = $('<div class="gap"></div>');

		// 配置文件中的菜单配置
		var configMenus = self.config.menus;

		// 遍历菜单配置集合，渲染菜单
		$.each(configMenus, function (key, menuId) {
			var menu = menus[menuId];
			if (menu == null) {
				return;
			}

			var $trigger = menu.$trigger;
			var $wrap = menu.$wrap;

			if ($trigger) {
				// 渲染菜单
				if ($wrap) {
					$wrap.append($trigger);
					$menuContainer.append($wrap);
				} else {
					$menuContainer.append($trigger);
				}
				
				// 菜单之间的间隙
				// 之所以需要加 clone 是因为 append 由一种『单例移动』的特性！！需注意！！
				$menuContainer.append($gap.clone());
			}
		});

		// 删除最后一个间隙（即最后一个子元素）
		$menuContainer.children().last().remove();

		// 默认隐藏
		$menuContainer.hide();
		
		// 变量记录菜单容器的显示与隐藏
		self.isMenuShow = false;

		// 最后，将菜单容器渲染到页面中，
		// $txt.append($menuContainer);
		$('body').append($menuContainer);
	};

});