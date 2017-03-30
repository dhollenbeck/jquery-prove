!function($) {
	'use strict';

	$.fn.huntout = function(selector) {
		var el = $(this);
		var container;

		if (typeof selector === 'string') {
			container = el.closest(selector);
		} else if ($.isArray(selector)) {

			// test each array item until we find one
			// loop selectors in array of selectors until
			// we find the closests.
			for (var i = 0; i < selector.length; i++) {
				container = el.closest(selector[i]);
				if (container.length > 0) break;
			}
		} else if (typeof selector === 'function') {
			container = el.parents().filter(selector());
		} else {
			throw new Error('Invalid selector ("%s") param in huntout plugin.', selector);
		}

		return container;
	};

}(window.jQuery);
