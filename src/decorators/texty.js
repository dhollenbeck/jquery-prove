!function($) {
	'use strict';

	$.fn.texty = function(options) {

		options = options || {};
		var group = $(this);
		var input = group.find(':prove-input');

		if (options.debug) {
			console.groupCollapsed('Decorators.texty()'); /* eslint-disable indent */
				console.log('group', group);
				console.log('validation', options.validation);
				console.log('wrapper', options.wrapper);
				console.log('placement', options.placement);
				console.log('message', options.message);
			console.groupEnd(); /* eslint-enable indent */
		}

		function setup() {
			var texty = $(options.wrapper);
			texty.addClass('texty-wrapper');
			texty.html(options.message);
			group.children().not('.form-control-static').last().after(texty);

			// aria
			var invalid = (options.validation === 'danger')? 'true' : 'false';
			var uuid = $.fn.uuid();
			input.attr('aria-invalid', invalid);
			input.attr('aria-describedby', uuid);
			texty.attr('id', uuid);
		}

		function teardown() {
			group.find('.texty-wrapper').remove();
			input.removeAttr('aria-invalid');
			input.remove('aria-describedby');
		}

		teardown();
		if (options.message) setup();
	};
}(window.jQuery);
