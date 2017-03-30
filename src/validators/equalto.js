!function($) {
	'use strict';

	$.fn.proveEqualTo = function(options) {

		var input = $(this);
		var other = $(options.equalTo);
		var form = input.closest('form');
		var value = input.val();
		var isSetup = input.hasClass('validator-equalto-setup');
		var enabled = $('body').booleanator(options.enabled);
		var has = (value === other.val())? 'success' : 'danger';
		var validation = (enabled)?  has : 'reset';
		var message = (validation === 'danger')? options.message : undefined;

		//setup event to validate this input when other input value changes
		if (!isSetup) {
			input.addClass('validator-equalto-setup');
			//on blur of other input
			form.on('focusout', options.equalTo, function() {
				input.validate();
			});
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
