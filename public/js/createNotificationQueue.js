import { extend, runCoroutine } from 'utilities'
import stores from './notificationStores'

const createElement = (tag, textContent="") => extend(document.createElement(tag), {textContent})
const toggleClass = (el, method, ...classNames) => el.classList[method](...classNames)

const createNotificationQueue = ({
									keepLatest = 5,
									store = stores.none,
								} = {}) => {
	let queue = []

	const container = createElement('ol')
	toggleClass(container, 'add', 'notifications')
	document.body.appendChild(container)

	runCoroutine(restoreSaved)	

	const showAndSave = (fn) => (...args) => {
		fn(...args)
		showNotifications()
		store.save(queue)
	}

	return {
		add: showAndSave((msg) => {
			queue = [...queue, msg]
			if(queue.length > keepLatest)
				queue = queue.slice(1)
		}),
		clear: showAndSave(() => queue = [] ),
	}

	////////////////
	function* restoreSaved() {
		queue = yield store.get()
		showNotifications()
	}
	function showNotifications() {
		const itemsHtml = queue.map((msg) => createElement('li', msg).outerHTML)
		container.innerHTML = itemsHtml.join('')
		toggleClass(container, 'remove', 'hidden')
		setTimeout(() => toggleClass(container, 'add', 'hidden'), 10)
	}
}

export default createNotificationQueue