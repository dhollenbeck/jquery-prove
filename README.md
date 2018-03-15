![Form Image](./media/logo.png)
> A jQuery plugin for client-side validation of html forms.

![Form Image](./media/form.png)

## Introduction

provejs-jquery is a client-side form validation plugin:

- Input [validators](./src/validators) are jQuery plugins.
- Input [decorators](./src/decorators) are jQuery plugins.
- Validators share data with decorators via events.
- Validators can be:
	- synchronous - return result immediately.
	- asynchronous - return jquery deferred which returns result later.
- Delegated events to the form so the form DOM can be modified at anytime.
- Explict control over configuration options via dynamic [booleanators](#booleanator).
- Modular design via a suite of jQuery [utility plugins](./src/utilities).
- Live and form submit validation.
- Stateful validations.
- Input sanitization.
- Meets accessibility standards Section 508 and WCAG 2.0 (A, AAA, AAAA).
- Open source MIT license.

## Table Contents
- [Installation](#install)
- [Examples](#examples)
- [Options](#prove-options)
- [Validators](#prove-validators)
- [Decorators](#prove-decorators)
- [Methods](#prove-methods)
- [Events](#prove-events)
- [Destroy](#destory)
- [Roadmap](#roadmap)

## Install

You can install `provejs-jquery` in your project using `npm` or directly downloading the distribution files.

```bash
npm install provejs-jquery --save-dev
```

After using using npm install you should include the distribution files in your project's build process.

## Examples

Please see [examples folder](./examples).

## Prove Options

###  Prove Options

Prove accepts only a single options config.

```javascript
form.prove({
	debug: false,
	fields: {
		// see fields options below
	},
	submit: {
		// see submit options below
	}
});
```

- `debug`
	- **Type:** bool,
	- **Required:** false,
	- **Default:** false,
	- **Description:** will print out debug info in the developer console.
- `fields`
	- **Type:** object,
	- **Required:** true,
	- **Description:** defines the field validations to be performed. See below for more details.
- `submit`
	- **Type:** object,
	- **Required:** false,
	- **Description:** defines the submit intercept handler options. See below for more details.

### Field Options
```javascript
form.prove({
	fields: {
		field1: {
			debug: false,
			enabled: true,
			selector: '[name="field1"]',
			trigger: 'click change',
			stateful: true,
			sanitize: true,
			group: false,
			validators: {
				// see validator options
			}
		},
		field2: {
			// ...
		},
		field3: {
			// ...
		}
	}
});
```

- `debug`
	- **Type:** bool
	- **Required:** false,
	- **Default:** false,
	- **Description:** will print out some debug info in the developer console. Debug defaults to false.
- `enabled`
	- **Type:** booleanator,
	- **Required:** false,
	- **Default:** true,
	- **Descrption:** will enable the field for validation. A value of ':visible' will only validate the input if the input if visible. A [booleanator](#booleanator) is something (bool, selector, sudo-selector, function) that evaluates to either true or false. So for example, you specify enabled: ':visible' and the field config will be enabled when the input is visible. Or perhaps, enable validation when the input is not empty by setting enabled to ':filled'.
- `selector`
	- **Type:** string,
	- **Required:** false,
	- **Default:** '[name="field"]',
	- **Description:** jQuery selector which you can shift the context of the validation.
- `trigger`
	- **Type:** string or false,
	- **Required:** false,
	- **Default:** 'change keyup click blur',
	- **Description:** The events on which you want to live validation to happen. A value of false will disable live validation. The default value for trigger changes on two conditions 1) input type and 2) if the input is already in the form DOM at the time `form.prove()` is called. In other words, if you are dynamically inserted your form inputs after `form.prove()` than you should specify the event trigger values. If you are not dynamically inserted form inputs than you can all prove to determine the live event triggers. See $.fn.proveTriggers() for details on the default triggers.
- `throttle`
	- **Type:** int,
	- **Required:** false,
	- **Default:** 0,
	- **Description:** The number of milliseconds to throttle (aka debounce) live validation.
- `stateful`
	- **Type:** bool,
	- **Required:** false,
	- **Default:** true,
	- **Description:** provejs-jquery is a stateful validator. You can disable stateful validation by setting stateful to false. Prove hashes the input value to determine if the input value has changed since last validation. Prove does this stateful validation without keeping a DOM reference to any inputs.
- `sanitize`
	- **Type:** bool or string,
	- **Required:** false,
	- **Default:** false,
	- **Description:** provejs-jquery can sanitize your input values. provejs-jquery has a default sanitizer plugin ($.fn.sanitize) which replaces common MS Word unicode characters with their equivalent ASCII characters. You can replace the default sanitizer plugin with your own or specify a specific sanitizer for each input field using a string value which represents the plugin name.
- `group`
	- **Type:** bool,
	- **Required:** false,
	- **Default:** false for all but radio inputs,
	- **Description:** should provejs-jquery validate the found inputs as a group or validate the found inputs indivdually.

### Validator Options

Prove has a powerful set of validators. A validator is just a jquery plugin. See [validators](./src/validators) for more information.

```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveRequired: {
					debug: true, // optional (bool), defaults to false
					enabled: true, //optional (booleanator), defaults to true
					message: 'Message to pass to the decorator.'
				},
				provePattern: {
					regex: /^[my regex pattern]$/,
					message: 'Message to pass to the decorator'
				},
				// ...
			}
		},
		field2: {
			// ...
		},
		field3: {
			// ...
		}
	}
});
```
Each validator has it's own set of options but below is a set of the common options to all prove validators.
- `debug`
	- **Type:** bool,
	- **Required:** false,
	- **Default:** false,
	- **Description:** Will enalbe the validator to print debug information in the developer console.
- `enabled`
	- **Type:** booleanator,
	- **Required:** false,
	- **Default:** true,
	- **Description:** enable or disable validation depending on the value of the booleanator.
- `message`
	- **Type:** string,
	- **Required:** true,
	- **Description:** This string is passed into the validator which allows your custom validators to modifiy it. Utlimately, this string value is passed to the decorators via the event data.

### Submit Options

provejs-jquery uses a submit intercept handler which ensures successful form validation before allowing the form to submit. The submit intercept handler is bound by default to `form.on('click', ':submit', handler)` so really the intercept handler is really a click handler. The submit intercept handler accepts the following options:
```javascript
form.prove({
	fields: {},
	submit: {
		selector: 'button:submit',
		validate: true,
		enabled: true,
	}
})
```
Where:
- `debug`
	- **Type:** bool,
	- **Required:** false,
	- **Default:** false,
	- **Description:** Will enalbe the submit intercept handler to print debug information in the developer console.
- `selector`
	- **Type:** - string,
	- **Required:** - false,
	- **Default:** - 'button:submit',
	- **Description:** - jquery selector used to bind the submit intercept handler.
- `validate`
	- **Type**: - booleanator,
	- **Required:** - false,
	- **Default:** - true,
	- **Description:** - determines if validation should happen when the intercept handler is invoked. If you want the form to submit without validation then set this to a value of false, 'button:submit:not('.skip-validation')' and add class 'skip-validation' (see [booleanator](#booleanator)) or your code could just call `form.submit()'.
- ` enabled`
	- **Type**: - booleanator,
	- **Required**: false,
	- **Default**: true,
	- **Description**: Enables the form to submit after it validates true.

Should you want to stop the normal form submission you will need to bind a handler to the form submit event:

```javascript
form.submit(function(event){
	event.preventDefault(); // stop form submit

	//do something else, like ajax submission of form
});
```

Should you want to have a form with no submit button you will need to submit the form via ajax. You can do this by adding a form submit handler.
```js
form.submit(function(e) {

	// stop form from submitting without validation
	e.preventDefault();

	// validate entire form
	var url = '/your/server/path';
	var dfd = form.validate();
	var data = {
		field1: field1.val()
	};

	// wait for validation to complete
	dfd.done(function(isValid){
		if (isValid !== false) {
			// submit data via ajax
			$.post(url, data);

			// update ui here
		}
	});
});
```


## Prove Validators

Input validation is handled by jQuery [validator plugins](./src/validators).

## Prove Decorators

Form decoration is handled by jQuery [decorator plugins](./src/decorators).

## Prove Methods

The form will automatically be validated when the user clicks the submit button. However, you can programatically validate the form:
```javascript
var dfd = form.validate();
dfd.done(function(isValid){
	console.log('validation', isValid);
});
```
Your code can also validate an input.
```javascript
input.validate(); //returns chainable input reference
```
If you want to by pass validation and immediately submit the form:
```javascript
form.submit();
```

## Prove Events

Prove is a publisher of events. Events are triggered on either the input or the form to share data with the decorators.
- [status.form.prove](./EVENTS.md#) - triggered on the **form**
- [status.input.prove](./EVENTS.md#) - triggered on the **input**

Please see [events](./EVENTS.md) for more details.

## Destroy

You can remove the Prove plugin by either:

```javascript
form.data('prove').destroy();
```
or

```javascript
form.remove();
```

## Booleanator

Many of the Prove options are booleanators. A booleanator is a dynamic configuration option which is evaluated by Prove immediately before it is used. It can be defined as either:

- **Bool:**
	- Evaluation: uses the bool value.
	- Values: true or false,
- **jQuery DOM Selector:**
	- Evaluation: if the DOM selection returns any elements then it evaluates to true otherwise false.
	- Context: the context of the DOM selection is the window.document.
	- Examples: 'fieldset#section:visible', 'input[type="hidden"]:empty', '#other-checkbox:checked'
- **jQuery DOM Pseudo-Selector:**
	- Evaluation: if the DOM selection returns any elements then it evaluates to true otherwise false.
	- Context - the context of the DOM selection is the input.
	- Examples: ':visible', ':empty'
- **Javascript Function:**
	- Evaluation: function should return either true or false and accepts no inputs.
	- Example: function(){ return window.myVar; }

To illustrate the power of a booleanator consider the following example where the user is required to enter EITHER a phone number or email address:
```javascript
form.prove({
	fields: {
		email: {
			validators: {
				proveRequired: {
					enabled: '[name="phone"]:blank', //<=== booleanator
					message: 'Please enter the contact email or phone number below.'
				},
				provePattern: {
					regex: patterns.commons.email,
					message: 'Please enter a valid email address.'
				}
			}
		},
		phone: {
			validators: {
				proveRequired: {
					enabled: '[name="email"]:blank', //<=== booleanator
					message: 'Please enter the contact phone or email address above.'
				},
				provePattern: {
					regex: patterns.commons.phone,
					message: 'Please enter a valid phone number.'
				}
			}
		}
	}
});
form.decorate('bootstrap');
```


## Contributing

### Setup

```bash
npm install grunt
npm install grunt-eslint
npm install grunt-contrib-concat
npm install grunt-contrib-uglify
```

### Lint
```bash
grunt lint
```

### Build
```bash
grunt build
```

## Roadmap

### NPM
http://blog.npmjs.org/post/112712169830/making-your-jquery-plugin-work-better-with-npm

### Mailcheck

https://github.com/mailcheck/mailcheck#usage-without-jquery

### Unobtrusive Configuration

Perhaps support unobtrusive configuration via $.fn.proveConfig().
```javascript
var options = form.proveConfig();
form.prove(options);

// or if you dynamically insert an input, but for some reason did not already config the field
input.proveConfig();
```

### Unit Tests

Need unit tests.
* http://qunitjs.com/
* https://www.sitepoint.com/unit-test-javascript-mocha-chai/
* https://github.com/rstacruz/jsdom-global
* http://digitalbush.com/2011/03/29/testing-jquery-plugins-with-node-js-and-jasmine/
* https://gist.github.com/yairEO/d281bf017d203556f96c
* https://github.com/Verba/jquery-readyselector/blob/master/test/jquery.readyselector_spec.js
* https://sean.is/writing/client-side-testing-with-mocha-and-karma/
* http://codeutopia.net/h/subscribe/
* https://coderwall.com/p/qaebwq/running-mocha-tests-without-a-browser-not-even-phantomjs

### FAQ

Create an FAQ of frequenty asked questions and answers.
