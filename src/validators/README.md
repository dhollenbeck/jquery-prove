# Prove Validators

ProveJS comes with the following standard validators:
* **Synchronous Validators**
	* [proveCallback](#provecallback) - a general purpose callback validator.
	* [proveCompareTo](#provecompareto) - compare current field to another inputs value using comparison operators.
	* [proveEqualTo](#proveequalto) - compare current field to another inputs value.
	* [proveHtml](#provehtml) - input value must only contain allowed html tags.
	* [proveJson](#provejson) - input value must be in JSON format.
	* [proveLength](#provelength) - compare input value's **string** min and max length.
	* [proveMax](#provemax) - compare **numeric** input value's against a max value.
	* [proveMin](#provemin) - compare **numeric** input value's against a min value.
	* [provePattern](#provepattern) - compare input value against a regex value.
	* [provePrecision](#proveprecision) - compare input **numeric** value for decimal percision.
	* [proveRequired](#proverequired) - input value will be required.
	* [proveUnique](#proveunique) - input value must be unique compared to other inputs.
* **Asynchronous Validators**
	* [proveDeferredRemote](#provedeferredremote) - a general purpose asynchronous validator.
	* [proveMailgun](#provemailgun) - compare input value's against Mailgun's email validation API.

The standard validators should support must use cases. However, you can make your own custom validator (jQuery plugins) in just a couple of minutes.

## Design
An input validator is a jquery plugin which validates an input's value. There are two types of validators:
- **Synchronous** - immediately returns a result object,
- **Asynchronous** - returns a deferred/promise that will return a result object in the future.

The validator result object is defined below and is used as the event data which the decorators listen. Therefore, the result object is passed to the decorators to decorate the form inputs.

### Synchronous Validators
Synchronous validators should return the result object below:

```javascript
{
	field: 'fieldName',
	validator: 'validatorName',
	status: 'validated',
	validation: 'success', // 'success', 'danger', 'warning', 'reset'
	message: 'Your error message or error code used by the validation decorator.'
}
```

Where `validation` is either:
- **'reset'**
	- Indicates no validation happened. No validation should happen when:
		- validator is disabled
		- input has no value (except required validators).
	- Decorators will teardown any decoration.
- **'success'**
	- Indicates the input is valid.
	- Decorators will decorate for success.
- **'danger'**
	- Indicates the input is not-valid.
	- Decorators will decorate for failure.
- **'warning'**
	- Indicates the input is valid, but with a warning.
	- Decorators will decorate for warning.

### Asynchronous Validators
Asynchronous validators can return the following objects:
- result
	- Required: true,
	- Description: returned when the asynchrous validator is finished validating.
	- Code: dfd.resolve(result)
- progress
	- Required: false,
	- Description: periodically notify of progress.
	- Code: dfd.notify(progress)
- error
	- Required: false,
	- Description: if ajax error return error object.
	- Code: dfd.reject(error)

### Message
The message option passed to the validators can be either:
- a string representing the actual message to show to the user or
- an error code which the decorator has a list of predefined messages to decorate the form with (e.g. i18n support).

Your custom validators can change the message value.

# Reference
provejs-jquery provides some validator plugins out of the box.

```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				provePluginName: {
					// options
				}
			}
		}
	}
});
```

Below is an overview of these provided plugins.

## proveCallback
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveCallback: {
					debug: false,
					enabled: true,
					message: 'Invalid field value',
					callback: function(fieldValue) {
						return false;
					}
				}
			}
		}
	}
});
```

- options:
	- `debug`
		- **Type:** bool
		- **Required:** false
		- **Default:** false
		- **Description:** will print out some debug info in the developer console.
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** true
		- **Description:** Text to display when validation has failed.
	- `callback`
		- **Type:** function(string `fieldValue`) bool `valid`
		- **Required:** true
		- **Description:** Function invoked to test whether the field is valid. The function's first parameter is the current value of the field. The return value should be a boolean indicating whether the field passed validation.

## proveCompareTo
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveCompareTo: {
					enabled: true,
					message: 'Invalid field value',
					compareTo: '[name="field2"]',
					comparison: '!=',
					ignore: 'This value is ok'
				}
			}
		}
	}
});
```

- options:
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** true
		- **Description:** Text to display when validation has failed.
	- `compareTo`
		- **Type:** selector
		- **Required:** true
		- **Description:** Selector for an element whose value will be compared to the field.
	- `comparison`
		- **Type:** string
		- **Required:** true
		- **Description:** Arithmetic operator to use to compare the value of the main field to the value of `compareTo`.
	- `ignore`
		- **Type:** string
		- **Required:** false
		- **Description:** Value to ignore when comparing the two fields.

## proveDeferredMockup

Basic example of a deferred validator which is used for testing deferred validators.

```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveDeferredMockup: {
					debug: false,
					enabled: true,
					message: 'Invalid field value',
					validation: function(fieldValue) {
						return false;
					}
				}
			}
		}
	}
});
```

- options:
	- `debug`
		- **Type:** bool
		- **Required:** false
		- **Default:** false
		- **Description:** will print out some debug info in the developer console.
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** true
		- **Description:** Text to display when validation has failed.
	- `validation`
		- **Type:** function(string `fieldValue`) bool `valid`
		- **Required:** true
		- **Description:** Function invoked to test whether the field is valid. The function's first parameter is the current value of the field. The return value should be a boolean indicating whether the field passed validation.

## proveDeferredRemote
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveDeferredRemote: {
					debug: false,
					enabled: true,
					message: 'Invalid field value',
					url: function(fieldValue) {
						return '/validations/field1/' + fieldValue;
					},
					method: 'GET',
					data: function(fieldValue) {
						return {
							field1: fieldValue
						}
					}
				}
			}
		}
	}
});
```

- options:
	- `debug`
		- **Type:** bool
		- **Required:** false
		- **Default:** false
		- **Description:** will print out some debug info in the developer console.
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** false
		- **Description:** Text to display when validation has failed.
	- `url`
		- **Type:** string or function(string `fieldValue`) string `url`
		- **Required:** true
		- **Description:** Returns a url to a server endpoint which will test whether the field is valid. The function's first parameter is the current value of the field. The returned url becomes the `url` option of an `ajax` request (`$.ajax({url: url(fieldValue)})`). A server response status of 2** marks the field as valid. A status of 4** or 5** marks it as invalid.
	- `method`
		- **Type:** string
		- **Required:** false
		- **Default:** 'GET'
		- **Description:** HTTP method ('GET', 'POST', etc.) to use as the `method` option for `ajax` requests to the server (`$.ajax({method: method})`).
	- `data`
		- **Type:** string or function(string `fieldValue`) object `data`
		- **Required:** false
		- **Description:** Returns an object which will become the `data` option of an `ajax` request to the server (`$.ajax({data: data(fieldValue)})`).

## proveEqualTo
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveEqualTo: {
					enabled: true,
					message: 'Invalid field value',
					equalTo: '[name="field2"]'
				}
			}
		}
	}
});
```

- options:
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** true
		- **Description:** Text to display when validation has failed.
	- `equalTo`
		- **Type:** selector
		- **Required:** true
		- **Description:** Selector for an element whose value will be compared to the field.

## proveHtml
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveHtml: {
					enabled: true,
					tags: ['B', 'P'],
					message: function(allowed, invalids) {
						return 'Unsupported html tags of: ' + invalids.join(', ');
					}
				}
			}
		}
	}
});
```

- options:
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string | function
		- **Required:** true
		- **Description:** Text to display when validation has failed.
	- `tags`
		- **Type:** array
		- **Required:** true
		- **Description:** Array of html tag names to allow.

## proveJson
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveJson: {
					debug: false,
					enabled: true,
					message: 'Invalid field value'
				}
			}
		}
	}
});
```

