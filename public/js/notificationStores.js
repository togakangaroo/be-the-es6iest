const asAsync = (...args) => Promise.resolve(...args)

export const none = {
	get: ( () => asAsync([]) ),
	save: ( () => asAsync() ),
}

export const local = {
	get: ( () => asAsync( JSON.parse( localStorage.getItem('notifications') )||[] ) ),
	save: ( (notifications) => asAsync( localStorage.setItem('notifications', JSON.stringify(notifications)) ) )
}

