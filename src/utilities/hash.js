!function($) {
	'use strict';

	//http://stackoverflow.com/a/26057776/2620505
	function hashCode(str) {
		var hash = 0;
		var i, char;
		if (str.length == 0) return hash;
		for (i = 0; i < str.length; i++) {
			char = str.charCodeAt(i);
			hash = ((hash<<5)-hash)+char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	}

	$.fn.hash = function(str) {
		str = (str)? str : $(this).text();
		return hashCode(str);
	};
}(window.jQuery);
