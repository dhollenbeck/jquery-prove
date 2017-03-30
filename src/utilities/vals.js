!function($) {
	'use strict';

	// if group is group then use multiple selection model.
	// if group is false then use single selection model.
	// if group is undefined then use single selection model execept for this.type === radio

	$.fn.vals = function(group) {

		var input = $(this);
		var type = input.attr('type');
		var isSelect = input.is('select');
		var isCheckbox = (type === 'checkbox');
		var isRadio = (type === 'radio');
		var isNumber = (type === 'number');
		var isFile = (type === 'file');
		var name = input.attr('name');
		var selector = '[name="' + name + '"]';
		var val, idx;

		if (isSelect) {
			if (group) {
				// multiple selection model
				val = input.valsGroup(selector);
			} else {
				// single selection model
				val = input.val();
			}
		} else if (isRadio) {
			if (group || typeof group === 'undefined') {
				// multiple selection model
				selector = selector + ':checked';
				val = input.valsGroup(selector);
			} else {
				// single selection model
				val = input.filter(':checked').val();
			}
		} else if (isCheckbox) {
			if (group) {
				// multiple selection model
				selector = selector + ':checked';
				val = input.valsGroup(selector);
			} else {
				// single selection model
				val = input.filter(':checked').val();
			}

		} else if (isNumber && typeof input.validity !== 'undefined') {
			val = input.validity.badInput ? NaN : input.val();
		} else if (isFile) {

			val = input.val();

			// Modern browser (chrome & safari)
			if (val.substr(0, 12) === 'C:\\fakepath\\') val = val.substr(12);

			// Legacy browsers, unix-based path
			idx = val.lastIndexOf('/');
			if (idx >= 0) val = val.substr(idx + 1);

			// Windows-based path
			idx = val.lastIndexOf('\\');
			if (idx >= 0) val = val.substr(idx + 1);
		} else if (input.attr('contenteditable')) {
			val = input.text();
		} else {
			//val = input.val();
			if (group) {
				// multiple selection model
				val = input.valsGroup(selector);
			} else {
				// single selection model
				val = input.val();
			}
		}

		if (typeof val === 'string') return val.replace(/\r/g, '');

		return val;
	};
}(window.jQuery);
