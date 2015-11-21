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