!function($) {
	'use strict';

	$.fn.bootstrap = function(options) {

		options = options || {};
		var input = $(this);
		var parent1, parent2, parent3, el1, el2, group, texty, classy;
		var prefixes = options.prefixes || {};
		var message = options.message;

		if (options.status === 'progress') return;

		// manage feedback
		if (options.status === 'validating') {
			input.feedback({state: true});
		} else if (options.status === 'validated') {
			input.feedback({state: false});
		}

		if (options.status === 'validating') return;

		parent1 = input.parent();
		parent2 = parent1.parent();
		parent3 = parent2.parent();
		texty = input.closest('.texty');
		classy = input.closest('.classy');

		//placement
		if (texty.length && classy.length) {
			el1 = texty;
			el2 = classy;
		} else if (parent1.hasClass('form-group')) {
			el1 = parent1;
			el2 = parent1;
		} else if (parent1.is('[class^="col-"]')) {
			el1 = parent1;
			el2 = parent2;
		} else if (parent1.is('td')) {
			el1 = parent1;
			el2 = parent1;
		} else if (parent1.hasClass('checkbox') || parent1.hasClass('radio')) {
			el1 = parent2;
			el2 = parent2;
		} else if (parent1.hasClass('input-group')) {
			el1 = parent2;
			if (parent2.is('[class^="col-"]')) {
				el2 = parent3;
			} else {
				el2 = parent2;
			}
		} else if (parent3.is('[class^="col-"]')) {
			el1 = parent3;
			el2 = input.closest('.form-group');
		} else {
			group = input.closest('.form-group');
			if (group.length) {
				el1 = input.closest('.form-group');
				el2 = input.closest('.form-group');
			} else {
				el1 = parent3;
				el2 = parent3;
			}
		}

		//prefix message
		if (options.message) {
			if (prefixes.success && options.validation === 'success') message = prefixes.success + message;
			if (prefixes.danger && options.validation === 'danger') message = prefixes.danger + message;
			if (prefixes.warning && options.validation === 'warning') message = prefixes.warning + message;
			if (prefixes.reset && options.validation === 'reset') message = prefixes.reset + message;
		}

		// display message.
		el1.texty({
			wrapper: '<span class="help-block"></span>',
			message: message
		});

		// add success class on options.validation = 'success'.
		// add failure class on options.validation = 'danger'.
		// remove success and failure classes on options.validation = 'reset'
		el2.classy({
			validation: options.validation,
			classSuccess: 'has-success',
			classFailure: 'has-error',
			classWarning: 'has-warning'
		});
	};
}(window.jQuery);
