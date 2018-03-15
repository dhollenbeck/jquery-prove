(function() {

	// check related input has a value
	$.fn.otherDescriptionRequired = function(options) {

		var message;
		var checkbox = $(this);
		var inputs = checkbox
			.closest('.form-group')
			.find('[type="checkbox"]:checked')
			.closest('.input-group')
			.find('[type="text"]');

		// loop each input
		var validation = 'success';
		inputs.each(function() {
			var input = $(this);
			var value = input.val();
			var hasValue = $.hasValue(value);
			if (!hasValue) validation = 'danger';
			return hasValue;
		});

		message = (validation === 'danger')? options.message : undefined;

		if (options.debug) {
			console.groupCollapsed('Validators.otherDescriptionRequired()', options.field);
			console.log('options', options);
			console.log('validation', validation);
			console.groupEnd();
		}

		return {
			field: options.field,
			validator: options.validator,
			status: 'validated',
			validation: validation,
			message: message
		};
	};

	// check related input has a value
	$.fn.otherDescriptionPattern = function(options) {

		var message;
		var checkbox = $(this);
		var inputs = checkbox
			.closest('.form-group')
			.find('[type="checkbox"]:checked')
			.closest('.input-group')
			.find('[type="text"]');

		// loop each input
		var validation = 'success';
		inputs.each(function() {
			var input = $(this);
			var val = input.val();
			var isValid = (options.regex).test(val);
			if (!isValid) validation = 'danger';
			return isValid;
		});

		if (options.debug) {
			console.groupCollapsed('Validators.otherDescriptionPattern()', options.field);
			console.log('options', options);
			console.log('validation', validation);
			console.groupEnd();
		}

		message = (validation === 'danger')? options.message : undefined;

		return {
			field: options.field,
			validator: options.validator,
			status: 'validated',
			validation: validation,
			message: message
		};
	};


	//setup
	var form = $('form');
	var select = form.find('select');
	var inputs = form.find('input[name="charges"]');
	var cfg = {
		fields: {
			// This field config will match multiple form inputs. Therefore, when the entire
			// form is validated we can either validate each individually or as a collection.
			// In this case we specify to validate the inputs as a single collection. When
			// we set `group` to true prove will only validate the first found
			// input. However, the live input validation may validate any of the inputs.

			// Since we are validating the inputs as a group the validators below need to
			// validate the group of inputs. The proveRequired already does this.
			checkboxes: {
				stateful: false,
				group: true,
				trigger: 'change',
				validators: {
					proveRequired: {
						//debug: true,
						message: 'Please choose browsers you use for developing.',
					},
					otherDescriptionRequired: {
						//debug: true,
						message: 'Please enter your browser name.',
					},
					otherDescriptionPattern: {
						//debug: true,
						regex: /^[-a-zA-Z0-9,.)( ]*$/,
						message: 'Invalid character.'
					}
				}
			}
		}
	};

	// form plugins
	// order does not matter
	form.decorate('bootstrap');
	select.multiselect();
	form.prove(cfg);

	form.on('keyup', '[name="charges"]', function(event) {
		//console.log('keyup');
		var input = $(this);
		var checkbox = input.closest('.input-group').find('input[type="checkbox"]');

		checkbox.validate();
	});

	form.on('change', '[name="checkboxes"]', function(event) {
		var checkbox = $(this);
		var checked = checkbox.is(':checked');
		var input = checkbox.closest('.input-group').find('input[type="text"]');
		var readonly = !!input.attr('readonly');

		if (!checked && !readonly) {
			//remove existing input group
			input.val('');
		}
	});

	// remove input group
	form.on('click', '.del-input-group', function(event) {
		$(this).closest('.input-group').remove();
		$('form').find('[name="checkboxes"]:first').validate();
	});

	// insert input group
	form.on('click', '.add-input-group', function(event) {
		var html = $('script#row').text();
		var group = $(this).closest('.form-group');
		var target = group.find('.input-group:last');
		target.after(html);
	});


})();
