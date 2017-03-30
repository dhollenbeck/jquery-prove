!function($) {
	'use strict';

	$.fn.provePrecision = function(options) {

		var regex = /^(.)*(\.[0-9]{1,2})?$/;
		var input = $(this);
		var value = input.vals();
		var enabled = $('body').booleanator(options.enabled);
		var has = regex.test(value)? 'success' : 'danger';
		var validation = (enabled)? has : 'reset';
		var message = (validation === 'danger')? options.message : undefined;

		if (options.debug) {
			console.groupCollapsed('Validator.provePrecision()', options.field); /* eslint-disable indent */
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