- options:
	- `debug`
		- **Type:** bool
		- **Required:** false
		- **Default:** false
		- **Description:** will print out some debug info in the developer console.
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** true
		- **Description:** Text to display when validation has failed.

## proveLength
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveLength: {
					debug: false,
					enabled: true,
					message: 'Invalid field value',
					min: 6,
					max: 20
				}
			}
		}
	}
});
```

- options:
	- `debug`
		- **Type:** bool
		- **Required:** false
		- **Default:** false
		- **Description:** will print out some debug info in the developer console.
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** true
		- **Description:** Text to display when validation has failed.
	- `min`
		- **Type:** number
		- **Required:** false
		- **Description:** Minimum length of a valid field value.
	- `max`
		- **Type:** number
		- **Required:** false
		- **Description:** Maximum length of a valid field value.

## proveMailgun
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveMailgun: {
					debug: false,
					enabled: true,
					message: 'Invalid field value',
					apikey: 'pubkey-uuid',
					suggestions: true
				}
			}
		}
	}
});
```

- options:
	- `debug`
		- **Type:** bool
		- **Required:** false
		- **Default:** false
		- **Description:** will print out some debug info in the developer console.
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** false
		- **Description:** Text to display when validation has failed.
	- `apikey`
		- **Type:** string
		- **Required:** true
		- **Description:** Public API key provided by Mailgun account.
	- `suggestions`
		- **Type:** bool,
		- **Required:** false
		- **Default:** true
		- **Descrption:** Show suggestions provided by the Mailgun API.

