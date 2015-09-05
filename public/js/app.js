import $ from 'jquery'
import coroutine from 'coroutine'

//Things to demo:
// modules, Generators, simple object construction, object destructuring in parameters, array destructructuring, single line arrow function, default parameters, json objects, hoisting? first order functions, splat, spread


function* clickReaction() {
	var count = 1;
	while(true) {
		const res = yield
		console.log("click ", count++, res);
	}
}

const resultsPrinter = coroutine(clickReaction)()
$('button').on('click', ({target: { value }}) =>
	resultsPrinter.next(value)
)

export default null;