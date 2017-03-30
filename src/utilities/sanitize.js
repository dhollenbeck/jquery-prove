!function($) {
	'use strict';

	$.fn.sanitize = function() {

		var el = $(this);
		var pasteable = el.is(':pasteable'); // todo: add to provejs-query selectors
		var selector = (!pasteable)? ':pasteable' : undefined; // controls delegated vs non-delegated event

		el.on('paste', selector, function(e) {
			// wait until the pasted text is in the DOM
			var input = $(e.currentTarget);
			setTimeout(function() {
				input.clean();
				if (input.validate) input.validate();
			}, 0);
		});
	};

}(window.jQuery);
