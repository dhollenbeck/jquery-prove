(function() {

	//setup
	var form = $('form');
	var select = form.find('[name="field"]');
	var regex = /^[-a-zA-Z0-9,.)( ]*$/;
	var tags = {
		trimValue: true,
		itemText: toLowerCase,
		tagClass: tagClass
	};
	var validated = {
		fields: {
			field: {
				enabled: true, //booleanator
				trigger: 'change', //tagsinput plugin triggers `change` event which in turn triggers field validation
				validators: {
					proveRequired: {
						message: 'Description is required.',
					},
					provePattern: {
						regex: regex,
						message: 'Invalid description.'
					}
				}
			}
		}
	};

	//form plugins
	form.decorate('bootstrap');
	form.prove(validated);
	select.tagsinput(tags);

	function tagClass(item) {
		var isValid = regex.test(item);
		return (isValid)? 'label label-default' : 'label label-danger';
	}

	function toLowerCase(item) {
		return item.toLowerCase();
	}

})();
