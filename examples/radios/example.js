(function() {
	var form = $('form');
	var cfg = {
		fields: {
			field: {
				trigger: 'change',
				validators: {
					proveRequired: {
						debug: true,
						message: 'Your selection is required.',
					}
				}
			}
		}
	};

	//form plugins
	form.prove(cfg);
	form.decorate('bootstrap');

})();
