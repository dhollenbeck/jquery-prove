(function() {
	var form = $('form');
	var email = $('#email');
	var cfg = {
		fields: {
			email: {
				debug: true,
				//trigger: 'keyup',
				throttle: 250,
				validators: {
					proveRequired: {
						//debug: true,
						enabled: '#optout:not(:checked)', // true, false, selector string, callback
						message: 'Your email is required unless you opt out.',
					},
					provePattern: {
						debug: true,
						regex: '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}',
						message: 'Invalid email address.' //optional, passed to decorator
					}
				}
			},
			file: {
				validators: {
					proveRequired: {
						message: 'A file is required.', //optional, passed to decorator
					}
				}
			},
			'fruit[]': {
				debug: true,
				trigger: 'click',
				group: true,
				validators: {
					proveRequired: {
						message: 'A fruit is required.',
					}
				}
			},
			dynamicField: {
				validators: {
					proveRequired: {
						state: true, //todo: what is this?
						message: 'This input does not exist, but might sometime in the future. When it does exist prove will validate it.',
					}
				}
			}
		}
	};

	form.on('click', '#optout', function() {
		// make email dirty so as to ensure
		// a fresh validation will happen.
		email.dirty(true);
		email.validate();
	});

	//form plugins
	form.prove(cfg);
	form.decorate('bootstrap');

})();
