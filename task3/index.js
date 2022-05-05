function doBeforeAndAfterDOMContentLoaded(before, after) {
	document.addEventListener('readystatechange', () => {
		if (document.readyState === 'interactive') {
			before();
			document.addEventListener('DOMContentLoaded', () => {
				after()
			});
		}
	})
}

const func1 = () => {
	console.log('Before DOM loaded');
}

const func2 = () => {
    console.log('After DOM loaded');
}

doBeforeAndAfterDOMContentLoaded(func1, func2)

document.addEventListener('DOMContentLoaded', () => {
	console.log('Dom loaded');
})