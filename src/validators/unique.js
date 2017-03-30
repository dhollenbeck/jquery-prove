!function($) {
	'use strict';

	$.fn.proveUnique = function(options) {

		var input = $(this);
		var value = input.vals(options.group);
		var hasValue = $.hasValue(value, options.prefix);
		var hasUnique = $.hasUnique(value);
		var enabled = $('body').booleanator(options.enabled);
		var others = $(options.uniqueTo).not(input);
		var validation = 'success';

		if (!enabled) {
			// Validators should return undefined when there is no value.
			// Decoraters will teardown any decoration when they receive an `undefined` validation result.
			validation = 'reset';
		} else if (!hasValue) {
			// All validators (except proveRequired) should return undefined when there is no value.
			// Decoraters will teardown any decoration when they receive an `undefined` validation result.
			validation = 'reset';
		} else if (options.uniqueTo) {
			// compare against other input values
			others.each(function() {
				var other = $(this);
				var value2 = other.val();
				if ($.hasValue(value2) && value2 === value) validation = 'danger';
			});
		} else {
			validation = hasUnique? 'success' : 'danger';
		}

		var message = (validation === 'danger')? options.message : undefined;

		if (options.debug) {
			console.groupCollapsed('Validator.proveUnique()', options.field); /* eslint-disable indent */
				console.log('options', options);
				console.log('value', value);
				console.log('hasUnique', hasUnique);
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
