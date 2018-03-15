(function() {

	var form = $('form');
	var status = $('#form-status');
	var events = $('#events');
	var all = [

		'status.form.prove',
		'status.input.prove'
		//'validate.input.prove' // internal event
	].join(' ');

	form.on('status.form.prove', function(event, data) {

		if (data.status !== 'validated') return;

		status.removeClass('alert-success');
		status.removeClass('alert-danger');
		status.removeClass('alert-warning');

		if (data.validation === true) {
			status.text('Valid Form');
			status.addClass('alert-success');
		} else if (data.validation === false) {
			status.text('Invalid Form');
			status.addClass('alert-danger');
		} else if (data.validation === undefined) {
			status.text('Reset Form');
			status.addClass('alert-warning');
		}
	});


	// stop form submit
	form.submit(function(event) {
		console.log('demo: stopping submit...');
		event.preventDefault();
	});

	if (events.length) {
		$('form').on(all, function(event, data) {
			data = data || {};
			events.prepend(eventRow(event, data));
		});
	}

	//private function
	function eventRow(event, data) {

		var input = $(event.target);
		var ts = new Date(event.timeStamp);
		var tr = $('<tr><td></td><td></td><td></td><td></td><td></td></tr>');
		var td = tr.find('td');
		var valid = validDecorator(data.validation);
		td.eq(0).text(event.type + '.' + event.namespace);
		td.eq(1).text(input.attr('name') || 'form');
		td.eq(2).text(data.status);
		td.eq(3).html(valid);
		td.eq(4).text(ts.toISOString().split('T')[1].replace('Z', ''));
		return tr;
	}

	function validDecorator(validation) {
		if (!validation) return '';
		if (validation === true) validation = 'success';
		if (validation === false) validation = 'danger';
		if (validation === 'reset') validation = 'default';
		if (validation === 'danger') validation = 'danger';
		return '<span class="label label-' + validation + '">' + validation + '</span>';
	}

})();
