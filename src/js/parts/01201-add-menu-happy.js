// 表情菜单
window.___E_mod(function (E, $) {

	E.fn.addMenuHappy = function (menuId) {
		var self = this;
		var $body = self.$body;
		var menus = self.menus;
		var happyUrlArr = self.config.happy;
		var $txt = self.$txt;

		// 提醒，不要使用编辑器自带的表情
		if (happyUrlArr.length > 0) {
			if (happyUrlArr[0].indexOf('http://wangeditor.github.io/expressions') === 0) {
				E.warn('正在使用wangEdior提供的免费表情图标，它们将从 github 下载，速度很慢！！！建议将表情图标重新配置，请参见文档说明');
			}
		}

		menus[menuId] = {
			// 选中状态
			selected: false,

			// 触发器
			$trigger: $('<div><i class="icon-wangEditor-m-happy"></i></div>'),
			// 包裹触发器的容器
			$wrap: $('<div class="item"</div>'),

			// $modal 
			$modal: $('<div class="wangEditor-mobile-modal"></div>'),

			// 渲染 $modal
			renderModal: function () {
				var menuData = this;
				var $modal = menuData.$modal;
				var itemTpl = '<span class="command-link" commandValue="#{imgUrl}"><img src="#{imgUrl}"/></span>';
				var contentHtmlArr = [];

				// 拼接数据
				$.each(happyUrlArr, function (key, value) {
					contentHtmlArr.push(
						itemTpl.replace(/#{imgUrl}/ig, value)
					);
				});
				$modal.append(contentHtmlArr.join(''));

				// 渲染到页面中
				$body.append($modal);

				// 定位
				var width = $modal.width();
				$modal.css('margin-left', (0 - width)/2);

				// 绑定表情图标的事件
				$modal.on('click', '.command-link', function (e) {
					// 屏蔽click事件的默认行为
					e.preventDefault();
				});
				$modal.on('singleTap', '.command-link', function (e) {
					if (self.checkTapTime(e, 'happy command-link') === false) {
						return;
					}

					var $commandLink = $(e.currentTarget);
					var commandValue = $commandLink.attr('commandValue');

					// 执行命令
					self.command('InsertImage', false, commandValue, e);

					// 隐藏 modal
					menuData.hideModal();
				});
			},

			// 显示 $modal
			showModal: function () {
				var menuData = this;
				var $modal = menuData.$modal;
				var scrollTop = $body.get(0).scrollTop;

				// 显示 modal
				$modal.show();

				// 确定 modal 位置
				$modal.css({
					'margin-top': (scrollTop + 50) + 'px'
				});

				// 点击编辑区域隐藏modal
				var hideModalFn = function (e) {
					menuData.hideModal();

					// 隐藏modal之后，接着取消事件绑定
					$txt.off('singleTap', hideModalFn);
				};

				// 绑定事件
				$txt.on('singleTap', hideModalFn);
			},

			// 隐藏 $modal
			hideModal: function () {
				this.$modal.hide();
			},

			// 绑定事件
			bindEvent: function (editor) {
				var menuData = this;
				var $trigger = menuData.$trigger;
				var $modal = menuData.$modal;

				function commandFnForOneEvent() {
					menuData.renderModal();
					menuData.showModal();
				}

				function commandFnForOnEvent() {
					menuData.showModal();
				}

				// one绑定的方法只执行一次
				// 用于渲染 modal 元素并显示
				$trigger.one('singleTap', function (e) {
					if (self.checkTapTime(e, 'happy one') === false) {
						return;
					}

					// 渲染modal并显示
					self.customCommand(true, commandFnForOneEvent, e);
				});

				// on 绑定的方法每次都执行
				// 用于每次显示和隐藏modal
				$trigger.on('singleTap', function (e) {
					if (self.checkTapTime(e, 'happy on') === false) {
						return;
					}

					// 显示modal
					self.customCommand(true, commandFnForOnEvent, e);
				});
			},

			// 更新样式
			updateStyle: function () {
				// 暂时不需要
			}
		};	
	};

});