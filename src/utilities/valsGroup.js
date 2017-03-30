!function($) {
	'use strict';

	$.fn.valsGroup = function(selector) {

		var input = $(this);
		var vals = input.closest('form').find(selector).map(function() {
			return $(this).val();
		}).toArray();
		return vals;
	};
}(window.jQuery);
