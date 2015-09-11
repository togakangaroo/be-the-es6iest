
const createNotificationQueue = () => {
	let queue = []

	return {
		clear() {
			queue = []

			showNotifications()
		},
		add(msg) {
			queue = [...queue, msg]
			if(queue.length > 5)
				queue = queue.slice(1)

			showNotifications()
		}
	}

	//////////////////////////////////
	function showNotifications() {
		console.log("Current notifications:", queue)
	}

}

export default createNotificationQueue