(function() {

	//setup
	var form = $('form');
	var select = form.find('select');
	var cfg = {
		fields: {
			gender: {
				validators: {
					proveRequired: {
						message: 'The gender is required.',
					}
				}
			},
			browsers: {
				validators: {
					proveRequired: {
						message: 'Please choose 2-3 browsers you use for developing.',
					},
					proveLength: {
						min: 2,
						max: 3,
						message: 'Please choose 2-3 browsers you use for developing.'
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

})();
