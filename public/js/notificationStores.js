const asAsync = (...args) => Promise.resolve(...args)

const none = {
	get: ( () => asAsync([]) ),
	save: ( () => asAsync() ),
}

const local = {
	get: ( () => asAsync( JSON.parse( localStorage.getItem('notifications') )||[] ) ),
	save: ( (notifications) => asAsync( localStorage.setItem('notifications', JSON.stringify(notifications)) ) )
}

export default { none, local };