// range selection 的相关操作
window.___extendJS(function (E, $) {

	// 设置或读取当前的range
	E.fn.currentRange = function (cr){
		if (cr) {
			this.currentRangeData = cr;
		} else {
			return this.currentRangeData;
		}
	};

	// 设置或读取当前range的wrapRange
	E.fn.currentWrapRange = function (cwr){
		if (cwr) {
			this.currentWrapRangeData = cwr;
		} else {
			return this.currentWrapRangeData;
		}
	};

	// 获取 wrapRange 的元素（不能是text类型） 
	E.fn.getWrapRangeElem = function () {
		var wrapRange = this.currentWrapRange();
		var elem;
		if (wrapRange == null) {
			return;
		}

		elem = wrapRange.commonAncestorContainer;
		if (elem.nodeType === 3) {
			// text类型，则返回父元素
			elem = elem.parentNode;
		}

		return elem;
	};

	// 保存选择区域
	E.fn.saveSelection = function (range) {
		var self = this,
			_parentElem,
			selection,
			wrapRange,
			txt = self.$txt.get(0);

		if (range) {
			_parentElem = range.commonAncestorContainer;
		} else {
			selection = document.getSelection();
            if (selection.getRangeAt && selection.rangeCount) {
                range = document.getSelection().getRangeAt(0);
                _parentElem = range.commonAncestorContainer;
            }
		}

		// 确定父元素一定要包含在编辑器区域内
		if (_parentElem && (txt.contains(_parentElem) || txt === _parentElem) ) {

			// 保存选择区域
			self.currentRange(range);

			// 保存 wrapRange
			wrapRange = document.getSelection().getRangeAt(0);
			wrapRange.selectNodeContents(_parentElem);
			self.currentWrapRange(wrapRange);
		}
	};

	// 恢复选中区域
	E.fn.restoreSelection = function (range){
		var selection;

		if (!range) {
			return;
		}

		selection = document.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
	};

});