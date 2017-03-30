!function($) {
	'use strict';

	//isProved can be true, false, undefined.
	function toggleState(isValid, isProved) {

		// temp hack
		if (isValid === 'success') isValid = true;
		if (isValid === 'danger') isValid = false;
		if (isValid === 'reset') isValid = undefined;

		if (isProved === false) {
			isValid = false;
		} else {
			if (isProved === true && isValid !== false) isValid = true;
		}
		return isValid;
	}

	function evaluate(results) {
		var isProved = undefined;
		$.each(results, function(index, result) {
			isProved = toggleState(result, isProved);
		});
		return isProved;
	}

	$.fn.proveForm = function() {

		var form = $(this);
		var prove = form.data('prove');
		var states = prove.states;
		var options = prove.options;
		var fields = options.fields;
		var promises = [];
		var dfd = $.Deferred();
		var combined;

		// Loop inputs and validate them. There may be multiple
		// identical inputs (ie radios) for which we do not want to
		// validate individually but rather as a group. Therefore,
		// $.fn.provablesValidation() will filter these multiples
		// for us unless less field.group is false.
		form.provablesValidation(fields).each(function() {
			var input = $(this);
			var field = fields[this.field];
			var initiator = 'prove';
			var promise = input.proveInput(field, states, initiator);
			promises.push(promise);
		});

		// wait for all field promises to resolve
		combined = $.when.apply($, promises);

		combined.done(function() {
			var results = $.makeArray(arguments);
			var validation = evaluate(results);

			if (options.debug) {
				console.groupCollapsed('Proveform.done()');
				console.log('results', results);
				console.log('validation', validation);
				console.groupEnd();
			}

			// Trigger event indicating validation result
			form.trigger('status.form.prove', {
				status: 'validated',
				validation: validation
			});

			dfd.resolve(validation);
		});
		combined.fail(function() {
			console.log('fail form', arguments);
			dfd.reject();
		});
		combined.progress(function() {
			console.log('progress');
		});

		return dfd;
	};
}(window.jQuery);
