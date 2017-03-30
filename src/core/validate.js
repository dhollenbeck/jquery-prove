!function($) {
	'use strict';

	$.fn.validate = function() {

		// Currently, it is not possible nor practical to have $.fn.validate()
		// work on a colleciton of elements. The reason is that $.fn.validate()
		// needs to return the form validation status or a (future) deferred.

		var el = $(this);
		var isForm = el.is(':prove-form');
		var isInput = el.is(':prove-input');

		// We trigger events here because the event
		// handlers bound to the form already have the
		// field data bound to the event handlers. These
		// event handlers will call the $.fn.proveForm()
		// or $.fn.proveInput() with the correct field data.
		if (isForm) {
			return el.proveForm();
		} else if (isInput) {
			el.trigger('validate.input.prove');
			return this;
		} else {
			// An input could be dynamically inserted and therefore, it will not pass
			// the is(':prove-input') or is(':prove-form'). Therefore, we need to assume
			// here that it is an input.
			el.trigger('validate.input.prove');
			return this;
		}

	};
}(window.jQuery);
