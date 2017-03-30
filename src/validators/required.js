!function($) {
	'use strict';

	$.fn.proveRequired = function(options) {

		var input = $(this);
		var value = input.vals(options.group);
		var enabled = $('body').booleanator(options.enabled);
		var has = $.hasValue(value, options.prefix)? 'success' : 'danger';
		var validation = (enabled)? has : 'reset';
		var message = (has === 'danger')? options.message : undefined;

		if (options.debug) {
			console.groupCollapsed('Validator.proveRequired()', options.field, options.initiator); /* eslint-disable indent */
				console.log('options', options);
				console.log('group', options.group);
				console.log('input', input);
				console.log('value', value);
				console.log('enabled', enabled);
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
