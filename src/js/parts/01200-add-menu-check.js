// check
window.___E_mod(function (E, $) {

	E.fn.addMenuCheck = function (menuId) {
		var self = this;
		var menus = self.menus;

		menus[menuId] = {
			// 是否处于选中状态
			selected: false,

			// 触发器
			$trigger: $('<div><i class="icon-wangEditor-m-checkbox-checked"></i></div>'),
			// 包裹触发器的容器
			$wrap: $('<div class="item"></div>'),

			// 绑定触发器事件
			bindEvent: function (editor) {
				var tapTime = Date.now();
				var menuData = this;
				menuData.$trigger.on('singleTap', function (e) {
					if (self.checkTapTime(e, 'check') === false) {
						return;
					}

					// 构建dom结构
					var $checkbox = $('<input type="checkbox"/>');
					var $content = $('<p></p>');
					$content.append($checkbox).append('&nbsp;&nbsp;');

					// 初始化 checkbox 事件
					$checkbox.on('singleTap', function (e) {
						// 某些情况下，浏览器的tap事件会被连续触发两次，在此处理
						if (Date.now() - tapTime < 50) {
							return;
						} else {
							tapTime = Date.now();
						}

						var $checkbox = $(e.target);
						var checked = $checkbox.is(':checked');
						$checkbox.prop('checked', !checked);

						// 最后不要忘记阻止冒泡
						e.preventDefault();
						e.stopPropagation();
					});

					// 执行命令
					var fn = function () {
						self.$focusElem.after($content);
					};
					self.customCommand(false, fn, e);
				});
			},

			// 更新样式
			updateStyle: function (editor) {
				// 暂时不需要
			}
		};
	};

});