!function($) {
	'use strict';

	$.fn.proveTags = function(options) {

		var input = $(this);
    var value = input.val();
		var domNodes = $.parseHTML(value,document,true);
    var validTags = options.goodtags;
    validTags.push('#text')

    var validation = 'danger';
    var failedValidation = false;

		$.each(domNodes, function(index,domNode){
    	if ($.inArray(domNode.nodeName , validTags) === -1 ) {
     	  failedValidation = true;
      }
		})

    if (!failedValidation) {
      validation = 'success';
    }

    var message = (validation === 'danger')? options.message : undefined;

		if (options.debug) {
			console.groupCollapsed('Validator.proveTags()', options.field, options.initiator); /* eslint-disable indent */
				console.log('options', options);
				console.log('group', options.group);
				console.log('input', input);
				console.log('value', value);
				console.log('enabled', domNodes);
				console.log('validation', validation);
				console.log('message', message);
			console.groupEnd(); /* eslint-enable indent */
		}

		return {
			field: options.field,
			validator: options.validator,
			status: 'validated',
			validation: validation,
			message: message
		};
	};
}(window.jQuery);
