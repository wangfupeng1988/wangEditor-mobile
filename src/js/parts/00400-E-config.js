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
		uploadImgUrl: '',

		// 上传文件的超时时间（默认 10s）
		uploadTimeout: 10 * 1000,

		// 测试地址（在测试地址，编辑器会主动输出一些console.log信息）
		testHostname: 'localhost',

		// 上传图片时，如果浏览器不支持预览图片，则用以下图片代替
		loadingImg: 'http://images2015.cnblogs.com/blog/138012/201512/138012-20151208194759027-506651939.gif',
	};
	
});