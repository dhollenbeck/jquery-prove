!function($) {
	'use strict';

	$.fn.proveCallback = function(options) {

		var input = $(this);
		var value = input.vals();
		var enabled = $('body').booleanator(options.enabled);
		var validated = (enabled && $.isFunction(options.callback) && options.callback(value))? 'success' : 'danger';
		var validation = (enabled)? validated : 'reset';
		var message = (validated === 'danger')? options.message : undefined;

		if (options.debug) {
			console.groupCollapsed('Validator.proveCallback()', options.field); /* eslint-disable indent */
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
