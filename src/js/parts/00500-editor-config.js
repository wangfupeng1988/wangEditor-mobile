// 初始化对象配置
window.___E_mod(function (E, $) {

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