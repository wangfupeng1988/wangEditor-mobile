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