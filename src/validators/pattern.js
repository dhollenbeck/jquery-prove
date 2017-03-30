!function($) {
	'use strict';

	$.fn.provePattern = function(options) {

		var input = $(this);
		var value = input.val();
		var hasValue = $.hasValue(value);
		var enabled = $('body').booleanator(options.enabled);
		var regex = (options.regex instanceof RegExp)
			? options.regex
			: new RegExp('^(?:' + options.regex + ')$');
		var validation;

		if (!enabled) {
			// Validators should return undefined when there is no value.
			// Decoraters will teardown any decoration when they receive an `undefined` validation result.
			validation = 'reset';
		} else if (!hasValue) {
			// All validators (except proveRequired) should return undefined when there is no value.
			// Decoraters will teardown any decoration when they receive an `undefined` validation result.
			validation = 'reset';
		} else if (regex instanceof RegExp) {
			validation = regex.test(value)? 'success' : 'danger';
		} else {
			validation = 'danger';
		}

		var message = (validation === 'danger')? options.message : undefined;

		if (options.debug) {
			console.groupCollapsed('Validator.provePattern()', options.field); /* eslint-disable indent */
				console.log('options', options);
				console.log('validation', validation);
				console.log('message', message);
			console.groupEnd(); /* eslint-enable indent */
		}

		return {
			field: options.field,
			validator: options.validator,
			status: 'validated',
			validation: validation,
			message: message
		};
	};

}(window.jQuery);
