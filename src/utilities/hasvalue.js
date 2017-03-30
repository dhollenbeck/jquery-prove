!function($) {
	'use strict';

	$.hasValue = function(value, prefix) {

		var hasValue = false;
		var arr = $.makeArray(value);

		//trim values
		arr = arr.map($.trim);

		//exclude prefix from values
		if (prefix) arr = arr.map(function(str) {
			str = str || '';
			return str.substring(prefix.length, str.length + 1);
		});

		// test values
		arr.forEach(function(str) {
			if (str.length) hasValue = true;
		});
		return hasValue;
	};
}(window.jQuery);
