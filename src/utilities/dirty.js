!function($) {
	'use strict';

	$.fn.dirty = function(makeDirty) {

		var el = $(this);
		var val = el.val() || '';
		var hash1, hash2, dirty;

		if ($.isArray(val)) val = val.toString();

		hash1 = el.data('prove-hash');
		hash2 = $.fn.hash(val);
		dirty = (hash1 !== hash2);

		// override dirty state
		if (makeDirty) {
			el.data('prove-hash', false);
			return true;
		} else if (el.is(':radio')) {
			return true;
		}

		if (dirty) el.data('prove-hash', hash2);
		return dirty;
	};
}(window.jQuery);