## proveMax
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveMax: {
					debug: false,
					enabled: true,
					message: 'Invalid field value',
					max: 20
				}
			}
		}
	}
});
```

- options:
	- `debug`
		- **Type:** bool
		- **Required:** false
		- **Default:** false
		- **Description:** will print out some debug info in the developer console.
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** true
		- **Description:** Text to display when validation has failed.
	- `max`
		- **Type:** number
		- **Required:** true
		- **Description:** The field becomes invalid when its numeric value becomes higher than this number.

## proveMin
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveMin: {
					debug: false,
					enabled: true,
					message: 'Invalid field value',
					min: 6
				}
			}
		}
	}
});
```

- options:
	- `debug`
		- **Type:** bool
		- **Required:** false
		- **Default:** false
		- **Description:** will print out some debug info in the developer console.
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** true
		- **Description:** Text to display when validation has failed.
	- `min`
		- **Type:** number
		- **Required:** true
		- **Description:** The field becomes invalid when its numeric value becomes lower than this number.

## provePattern
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				provePattern: {
					debug: false,
					enabled: true,
					message: 'Invalid field value',
					regex: /^[-a-z' .,]{1,}$/i
				}
			}
		}
	}
});
```

- options:
	- `debug`
		- **Type:** bool
		- **Required:** false
		- **Default:** false
		- **Description:** will print out some debug info in the developer console.
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** true
		- **Description:** Text to display when validation has failed.
	- `regex`
		- **Type:** string or RegExp object
		- **Required:** true
		- **Description:** Regular expression to test on the value of the field.

## provePrecision
Basic example of a synchronous validator.

```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				provePrecision: {
					debug: false,
					enabled: true,
					message: 'Invalid field value'
				}
			}
		}
	}
});
```

- options:
	- `debug`
		- **Type:** bool
		- **Required:** false
		- **Default:** false
		- **Description:** will print out some debug info in the developer console.
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** true
		- **Description:** Text to display when validation has failed.

## proveRequired
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveRequired: {
					debug: false,
					enabled: true,
					message: 'Invalid field value',
					prefix: ''
				}
			}
		}
	}
});
```

- options:
	- `debug`
		- **Type:** bool
		- **Required:** false
		- **Default:** false
		- **Description:** will print out some debug info in the developer console.
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** true
		- **Description:** Text to display when validation has failed.
	- `prefix`
		- **Type:** string
		- **Required:** false
		- **Description:** Ignore the specified text prefix when doing validation. This feature is used when you preload a prefix in a textarea and do not let the user delete the prefix.

## proveUnique
```javascript
form.prove({
	fields: {
		field1: {
			validators: {
				proveUnique: {
					debug: false,
					enabled: true,
					message: 'Invalid field value',
					uniqueTo: '.others'
				}
			}
		}
	}
});
```
You can prove uniqueness in two ways. First if the fields you want to test for uniqueness all have the same name attribute then set `group: true` on the field config. If the fields you want to test uniqueness on have different names then use the validator option `uniqueTo` to specify a jquery selector.

- options:
	- `debug`
		- **Type:** bool
		- **Required:** false
		- **Default:** false
		- **Description:** will print out some debug info in the developer console.
	- `enabled`
		- **Type:** [booleanator](../../README.md#booleanator),
		- **Required:** false
		- **Default:** true
		- **Descrption:** will enable the field for validation while the booleanator is true.
	- `message`
		- **Type:** string
		- **Required:** true
		- **Description:** Text to display when validation has failed.
	- `uniqueTo`
		- **Type:** selector
		- **Required:** true
		- **Description:** All of the elements found with this selector will be tested agaisnt the main field. If any of their values matches the main field's value, the field will become invalid.
