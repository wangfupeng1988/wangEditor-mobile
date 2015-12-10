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