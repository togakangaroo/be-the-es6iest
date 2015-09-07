import { extend, runCoroutine } from 'utilities'
import stores from './notificationStores'

const createElement = (tag, textContent="") => extend(document.createElement(tag), {textContent})

const createNotificationQueue = ({
									keepLatest = 5,
									store = stores.none,
								} = {}) => {
	let queue = []

	const container = createElement('ol')
	container.classList.add('notifications')
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
		container.classList.remove('hidden')
		setTimeout(() => container.classList.add('hidden'), 10)
	}
}

export default createNotificationQueue