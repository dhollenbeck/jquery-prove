(function() {

	//setup
	var form = $('form');
	var cfg = {
		fields: {
			email: {
				trigger: 'keyup',
				throttle: 250,
				//stateful: false,
				validators: {
					proveRequired: {
						debug: true,
						message: "The email address is required and can't be empty",
					},
					provePattern: {
						debug: true,
						regex: '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}',
						message: 'The input is not a valid email address'
					},
					proveDeferredMockup: {
						debug: true,
						delay: 500,
						validation: function(value) {
							if (value === 'you@example.com') {
								return 'success';
							} else {
								return 'danger';
							}
						},
						message: 'The email is not valid'
					}
				}
			}
		}
	};

	form.prove(cfg);
	form.decorate('bootstrap');

})();
