(function() {
	var form1 = $('form').eq(0);
	var form2 = $('form').eq(1);
	var cfg1 = {
		debug: true,
		fields: {
			email: {
				validators: {
					proveRequired: {
						debug: true,
						message: 'Your email is required.',
					}
				}
			}
		}
	};
	var cfg2 = {
		debug: true,
		fields: {
			password: {
				validators: {
					proveRequired: {
						debug: true,
						message: 'Your password is required.',
					}
				}
			}
		}
	};

	//form plugins
	form1.prove(cfg1).decorate('bootstrap');
	form2.prove(cfg2).decorate('bootstrap');

})();
