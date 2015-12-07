// 扩展后续的js模块
(function (window) {

	// 注意：3个下划线
	window.___E_mod = function (fn) {
		var E = window.___E;
		if (E == null) {
			// 说明一开始的验证没有通过，直接返回即可
			return;
		}

		// 执行传入的 fn 函数
		fn(E, window.Zepto);
	};


})(window);
// 检测各个支持项是否存在
(function (window) {

	var $ = window.Zepto,
		E = window.___E,
		gitlink = 'github.com/wangfupeng1988/wangEditor-mobile';

	// 验证是否重复引用
	if(E != null) {
		if (E.gitlink === gitlink) {
			// 重复引用，提示，并退出
			alert('不得重复引用wangEditor的js文件');
			return;
		}
		if (!E.gitlink || E.gitlink !== gitlink) {
			// 属性名已被占用
			alert('window.___E 属性名已经被其他程序占用。wangEditor-mobile引用失败');
			return;
		}
	}

	// 验证 zepto 是否引用
	if ($ == null) {
		alert('wangEditor-mobile依赖于zepto，请先引用zepto.js');
		return;
	}

	// 验证浏览器对range的支持
	if (!document.createRange || typeof  document.createRange !== 'function') {
		alert('当前浏览器不支持document.createRange，不能生成富文本编辑器');
		return;
	}

})(window);
// 构造函数
(function (window, $){

	// 标记
	var gitlink = 'github.com/wangfupeng1988/wangEditor-mobile';

	// 定义构造函数
	var E = function (textareaId) {
		var self = this;

		self.$body = $('body');

		// textarea
		var $textarea = $('#' + textareaId);
		self.$textarea = $textarea;

		// 记录每一个tap事件的时间，防止短时间内重复tap
		self.checkTapTime = function (e, info) {
			//E.log('checkTapTime', info);

			var currentElem;
			var $currentElem;
			var result = true;

			if (e) {
				// 传入 event 对象，则为每个event对象分配事件
				currentElem = e.currentTarget || e.target;
				$currentElem = $(currentElem);
			} else {
				// 未传入，则都用body
				$currentElem = self.$body;
			}

			if ($currentElem.data('tapTime') == null) {
				// 第一次，直接通过
				$currentElem.data('tapTime', Date.now().toString());
				result = true;
			} else {
				if (Date.now() - parseInt($currentElem.data('tapTime')) < 100) {
					// 如果当前时间和上一次tapTime相差 **ms 之内，
					// 则视为无效，并阻止冒泡和默认行为
					e.preventDefault();
					e.stopPropagation();
					result = false;
				} else {
					// 否则就继续并更新tapTime
					$currentElem.data('tapTime', Date.now().toString());
					result = true;
				}
			}

			return result;
		};

		// ---------接下来即初始化各个组件配置----------

		// 初始化编辑器对象的默认配置
		self.initDefaultConfig();

		// 初始化编辑区域的配置
		self.addTxt();

		// 初始化菜单配置
		self.addMenus();
	};

	// 原型 alias
	E.fn = E.prototype;

	// 做一个标记，用来判断是否重复引用
	E.fn.gitlink = gitlink;

	// console.log 函数
	E.log = function (a, b) {
		if (window.console) {
			if (b) { console.log(a, b); } else { console.log(a); }
		} else {
			alert(a);
			if (b) { alert(b); }
		}
	};
	// console.warn 函数
	E.warn = function (a, b) {
		if (window.console) {
			if (b) { console.warn(a, b); } else { console.warn(a); }
		} else {
			alert(a);
			if (b) { alert(b); }
		}
	};

	// 暴露全局函数
	window.___E = E;

})(window, window.Zepto);
// 初始化静态配置文件
window.___E_mod(function (E, $) {

	E.config = {};
	
});
// 初始化对象配置
window.___E_mod(function (E, $) {

	E.fn.initDefaultConfig = function () {
		var self = this;

		self.config = {
			
			// 菜单栏中的 color 按钮点击时的颜色值（即css中的颜色值）
			menuColorValue: 'red',

			// 菜单栏中的 quote 按钮点击时的样式
			menuQuoteStyle: {
				'display': 'block',
				'border-left': '5px solid #d0e5f2',
				'padding': '4px 0 4px 10px',
				'background-color': '#f1f1f1',
				'margin': '4px 0'
			},

			// 菜单配置
			menus: [
				'head',
				'bold',
				'color',
				'quote',
				'list',
				'img',
				'happy'//,
				//'check'
			],

			// 表情图标配置
			happy: [
				'http://wangeditor.github.io/expressions/1.gif',
				'http://wangeditor.github.io/expressions/2.gif',
				'http://wangeditor.github.io/expressions/3.gif',
				'http://wangeditor.github.io/expressions/4.gif',
				'http://wangeditor.github.io/expressions/5.gif',
				'http://wangeditor.github.io/expressions/6.gif',
				'http://wangeditor.github.io/expressions/7.gif',
				'http://wangeditor.github.io/expressions/8.gif',
				'http://wangeditor.github.io/expressions/9.gif',
				'http://wangeditor.github.io/expressions/10.gif',
				'http://wangeditor.github.io/expressions/11.gif',
				'http://wangeditor.github.io/expressions/12.gif',
				'http://wangeditor.github.io/expressions/13.gif',
				'http://wangeditor.github.io/expressions/14.gif',
				'http://wangeditor.github.io/expressions/15.gif',
				'http://wangeditor.github.io/expressions/16.gif',
				'http://wangeditor.github.io/expressions/17.gif',
				'http://wangeditor.github.io/expressions/18.gif',
				'http://wangeditor.github.io/expressions/19.gif',
				'http://wangeditor.github.io/expressions/20.gif'
			],

			// 上传图片
			uploadImgUrl: '/upload',

			// 测试地址（在测试地址，编辑器会主动输出一些console.log信息）
			testHostname: 'localhost',

			// 通过 openBtn 打开菜单之后，N次不执行command就自动隐藏
			tapNumForHideMenu: 3
		};
		
	};
	
});
// 初始化编辑区域的数据对象
window.___E_mod(function (E, $) {

	E.fn.addTxt = function () {
		var self = this;
		var $textarea = self.$textarea;
		var val = $.trim($textarea.val());

		// 编辑区域（将textarea的值，直接复制过来）
		var $txt = $(
			'<div contentEditable="true" class="wangEditor-mobile-txt">' + 
			val + 
			'</div>'
		);

		// modal container
		var $modalContainer = $('<div class="wangEditor-mobile-modal-container"></div>');

		// 记录到对象中
		self.$txt = $txt;
		self.$modalContainer = $modalContainer;

		// 最后插入一个空行
		self.insertEmpltyLink();
	};
	
});
// 增加自带的菜单数据对象
window.___E_mod(function (E, $) {

	E.fn.addMenus = function () {
		var self = this;

		// ------------- menus container  
		var $menuContainer = $('<div class="wangEditor-mobile-menu-container" contentEditable="false"></div>');
		var $menuItemContainer = $('<div class="item-container"></div>');
		var $menuContainerTip = $('<div class="tip"></div>');  // 三角形
		// var $menuCloseContainer = $('<div class="close"></div>');
		// var $menuClose = $('<a href="#"></a>');

		// 增加小三角 tip
		$menuContainer.append($menuContainerTip);

		// 增加关闭按钮
		// $menuClose.append($('<i class="icon-wangEditor-m-close"></i>'));
		// $menuCloseContainer.append($menuClose);
		// $menuContainer.append($menuCloseContainer);

		// 菜单项的容器
		$menuContainer.append($menuItemContainer);

		// -------- menus container 打开按钮
		var $menuContainerOpenBtn = $('<div class="wangEditor-mobile-menu-container-open-btn"  contentEditable="false"></div>');
		var $menuContainerOpenBtnItemContaier = $('<div class="item-container"> <div class="item"><a href="#"><i class="icon-wangEditor-m-ellipsis-h"></i></a></div> </div>');
		$menuContainerOpenBtn.append($menuContainerOpenBtnItemContaier);
		$menuContainerOpenBtn.append($menuContainerTip.clone());

		// 添加到数据对象
		self.$menuContainer = $menuContainer;
		self.$menuItemContainer = $menuItemContainer;
		self.$menuContainerOpenBtn = $menuContainerOpenBtn;
		// self.$menuClose = $menuClose;

		// ------------- menus 数据集合 ------------- 
		self.menus = {};		
		self.addMenuBold('bold');
		self.addMenuHead('head');
		self.addMenuColor('color');
		self.addMenuQuote('quote');
		self.addMenuList('list');
		self.addMenuCheck('check');
		self.addMenuHappy('happy');
		self.addMenuImg('img');
	};

});
// bold
window.___E_mod(function (E, $) {

	E.fn.addMenuBold = function (menuId) {
		var self = this;
		var menus = self.menus;

		menus[menuId] = {

			// 是否处于选中状态
			selected: false,

			// 触发器
			$trigger: $('<a href="#"><i class="icon-wangEditor-m-bold"></i></a>'),
			// 包裹触发器的容器
			$wrap: $('<div class="item"></div>'),

			// 绑定触发器事件
			bindEvent: function (editor) {
				var menuData = this;
				menuData.$trigger.on('singleTap', function (e) {
					if (self.checkTapTime(e, 'bold') === false) {
						return;
					}

					self.command('bold', false, undefined, e);

				});
			},

			// 更新样式
			updateStyle: function (editor) {
				var menuData = this;
				var $trigger = menuData.$trigger;

				if ( document.queryCommandState('bold') ) {
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
// head
window.___E_mod(function (E, $) {

	E.fn.addMenuHead = function (menuId) {
		var self = this;
		var menus = self.menus;

		menus[menuId] = {
			// 是否处于选中状态
			selected: false,

			// 触发器
			$trigger: $('<a href="#"><i class="icon-wangEditor-m-header"></i></a>'),
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
			$trigger: $('<a href="#"><i class="icon-wangEditor-m-brush"></i></a>'),
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
			$trigger: $('<a href="#"><i class="icon-wangEditor-m-quote-left"></i></a>'),
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
// list
window.___E_mod(function (E, $) {

	E.fn.addMenuList = function (menuId) {
		var self = this;
		var menus = self.menus;

		menus[menuId] = {
			// 是否处于选中状态
			selected: false,

			// 触发器
			$trigger: $('<a href="#"><i class="icon-wangEditor-m-list-ul"></i></a>'),
			// 包裹触发器的容器
			$wrap: $('<div class="item"></div>'),

			// 绑定触发器事件
			bindEvent: function (editor) {
				var menuData = this;
				menuData.$trigger.on('singleTap', function (e) {
					if (self.checkTapTime(e, 'list') === false) {
						return;
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
// check
window.___E_mod(function (E, $) {

	E.fn.addMenuCheck = function (menuId) {
		var self = this;
		var menus = self.menus;

		menus[menuId] = {
			// 是否处于选中状态
			selected: false,

			// 触发器
			$trigger: $('<a href="#"><i class="icon-wangEditor-m-checkbox-checked"></i></a>'),
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
				E.warn('正在使用wangEdior提供的免费表情图标，它们将从 github 下载，速度很慢！！！');
				E.warn('建议将表情图标重新配置，请参见文档说明');
			}
		}

		menus[menuId] = {
			// 选中状态
			selected: false,

			// 触发器
			$trigger: $('<a href="#"><i class="icon-wangEditor-m-happy"></i></a>'),
			// 包裹触发器的容器
			$wrap: $('<div class="item"</div>'),

			// $modal 
			$modal: $('<div class="wangEditor-mobile-modal"></div>'),

			// 渲染 $modal
			renderModal: function () {
				var menuData = this;
				var $modal = menuData.$modal;
				var itemTpl = '<a href="#" class="command-link" commandValue="#{imgUrl}"><img src="#{imgUrl}"/></a>';
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

				// 显示 modal
				menuData.$modal.show();

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
					if (self.checkTapTime(e, 'img') === false) {
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
// 渲染编辑器区域
window.___E_mod(function (E, $) {

	E.fn.renderTxt = function () {
		var self = this;
		var $textarea = self.$textarea;
		var $txt = self.$txt;
		var $modalContainer = self.$modalContainer;
		var $body = self.$body;

		$textarea.after($txt);
		$textarea.hide();

		$body.append($modalContainer);
	};

});
// 渲染菜单栏
window.___E_mod(function (E, $) {

	E.fn.renderMenu = function () {
		var self = this;
		var menus = self.menus;
		var $menuContainer = self.$menuContainer;
		var $menuItemContainer = self.$menuItemContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;
		var $txt = self.$txt;
		var $gap = $('<div class="gap"></div>');
		var $body = self.$body;

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
					$menuItemContainer.append($wrap);
				} else {
					$menuItemContainer.append($trigger);
				}
				
				// 菜单之间的间隙
				// 之所以需要加 clone 是因为 append 由一种『单例移动』的特性！！需注意！！
				$menuItemContainer.append($gap.clone());
			}
		});

		// 删除最后一个间隙（即最后一个子元素）
		$menuItemContainer.children().last().remove();

		// 默认隐藏
		$menuContainer.hide();
		$menuContainerOpenBtn.hide();
		
		// 变量记录菜单容器（或者openbtn）的显示与隐藏
		self.menuDisplayShow = false;
		// $body.append($menuContainer);
		$txt.prepend($menuContainer);

		// 变量记录当前显示的是菜单还是openbtn
		self.showMenu = false;
		// $body.append($menuContainerOpenBtn);
		$txt.prepend($menuContainerOpenBtn);
	};

});
// 绑定document事件
window.___E_mod(function (E, $) {

	E.fn.bindDocumentEvent = function () {
		var $document = $(document);
		var self = this;
		var $txt = self.$txt;
		var srollTime = Date.now();

		// 滚动时隐藏菜单栏
		$document.on('scroll', function (e) {
			// 给滚动事件增加一个时间间隔的限制
			if (Date.now() - srollTime <= 50) {
				return;
			} else {
				srollTime = Date.now();
			}

			// 隐藏菜单
			self.hideMenuContainer();

		});

		// tap时要隐藏菜单
		$document.on('tap', function (e) {
			
			// 隐藏菜单
			// self.hideMenuContainer();

		});
	};

});
// 绑定编辑区域事件
window.___E_mod(function (E, $) {

	E.fn.bindTxtEvent = function () {
		var self = this;
		var $txt = self.$txt;
		var $menuContainer = self.$menuContainer;
		var menuContainer = $menuContainer.get(0);
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;
		var menuContainerOpenBtn = $menuContainerOpenBtn.get(0);
		var srollTime = Date.now();

		// 处理点击 $txt 的选区
		// $txt 的 tap 事件中调用
		function selectionHeadle () {
			var focusElem;
			var $focusElem;

			// 保存选中区域
			self.saveSelection();

			// 获取当前选中的元素，并设置一个高亮样式
			focusElem = self.getWrapRangeElem();
			if (focusElem) {
				$focusElem = $(focusElem);
				// 增加样式
				$focusElem.addClass('focus-elem');
				self.$focusElem = $focusElem;
			}

			// 更新菜单样式
			self.updateMenuStyle();

		} // 处理点击 $txt 的选区

		// tap时，记录选区，并显示菜单
		$txt.on('focus', function () {
			// 记录编辑器区域已经focus
			self.isFocus = true;
		});
		$txt.on('singleTap', function (e) {
			if (self.checkTapTime(e, '$txt') === false) {
				return;
			}

			// 如果当前不是focus状态，则返回
			if (!self.isFocus) {
				return;
			}

			// 获取 target 并保存
			var $target = $(e.target);
			self.eventTarget($target);

			if ($target.hasClass('focus-elem')) {
				// 如果当前点击的就是上一次点击的元素，则隐藏菜单栏，返回
				self.hideMenuContainer();
				return;
			}

			if ($target.hasClass('wangEditor-mobile-txt')) {
				// 如果当前选中的编辑区域，则隐藏菜单，返回
				self.hideMenuContainer();
				return;
			}

			// 计算点击次数（N次不command即隐藏菜单为 openBtn 形式）
			self.setTapNumForHideMenu('tap');

			// 根据点击的位置，对菜单栏进行定位
			self.setMenuContainerPosition();

			// 如果有上一次选中的元素，则清除样式
			var $focusElem = self.$focusElem;
			if ($focusElem) {
				$focusElem.removeClass('focus-elem');
			}
			
			// 等待 xxx ms    处理点击 $txt 的选区
			setTimeout(selectionHeadle, self.txtTapDelay);
			self.txtTapDelay = 100;

			// 最后，阻止冒泡，阻止document接收到（document的tap事件要隐藏菜单）
			e.stopPropagation();
		});

		// 滚动时隐藏菜单栏
		$txt.on('scroll', function (e) {

			// 给滚动事件增加一个时间间隔的限制
			if (Date.now() - srollTime <= 50) {
				return;
			} else {
				srollTime = Date.now();
			}

			// 隐藏菜单
			self.hideMenuContainer();

			// 阻止冒泡
			e.stopPropagation();
		});

		// 打字时隐藏菜单栏
		$txt.on('keydown', function (e) {
			// 隐藏菜单
			self.hideMenuContainer();
		});

		// longtap doubletap 隐藏菜单
		$txt.on('longTap, doubleTap', function () {
			// 隐藏菜单
			self.hideMenuContainer();
		});

		// blur时，隐藏菜单栏
		// 存储源代码
		$txt.on('blur', function (e) {

			// 记录编辑区域已经 blur
			self.isFocus = false;

			// -----------兼容 android begin-----------
			// 在部分安卓浏览器中，点击menucontainer相关的按钮
			// 会先触发 blur 然后再触发自己的tap
			// 这里做一步判断

			var focusTxtFn = self.focusTxt;

			var explicitOriginalTarget = e.explicitOriginalTarget;
			if (menuContainer.contains(explicitOriginalTarget) || menuContainerOpenBtn.contains(explicitOriginalTarget)) {
				// firefox 中，
				// e.explicitOriginalTarget 包含再菜单容器中，说明
				// 是由菜单容器的按钮点击触发的该事件
				setTimeout(focusTxtFn.call(self), 300);
				e.preventDefault();
				return;
			}

			var relatedTarget = e.relatedTarget;
			if (relatedTarget != null) {
				// chrome中
				// e.relatedTarget != null 说明是
				// 点击menucontainer相关的按钮触发的，阻止并返回
				setTimeout(focusTxtFn.call(self), 300);
				e.preventDefault();
				return;
			}

			// -----------兼容 android begin-----------

			// 存储源码代码
			self.saveSourceCode();

			// 隐藏菜单 fn
			self.hideMenuContainer();
			
		});

		// 阻止 click 事件，防止 tap 点透
		$txt.on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
	};

});
// 绑定菜单容器事件
window.___E_mod(function (E, $) {

	// ----------------- 绑定menucontiner事件
	E.fn.bindMenuContainerEvent = function () {
		
		// tap时focus $text
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuClose = self.$menuClose;

		//tap时，阻止冒泡，因为上层的 $txt 会监测 tap 事件
		$menuContainer.on('tap', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});

		// 绑定 menucontainer 右上角的关闭按钮事件
		if ($menuClose != null) {
			$menuClose.on('singleTap', function (e) {
				if (self.checkTapTime(e, '$menuClose') === false) {
					return;
				}

				// 显示菜单（下次显示openBtn）
				self.hideMenuByOpenBtn();

				// 阻止冒泡
				e.preventDefault();
				e.stopPropagation();
			});
		}
	};

	// ----------------- 绑定 menucontainer openbtn 的事件
	E.fn.bindMenuContainerOpenBtnEvent = function () {
		var self = this;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;
		var $menuContainer = self.$menuContainer;

		// 点击 openbtn 显示菜单
		$menuContainerOpenBtn.find('a').on('singleTap', function (e) {
			if (self.checkTapTime(e, '$menuContainerOpenBtn') === false) {
				return;
			}

			// openBtn显示菜单
			self.showMenuByOpenBtn();

			// 阻止冒泡
			e.preventDefault();
			e.stopPropagation();
		});
	};

});
// 绑定菜单按钮的事件
window.___E_mod(function (E, $) {

	E.fn.bindMenuBtnEvent = function () {
		var self = this;
		var menus = self.menus;


		// 遍历菜单配置项，执行bindEvent事件
		$.each(menus, function (key, menu) {
			var bindEvent = menu.bindEvent;
			if (bindEvent && typeof bindEvent === 'function') {
				bindEvent.call(menu, self);
			}
		});
	};

});
// $txt api
window.___E_mod(function (E, $) {

	// focus API
	E.fn.focusTxt = function () {
		var self = this;
		var $txt = self.$txt;

		if (!self.isFocus) {
			$txt.focus();
		}
	};

	// 保存、获取 $txt tap时event对象的target元素
	E.fn.eventTarget = function ($elem) {
		var self = this;
		if ($elem == null) {
			return self.$eventTargetElem;
		} else {
			self.$eventTargetElem = $elem;
		}
	};

	// 保存源代码
	E.fn.saveSourceCode = function () {
		var self = this;
		var $txt = self.$txt;
		var $textarea = self.$textarea;
		var sourceCode = '';

		var $txtClone = $txt.clone();
		var $focusElem1 = $txtClone.find('.focus-elem');

		// 如果 menuContainer 和 menuContainerOpenBtn 都在编辑区域内
		// 则保存源码时要注意踢出这两个！！

		// 将当前的 $focusElem 清除样式
		$focusElem1.removeClass('focus-elem');

		// 获取源码
		sourceCode = $txtClone.html();
		$textarea.val(sourceCode);
	};

	// 在编辑区域最后插入空行
	E.fn.insertEmpltyLink = function () {
		var self = this;
		var $txt = self.$txt;
		var $children = $txt.children();

		if ($children.length === 0) {
			$txt.append($('<p><br></p>'));
			return;
		}

		if ($children.last().html() !== '<br>') {
			$txt.append($('<p><br></p>'));
		}
	};

	// 记录编辑器的点击次数
	E.fn.setTapNumForHideMenu = function (type) {
		// type: 'tap' / 'command'
		
		var self = this;
		var currentNum = self.tapNumForHideMenu;
		var configNum = self.config.tapNumForHideMenu;

		if (currentNum == null) {
			return;
		}
		// self.tapNumForHideMenu 将再 openBtn 显示菜单时，赋值为 0
		
		if (type === 'tap') {
			self.tapNumForHideMenu = currentNum + 1;

			if (currentNum >= configNum) {
				// 超出了界限，就执行 openBtn 隐藏菜单，取消计数
				// 此时将 self.tapNumForHideMenu 的值赋值为 null
				self.hideMenuByOpenBtn();
			}
		} else if (type === 'command') {
			self.tapNumForHideMenu = currentNum - 1;
		}
	};

});
// menucontainer api
window.___E_mod(function (E, $) {

	// -------------------显示菜单-------------------
	E.fn.setMenuContainerPosition = function () {
		var self = this;
		var $targetElem = self.eventTarget();
		
		// 获取tap事件中target元素的位置和尺寸
		var targetElemOffset = $targetElem.offset();
		var targetElemTop = targetElemOffset.top;
		var targetElemHeight = targetElemOffset.height;

		// 获取目标元素最下方的位置
		var y = targetElemTop + targetElemHeight;

		// 获取编辑区域 $txt 的位置和尺寸
		var $txt = self.$txt;
		var txtOffset = $txt.offset();
		var txtTop = txtOffset.top;
		var txtLeft = txtOffset.left;
		var txtHeight = txtOffset.height;

		// 如果超出了 $txt 的范围，则限制一下 y 的大小，限制在 $txt 最底部
		if (y > txtTop + txtHeight) {
			y = txtTop + txtHeight - 10;
		}
		

		// 获取编辑区域 $txt 的最后一个子元素（如果没有就强行加一个空行）
		var $children = $txt.children();
		var $lastChild;
		if ($children.length === 0) {
			$lastChild = $('<p><br></p>');
			$txt.append($lastChild);
		} else {
			$lastChild = $children.last();
		}
		// 获取最后一个子元素的尺寸和位置
		var lastChildOffset = $lastChild.offset();
		var lastChildTop = lastChildOffset.top;
		var lastChildHeight = lastChildOffset.height;

		// 菜单容器
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;

		// top 先默认为手指点击的y值
		var top = y;
		if (top > lastChildTop + lastChildHeight) {
			// 如果手指点击的地方在 $txt 最后一个子元素的下方，
			// 则将 top 值定义为 $txt 最后一个子元素的最底部
			top = lastChildTop + lastChildHeight;
		}

		// 其他样式的结果值
		var left = txtLeft + 1;
		var marginTop = 20;
		var style = {
			'top': top + 'px',
			'left': left + 'px',
			'margin-top': marginTop + 'px'
		};

		// 定位
		$menuContainer.css(style); 
		$menuContainerOpenBtn.css(style);

		// 显示menucontainer
		self.showMenuContainer();
	};

	// -------------------显示菜单-------------------
	E.fn.showMenuContainer = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;

		if (self.menuDisplayShow === false) {
			if (self.showMenu) {
				// 要显示的是菜单容器，而非 openbtn

				$menuContainer.show();
				$menuContainer.css('opacity', '0.9');   // 此处要动画效果
			} else {
				$menuContainerOpenBtn.show();
				$menuContainerOpenBtn.css('opacity', '0.6');
			}

			// 记录状态
			self.menuDisplayShow = true;
		}
	};

	// -------------------隐藏菜单-------------------
	E.fn.hideMenuContainer = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;
		var $txt = self.$txt;
		
		var $focusElem = self.$focusElem;
		var $otherFocusElem = $txt.find('.focus-elem'); // 得重新查找，可能发生变化

		if (self.menuDisplayShow) {
			$menuContainerOpenBtn.hide();
			$menuContainerOpenBtn.css('opacity', '0');

			$menuContainer.hide();
			// 此处隐藏之后，在设置透明度。不要动画效果了，效果不好
			$menuContainer.css('opacity', '0');

			// 记录状态
			self.menuDisplayShow = false;

			// 隐藏 focuselem
			if ($focusElem) {
				$focusElem.removeClass('focus-elem');
				$otherFocusElem.removeClass('focus-elem');
			}
		}
	};

	// -------------------通过openbtn显示菜单-------------------
	E.fn.showMenuByOpenBtn = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;

		// 记录状态
		self.showMenu = true;
			
		$menuContainer.show();
		$menuContainer.css('opacity', '0.9');

		$menuContainerOpenBtn.hide();
		$menuContainerOpenBtn.css('opacity', '0');

		// 开始点击次数的记录
		self.tapNumForHideMenu = 0;
	};

	// -------------------通过openbtn隐藏菜单-------------------
	E.fn.hideMenuByOpenBtn = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;
		
		// 记录状态
		self.showMenu = false;
		
		// 直接调用隐藏menucontainer的方法即可
		self.hideMenuContainer();

		// 取消点击次数的记录
		self.tapNumForHideMenu = null;
	};
});
// menus api
window.___E_mod(function (E, $) {
	
	// 更新菜单样式
	E.fn.updateMenuStyle = function () {
		var self = this;
		var menus = self.menus;

		// 遍历所有菜单，更新他们的样式
		$.each(menus, function (key, menu) {
			var fn = menu.updateStyle;
			if (fn) {
				fn.call(menu);
			}
		});
	};

});
// 编辑器的命令事件
window.___E_mod(function (E, $) {

	// 符合这个正则表达式的命令，恢复选区时，不要恢复外围选区（如插入图片）
	var regRestoreNoWrapSelection = /insertimage/i;

	// 传统事件
	E.fn.command = function (commandName, bool, commandValue, e, callback) {
		var self = this;

		// 验证该命令是否不能恢复外围选区，将传入到 customCommand 中
		var regResult = regRestoreNoWrapSelection.test(commandName);

		var fn = function () {
			document.execCommand(commandName, !!bool, commandValue);
		};

		// 执行事件
		self.customCommand(regResult, fn, e, callback);
	};

	// 自定义事件
	E.fn.customCommand = function (isRestoreNoWrapSelection, fn, e, callback) {
		var self = this;
		var currentRange = self.currentRange();
		var currentWrapRange = self.currentWrapRange();
		var $txt = self.$txt;

		/*
			isRestoreNoWrapSelection 参数的作用：
			1. 有些 command 是需要选中整个外围选区再进行操作的，一般是修改样式，例如加粗。
			   针对加粗这种样式操作，如果不默认选中一个选区，是看不到任何效果的。
			2. 但是有些 command 一定不能选中外围选区，一般是插入操作，例如插入图片。
			   如果选中了一段区域，再执行插入图片，插入图片之后，刚才的那段选区就没有了。

			因此，isRestoreNoWrapSelection 的作用就是来判断，是否要选中外围选区。
		*/
		if (isRestoreNoWrapSelection) {
			// 恢复选区（非整个外围选区）
			self.restoreSelection(currentRange);
		} else {
			// 恢复选区（整个外围选区）
			self.restoreSelection(currentWrapRange);
		}

		// 执行命令
		fn();

		// 如果 $txt 最后没有空行，则增加一个
		self.insertEmpltyLink();

		// 重新保存选区，因为部分浏览器会自动清空选区
		self.saveSelection();

		// 恢复选区（非外围选区）
		self.restoreSelection(currentRange);

		// 阻止默认行为，阻止冒泡
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		// 回调函数
		if (callback) {
			callback.call(self);
		}

		// 隐藏菜单栏
		self.hideMenuContainer();

		// 计算点击次数（N次不command即隐藏菜单为 openBtn 形式）
		self.setTapNumForHideMenu('command');
	};
});
// range selection 的相关操作
window.___E_mod(function (E, $) {

	// 设置或读取当前的range
	E.fn.currentRange = function (cr){
		if (cr) {
			this.currentRangeData = cr;
		} else {
			return this.currentRangeData;
		}
	};

	// 设置或读取当前range的wrapRange
	E.fn.currentWrapRange = function (cwr){
		if (cwr) {
			this.currentWrapRangeData = cwr;
		} else {
			return this.currentWrapRangeData;
		}
	};

	// 获取 wrapRange 的元素（不能是text类型） 
	E.fn.getWrapRangeElem = function () {
		var self = this;
		var $txt = self.$txt;
		var txtClass = $txt.attr('class');     // 获取编辑区域的class

		var wrapRange = this.currentWrapRange();
		var elem;
		var resultElem;

		var eventTargetElem = self.eventTarget().get(0);

		if (wrapRange == null) {
			return;
		}

		// 获取 range 的包含元素
		elem = wrapRange.commonAncestorContainer;

		if (elem.nodeType === 3) {
			// text类型，获取父元素
			resultElem = elem.parentNode;
		} else {
			// 不是 text 类型
			resultElem = elem;
		}

		// 判断 resultElem 是不是 $txt （通过 class 判断）
		if (resultElem.className === txtClass) {
			// 如果 resultElem 正好是 $txt
			// 则将 resultElem 试图设置为 $txt 最后一个子元素
			resultElem = $txt.children().last().get(0) || resultElem;
		}

		// 返回
		return resultElem;
	};

	// 保存选择区域
	E.fn.saveSelection = function (range) {
		var self = this,
			_parentElem,
			selection,
			wrapRange,
			txt = self.$txt.get(0);

		if (range) {
			_parentElem = range.commonAncestorContainer;
		} else {
			selection = document.getSelection();
            if (selection.getRangeAt && selection.rangeCount) {
                range = document.getSelection().getRangeAt(0);
                _parentElem = range.commonAncestorContainer;
            }
		}

		// 确定父元素一定要包含在编辑器区域内
		if (_parentElem && (txt.contains(_parentElem) || txt === _parentElem) ) {

			// 保存选择区域
			self.currentRange(range);

			// 保存 wrapRange
			wrapRange = document.getSelection().getRangeAt(0);
			wrapRange.selectNodeContents(_parentElem);
			self.currentWrapRange(wrapRange);
		}
	};

	// 恢复选中区域
	E.fn.restoreSelection = function (range){
		var selection;

		if (!range) {
			return;
		}

		selection = document.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
	};

});
// editor API 对外开放的接口
window.___E_mod(function (E, $) {

	

});
// 初始化编辑器对象
window.___E_mod(function (E, $) {

	E.fn.init = function () {
		var self = this;

		// 渲染编辑区域 
		self.renderTxt();

		// 渲染菜单栏 
		self.renderMenu();

		// 绑定事件
		self.bindDocumentEvent();
		self.bindTxtEvent();
		self.bindMenuBtnEvent();
		self.bindMenuContainerEvent();
		self.bindMenuContainerOpenBtnEvent();
	};

});