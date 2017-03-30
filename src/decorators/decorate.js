!function($) {
	'use strict';

	$.fn.decorate = function(plugin, options) {

		plugin = plugin || 'bootstrap';
		options = options || {};

		var form = $(this);
		var exists = ($.isFunction($.fn[plugin]));

		if (!exists) return console.warn('Decorator plugin ($.fn.' + plugin + ') was not found.');

		// decorate the form
		form.on('status.input.prove', function(event, data) {
			var input = $(event.target);
			data = $.extend(data, options);
			if (exists) input[plugin](data);
		});
	};

}(window.jQuery);
