// http://stackoverflow.com/questions/24846041/how-do-i-add-a-default-text-to-the-beginning-of-an-html-text-area
// http://jsfiddle.net/scribblemaniac/cueLV/2/
$.fn.textPrefix = function(options) {

	options = options || {};

	var el = $(this);
	var prefix = options.prefix || el.data('prefix');
	var values = new Array();

	function onKeydown(event) {
		values.push(this.value);
	}

	function onKeyup(event) {
		if (values[0] && values[0].substring(0, prefix.length) !=
			this.value.substring(0, prefix.length)) {
			this.value = values[0];
		}
		values = new Array();
	}

	function setup() {
		el.data('clear-value', prefix);
		if (!el.val()) el.val(prefix);
	}

	el.on('keydown', onKeydown);
	el.on('keyup', onKeyup);

	setup();
};


(function() {
	var form = $('form');
	var textarea = form.find('textarea');
	//var prefix = 'Finally, ';
	var cfg = {
		fields: {
			comment: {
				trigger: 'keyup',
				//throttle: 250,
				validators: {
					//proveRequired: {
						//prefix: prefix,
					//	message: 'Your comment is required.'
					//},
					//provePattern: {
					//	debug: true,
					//	regex: /[A-Za-z0-9,._%\+\- ]{1,255}/,
					//	message: 'Invalid comment.' //optional, passed to decorator
					//},
					proveHtml: {
						message: 'Tag is not allowed.',
						goodtags: ['B','P']
					}
				}
			}
		}
	};

	//form plugins
	form.prove(cfg);
	form.decorate('bootstrap');

	//textarea.textPrefix({
	//	prefix: prefix
	//});

})();
