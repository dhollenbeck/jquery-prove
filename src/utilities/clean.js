!function($) {
	'use strict';

	function wordToAscii(text) {
		return text.replace(/[\u2018|\u2019|\u201A]/g, '\'') // smart single quotes and apostrophe
			.replace(/[\u201C|\u201D|\u201E]/g, '\"') // smart double quotes
			.replace(/\u2026/g, '...') // ellipsis
			.replace(/[\u2013|\u2014]/g, '-') // dashes
			.replace(/\u02C6/g, '^') // circumflex
			.replace(/\u2039/g, '') // open angle bracket
			.replace(/[\u02DC|\u00A0]/g, ' '); // spaces
	}

	$.fn.clean = function() {
		var input = $(this);
		var text = input.val();
		var cleaned = wordToAscii(text);
		input.val(cleaned);
	};

}(window.jQuery);
