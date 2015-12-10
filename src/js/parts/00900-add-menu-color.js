// color
window.___E_mod(function (E, $) {

	E.fn.addMenuColor = function (menuId) {
		var self = this;
		var menus = self.menus;
		var configColor = self.config.menuColorValue;

		menus[menuId] = {
			// 是否处于选中状态
			selected: false,

			// 触发器
			$trigger: $('<div><i class="icon-wangEditor-m-brush"></i></div>'),
			// 包裹触发器的容器
			$wrap: $('<div class="item"></div>'),

			// 绑定触发器事件
			bindEvent: function (editor) {
				var menuDate = this;
				var $trigger = menuDate.$trigger;

				$trigger.on('singleTap', function (e) {
					if (self.checkTapTime(e, 'color') === false) {
						return;
					}

					var color = configColor;

					if (menuDate.selected) {
						color = '#000';
					}
					self.command('forecolor', false, color, e);
				});
			},

			// 更新样式
			updateStyle: function (editor) {
				var menuDate = this;
				var $trigger = menuDate.$trigger;
				var foreColor = document.queryCommandValue('forecolor');
				if (foreColor !== 'rgb(0, 0, 0)') {
					menuDate.selected = true;
					$trigger.addClass('selected');
				} else {
					menuDate.selected = false;
					$trigger.removeClass('selected');
				}
			}
		};
	};

});