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