// 扩展后续的js模块
(function (window) {

	// 注意：3个下划线
	window.___extendJS = function (fn) {
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

		// textarea
		var $textarea = $('#' + textareaId);
		self.$textarea = $textarea;

		// tapTime将记录每一个tap事件的时间，防止短时间内重复tap
		self.tapTime = Date.now();
		self.checkTapTime = function () {
			// 如果当前时间和上一次tapTime相差50ms之内，则忽略
			// 否则就继续并更新tapTime
			if (Date.now() - self.tapTime < 50) {
				return false;
			} else {
				self.tapTime = Date.now();
				return true;
			}
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
			if (b) {
				console.log(a, b);
			} else {
				console.log(a);
			}
		} else {
			alert(a);

			if (b) {
				alert(b);
			}
		}
	};

	// 暴露全局函数
	window.___E = E;

})(window, window.Zepto);
// 初始化静态配置文件
window.___extendJS(function (E, $) {

	E.config = {};
	
});
// 初始化对象配置
window.___extendJS(function (E, $) {

	E.fn.initDefaultConfig = function () {
		var self = this;

		self.config = {
			
			// 菜单栏中的 color 按钮点击时的颜色值
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
				'check'
			]
		};
		
	};
	
});
// 初始化编辑区域的数据对象
window.___extendJS(function (E, $) {

	E.fn.addTxt = function () {
		var self = this;
		var $textarea = self.$textarea;
		var val = $.trim($textarea.val());

		// $txt 一定要有内容，否则 menuContainer 定位有问题
		if (!val) {
			val = '<p><br></p>';
		}

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
	};
	
});
// 增加自带的菜单数据对象
window.___extendJS(function (E, $) {

	E.fn.addMenus = function () {
		var self = this;
		var menus;

		// ------------- menus container ------------- 
		var $menuContainer = $('<div contentEditable="false" class="wangEditor-mobile-menu-container"></div>');
		var $menuContainerTip = $('<div class="tip"></div>');  // 三角形
		$menuContainer.append($menuContainerTip);

		self.$menuContainer = $menuContainer;
		self.$menuContainerTip = $menuContainerTip;

		// ------------- menus 数据集合 ------------- 
		self.menus = {};
		menus = self.menus;

		self.addMenuBold('bold');
		self.addMenuHead('head');
		self.addMenuColor('color');
		self.addMenuQuote('quote');
		self.addMenuList('list');
		self.addMenuCheck('check');
	};

});
// bold
window.___extendJS(function (E, $) {

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
					if (self.checkTapTime() === false) {
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
window.___extendJS(function (E, $) {

	E.fn.addMenuHead = function (menuId) {
		var self = this;
		var menus = self.menus || {};

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
					if (self.checkTapTime() === false) {
						return;
					}

					// 执行命令
					if (menuData.selected) {
						self.command('formatblock', false, 'p');
					} else {
						self.command('formatblock', false, 'h3');
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
window.___extendJS(function (E, $) {

	E.fn.addMenuColor = function (menuId) {
		var self = this;
		var menus = self.menus || {};
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
					if (self.checkTapTime() === false) {
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
// list
window.___extendJS(function (E, $) {

	E.fn.addMenuList = function (menuId) {
		var self = this;
		var menus = self.menus || {};

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
					if (self.checkTapTime() === false) {
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
window.___extendJS(function (E, $) {

	E.fn.addMenuCheck = function (menuId) {
		var self = this;
		var menus = self.menus || {};

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
					if (self.checkTapTime() === false) {
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
					self.customCommand(fn, e);
				});
			},

			// 更新样式
			updateStyle: function (editor) {
				// 暂时不需要
			}
		};
	};

});
// 渲染编辑器区域
window.___extendJS(function (E, $) {

	E.fn.renderTxt = function () {
		var self = this;
		var $textarea = self.$textarea;
		var $txt = self.$txt;
		var $modalContainer = self.$modalContainer;

		$textarea.after($txt);
		$textarea.hide();

		$('body').append($modalContainer);
	};

});
// 渲染菜单栏
window.___extendJS(function (E, $) {

	E.fn.renderMenu = function () {
		var self = this;
		var menus = self.menus;
		var $menuContainer = self.$menuContainer;
		var $txt = self.$txt;
		var $gap = $('<div class="gap"></div>');

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
					$menuContainer.append($wrap);
				} else {
					$menuContainer.append($trigger);
				}
				
				// 菜单之间的间隙
				// 之所以需要加 clone 是因为 append 由一种『单例移动』的特性！！需注意！！
				$menuContainer.append($gap.clone());
			}
		});

		// 删除最后一个间隙（即最后一个子元素）
		$menuContainer.children().last().remove();

		// 默认隐藏
		$menuContainer.hide();
		
		// 变量记录菜单容器的显示与隐藏
		self.isMenuShow = false;

		// 最后，将菜单容器渲染到页面中，
		// $txt.append($menuContainer);
		$('body').append($menuContainer);
	};

});
// 绑定document事件
window.___extendJS(function (E, $) {

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
window.___extendJS(function (E, $) {

	E.fn.bindTxtEvent = function () {
		var self = this;
		var $txt = self.$txt;
		var srollTime = Date.now();

		// 处理点击 $txt 的选区
		// $txt 的 tap 事件中调用
		function selectionHeadle() {
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
		$txt.on('touchstart', function (e) {
			// 记录touch使的event对象，可以获取点击的位置
			self.touchEvent = e;
		});
		$txt.on('singleTap', function (e) {
			if (self.checkTapTime() === false) {
				return;
			}

			// 如果当前不是focus状态，则返回
			if (!self.isFocus) {
				return;
			}

			// 如果当前点击的就是上一次点击的元素，则隐藏菜单栏
			if ($(e.target).hasClass('focus-elem')) {
				// 隐藏菜单
				self.hideMenuContainer();
				// 返回
				return;
			}

			// 根据点击的位置，对菜单栏进行定位
			self.setMenuContainerPosition(self.touchEvent, $(e.target));

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

			// 隐藏菜单
			self.hideMenuContainer();

			// 存储源码代码
			self.saveSourceCode();
		});

		// 阻止 click 事件，防止 tap 点透
		$txt.on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
	};

});
// 绑定菜单容器事件
window.___extendJS(function (E, $) {

	// 绑定menucontiner事件
	E.fn.bindMenuContainerEvent = function () {
		
		// tap时focus $text
		var self = this;
		var $menuContainer = self.$menuContainer;

		// tap时，阻止冒泡，因为上层的 $txt 会监测 tap 事件
		$menuContainer.on('tap', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
	};

});
// 绑定菜单按钮的事件
window.___extendJS(function (E, $) {

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
window.___extendJS(function (E, $) {

	// focus API
	E.fn.focusTxt = function () {
		var self = this;
		var $txt = self.$txt;

		$txt.focus();
	};

	// 保存源代码
	E.fn.saveSourceCode = function () {
		var self = this;
		var $txt = self.$txt;
		var $textarea = self.$textarea;
		var sourceCode = '';

		var $txtClone = $txt.clone();
		var $focusElem1 = $txtClone.find('.focus-elem');

		// 将当前的 $focusElem 清除样式
		$focusElem1.removeClass('focus-elem');

		// 获取源码
		sourceCode = $txtClone.html();
		$textarea.val(sourceCode);
	};

});
// menucontainer api
window.___extendJS(function (E, $) {

	// 显示菜单
	// 每次显示菜单，都要更新菜单按钮的样式
	E.fn.setMenuContainerPosition = function (touchEvent, $focusElem) {
		var self = this;

		var x = touchEvent.pageX;
		var y = touchEvent.pageY;
		
		// var focusElemOffset = $focusElem.offset();
		// var focusElemTop = focusElemOffset.top;
		// var focusElemHeight = focusElemOffset.height;

		var $txt = self.$txt;
		var $children = $txt.children();
		var $lastChild;
		if ($children.length === 0) {
			$lastChild = $('<p><br></p>');
			$txt.append($lastChild);
		} else {
			$lastChild = $children.last();
		}
		var lastChildOffset = $lastChild.offset();
		var lastChildTop = lastChildOffset.top;
		var lastChildHeight = lastChildOffset.height;

		var $menuContainer = self.$menuContainer;
		var menuContainerWidth;
		var $menuContainerTip = self.$menuContainerTip;
		var tipMarginLeft;

		// top 先默认为手指点击的y值
		var top = y;
		if (y > lastChildTop + lastChildHeight) {
			// 如果手指点击的地方在 $txt 最后一个子元素的下方，
			// 则将 top 值定义为 $txt 最后一个子元素的最底部
			top = lastChildTop + lastChildHeight;
		}

		// 其他样式的结果值
		var left = x;
		var marginTop = 20;
		var marginLeft = 0 - x + 10;

		// 定位
		$menuContainer.css({
			'top': top + 'px',
			'left': left + 'px',
			'margin-left': marginLeft + 'px',
			'margin-top': marginTop + 'px'
		}); 

		// 显示menucontainer
		self.showMenuContainer();

		// 最后定位显示tip三角形
		tipMarginLeft = 0 - marginLeft - 10;
		if (tipMarginLeft <= 10) {
			tipMarginLeft = 10;
		}
		menuContainerWidth = $menuContainer.offset().width;
		if (tipMarginLeft > (menuContainerWidth - 30)) {
			tipMarginLeft = menuContainerWidth - 30;
		}
		$menuContainerTip.css('margin-left', tipMarginLeft + 'px');
	};

	// 显示菜单
	E.fn.showMenuContainer = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;

		if (self.isMenuShow === false) {
			$menuContainer.show();
			$menuContainer.css('opacity', '0.9');

			// 记录状态
			self.isMenuShow = true;
		}
	};

	// 隐藏菜单
	E.fn.hideMenuContainer = function () {
		var self = this;
		var $menuContainer = self.$menuContainer;
		var $txt = self.$txt;
		
		var $focusElem = self.$focusElem;
		var $otherFocusElem = $txt.find('.focus-elem'); // 得重新查找，可能发生变化

		if (self.isMenuShow) {
			$menuContainer.hide();
			$menuContainer.css('opacity', '0');

			// 记录状态
			self.isMenuShow = false;

			// 隐藏 focuselem
			if ($focusElem) {
				$focusElem.removeClass('focus-elem');
				$otherFocusElem.removeClass('focus-elem');
			}
		}
	};
	
});
// menus api
window.___extendJS(function (E, $) {
	
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
window.___extendJS(function (E, $) {

	// 传统事件
	E.fn.command = function (commandName, bool, commandValue, e, callback) {
		var self = this;
		
		var fn = function () {
			document.execCommand(commandName, !!bool, commandValue);
		};

		// 执行事件
		self.customCommand(fn, e, callback);
	};

	// 自定义事件
	E.fn.customCommand = function (fn, e, callback) {
		var self = this;
		var currentRange = self.currentRange();
		var currentWrapRange = self.currentWrapRange();
		var $txt = self.$txt;

		// 恢复选区（整个外围选区）
		self.restoreSelection(currentWrapRange);

		// 执行命令
		fn();

		// 如果focusElem的后面没有元素了，就增加一个空行
		if ($txt.children().last().html() !== '<br>') {
			$txt.append($('<p><br></p>'));
		}

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
	};
});
// range selection 的相关操作
window.___extendJS(function (E, $) {

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
		var wrapRange = this.currentWrapRange();
		var elem;
		if (wrapRange == null) {
			return;
		}

		elem = wrapRange.commonAncestorContainer;
		if (elem.nodeType === 3) {
			// text类型，则返回父元素
			elem = elem.parentNode;
		}

		return elem;
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
window.___extendJS(function (E, $) {

	

});
// 初始化编辑器对象
window.___extendJS(function (E, $) {

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
	};

});