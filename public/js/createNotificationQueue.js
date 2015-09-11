import stores from 'notificationStores'
import { showTemporarily, createElement, domReady } from './dom-utilities'
import { runCoroutine } from './utilities'

const createNotificationQueue = ({
									keepLatest = 5,
									store = stores.none,
								} ={}) => {
	let queue = []

	const container = createNotificationContainer()

	runCoroutine(loadPreviousNotifications)

	return {
		clear() {
			queue = []

			store.save(queue);
			showNotifications()
		},
		add(msg) {
			queue = [...queue, msg]
			if(queue.length > keepLatest)
				queue = queue.slice(1)

			store.save(queue);
			showNotifications()
		}
	}

	//////////////////////////////////
	function* loadPreviousNotifications() {
		queue = yield store.get()
		yield domReady()
		showNotifications()
	}

	function createNotificationContainer() {
		const element = createElement('ol')
		element.classList.add('notifications')
		document.body.appendChild(element)
		return element;
	}

	function showNotifications() {
		const itemsHtml = queue.map((msg) => 
			createElement('li', msg).outerHTML
		)
		container.innerHTML = itemsHtml.join('')
		showTemporarily(container)
	}

}

export default createNotificationQueue