import request from 'then-request'

export default {
	get: ( () => 
		request('GET', '/notifications').then((x) => JSON.parse(x.body) ) 
	),
	save: ( (notifications) => 
		request('POST', '/notifications', {json: notifications} ) 
	),
}
