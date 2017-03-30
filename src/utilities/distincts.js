!function($) {
	'use strict';

	function contains(str, arr) {
		return ($.inArray(str, arr) === -1)? false : true;
	}

	$.fn.distincts = function() {

		var names = [];

		this.each(function() {
			var name = this.name;
			var distinct = !contains(name, names);
			if (distinct) names.push(name);
		});

		return names;
	};

}(window.jQuery);
