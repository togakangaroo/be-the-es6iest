import bluebird from 'bluebird'

export const extend = (first, second, ...rest) => {
	for(let key of Object.keys(second||{}))
		first[key] = second[key]
	return !rest.length ? first : extend(first, ...rest)
}

export const runCoroutine = (generator) => bluebird.coroutine(generator)()