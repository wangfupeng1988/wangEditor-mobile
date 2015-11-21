// quote
window.___extendJS(function (E, $) {

	E.fn.addMenuQuote = function (menuId) {
		var self = this;
		var menus = self.menus || {};
		var $txt = self.$txt;
		var configQuoteStyle = self.config.menuQuoteStyle;

		menus[menuId] = {
			// 是否处于选中状态
			selected: false,

			// 触发器
			$trigger: $('<a href="#"><i class="icon-wangEditor-m-quote-left"></i></a>'),
			// 包裹触发器的容器
			$wrap: $('<div class="item"></div>'),

			// 绑定触发器事件
			bindEvent: function (editor) {
				var menuData = this;
				menuData.$trigger.on('singleTap', function (e) {
					if (self.checkTapTime() === false) {
						return;
					}

					// 执行命令
					var value = 'blockquote';
					if (menuData.selected) {
						value = 'p';
					}
					self.command('formatblock', false, value, e);

					// 处理样式
					if (value === 'blockquote') {
						// 设置quote样式（刚刚被设置为quote）
						self.$txt.find('blockquote').each(function(key, node){
							// 遍历编辑区域所有的quote
							var $quote = $(node),
								styleKey = 'w_editor_quote_style',
								hasStyle = $quote.attr(styleKey);

							// 如果没有标记，则设置样式并记录标记
							if(hasStyle == null){
								// configQuoteStyle 是配置的样式，可在 editor.config 中修改
								$quote.css(configQuoteStyle);
								$quote.attr(styleKey, '1');
							}
						});
					} // 处理样式
				});
			},

			// 更新样式
			updateStyle: function (editor) {
				var menuData = this;
				var $trigger = menuData.$trigger;
				var value = document.queryCommandValue('formatblock');

				if ( /^blockquote$/i.test(value) ) {
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