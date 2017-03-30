!function($) {
	'use strict';

	$.fn.otherTo = function(options) {

		if (typeof options === 'string') {
			options = {
				selector: options,
				closest: 'form'
			};
		}

		var el = $(this);
		var wrapper = el.closest(options.closest);
		var other = wrapper.find(options.selector);

		return other;
	};
}(window.jQuery);
