import bluebird from 'bluebird'

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

const createElement = (tag='div', textContent = "") => extend(document.createElement(tag), {textContent})
const toggleClass = (el, addRemove, ...classNames) => el.classList[addRemove](...classNames)

const asAsync = (...args) => Promise.resolve(...args)
const none = {
	get: ( () => asAsync([]) ),
	save: ( () => asAsync() ),
}
const local = {
	get: ( () => asAsync( JSON.parse( localStorage.getItem('notifications') )||[] ) ),
	save: ( (notifications) => asAsync( localStorage.setItem('notifications', JSON.stringify(notifications)) ) )
}
const storage = { none, local}


const createNotificationQueue = function({toKeep = 5, store = storage.none }={}) {
	let queue = [];
	const notificationsContainer = createElement('ol');
	document.body.appendChild(notificationsContainer)
	toggleClass(notificationsContainer, 'add', 'notifications', 'hidden')

	const save = () => store.save(queue).then(()=> console.log("saved"));

	bluebird.coroutine(function* loadStoredNotifications(){
		queue = yield store.get()
		showQueue()
	})()

	return {
		add(msg) {
			queue = [...queue, msg];
			if(queue.length > toKeep)
				queue = queue.slice(1);
			showQueue();
			save();
		},
		clear() {
			queue = [];
			showQueue();
			save();
		},
	};

	////////////////////////
	function showQueue() {
		const listItems = queue.map((msg) => createElement('li', msg).outerHTML)
		notificationsContainer.innerHTML = listItems.join('')
		toggleClass(notificationsContainer, 'remove', 'hidden')
		setTimeout(()=>toggleClass(notificationsContainer, 'add', 'hidden'), 10);
	}
};
createNotificationQueue.storage = storage

const notifications = createNotificationQueue({store: storage.local})
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

