import bluebird from 'bluebird'

export const runCoroutine = (generator) => bluebird.coroutine(generator)()

export const extend = () => {
	throw Error("implement me")
}

