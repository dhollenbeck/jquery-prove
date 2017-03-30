# DEVELOPER NOTES

## Stateful Validation

Prove saves the validation state of inputs in memory, but does this without saving a DOM reference. The reason we save the validation states of input is so that (future) async validations do not need to be re-valuated. Instead of saving a DOM reference we create a UUID that is saved as a data attribute (data-prove-uuid) on each form input. Later when that input needs to be validated we read the input's uuid and use the uuid to retreive the validation state of the input stored in memory.

### Initialization

On initialization of each input we create and save an uuid as a data attribute:
```javascript
var uuid = input.uuid();
```
### On Validation

During input validation we can retrieve the previous validation result using the uuid.

```javascript
var uuid = input.uuid();
var previous = prove.states[uuid];
```
Another option would be create a plugin which saves the validation state as json stringified data attribute.
```javascript
var previous = input.state(); // or input.store();
```

We also make use of a plugin to detect dirty inputs where the value has changed. The dirty plugin uses a hash algorithm to save a hash of the previous input's value to determine if the input value has changed since the last validation.
```javascript
var dirty = input.dirty();
```
## Deferred Validation

All validators would return a jQuery deferred. The deferred will resolve with a value result object:
```javascript
var input = $('#email');
var validation = input.proveRequired({
	field: 'fieldName',
	enabled: true,
	debug: true
});

validation.done(function(result) {
	console.log(result); // {"field": "fieldName", "uuid": "3df419ec-4c6b-4ba7-9b9f-68df0673714e", "valid": true}
});

```

When validating a field we need to iterate over multiple validators which will result in array of promises/deferreds.

```javascript
//Loop validators collecting an array of promises.
var master = $.Deferred();
var promises = [];
$.each(validators, function(name, config) {
	var isValidator, promise;
	isValidator = (typeof $.fn[name] === 'function');
	if (isValidator) {
		promise = input[name](config);
		promises.push(promise);
	}
});

// Combine promises into a single promise
var combined = $.when.apply($, promises);
combined.done(function() {
	var results = arguments; // The array of resolved objects as a pseudo-array
	var isValid = evaluate(results);
	master.resolve(isValid);
	console.log('resolved', isValid, results);
});
combined.fail(function() {
	console.log("async code failed so validation failed");
});
combined.progress(function() {
	console.log('progress');
});

// return master promise, which will resolve with true, false, undefined
return master;
```

## Specification
- Submit button
	- disabled on prove init
	- enabled on form valid
	- disabled on form invalid
- Input validation starting
	- On starting
		- trigger input status (validating) event
	- On valid
		- update state
		- trigger input validated event
	- On invalid
		- update state
		- trigger input validated event
- Form
	- On Initalize
		- input.initalize()
	- On Validate
		- using only states determine validation status
- Dynamically adding input
	- app code calls input.initalize()

