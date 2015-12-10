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

			var type = e.type.toLowerCase();
			var currentElem;
			var $currentElem;
			var result = true;

			if (type.indexOf('tap') < 0) {
				// 只针对 tap，其他的不管
				return result;
			}

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
// 自定义alert
window.___E_mod(function (E, $) {


});
// 初始化静态配置文件
window.___E_mod(function (E, $) {

	// 全局配置
	E.config = {
		
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
			'happy',
			'check'
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

		// 上传文件的超时时间（默认 10s）
		uploadTimeout: 10 * 1000,

		// 测试地址（在测试地址，编辑器会主动输出一些console.log信息）
		testHostname: 'localhost',

		// 通过 openBtn 打开菜单之后，N次不执行command就自动隐藏
		tapNumForHideMenu: 3
	};
	
});
// 初始化对象配置
window.___E_mod(function (E, $) {

	E.fn.initDefaultConfig = function () {
		var self = this;
		var globalConfig = E.config;
		// 从全局配置拷贝到对象配置
		var objConfig = $.extend({}, globalConfig);
		
		// 赋值到对象中
		self.config = objConfig;
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
		var $menuContainerTip = $('<div class="tip tip-top"></div>');  // 三角形
		var $menuContainerTip1 = $('<div class="tip tip-bottom"></div>');  // 三角形
		// var $menuCloseContainer = $('<div class="close"></div>');
		// var $menuClose = $('<a href="#"></a>');

		// 增加小三角 tip
		$menuContainer.append($menuContainerTip)
					  .append($menuContainerTip1);

		// 增加关闭按钮
		// $menuClose.append($('<i class="icon-wangEditor-m-close"></i>'));
		// $menuCloseContainer.append($menuClose);
		// $menuContainer.append($menuCloseContainer);

		// 菜单项的容器
		$menuContainer.append($menuItemContainer);

		// -------- menus container 打开按钮
		var $menuContainerOpenBtn = $('<div class="wangEditor-mobile-menu-container-open-btn"  contentEditable="false"></div>');
		var $menuContainerOpenBtnItemContaier = $('<div class="item-container"> <div class="item"><div><i class="icon-wangEditor-m-ellipsis-h"></i></div></div> </div>');
		$menuContainerOpenBtn.append($menuContainerOpenBtnItemContaier);
		$menuContainerOpenBtn.append($menuContainerTip.clone())
							 .append($menuContainerTip1.clone());

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
			$trigger: $('<div><i class="icon-wangEditor-m-bold"></i></div>'),
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

					// 当前不是 list 状态，直接执行
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
// 上传图片
window.___E_mod(function (E, $) {
	E.fn.addMenuImg = function (menuId) {
		var self = this;
		var $body = self.$body;
		var $txt = self.$txt;
		var menus = self.menus;
		var config = self.config;
		var uploadImgUrl = config.uploadImgUrl || '';
		var testHostname = config.testHostname || 'localhost';
		var idDebugger = testHostname === location.hostname;
		var agent = window.navigator.userAgent;
		var timeout = config.uploadTimeout || 10000;

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
			$trigger: $('<div><i class="icon-wangEditor-m-picture"></i></div>'),
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
							prveImgId = 'img' + Math.random().toString().slice(2),
							xhr,
							formData,
							timeoutId;

						if (uploadImgUrl === '') {
							return;
						}

						// ---------- 显示预览 ----------
						prevImgSrc =  window.URL.createObjectURL(file);
						// 生成预览图片，设置半透明（半透明先暂时不要）
						$focusElem.after('<img id="' + prveImgId + '" src="' + prevImgSrc + '" style="opacity:1; max-width:100%;"/>');
						log('生成预览图片，src是：' + prevImgSrc);

						// ---------- 上传到服务器 ----------
						xhr = new XMLHttpRequest();
			            formData = new FormData();

			            // 访问超时
			            function timeoutCallback() {
			            	log('访问超时（配置的超时事件是：'+ timeout +'）');

			            	var $prevImg = $('#' + prveImgId);
			            	$prevImg.remove();
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
			            	var $prevImg = $('#' + prveImgId);
			            	var loadImg;

			            	log('服务器端的返回数据为：' + resultSrc);

			            	// 返回数据错误
			            	if (resultSrc.indexOf('error|') === 0) {
			            		erroInfo = resultSrc.split('|')[1];
			            		log('很遗憾，后台返回error，错误信息为：' + erroInfo);
			            		
			            		// 提示错误
			            		alert('上传图片错误: \n' + erroInfo);

			            		// 移除预览图片
			            		$prevImg.remove();

			            	} else {
			            		// 返回正确的图片地址

			            		log('请确认以上图片是否有效，无效将无法显示在页面中');
			            		log('准备下载该图片...');
			            		
			            		// 下载图片，下载完成后赋值到编辑器中
			            		
			            		loadImg = document.createElement('img');
			            		loadImg.src = resultSrc;
			            		loadImg.onload = function () {
			            			log('下载完成，正式呈现在编辑区域');
			            			$prevImg.attr('src', resultSrc);
			            			$prevImg.css({'opacity': '1'});
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

			if ($target.get(0).nodeName === 'IMG') {
				// 点击图片时，隐藏菜单，返回
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

			var explicitOriginalTarget = e.explicitOriginalTarget;
			if (menuContainer.contains(explicitOriginalTarget) || menuContainerOpenBtn.contains(explicitOriginalTarget)) {
				// firefox 中，点击菜单会导致 $txt blur
				// e.explicitOriginalTarget 有值，并且包含在菜单容器中，证明是 ff 点击菜单所致的 blur
				
				e.preventDefault();
				return;

			} else {
				// 其他浏览器，点击菜单，都不会出现 blur 的情况
				// 这是正常情况下的 blur

				// 存储源码代码
				self.saveSourceCode();

				// 隐藏菜单 fn
				self.hideMenuContainer();
			}
		});

		// // 阻止 click 事件，防止 tap 点透
		// $txt.on('click', function (e) {
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// });
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
		$menuContainerOpenBtn.on('singleTap', function (e) {
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

	var positionFirst = true;  // 第一次计算位置
	var firstTop = 0;
	// -------------------计算菜单的位置，显示菜单-------------------
	E.fn.setMenuContainerPosition = function () {
		var self = this;

		// 目标元素
		var $targetElem = self.eventTarget();
		// 编辑区域
		var $txt = self.$txt;
		// 菜单
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;

		// 获取tap事件中target元素的位置和尺寸
		var targetElemOffset = $targetElem.offset();
		var targetElemTop = targetElemOffset.top;
		var targetElemHeight = targetElemOffset.height;

		// 获取编辑区域 $txt 的位置和尺寸
		var scrollTop = $txt.get(0).scrollTop;
		var txtOffset = $txt.offset();
		var txtTop = txtOffset.top;
		var txtHeight = txtOffset.height;
		var txtLeft = txtOffset.left;

		// 获取目标元素下方的位置
		var targetElemBottom = targetElemTop + targetElemHeight;
		// 获取 $txt 下方的位置
		var txtBottom = txtTop + txtHeight;

		// 用于存储最后的结果
		var top = 0;
		var style = {};

		if (txtBottom - targetElemBottom >= 60) {
			// 如果目标元素距离编辑区域下方的距离大于60，菜单显示在下方

			// 显示上方的 tip
			self.showTipTop();

			// 设置top
			top = targetElemBottom - txtTop + scrollTop;
			// 下移 10px
			top  = top + 10;


		} else {
			// 如果目标元素距离编辑区域下方的距离小于60，菜单显示在上方

			// 显示下方的 tip
			self.showTipBottom();

			// 设置top
			top = targetElemTop - txtTop + scrollTop;
			// 上移 50px
			top = top - 50;
		}

		// 如果 top 小于 0，则修改为 0（小于0说明隐藏在上方了）
		if (top < scrollTop) {
			top = scrollTop;
		}

		if (positionFirst) {
			// 第一次计算位置，直接设置样式
			style = {
				top: top + 'px',
				left: '3px'
			};

			// 将当前的top存储下来
			firstTop = top;

			positionFirst = false;
		} else {
			// 之后计算位置，通过margin解决（有动画效果）
			style = {
				'margin-top': (top - firstTop) + 'px'
			};
		}

		// 设置菜单的样式，定位
		$menuContainer.css(style); 
		$menuContainerOpenBtn.css(style);

		// 显示menucontainer
		self.showMenuContainer();
	};


	var menuContainerTip = 'top';  // 记录tip状态。默认为 top
	// -------------------显示上面的tip三角-------------------
	E.fn.showTipTop = function () {
		if (menuContainerTip === 'top') {
			return;
		}

		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;

		$menuContainer.removeClass('wangEditor-mobile-menu-container1')
					  .addClass('wangEditor-mobile-menu-container');
		$menuContainerOpenBtn.removeClass('wangEditor-mobile-menu-container-open-btn1')
							 .addClass('wangEditor-mobile-menu-container-open-btn');
		
		// 记录状态
		menuContainerTip = 'top';
	};
	// -------------------显示下面的tip三角-------------------
	E.fn.showTipBottom = function () {
		if (menuContainerTip === 'bottom') {
			return;
		}
		
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $menuContainerOpenBtn = self.$menuContainerOpenBtn;

		$menuContainer.removeClass('wangEditor-mobile-menu-container')
					  .addClass('wangEditor-mobile-menu-container1');
		$menuContainerOpenBtn.removeClass('wangEditor-mobile-menu-container-open-btn')
							 .addClass('wangEditor-mobile-menu-container-open-btn1');
		
		// 记录状态
		menuContainerTip = 'bottom';
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