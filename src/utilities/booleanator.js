!function($) {
	'use strict';

	//todo: support a `this` context and also a passed in context
	$.fn.booleanator = function(param) {

		var state;

		function evalSelector(selector) {
			try {
				return !!$(selector).length;
			} catch (e) {
				console.warn('Invalid jquery selector (`%s`) param for booleanator plugin.', selector);
				return false;
			}
		}

		function evalIs(selector, context) {
			try {
				return $(context).is(selector);
			} catch (e) {
				console.warn('Invalid jquery pseudo selector (`%s`) param for booleanator plugin.', selector);
				return false;
			}
		}

		if (typeof param === 'undefined') {
			state = true;
		} else if (typeof param === 'boolean') {
			state = param;
		} else if (typeof param === 'string') {
			state = (param.charAt(0) === ':')
				? evalIs(param, this)
				: evalSelector(param);
		} else if (typeof param === 'function') {
			state = param();
		} else {
			throw new Error('Invalid param for booleanator plugin.');
		}

		return state;
	};
}(window.jQuery);
