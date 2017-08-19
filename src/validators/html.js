!function($) {
	'use strict';

	$.fn.proveHtml = function(options) {

		//options.goodtags is an input of an array of html node names allowed
		//if any html tags in the passed in text don't match with options.goodtags
		//validation will fail

		var input = $(this);
    var value = input.val();//html to be validated
		var domNodes = $.parseHTML(value,document,true);
    var validTags = options.goodtags;
    validTags.push('#text')//#text tags are noise will be ignored for validation

    var validation = 'danger';
    var failedValidation = false;

		if (!$.isEmptyObject(domNodes)) {//checks for empty array, case of no text
			$.each(domNodes, function(index,domNode){
	    	if ($.inArray(domNode.nodeName , validTags) === -1 ) {
	     	  failedValidation = true;
	      }
			})
		}

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
