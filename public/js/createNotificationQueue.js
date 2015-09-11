import { showTemporarily, createElement } from './dom-utilities'

const createNotificationQueue = ({
									keepLatest = 5
								} ={}) => {
	let queue = []

	const container = createElement('ol')
	container.classList.add('notifications')
	document.body.appendChild(container)

	return {
		clear() {
			queue = []

			showNotifications()
		},
		add(msg) {
			queue = [...queue, msg]
			if(queue.length > keepLatest)
				queue = queue.slice(1)

			showNotifications()
		}
	}

	//////////////////////////////////
	function showNotifications() {
		const itemsHtml = queue.map((msg) => 
			createElement('li', msg).outerHTML
		)
		container.innerHTML = itemsHtml.join('')
		showTemporarily(container)
	}

}

export default createNotificationQueue