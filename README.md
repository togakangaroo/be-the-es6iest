This is the repository of demo code for my talk be-the-es6iest. [You can watch a screencast of the talk here](https://youtu.be/cC8SKCnorU4)

It is encouraged that you follow along with the application. To get started you will need [nodejs installed](https://chocolatey.org/packages/nodejs.install) and to clone this code. Note that none of the techniques demonstrated require nodejs in production. It is simply used as the webserver and for for [jspm](http://jspm.io/) which provides es6 features not currently supported by browsers. It is important to emphasize, that unlike tools like browserify, jspm  uses systemjs which runs entirely in the browser and *does not require a build process for the client-side*.

To download web server dependencies, run

    npm install

from a command line inside the main project directory. You may then run

    npm run jspm:install
    
to download the few client-side packages used (bluebird and request-then).

You can start the webserver via

    npm run start
    
I encourage you to follow along to the video and learn these techniques as a koan. You can also jump to any particular step in the tags for example

    git checkout step-3
    git checkout step-6    

# Talk Outline

* demo app
	* review index.html
	* review app.js
	* review createNotificationsQueue
	* Demonstrated
		* `const`, `let`
		* template literal
		* multiline arrow functions
		* importing a module
	* Note
		* Prewrite
		* Not using jquery because..eh..
		* modules so no need for IIFE scoping
		* modules are awesome, the rest is cool but won't make life significantly easier
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
