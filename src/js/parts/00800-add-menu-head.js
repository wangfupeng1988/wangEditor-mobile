// head
window.___E_mod(function (E, $) {

	E.fn.addMenuHead = function (menuId) {
		var self = this;
		var menus = self.menus;

		menus[menuId] = {
			// 是否处于选中状态
			selected: false,

			// 触发器
			$trigger: $('<div><i class="icon-wangEditor-m-header"></i></div>'),
			// 包裹触发器的容器
			$wrap: $('<div class="item"></div>'),

			// 绑定触发器事件
			bindEvent: function (editor) {
				var menuData = this;
				menuData.$trigger.on('singleTap', function (e) {
					if (self.checkTapTime(e, 'head') === false) {
						return;
					}

					// 执行命令
					if (menuData.selected) {
						self.command('formatblock', false, 'p', e);
					} else {
						self.command('formatblock', false, 'h3', e);
					}
				});
			},

			// 更新样式
			updateStyle: function (editor) {
				var menuData = this;
				var $trigger = menuData.$trigger;
				var	value = document.queryCommandValue('formatblock');

				if ( /^h\d{1}$/i.test(value) ) {
					menuData.selected = true;
					$trigger.addClass('selected');
				} else {
					menuData.selected = false;
					$trigger.removeClass('selected');
				}
			}
		};
	};
	
});