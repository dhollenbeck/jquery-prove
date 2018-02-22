(function() {
	var form = $('form');
	var email = $('[name="emails[]"]');
	var cfg = {
		fields: {
			emails: {
				group: true,
				trigger: 'keyup',
				validators: {
					provePattern: {
						debug: false,
						regex: '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}',
						message: 'Invalid email address.' //optional, passed to decorator
					},
					proveUnique: {
						debug: true,
						//uniqueTo: '[name="others"]',
						message: 'Not unique value.' //optional, passed to decorator
					}
				}
			}
		}
	};

	//form plugins
	form.prove(cfg);
	form.decorate('bootstrap');

})();
