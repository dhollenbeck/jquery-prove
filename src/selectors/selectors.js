!function ($) {
	'use strict';

	// Custom selectors
	$.extend($.expr[':'], {

		// http://jqueryvalidation.org/blank-selector/
		blank: function(a) {
			return !$.trim('' + $(a).val());
		},

		// http://jqueryvalidation.org/filled-selector/
		filled: function(a) {
			var val = $(a).val();
			return val !== null && !!$.trim('' + val);
		},

		// http://jqueryvalidation.org/unchecked-selector/
		unchecked: function(a) {
			return !$(a).prop('checked');
		},

		//http://www.sitepoint.com/make-your-own-custom-jquery-selector/
		inview: function(el) {
			if ($(el).offset().top > $(window).scrollTop() - $(el).outerHeight(true) && $(el).offset().top < $(window).scrollTop() + $(el).outerHeight(true) + $(window).height()) {
				return true;
			}
			return false;
		},

		multiple: function(el) {
			var name = $(el).attr('name') || '';
			return (name.charAt(name.length - 1) === ']');
		},

		pasteable: function(el) {
			return $(el).is(':text, textarea');
		},

		'prove-form': function(el) {
			return ($(el).data('prove'))? true : false;
		},

		'prove-input': function(el) {
			return ($(el).data('prove-uuid'))? true : false;
		}
	});
}(window.jQuery);
