!function($) {
	'use strict';

	//return string of space seperated events used to detect change to the DOM element
	$.fn.proveTriggers = function() {

		//var input = $(this);
		//var type = input.attr('type');
		var type = this.type;
		var tag = this.tagName;

		if (type === 'text') {
			return 'input change keyup blur';
		} else if (type === 'checkbox') {
			return 'input change click blur';
		} else if (type === 'file') {
			return 'input change blur';
		} else if (type === 'email') {
			return 'input change keyup blur';
		} else if (type === 'password') {
			return 'input change keyup blur';
		} else if (type === 'hidden') {
			return 'input change';
		} else if (type === 'radio') {
			return 'input change click blur';
		} else if (type === 'number') {
			return 'input change keyup blur';
		} else if (type === 'range') {
			return 'input change keyup click blur';
		} else if (type === 'button') {
			return 'input change click blur';
		} else if (type === 'tel') {
			return 'input change keyup blur';
		} else if (type === 'url') {
			return 'input change keyup blur';
		} else if (type === 'date') {
			return 'input change keyup blur';
		} else if (type === 'datetime-local') {
			return 'input change keyup blur';
		} else if (type === 'month') {
			return 'vchange keyup blur';
		} else if (type === 'time') {
			return 'input change keyup blur';
		} else if (type === 'week') {
			return 'input change keyup blur';
		} else if (tag === 'select') {
			return 'change blur';
		} else if (tag === 'textarea') {
			return 'input change keyup blur';
		} else {
			return 'input change keyup click blur';
		}
	};

}(window.jQuery);
