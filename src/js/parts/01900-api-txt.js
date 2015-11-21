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