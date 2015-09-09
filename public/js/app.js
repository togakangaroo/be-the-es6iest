import createNotificationQueue from 'createNotificationQueue'

const notifications = createNotificationQueue()

let counter = 1;
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const value = e.target.querySelector('input').value;
	counter += 1;
	notifications.add(`${counter}: ${value}`);
});
form.addEventListener('reset', (e) => {
	e.preventDefault();
	notifications.clear();
})