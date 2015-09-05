import coroutine from 'coroutine'

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
// [ ]	json objects
// [b]	splat
// [b]	indexor syntax
// [a]	modules
// [a]	Generators
//
// a - initial
// b - add extend, remove query
// c - get rid of button

const extend = (...args) =>{
	const [first, second, ...rest] = args;
	if(!second && !rest.length) return first;
	for(let key in second )
		first[key] = second[key]
	return extend(first, ...rest)
}

const createElement = (tag='div', textContent = "") => extend(document.createElement(tag), {textContent})
const toggleClass = (el, addRemove, ...classNames) => el.classList[addRemove](...classNames)

function* clickReaction({toKeep = 5}={}) {
	const queue = [];
	const notificationsContainer = createElement('ol');
	document.body.appendChild(notificationsContainer)
	toggleClass(notificationsContainer, 'add', 'notifications', 'hidden')

	while(true) {
		const msg = yield;
		queue.push(msg)
		if(queue.length > toKeep)
			queue.shift();
		showQueue();
	}

	let prevRemoval;
	function showQueue() {
		const listItems = queue.map((msg) => createElement('li', msg).outerHTML)
		notificationsContainer.innerHTML = listItems.join('')
		toggleClass(notificationsContainer, 'remove', 'hidden')
		setTimeout(()=>toggleClass(notificationsContainer, 'add', 'hidden'), 1);
	}
}

const createNotificationQueue = () => coroutine(clickReaction)()
const resultsPrinter = createNotificationQueue()
document.querySelector('input').addEventListener('keyup', ({which, target: {value}}) => {
	if(which == 13)
		resultsPrinter.next(value)
})
