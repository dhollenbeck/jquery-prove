/**
 * jQuery Prove (https://github.com/dhollenbeck/provejs-jquery)
 */
!function($) {
	'use strict';

	function extend(obj1, obj2) {
		return $.extend(true, {}, obj1, obj2);
	}

	// Prove constructor
	function Prove(form, options) {

		this.$form = $(form);
		this.options = extend(this.defaults, options);

		if (options.debug) {
			console.groupCollapsed('Prove()');
			console.log('options', options);
			console.groupEnd();
		}

		this.checkOptions();
		this.setupFields();
		this.setupInputs();
		this.setupForm();
		this.setupSubmitIntercept();

		this.$form.trigger('status.form.prove', {
			status: 'setup'
		});
	}

	//$.Prove.prototype.defaults = {
	Prove.prototype = {

		defaults: {
			submit: {
				selector: 'button:submit',
				validate: true, //booleanator, validate on submit, but not if element has class `skip-validation`
				enabled: true //booleanator
			}
		},
		states: {},
		constructor: Prove,
		destroy: function() {
			this.teardownFields();
			this.teardownForm();
			this.$form.data('prove', false);
			this.$form.trigger('status.form.prove', {
				status: 'destroy'
			});
		},
		checkOptions: function() {

			//return early
			//if (!this.options.debug) return;

			//check prove options here
			if (!this.options.fields) console.warn('Missing fields option.');

			$.each(this.options.fields, function(index, field) {

				if (!field.validators) console.warn('Missing validators option for field "%s".', index);
			});
		},
		//todo: $.fn.proveIntercept()
		setupSubmitIntercept: function() {

			if (!this.options.submit) return;

			var selector = this.options.submit.selector;
			var handler = $.proxy(this.submitInterceptHandler, this);

			// we intercept the submit by bind `click` rather than ':submit'
			this.$form.on('click', selector, handler);
		},
		submitInterceptHandler: function(event) {

			var form = this.$form;
			var options = this.options;
			//console.log('options', options);
			var shouldValidate = form.booleanator(options.submit.validate);
			var enabledSubmit = form.booleanator(options.submit.enabled);
			var validation = (shouldValidate)? form.proveForm() : $.when();
			var alreadySubmitted = !!form.attr('nosubmit');
			var debug = options.submit.debug;

			if (debug) {
				console.groupCollapsed('Prove.submitInterceptHandler()'); /* eslint-disable indent */
					console.log('shouldValidate', shouldValidate);
					console.log('enabledSubmit', enabledSubmit);
					console.log('alreadySubmitted', alreadySubmitted);
				console.groupEnd(); /* eslint-enable indent */
			}

			validation.done(function(isValid) {

				// The combined deferred returned from $.fn.proveForm() has resolved.
				// The resolved value `isValid` will be either true, false, undefined.
				var addAttr = (isValid && !alreadySubmitted);
				var stop = (isValid === false || !enabledSubmit || alreadySubmitted);

				if (debug) {
					console.groupCollapsed('Prove.submitInterceptHandler.done()'); /* eslint-disable indent */
						console.log('isValid', isValid);
						console.log('alreadySubmitted', alreadySubmitted);
						console.log('addAttr', addAttr);
						console.log('stop', stop);
					console.groupEnd(); /* eslint-enable indent */
				}

				if (addAttr) {

					// Add attribute to disable double form submissions.
					form.attr('nosubmit', true);

					// trigger event - for decorator
					form.trigger('status.form.prove', {
						status: 'submit',
						validated: shouldValidate
					});
				}

				// submit the form
				if (!stop) form.submit();
			});

			validation.fail(function() {
			});

			validation.progress(function() {
			});

			// Stop form submit event because we need
			// to wait for the deferreds to resolve.
			event.preventDefault();
		},
		//return jquery selector that represents the element in the DOM
		domSelector: function(field, name) {
			return (field.selector)
				? field.selector
				: '[name="' + name + '"]';
		},
		setupForm: function() {
			this.$form.lint();
			this.html5NoValidate(true);
			//this.bindDomFormEvents();
		},
		teardownForm: function() {
			this.html5NoValidate(false);
			//this.unbindDomFormEvents();
		},
		setupFields: function(options) {

			var opts = options || this.options;
			var fields = opts.fields || {};
			var that = this;

			$.each(fields, function(name, field) {

				var selector = that.domSelector(field, name);
				var input = that.$form.find(selector);
				var trigger = input.proveTriggers();

				// console.groupCollapsed('setupInputs()');
				// console.log('field', field);
				// console.log('trigger', trigger);
				// console.groupEnd();


				// augment field
				field.name = name;
				field.selector = that.domSelector(field, name);
				field.trigger = field.trigger || trigger;

				that.bindLiveValidationEvents(field);
				that.bindFieldProveEvent(field);
			});
		},
		teardownFields: function(options) {

			var opts = options || this.options;
			var fields = opts.fields || {};
			var that = this;

			//console.log('teardownFields()');

			$.each(fields, function(name, field) {
				that.unbindLiveValidationEvents(field);
				that.unbindFieldProveEvent(field);

				that.$form.find(field.selector).trigger('status.input.prove', {
					field: name,
					status: 'destroy'
				});
			});
		},
		html5NoValidate: function(state) {
			this.$form.attr('novalidate', state);
		},
		setupInputs: function() {

			var form = this.$form;

			form.provablesSetup(this.options.fields).each(function() {

				var input = $(this);
				var field = this.field;

				input.uuid();
				input.trigger('status.input.prove', {
					field: field,
					status: 'setup'
				});
			});
		},
		/**
		* DOM Input Events Listener
		*/
		bindLiveValidationEvents: function(field) {

			var el = this.$form;
			var handler = $.proxy(this.liveEventHandler, this);
			var data = clone(field);
			var wait = field.throttle || 0;
			var throttled = window._.throttle(handler, wait, {leading: false});

			// honor request to disable live validation
			if (field.trigger === false) return;

			el.on(field.trigger, field.selector, data, throttled);
		},
		unbindLiveValidationEvents: function(field) {

			var el = this.$form;

			// http://api.jquery.com/off/
			el.off(field.trigger, field.selector);
		},
		liveEventHandler: function(event) {
			var input = $(event.target);
			var field = event.data;
			var initiator = event.type;
			input.proveInput(field, this.states, initiator);
		},
		/**
		* DOM Form Events Listener
		*/
		//bindDomFormEvents: function() {
		//	var handler = $.proxy(this.proveEventHandler1, this);
		//	this.$form.on('validate.form.prove', handler);
		//},
		//unbindDomFormEvents: function() {
		//	this.$form.off('validate.form.prove');
		//},
		proveEventHandler1: function(event) {
			event.preventDefault();
			this.$form.proveForm();
		},
		/**
			Bind Event 'validate.input.prove'
			https://github.com/dhollenbeck/provejs-jquery#event-validatefieldprove

			The concern with this code is that for every prove field we bind a new
			event handler on the form container. The reason we do this because we
			also bind the field config (as event data) to the event so the event handler
			knows the field. Could the event handler determine the field config another way?

			Option 1: Can we determine from event target which field config to use?
			1. try the input.attr('name') to match field name.
			2. does any of the field config selectors match this input?
				var name = input.attr('name');
				$.each(fields, function(field, config) {
					if (name === field || input.is(config.selector)) // found correct field
				})
			option 2: require the code that triggers the validate event to pass in
			the field name: input.trigger('validate.input.prove', {field: 'fieldName'})

		*/
		bindFieldProveEvent: function(field) {

			var handler = $.proxy(this.proveEventHandler2, this);
			var data = clone(field);

			this.$form.on('validate.input.prove', field.selector, data, handler);
		},
		unbindFieldProveEvent: function(field) {
			this.$form.off('validate.input.prove', field.selector);
		},
		proveEventHandler2: function(event) {
			event.preventDefault();
			var input = $(event.target);
			var field = event.data;
			var initiator = event.type;
			input.proveInput(field, this.states, initiator);
		}
	};

	$.fn.prove = function(option, parameter, extraOptions) {

		return this.each(function() {

			var form = $(this);
			var prove = form.data('prove');
			var options = typeof option === 'object' && option;
			var isInitialized = !!prove;

			// either initialize or call public method
			if (!isInitialized) {
				// initialize new instance
				prove = new Prove(this, options);
				form.data('prove', prove);
				form.trigger('initialized.prove');
			} else if (typeof option === 'string') {
				// call public method
				// todo: warn if public method does not exist
				prove[option](parameter, extraOptions);
			} else {
				throw new Error('invalid invocation.');
			}
		});
	};

	$.fn.prove.Constructor = Prove;

	function clone(obj) {
		return $.extend({}, obj);
	}

}(window.jQuery);
