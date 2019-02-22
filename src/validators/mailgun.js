!function($) {
	'use strict';

	$.fn.proveMailgun = function(options) {

		var input = $(this);
		var value = input.vals();
		var hasValue = $.hasValue(value);

		var field = options.field;
		var validator = options.validator;
		var enabled = $('body').booleanator(options.enabled);
		var debug = options.debug;
		var apikey = options.apikey;
		if (options.suggestions === undefined) options.suggestions = true;

		var dfd = $.Deferred();
		var result = {
			field: field,
			validator: validator,
			status: 'validated',
			message: undefined
		};

		function logInfo(additions) {

			console.groupCollapsed('Validator.proveMailgun()', field); /* eslint-disable indent */
				console.log('options', options);
				console.log('input', input);
				console.log('value', value);
				console.log('enabled', enabled);
				console.log('apikey', apikey);
				console.log('suggestions', options.suggestions);
				console.log('validation', result.validation);
				$.each(additions, function(name, value) {
					console.log(name, value);
				});
			console.groupEnd(); /* eslint-enable indent */
		}

		if (!enabled) {
			result.validation = 'reset';
			if (debug) logInfo();
			dfd.resolve(result);

		} else if (!hasValue) {
			// All validators are optional except for `required` validator.
			result.validation = 'success';
			if (debug) logInfo();
			dfd.resolve(result);

		} else {
			$.ajax({
				type: 'GET',
				url: 'https://api.mailgun.net/v2/address/validate?callback=?',
				data: {
					address: value,
					api_key: apikey
				},
				dataType: 'jsonp',
				crossDomain: true
			})
			.done(function(data) { // eslint-disable-line indent
				var is_valid = data.is_valid; // eslint-disable-line indent
				var did_you_mean = data.did_you_mean; // eslint-disable-line indent
				var confident = !did_you_mean; // eslint-disable-line indent

				if (is_valid && confident) { // eslint-disable-line indent
					result.validation = 'success'; // eslint-disable-line indent

				} else if (is_valid && !confident) { // eslint-disable-line indent
					result.validation = 'success'; // eslint-disable-line indent
					if (options.suggestions) result.message = 'Valid email, but did you mean ' + did_you_mean + '?'; // eslint-disable-line indent

				} else { // eslint-disable-line indent
					result.validation = 'danger'; // eslint-disable-line indent

					if (options.suggestions && did_you_mean) { // eslint-disable-line indent
						result.message = options.message + ' Did you mean ' + did_you_mean + '?'; // eslint-disable-line indent
					} else { // eslint-disable-line indent
						result.message = options.message; // eslint-disable-line indent
					} // eslint-disable-line indent
				} // eslint-disable-line indent

				if (debug) logInfo({data: data}); // eslint-disable-line indent
				dfd.resolve(result); // eslint-disable-line indent
			}) // eslint-disable-line indent
			.fail(function(xhr) { // eslint-disable-line indent
				var err = xhr.responseText; // eslint-disable-line indent

				result.validation = 'danger'; // eslint-disable-line indent
				if (options.suggestions) { // eslint-disable-line indent
					result.message = err; // eslint-disable-line indent
				} else { // eslint-disable-line indent
					result.message = options.message; // eslint-disable-line indent
				} // eslint-disable-line indent

				if (debug) logInfo({err: err}); // eslint-disable-line indent
				dfd.resolve(result); // eslint-disable-line indent
			}); // eslint-disable-line indent
		}

		return dfd;
	};
}(window.jQuery);
