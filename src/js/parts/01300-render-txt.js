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