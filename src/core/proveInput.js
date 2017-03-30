!function($) {
	'use strict';

	function clone(obj) {
		return $.extend({}, obj);
	}

	function last(arr) {
		return arr[arr.length - 1];
	}

	// pick validation result to return:
	// - the first result where result.validation === 'danger'
	// - or the last result in array
	function pickResult(results) {
		var pick = clone(last(results));
		$.each(results, function(index, result) {
			warnIncorrectResult(result);
			if (result.validation === 'danger') pick = clone(result);
		});
		return pick;
	}

	//return the first non-undefined result
	function singleResult(results) {
		var result;
		$.each(results, function(index, item) {
			if (item) {
				result = item;
				return false;
			}
		});
		return result;
	}

	function isPlugin(plugin) {
		var exist = ($.isFunction($.fn[plugin]));
		if (!exist) console.error('Missing validator plugin "%s".', plugin);
		return exist;
	}

	function warnIncorrectResult(result) {
		if (!('field' in result)) console.warn('Missing `field` property in validator ($.fn.' + result.validator + ') result.');
		if (!('validator' in result)) console.warn('Missing `validator` property in validator ($.fn.' + result.validator + ') result.');
		if (!('status' in result)) console.warn('Missing `status` property in validator ($.fn.' + result.validator + ') result.');
		if (!('validation' in result)) console.warn('Missing `validation` property in validator ($.fn.' + result.validator + ') result.');
		if (!('message' in result)) console.warn('Missing `message` property in validator ($.fn.' + result.validator + ') result.');
	}

	// validate a single input
	$.fn.proveInput = function(field, states, initiator) {

		var validators = field.validators || {};
		var input = $(this);
		var enabled = input.booleanator(field.enabled);
		var stateful = input.booleanator(field.stateful);
		var dirty = input.dirty(field.group);
		var uuid = input.uuid();
		var state = states[uuid];
		var result = {
			field: field.name,
			validator: undefined,
			status: 'validated',
			message: undefined
		};
		var dfd = $.Deferred();
		var promises = [];
		var combined;

		if (field.debug) {
			console.groupCollapsed('proveInput()', field.name, initiator);
			console.log('enabled', enabled);
			console.log('state', state);
			console.log('dirty', dirty);
			console.groupEnd();
		}

		//trigger event to mark the begining of validation
		input.trigger('status.input.prove', {
			field: field.name,
			status: 'validating'
		});

		// return early
		if (!enabled) {
			input.trigger('status.input.prove', result);
			states[uuid] = false;
			dfd.resolve('reset');
			return dfd;
		} else if (stateful && state && !dirty) {
			input.trigger('status.input.prove', state); //clone here?
			dfd.resolve(state.validation);
			return dfd;
		} else {

			// loop validators
			$.each(validators, function(validator, config) {

				config.field = field.name; //todo: perhaps config.name = field.name
				config.validator = validator;
				config.initiator = initiator; //event namespace or `prove`
				config.group = field.group;

				// invoke validator plugin
				if (!isPlugin(validator)) return false;
				var promise = input[validator](config);
				promises.push(promise);

				// break loop at first (non-promise) result.validation ailure
				return (promise.validation === 'danger')? false : true;
			});

			// wait for the validator promises to resolve
			combined = $.when.apply($, promises);

			combined.done(function() {
				var results = $.makeArray(arguments);
				var result = pickResult(results);

				if (field.debug) {
					console.groupCollapsed('ProveInput.done()');
					console.log('results', results);
					console.log('result', result);
					console.groupEnd();
				}

				dfd.resolve(result.validation);

				//save state
				if (stateful) states[uuid] = result;

				// Trigger event indicating validation result
				input.trigger('status.input.prove', result);
			});

			//handle promise failure
			combined.fail(function() {
				var results = $.makeArray(arguments);
				var result = singleResult(results);
				result.status = 'errored';
				console.log('fail input', result);
				input.trigger('status.input.prove', result);
				dfd.reject(); //todo: return something here?
			});

			// handle promise progress
			combined.progress(function() {
				var results = $.makeArray(arguments);
				var result = singleResult(results);
				result.status = 'progress';
				console.log('progress input', result);
				input.trigger('status.input.prove', result);
				dfd.notify();  //todo: return something here?
			});

			return dfd;
		}
	};
}(window.jQuery);
