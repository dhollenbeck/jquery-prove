!function($) {
	'use strict';


	// todo: at somepoint pass in options which toggle `select` selected options between:
	// 1. setting selected = 0
	// 2. setting selected = -1

	$.fn.clear = function() {
		return this.each(function() {

			var el = $(this);
			var type = this.type;
			var tag = this.tagName.toLowerCase();
			var clear = el.data('clear');
			var value = el.data('clear-value');
			if (value === undefined) value = '';

			if (type == 'text' || type == 'password' || tag == 'textarea' || type == 'hidden') {
				this.value =  value;
			} else if (type == 'checkbox' || type == 'radio') {
				this.checked = false;
			} else if (tag == 'select') {
				this.selectedIndex = 0;
			} else if (clear === 'hide') {
				this.style.display = 'none';
				return $(':input, [data-clear]', this).clear();
			} else if (clear === 'show') {
				this.style.display = 'block';
				return $(':input, [data-clear]', this).clear();
			} else {
				return $(':input, [data-clear]', this).clear();
			}

			// trigger event to have decorators reset decoration
			$(this).trigger('status.input.prove', {
				status: 'validated',
				validation: 'reset'
			});
		});
	};

}(window.jQuery);
