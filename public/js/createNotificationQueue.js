import { runCoroutine } from 'utilities'
import stores from './notificationStores'
import { createElement, showTemporarily, domReady } from './dom-utilities'

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
		yield domReady()
		showNotifications()
	}
	function showNotifications() {
		const itemsHtml = queue.map((msg) => createElement('li', msg).outerHTML)
		container.innerHTML = itemsHtml.join('')
		showTemporarily(container)
	}
}

export default createNotificationQueue