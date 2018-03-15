(function() {

	//setup
	var form = $('form');
	var radio = form.find('[name="toggle"]');
	var select = form.find('[name="charge_descriptions"]');
	var monies = form.find('.money');
	var table = form.find('table#itemization');
	var wrapper1 = form.find('#wrapper-statement-attached');
	var wrapper2 = form.find('#wrapper-itemized-amounts');
	var regex = /^[-a-zA-Z0-9,.)( "!]*$/;
	var isItemization;

	var cfg = {
		fields: {
			toggle: {
				trigger: 'click',
				//group: true,
				stateful: false,
				validators: {
					proveRequired: {
						//debug: true,
						message: 'Choose one.',
					}
				}
			},
			amount_owed: {
				enabled: ':visible', //booleanator
				trigger: 'change', //<!-- maskmoney plugin triggers change
				validators: {
					proveRequired: {
						//debug: true,
						message: 'Amount required.',
					}
				}
			},
			// This field config will match single input.
			charge_descriptions: {
				enabled: '#summarize:checked', //booleanator (can't use :visible here)
				trigger: 'change', //<-- tagsinput plugin triggers change
				validators: {
					proveRequired: {
						//debug: true,
						message: 'Description is required.',
					},
					provePattern: {
						//debug: true,
						regex: regex,
						message: 'Invalid description.'
					}
				}
			},
			// This field config will match zero or more form inputs. By default prove will
			// validate multiple matched inputs individually.
			'dynamic1[]': {
				//debug: true,
				enabled: '#itemize:checked', //booleanator
				trigger: 'keyup',
				throttle: 100,
				sanitize: true,
				validators: {
					proveRequired: {
						//debug: true,
						message: 'Description is required.',
					},
					provePattern: {
						//debug: true,
						regex: regex,
						message: 'Invalid description.'
					},
					proveDeferredMockup: {
						//debug: true,
						delay: 3000,
						validation: 'success',
						error: false,
						message: 'Fake async validation successful.'
					}
				}
			}
		},
		submit: {
			debug: true
		}
	};

	var config1 = {
		trimValue: true,
		itemText: toLowerCase,
		tagClass: tagClass
	};
	var config2 = {
		allowZero: true
	};

	// form plugins
	// order does not matter
	form.prove(cfg);
	form.decorate('bootstrap', {
		prefixes: {
			danger: '<i class="fa fa-times"></i> '
		}
	});

	select.tagsinput(config1);
	monies.maskMoney(config2);

	//seup events
	radio.change(onRadioChange);
	table.on('change', 'input.amount', onItemizationChange);
	table.on('click', 'a.add-principle-row', addChargeRow);
	table.on('click', 'a.del-principle-row', delChargeRow);


	function onRadioChange() {
		var val = $(this).val();
		if (val === '1') {
			isItemization = false;
			wrapper1.show();
			wrapper2.hide();
			resetTable();
		} else {
			isItemization = true;
			wrapper2.show();
			wrapper1.hide();
			resetTags();
		}
	}

	function addChargeRow(event) {
		//console.log('addChargeRow()');

		event.preventDefault();
		var template = $('#row-principle-charge').text();
		var target = table.find('tr.active').eq(1);
		var html = $(template);
		var input = html.find('input').eq(0);
		var money = html.find('input').eq(1);

		//insert into dom
		target.before(html);

		//setup money mask
		money.maskMoney(config2);
	}

	function delChargeRow(event) {
		//console.log('delChargeRow()');
		event.preventDefault();
		var tr = $(event.target).closest('tr');
		var money = tr.find('input.money');
		var input = tr.find('input').eq(0);
		var money = tr.find('input').eq(1);

		//remove plugins
		money.maskMoney('destroy');

		tr.remove();

		onItemizationChange();
	}

	function resetTable() {
		table.find('input.money').val('0.00');
	}

	function resetTags() {
		//console.log('resetTags()');
		select.tagsinput('removeAll');
		select.validate();
	}

	function sumItemizationValues() {
		//console.log('sumItemizationValues()');
		var monies = table.find('.amount');
		var sum = 0;
		monies.each(function() {
			var money = $(this).val();
			var amount = parseFloat(money);
			sum = sum + amount;
		});
		return sum.toFixed(2);
	}

	function onItemizationChange() {
		var sum = sumItemizationValues();
		var summation = table.find('.summation');
		summation.val(sum);
	}


	function tagClass(item) {
		var isValid = regex.test(item);
		return (isValid)? 'label label-default' : 'label label-danger';
	}

	function toLowerCase(item) {
		return item.toLowerCase();
	}

})();
