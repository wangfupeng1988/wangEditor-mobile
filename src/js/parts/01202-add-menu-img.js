// 上传图片
window.___E_mod(function (E, $) {
	E.fn.addMenuImg = function (menuId) {
		var self = this;
		var $body = self.$body;
		var menus = self.menus;
		var config = self.config;
		var uploadImgUrl = config.uploadImgUrl || '';
		var testHostname = config.testHostname || 'localhost';
		var idDebugger = testHostname === location.hostname;

		if (uploadImgUrl === '') {
			alert(
				'没有配置 uploadImgUrl ，wangEditor 将无法上传图片。\n\n' + 
				'想要配置上传图片，请参见文档说明。\n\n' + 
				'不想要图片上传，可通过配置 menus 隐藏该功能。'
			);
		}

		// 针对 test 地址，打印信息
		function log(info) {
			if (!idDebugger) {
				return;
			}
			E.log(info);
		}

		// 用随机数生成 iframe formid 和 input 的 id
		var iframeId = 'iframe' + Math.random().toString().slice(2);
		var formId = 'form' + Math.random().toString().slice(2);
		var inputFileId = 'inputfile' + Math.random().toString().slice(2);

		menus[menuId] = {
			// 选中状态
			selected: false,

			// 触发器
			$trigger: $('<a href="#"><i class="icon-wangEditor-m-picture"></i></a>'),
			// 包裹触发器的容器
			$wrap: $('<div class="item"</div>'),

			// 渲染 iframe
			renderIframe: function () {
				// 拼接html
				var iframeHtml = '<iframe id="' + iframeId + '" name="' + iframeId + '" style="display:none; width:0; height:0;"></iframe>';
				var $container = $('<div style="display:none;"></div>');
				$container.html(iframeHtml);

				// 渲染到页面中
				$body.append($container);

				// 绑定 iframe 的 onload 事件
				var iframeElem = $('#' + iframeId).get(0);
				iframeElem.onload = function () {
					var result = iframeElem.contentDocument.body.innerHTML;
					if (result === 'error') {
						log('服务器端返回了数据，很遗憾返回的是 error');
						log('请关注弹出的错误提示，或者去服务器后台跟踪代码，排查问题');
						log('结束...');
						
						alert('上传错误');
						return;
					}

					log('成功接收到服务器端返回的数据');
					log('服务器端返回的数据是：' + result);
					log('请确认以上数据是否是一个 image 的 url 地址，如果不是将无法显示 image');
					log('即将显示 image');

					// 执行插入命令
					self.command('insertimage', false, result);

					log('结束...');
				};
			},

			// 渲染 form
			renderForm: function () {
				var fromHtml = [
					'<form id="' + formId + '" target="' + iframeId + '"',
					'    action="' + uploadImgUrl + '"',
					'    enctype="multipart/form-data"',
					'    method="post">',
					// 下一句代码的 name  值必须为 wangEditorMobileFile，和后台代码一致
					'    <input id="' + inputFileId + '" name="wangEditorMobileFile" type="file" accept="image/*" capture="camera">',
					'</form>'
				].join('');

				var $container = $('<div style="display:none;"></div>');
				$container.html(fromHtml);

				// 渲染到页面中
				$body.append($container);
			},


			// 绑定菜单事件
			bindEvent: function (editor) {
				var menuData = this;
				var $trigger = menuData.$trigger;

				// 将 iframe 和 form 渲染到页面上
				menuData.renderIframe();
				menuData.renderForm();

				// 获取 form input-file 对象
				var $inputFlie = $('#' + inputFileId);
				var $form = $('#' + formId);

				// input 有文件选中时，提交 form
				$inputFlie.on('change', function (e) {
					$form.submit();
					log('已经选中文件，并提交了 form');
					log('如果接下来得不到 log 信息，则证明服务器端没有返回数据');
				});

				// 点击菜单，触发 input 事件
				$trigger.on('singleTap', function (e) {
					if (self.checkTapTime() === false) {
						return;
					}

					if (uploadImgUrl === '') {
						// 没有配置上传图片的url
						return;
					}

					function fn() {
						$inputFlie.trigger('click');
					}

					self.customCommand(true, fn, e);
				});
			},

			// 更新样式
			updateStyle: function () {
				// 暂时不需要
			}
		};
	};
});