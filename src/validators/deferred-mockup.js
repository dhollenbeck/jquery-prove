!function($) {
	'use strict';

	$.fn.proveDeferredMockup = function(options) {

		var input = $(this);
		var value = input.vals();
		var hasValue = $.hasValue(value);
		var enabled = $('body').booleanator(options.enabled);
		var dfd = $.Deferred();
		var result = {
			field: options.field,
			validator: options.validator,
			status: 'validated',
			message: undefined
		};
		var progress;


		if (!enabled) {
			result.validation = 'reset';
			dfd.resolve(result);
		} else if (!hasValue) {
			// All validators are optional except for `required` validator.
			result.validation = 'success';
			dfd.resolve(result);
		} else {

			// fake async validation on some remote server
			setTimeout(function() {

				// fake async network error
				if (options.error) {
					result.validation = 'danger';
					result.message = 'Fake network error occurred.';
					dfd.reject(result); // or dfd.resolve(result);
				} else {
					result.validation = ($.isFunction(options.validation))? options.validation(value) : options.validation;
					result.message = options.message;
					dfd.resolve(result);
				}

				clearInterval(progress);
			}, options.delay);
		}

		if (options.debug) {
			console.groupCollapsed('Validator.proveDeferredMockup()', options.field); /* eslint-disable indent */
				console.log('options', options);
				console.log('input', input);
				console.log('value', value);
				console.log('enabled', enabled);
				console.log('validation', result.validation);
			console.groupEnd(); /* eslint-enable indent */
		}

		return dfd;
	};
}(window.jQuery);
