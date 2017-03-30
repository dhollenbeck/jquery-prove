!function($) {
	'use strict';

	$.fn.decorateErrors = function(errors) {

		errors = errors || {};
		var form = $(this);

		$.each(errors, function(name, message) {
			var selector = '[name="' + name + '"]';
			var data = {
				field: name,
				validator: 'server',
				status: 'validated', //validated on server
				validation: 'danger',
				message: message
			};
			var input = form.find(selector);
			input.trigger('status.input.prove', data);
		});
	};

}(window.jQuery);
