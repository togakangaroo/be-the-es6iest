import createNotificationQueue from 'createNotificationQueue'
import request from 'then-request'

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


const store = {
	get: ( () => request('GET', '/notifications').then((x) => JSON.parse(x.body) ) ),
	save: ( (notifications) => 
		request('POST', '/notifications', {json: notifications} ) 
	),
}

const notifications = createNotificationQueue({store: store });

let counter = 1;
on('form', 'submit', preventDefault((e) => {
	const value = e.target.querySelector('input').value
	notifications.add(`${counter++}: ${value}`)	
}))
on('form', 'reset', preventDefault(() => notifications.clear()) )

/////////////////////////////////////////////////////

function preventDefault(fn) { return (e, ...args) => {
	e.preventDefault();
	return fn(e, ...args);
} }

function on(selector, eventType, fn) {
	const el = document.querySelector(selector);
	el.addEventListener(eventType, fn);
	return el;
}
