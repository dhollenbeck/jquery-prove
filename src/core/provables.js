!function($) {
	'use strict';

	// Called at input setup.
	$.fn.provablesSetup = function(fields) {

		var inputs = $();
		var form = $(this);
		fields = fields || {};

		// build selector
		$.each(fields, function(name, field) {

			var found = form.find(field.selector);

			found.each(function() {
				this.field = name;
				inputs.push(this);
			});
		});
		return inputs;
	};

	// Called during entire form validation.
	// Filter out multiple inputs like radios and checkboxes
	$.fn.provablesValidation = function(fields) {

		var inputs = $();
		var form = $(this);
		fields = fields || {};

		// build selector
		$.each(fields, function(fieldIndex, field) {

			var group = field.group;
			var found = form.find(field.selector);
			var names = found.distincts();
			var filtered, selector;
			var flag = true;

			if (flag) {
				// ungroup inputs by name if multiple dimensional array of inputs
				// and the field indicates the inputs should be grouped. This allows us
				// to support radios and checkboxes in a multiple dimension for inputs.
				if (names.length > 1 && group) {
					// ungroup by name
					$.each(names, function(index, name) {
						selector = '[name="' + name + '"]';
						filtered = found.filter(selector).filterables(group);
						filtered.each(function() {
							this.field = fieldIndex;
							inputs.push(this);
						});
					});
				} else {
					filtered = found.filterables(group);
					filtered.each(function() {
						this.field = fieldIndex;
						inputs.push(this);
					});
				}
			} else {
				filtered = found.filterables(group);
				filtered.each(function() {
					this.field = fieldIndex;
					inputs.push(this);
				});
			}
		});
		return inputs;
	};
	// Any field for which you might have multiple inputs of the same name (checkbox, radio, name="fields[]")
	// for which you want to be validated individually, you can set the field.group = false.

	// todo
	// However, in the case of radio inputs which are arrayed `field[index][foobar]` we want to ungroup by name.
	// For example, you could have inputs with names of:
	// - `field[0][foobar]`
	// - `field[0][foobar]`
	// - `field[1][foobar]`
	// - `field[1][foobar]`
	// - `field[2][foobar]`
	// - `field[2][foobar]`

	// which we would want to ungroup by input name and then apply filter function to
	// each group of indexed radio inputs.

	$.fn.filterables = function(group) {

		var found = $(this);
		var isRadio = found.is(':radio');
		var hasAtLeastOneChecked = (found.filter(':checked').length > 0);

		// determine how to handle multiple found
		var filtered = found.filter(function(index, element) {

			if (found.length === 0) {
				// No inputs found. Expect this is an unreachable condition, but
				// seems ok to filter out the not found input.
				return false;
			} else if (found.length === 1) {
				// We are only interested in filter multiple inputs,
				// so with a single found input nothing to filter here.
				return true;
			} else if (group === false) {
				// Field config indicates we should validate these inputs individually.
				return true;
			} else if (group === true) {
				// Field config indicates we should validate these inputs as a collection.
				// Therefore, only validate the first element.
				return (index === 0);
			} else if (isRadio) {
				if (hasAtLeastOneChecked) {
					// Since radio has at least one checked just validate the checked input.
					return $(element).is(':checked');
				} else {
					// Since radio has no checked inputs just validate the first radio input.
					return (index === 0);
				}
			} else {
				return true;
			}
		});

		return filtered;
	};
}(window.jQuery);
