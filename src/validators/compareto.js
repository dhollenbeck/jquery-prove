!function($) {
	'use strict';

	$.fn.proveCompareTo = function(options) {

		var input = $(this);
		var other = input.otherTo(options.compareTo);
		var form = input.closest('form');
		var value1 = input.val();
		var value2 = other.val();
		var hasValue = $.hasValue(value1);
		var isSetup = input.hasClass('validator-compareto-setup');
		var enabled = $('body').booleanator(options.enabled);
		var validation;

		if (!enabled) {
			validation = 'reset';
		} else if (!hasValue) {
			validation = 'success';
		} else if (value1 === options.ignore) {
			validation = 'success';
		} else if (value2 === options.ignore) {
			validation = 'success';
		} else if (options.comparison === '=') {
			validation = (value1 === value2)? 'success' : 'danger';
		} else if (options.comparison === '!=') {
			validation = (value1 !== value2)? 'success' : 'danger';
		} else if (options.comparison === '>=') {
			validation = (value1 >= value2)? 'success' : 'danger';
		} else if (options.comparison === '>') {
			validation = (value1 > value2)? 'success' : 'danger';
		} else if (options.comparison === '<=') {
			validation = (value1 <= value2)? 'success' : 'danger';
		} else if (options.comparison === '<') {
			validation = (value1 < value2)? 'success' : 'danger';
		} else {
			//
		}

		var message = (validation === 'danger')? options.message : undefined;

		//setup event to validate this input when other input value changes
		if (!isSetup) {
			input.addClass('validator-compareto-setup');
			//on blur of other input
			form.on('focusout', options.compareTo, function() {
				input.validate();
			});
		}

		if (options.debug) {
			console.groupCollapsed('Validator.proveCompareTo()', options.field); /* eslint-disable indent */
				console.log('options', options);
				console.log('input', input);
				console.log('value1', value1);
				console.log('value2', value2);
				console.log('enabled', enabled);
				console.log('validation', validation);
			console.groupEnd(); /* eslint-enable indent */
		}

		//return validation result
		return {
			field: options.field,
			validator: options.validator,
			status: 'validated',
			validation: validation,
			message: message
		};
	};
}(window.jQuery);
