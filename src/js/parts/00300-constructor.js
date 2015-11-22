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
			// 如果当前时间和上一次tapTime相差 **ms 之内，则忽略
			// 否则就继续并更新tapTime
			if (Date.now() - self.tapTime < 100) {
				return false;
			}

			self.tapTime = Date.now();
			return true;
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