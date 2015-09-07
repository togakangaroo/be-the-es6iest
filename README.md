# Talk Outline

* demo app
* create app.js
	* Implement
		* no configuration object
		* add and clear
		* maybe not implement this at all? Have it ready to go
	* Demonstrated
		* `const`, `let`
		* template literal
		* multiline arrow functions
		* importing a module
	* Note
		* Prewrite
		* Not using jquery because..eh..
		* modules so no need for IIFE scoping
		* all this stuff so far is cool but won't make your life easier
* create `createNotificationQueue` shell
	* Implement
		* just the exported function
		* return `{add, clear}`
	* Demonstrated
		* simple json objects
		* object methods
	* Note
		* dear god, no need for new
* modify queue and `showNotifications`
	* Implement
		* `let queue`
		* `clear` - reset `queue`
		* `add` - `queue = [...queue, msg]`
		* `add` - ensure only **5** large
		* `showNotifications` simply `console.log`s
	* Demonstrated
		* `let`
		* spread operator into array
		* function hoisting
	* Note
		* You could `push` and `shift` and `splice` but I don't like it
* create ui to show elements
	* Implement
		* `const container = createElement('ol')`	
		* `document.body.appendChild(container)`
		* `createElement` in `dom-utilities`
		* `showNotifications`
			* create `itemsHtml` and set container
			* call `showTemporarily` - already implemented
	* Demonstrated
		* single-line arrow functions
		* default parameters
	* Note
		* Note that createing html this way is necessary to fix xss. This only works in this specific sceanrio
		* Don't use `extend` in `createElement` for now
* Add `keepLatest` option
	* Implement 
		* Demonstrated object destructuring
		* Defaults with destructuring
	* Notes
		* Point out the importance of assigning `= {}`
* Add in `stores`
	* Implement
		* import `notificationStores`
		* export `{none, local}` in `notificationStores`
		* add `store` to options
		* app import customNotificationsStore
		* set local `store`
		* `runCoroutine` generator `restoreSaved` function
			* yields to `store.get()`
			* yields to `domReady` (already written)
		* `store.save(queue)` in `add` and `clear`
	* Demonstrated
		* import
		* object constructor
		* default properties
		* object destructuring in parameters
		* generators with coroutines
		* function hoisting
* Create `showAndSave` decorator
	* Implement
		* create method
		* adjust `add` and `clear`
	* Demonstrated
		* single line arrow functions
		* splat parameters
		* spread function parameter
* create `extend` 
	* Implement
		* `extend` in `utilities` module
		* modify `createElement` to use `extend`
	* Demonstrated
		* modules exporting by name
		* parameter splat operator
		* `||` coalesce
		* ternary if
		* spread operator into parameters
	* Note
		* We're going to use this soon
		* Though honestly its not terribly necessary, but every bit can help

//Things to demo:
// [e]	simple object construction
// [a]	object destructuring in parameters
// [a]	single line arrow function
// [b]	spread
// [b]	boolean type coercion
// [e]	||, && coercion
// [b]	array destructructuring
// [a]	default parameters
// [e]	first order functions
// [a]	hoisting 
// [d]	json objects
// [b]	splat
// [b]	indexor syntax
// [a]	modules
// [e]	Generators
//
// a - initial
// b - add extend, remove query
// c - get rid of button
// d - no generators, objects, form
// e - storage functions

