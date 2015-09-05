export default (getIterator) => (...args) => {
	const iterable = getIterator(...args);
	iterable.next();
	return iterable;
}
