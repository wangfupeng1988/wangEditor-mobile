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