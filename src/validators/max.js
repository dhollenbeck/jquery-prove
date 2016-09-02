!function ($) {
	'use strict';

	$.fn.proveMax = function(options){

		var input = $(this);
		var value = input.vals();
		var enabled = $('body').booleanator(options.enabled);
		var has = (value <= options.max)? 'success' : 'danger';
		var validation = (enabled)? has : 'reset';
		var message = (validation === 'danger')? options.message : undefined;

		if (options.debug){
			console.groupCollapsed('Validator.proveMax()', options.field);
				console.log('options', options);
				console.log('input', input);
				console.log('value', value);
				console.log('enabled', enabled);
				console.log('validation', validation);
			console.groupEnd();
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
