!function($) {
	'use strict';

	$.fn.proveLength = function(options) {

		var input = $(this);
		var value = input.vals();
		var hasValue = $.hasValue(value);
		var enabled = $('body').booleanator(options.enabled);
		var okMin = (typeof options.min !== 'undefined')? (value.length >= options.min) : true;
		var okMax = (typeof options.max !== 'undefined')? (value.length <= options.max) : true;
		var validation;

		if (!enabled) {
			validation = 'reset';
		} else if (!hasValue) {
			// All validators are optional except of `required` validator.
			validation = 'success';
		} else if (okMin && okMax) {
			validation = 'success';
		} else {
			validation = 'danger';
		}

		var message = (validation === 'danger')? options.message : undefined;

		if (options.debug) {
			console.groupCollapsed('Validator.proveLength()', options.field); /* eslint-disable indent */
				console.log('options', options);
				console.log('input', input);
				console.log('value', value);
				console.log('enabled', enabled);
				console.log('validation', validation);
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
