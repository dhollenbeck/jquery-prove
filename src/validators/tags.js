!function($) {
	'use strict';

	$.fn.proveTags = function(options) {

		var input = $(this);
		var domNodes = $.parseHTML(input,document,true);
    var validation = 'success'

		$.each(domNodes, function(index,domNode){
    	if ($.inArray(domNode.nodeName ,options.badtags) > -1 ) {
     	  validation = 'danger';
      }
		})

		if (options.debug) {
			console.groupCollapsed('Validator.proveTags()', options.field, options.initiator); /* eslint-disable indent */
				console.log('options', options);
				console.log('group', options.group);
				console.log('input', input);
				console.log('value', value);
				console.log('enabled', enabled);
				console.log('validation', validation);
				console.log('message', options.message);
			console.groupEnd(); /* eslint-enable indent */
		}

		return {
			field: options.field,
			validator: options.validator,
			status: 'validated',
			validation: validation,
			message: options.message
		};
	};
}(window.jQuery);
