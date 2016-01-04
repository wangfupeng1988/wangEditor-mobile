// 上传图片
window.___E_mod(function (E, $) {
	E.fn.addMenuImg = function (menuId) {
		var self = this;
		var $body = self.$body;
		var $txt = self.$txt;
		var menus = self.menus;

		var isAndroid = E.isAndroid;
		var isUC = E.isUC;

		var idDebugger = false;  // 默认为 false，下文可能修改

		// 针对 test 地址，打印信息
		function log(info) {
			if (!idDebugger) {
				return;
			}
			E.log(info);
		}

		// 用随机数生成input 的 id
		var inputFileId = 'inputfile' + Math.random().toString().slice(2);

		menus[menuId] = {
			// 选中状态
			selected: false,

			// 触发器
			$trigger: (function () {
				// 不同os、不同browser的情况不一样
				if (isAndroid || isUC) {
					return $('<div><i class="icon-wangEditor-m-picture"></i></div>');
				} else {
					return $('<label for="' + inputFileId + '"><i class="icon-wangEditor-m-picture"></i></label>');
				}
			})(),
			
			// 包裹触发器的容器
			$wrap: $('<div class="item"</div>'),

			// 渲染 form
			renderForm: function () {
				var fromHtml = [
					'<form',
					'    enctype="multipart/form-data"',
					'    method="post">',
					'    <input id="' + inputFileId + '" type="file" accept="image/*">',
					'</form>'
				].join('');

				var $container = $('<div style="display:none;"></div>');
				// var $container = $('<div></div>');
				$container.html(fromHtml);

				// 渲染到页面中
				$body.append($container);
			},


			// 绑定菜单事件
			bindEvent: function (editor) {
				var menuData = this;
				var $trigger = menuData.$trigger;

				// 将 form 渲染到页面上
				menuData.renderForm();

				// 获取 form input-file 对象
				var $inputFlie = $('#' + inputFileId);

				// 将以base64的图片url数据转换为Blob
				function convertBase64UrlToBlob(urlData, filetype){
		    		//去掉url的头，并转换为byte
				    var bytes=window.atob(urlData.split(',')[1]);
				    
				    //处理异常,将ascii码小于0的转换为大于0
				    var ab = new ArrayBuffer(bytes.length);
				    var ia = new Uint8Array(ab);
				    for (var i = 0; i < bytes.length; i++) {
				        ia[i] = bytes.charCodeAt(i);
				    }

				    // 类型
				    if (filetype === '' || !filetype) {
				    	filetype = 'image/png';
				    }

				    return new Blob([ab], {type : filetype});
				}

				// input 有文件选中时，显示预览图，提交 form
				$inputFlie.on('change', function (e) {

					// 获取配置项内容
					var config = self.config;
					var uploadImgUrl = config.uploadImgUrl || '';
					var testHostname = config.testHostname || 'localhost';
					var loadingImgUrl = config.loadingImg;
					var timeout = config.uploadTimeout || 10000;

					idDebugger = testHostname === window.location.hostname;

					// 判断改浏览器是否支持 FormData 和 fileReader
					if (!window.FileReader || !window.FormData) {
						alert('当前浏览器不支持html5中的 FileReader 和 FormData，无法上传图片');
						return;
					}

					if (uploadImgUrl === '') {
						// 没有配置上传图片的url
						alert(
							'没有配置 uploadImgUrl ，wangEditor 将无法上传图片。\n\n' + 
							'想要配置上传图片，请参见文档说明。\n\n' + 
							'不想要图片上传，可通过配置 menus 隐藏该功能。'
						);
						return;
					}

					var files = $inputFlie[0].files || [];
					if (files.length === 0) {
						return;
					}
					var file = files[0];
					var fileType = file.type || '';
					var reader = new FileReader();
					var $focusElem = self.$focusElem;

					log('选中的文件为：' + file.name);
					log('服务器端上传地址为：' + uploadImgUrl);

					reader.onload = function(e){
						var base64 = e.target.result || this.result,
							prevImgSrc,
							prveImgContainerId = 'div' + Math.random().toString().slice(2),
							prevImgInfoId = 'info' +  Math.random().toString().slice(2),
							xhr,
							formData,
							timeoutId;

						// ---------- 显示预览 ----------
						if (window.URL && window.URL.createObjectURL) {
							// 如果浏览器支持预览本地图片功能，则预览本地图片
							prevImgSrc = window.URL.createObjectURL(file);

							// 生成预览图片，设置半透明
							$focusElem.after(
								'<div class="previmg-container" id="' + prveImgContainerId + '">' + 
								'   <p class="info" id="' + prevImgInfoId + '">上传中...</p>' +
								'	<img src="' + prevImgSrc + '" style="opacity:0.2; max-width:100%;"/>' + 
								'</div>'
							);
						} else {
							// 如果浏览器不支持预览本地图片，则复制为一个配置的图片地址
							prevImgSrc = loadingImgUrl;

							// 生成预览图片
							$focusElem.after(
								'<div class="previmg-container" id="' + prveImgContainerId + '">' + 
								'	<img src="' + prevImgSrc + '" style="max-width:100%;"/>' + 
								'</div>'
							);
						}
						log('生成预览图片，src是：' + prevImgSrc);

						// ---------- 上传到服务器 ----------
						xhr = new XMLHttpRequest();
			            formData = new FormData();

			            // 访问超时
			            function timeoutCallback() {
			            	log('访问超时（配置的超时事件是：'+ timeout +'）');

			            	var $prevImgContainer = $('#' + prveImgContainerId);
			            	$prevImgContainer.remove();
	
			            	if (xhr.abort) {
			            		xhr.abort();
			            	}
			            	
			            	alert('上传超时，请重试');

			            	if (location.hostname.toLowerCase() === 'wangeditor.github.io') {
			            		// 官网demo的特殊提示
			            		alert('提示：wangEditor官网demo没有后台服务，因此超时（该alert在实际项目中不会出现）');
			            	}
			            }

			            log('准备上传文件...');
			            xhr.open('POST', uploadImgUrl, true);

			            // 计时开始
			            timeoutId = setTimeout(timeoutCallback, timeout);
			            
			            xhr.onload = function () {
			            	// 得到消息之后，清除计时
			            	clearTimeout(timeoutId);

			            	var resultSrc = xhr.responseText; //服务器端要返回图片url地址
			            	var erroInfo;
			            	var $prevImgContainer = $('#' + prveImgContainerId);
			            	var loadImg;
			            	var $loadImg;

			            	log('服务器端的返回数据为：' + resultSrc);

			            	// 返回数据错误
			            	if (resultSrc.indexOf('error|') === 0) {
			            		erroInfo = resultSrc.split('|')[1];
			            		log('很遗憾，后台返回error，错误信息为：' + erroInfo);
			            		
			            		// 提示错误
			            		alert('上传图片错误: \n' + erroInfo);

			            		// 移除预览图片
			            		$prevImgContainer.remove();

			            	} else {
			            		// 返回正确的图片地址

			            		log('请确认以上图片是否有效，无效将无法显示在页面中');
			            		log('准备下载该图片...');
			            		
			            		// 下载图片，下载完成后赋值到编辑器中
			            		$('#' + prevImgInfoId).text('加载中...');
			
			            		loadImg = document.createElement('img');
			            		loadImg.src = resultSrc;
			            		loadImg.onload = function () {
			            			log('下载完成，正式呈现在编辑区域');
		
									$loadImg = $(loadImg);
									$loadImg.css('max-width', '100%');
			            			$prevImgContainer.after($loadImg);
			            			$prevImgContainer.remove();

			            			// 保存内容
			            			self.saveSourceCode();
			            		};
			            		loadImg.onerror = function () {
			            			log('图片加载失败，请确定这个url是否能成功得到图片：' + resultSrc);
			            			
			            			alert('图片加载失败');
			            			$prevImgContainer.remove();

			            			// 保存内容
			            			self.saveSourceCode();
			            		};
			            	}
			            };

			            // 添加图片数据
			            // 1. 图片数据要经过 convertBase64UrlToBlob 转换
			            // 2. wangEditorMobileFile 要和后台一致
			            formData.append('wangEditorMobileFile', convertBase64UrlToBlob(base64, fileType));
			            xhr.send(formData);
					};

					//读取文件
					reader.readAsDataURL(file);
				});

				// 点击菜单，触发 input 事件
				$trigger.on('singleTap', function (e) {
					// singleTap需要验证
					if (self.checkTapTime(e, 'img') === false) {
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