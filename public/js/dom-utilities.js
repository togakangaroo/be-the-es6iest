import { extend } from 'utilities'

export const showTemporarily = (element) => {
	element.classList.remove('hidden')
	setTimeout(() => element.classList.add('hidden'), 10)
}

export const createElement = (tag, textContent="") => 
	extend(document.createElement(tag), {textContent})
