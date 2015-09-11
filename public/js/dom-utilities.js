import { extend } from 'utilities'

export const showTemporarily = (element) => {
	element.classList.remove('hidden')
	setTimeout(() => element.classList.add('hidden'), 10)
}

export const domReady = () =>  
	document.readyState === 'complete'
		? Promise.resolve()
		: new Promise(function(resolve) {
				document.addEventListener('readystatechange', () => {
					if(document.readyState === 'complete') resolve()
				} )
			});

export const createElement = (tagName, textContent) => 
	extend(document.createElement(tagName), { textContent })
