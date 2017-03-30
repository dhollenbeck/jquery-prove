!function($) {
	'use strict';

	$.fn.lint = function() {

		var elements = $(this);
		elements.each(function() {
			var el = $(this);
			if (el.is('form')) {

				// http://jibbering.com/faq/names/index.html
				// http://kangax.github.io/domlint/
				// https://api.jquery.com/submit/

				if (!$.isFunction(el.submit)) console.warn('form.submit() is not a function! Forms and their child elements should not use input names or ids that conflict with properties of a form.');

				if (el.find('#submit').length) console.warn('You should not have a form element with an id of `submit`.');
				if (el.find('#method').length) console.warn('You should not have a form element with an id of `method`.');
				if (el.find('#style').length) console.warn('You should not have a form element with an id of `style`.');
				if (el.find('#action').length) console.warn('You should not have a form element with an id of `action`.');

				if (el.find('[name="submit"]').length) console.warn('You should not have a form element with an name of `submit`.');
				if (el.find('[name="method"]').length) console.warn('You should not have a form element with an name of `method`.');
				if (el.find('[name="style"]').length) console.warn('You should not have a form element with an name of `style`.');
				if (el.find('[name="action"]').length) console.warn('You should not have a form element with an name of `action`.');
			}
		});
	};
}(window.jQuery);
