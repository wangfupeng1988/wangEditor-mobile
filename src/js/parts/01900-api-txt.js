// $txt api
window.___E_mod(function (E, $) {

	// focus API 
	// 暂时没人用
	// E.fn.focusTxt = function () {
	// 	var self = this;
	// 	var $txt = self.$txt;

	// 	if (!self.isFocus) {
	// 		$txt.focus();
	// 	}
	// };

	// 保存、获取 $txt tap时event对象的target元素
	E.fn.eventTarget = function ($elem) {
		var self = this;
		if ($elem == null) {
			return self.$eventTargetElem;
		} else {
			self.$eventTargetElem = $elem;
		}
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
		sourceCode = sourceCode.replace(/\s?class=""/g, '');
		$textarea.val(sourceCode);
	};

	// 在编辑区域最后插入空行
	E.fn.insertEmpltyLink = function () {
		var self = this;
		var $txt = self.$txt;
		var $children = $txt.children();

		if ($children.length === 0) {
			$txt.append($('<p><br></p>'));
			return;
		}

		if ($children.last().html() !== '<br>') {
			$txt.append($('<p><br></p>'));
		}
	};

});