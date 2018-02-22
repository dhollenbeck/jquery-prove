(function() {
	var form = $('form');
	var cfg = {
		fields: {
			methods: {
				group: true,
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
