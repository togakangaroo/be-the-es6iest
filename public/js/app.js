//Things to demo:
// [ ]	simple object construction
// [a]	object destructuring in parameters
// [a]	single line arrow function
// [b]	spread
// [b]	boolean type coercion
// [ ]	||, && coercion
// [b]	array destructructuring
// [a]	default parameters
// [ ]	first order functions
// [a]	hoisting 
// [d]	json objects
// [b]	splat
// [b]	indexor syntax
// [a]	modules
// [ ]	Generators
//
// a - initial
// b - add extend, remove query
// c - get rid of button
// d - no generators, objects, form

const createElement = (tag='div', textContent = "") => extend(document.createElement(tag), {textContent})
const toggleClass = (el, addRemove, ...classNames) => el.classList[addRemove](...classNames)

const createNotificationQueue = function({toKeep = 5}={}) {
	let queue = [];
	const notificationsContainer = createElement('ol');
	document.body.appendChild(notificationsContainer)
	toggleClass(notificationsContainer, 'add', 'notifications', 'hidden')

	return {
		add(msg) {
			queue = [...queue, msg];
			if(queue.length > toKeep)
				queue = queue.slice(1);
			showQueue(notificationsContainer, queue);
		},
		clear() {
			queue = [];
			showQueue(notificationsContainer, queue);
		},
	};
};

const notifications = createNotificationQueue({toKeep: 3})
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

function extend(...args) {
	const [first, second, ...rest] = args;
	if(!second && !rest.length) return first;
	for(let key in second )
		first[key] = second[key]
	return extend(first, ...rest)
}

function showQueue(notificationsContainer, queue) {
	const listItems = queue.map((msg) => createElement('li', msg).outerHTML)
	notificationsContainer.innerHTML = listItems.join('')
	toggleClass(notificationsContainer, 'remove', 'hidden')
	setTimeout(()=>toggleClass(notificationsContainer, 'add', 'hidden'), 10);
}

export default null //without this file is not interpreted as a module