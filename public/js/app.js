import $ from 'jquery'
import coroutine from 'coroutine'

//Things to demo:
// [ ]	simple object construction
// [a]	object destructuring in parameters
// [a]	single line arrow function
// [b]	spread
// [ ]	boolean type coercion
// [ ]	||, && coercion
// [ ]	array destructructuring
// [a]	default parameters
// [ ]	first order functions
// [a]	hoisting 
// [ ]	json objects
// [b]	splat
// [a]	modules
// [a]	Generators

function* clickReaction({toKeep = 5}={}) {
	const queue = [];
	const $notificationsContainer = $('<ol class="notifications">').appendTo('body');
	while(true) {
		const msg = yield;
		queue.push(msg)
		if(queue.length > toKeep)
			queue.shift();
		showQueue();
	}

	let prevRemoval;
	function showQueue() {
		var $listItems = queue
							.map((msg) => $('<li>').text(msg))
							.reduce(($set, $el) => $set.add($el), $());
		$notificationsContainer.empty().append($listItems).removeClass('hidden', false);
		setTimeout(()=>$notificationsContainer.addClass('hidden'), 0);
	}
}

const createNotifiationQueue = () => coroutine(clickReaction)()
const resultsPrinter = createNotifiationQueue()
let counter = 1;
$('button').on('click', () =>
	resultsPrinter.next("Welcome to message " + (counter++))
)
