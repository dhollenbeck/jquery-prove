!function($) {
	'use strict';

	function isJSON(str) {
		if (str === undefined) return true;
		if (str === '') return true; // not checking empty value here

		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}

		return true;
	}

	$.fn.proveJson = function(options) {

		var input = $(this);
		var value = input.vals();
		var enabled = $('body').booleanator(options.enabled);
		var has = (isJSON(value))? 'success' : 'danger';
		var validation = (enabled)? has : 'reset';
		var message = (validation === 'danger')? options.message : undefined;

		if (!window.JSON) {
			message = 'Your browser does not support JSON validation. Please upgrade your browser.';
		}

		if (options.debug) {
			console.groupCollapsed('Validator.proveJson()', options.field); /* eslint-disable indent */
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
