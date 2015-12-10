// quote
window.___E_mod(function (E, $) {

	E.fn.addMenuQuote = function (menuId) {
		var self = this;
		var menus = self.menus;
		var $txt = self.$txt;
		var configQuoteStyle = self.config.menuQuoteStyle;

		menus[menuId] = {
			// 是否处于选中状态
			selected: false,

			// 触发器
			$trigger: $('<div><i class="icon-wangEditor-m-quote-left"></i></div>'),
			// 包裹触发器的容器
			$wrap: $('<div class="item"></div>'),

			// 绑定触发器事件
			bindEvent: function (editor) {
				var menuData = this;
				menuData.$trigger.on('singleTap', function (e) {
					if (self.checkTapTime(e, 'quote') === false) {
						return;
					}

					// 执行命令
					var $focusElem = self.$focusElem;
					var $quoteElem;
					var text;
					var commandFn;
					if (menuData.selected) {
						// 此时已经是 quote 状态，此时点击，应该恢复为普通文字
						
						// 获取当前的 quote 元素
						if ($focusElem.get(0).nodeName === 'BLOCKQUOTE') {
							$quoteElem = $focusElem;
						} else {
							$quoteElem = $focusElem.closest('blockquote');
						}

						if ($quoteElem.length === 0) {
							// 没有找到 blockquote 元素
							return;
						}

						// 获取文本
						text = $quoteElem.text();

						// 定义一个自定义的命令事件
						commandFn = function () {
							var $p = $('<p>' + text + '</p>');
							$quoteElem.after($p);
							$quoteElem.remove();
						};

						// 执行盖自定义事件
						self.customCommand(false, commandFn, e);

					} else {
						// 当前不是quote状态

						// 执行命令，将段落设置为quote
						self.command('formatblock', false, 'blockquote', e);

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

					} // else
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