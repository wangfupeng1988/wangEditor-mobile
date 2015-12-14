// list
window.___E_mod(function (E, $) {

	E.fn.addMenuList = function (menuId) {
		var self = this;
		var menus = self.menus;

		menus[menuId] = {
			// 是否处于选中状态
			selected: false,

			// 触发器
			$trigger: $('<div><i class="icon-wangEditor-m-list-ul"></i></div>'),
			// 包裹触发器的容器
			$wrap: $('<div class="item"></div>'),

			// 绑定触发器事件
			bindEvent: function (editor) {
				var menuData = this;
				menuData.$trigger.on('singleTap', function (e) {
					if (self.checkTapTime(e, 'list') === false) {
						return;
					}

					if (!menuData.selected) {
						// 如果当前状态不是list
						// 执行命令前，先去掉 focus 的样式
						self.$focusElem.removeClass('focus-elem');
					}

					// 执行命令
					self.command('InsertUnorderedList', false, undefined, e);
					
				});
			},

			// 更新样式
			updateStyle: function (editor) {
				var menuData = this;
				var $trigger = menuData.$trigger;

				if ( document.queryCommandState('InsertUnorderedList') ) {
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