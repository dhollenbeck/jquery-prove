(function($) {
	'use strict';

	$.fn.feedback = function(options) {

		options = options || {};

		var input = $(this);
		var klass = options.classFeedback || 'has-default';
		var group, feedback;

		if (!input.is('input')) return;
		if (input.is(':radio')) return;
		if (input.is(':checkbox')) return;

		group = input.closest('.form-group');
		feedback = input.parent().find('.form-control-feedback');

		//toggle
		if (options.state === false) {
			feedback.remove();
			group.removeClass(klass);
			group.removeClass('has-feedback');
		} else if (options.state === true) {
			if (!group.hasClass('has-feedback')) {
				group.addClass(klass);
				group.addClass('has-feedback');
				input.parent().append('<span class="form-control-feedback fa fa-spinner fa-spin"></span>');
			}
		}
	};
})(window.jQuery);
