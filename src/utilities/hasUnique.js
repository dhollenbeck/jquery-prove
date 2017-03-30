!function($) {
	'use strict';

	function getUniques(arr) {
		var n = {};
		var uniques = [];
		for (var i = 0; i < arr.length; i++) {
			var val = arr[i];
			if (!n[val]) {
				n[val] = true;
				uniques.push(val);
			}
		}
		return uniques;
	}

	function empties(str) {
		return (str.length > 0);
	}

	$.hasUnique = function(arr) {
		arr = $.makeArray(arr);
		arr = arr.map($.trim);
		arr = arr.filter(empties);
		var arr2 = getUniques(arr);
		return (arr.length === arr2.length);
	};
}(window.jQuery);
