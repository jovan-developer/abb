function bindModal(triggerSelector, isOverlayClickable) {
	const trigger = document.querySelectorAll(triggerSelector),
		scroll = calcScroll()


	const html = document.querySelector('html')
	const body = document.querySelector('html')

	trigger.forEach(item => {
		let modalSel = item.getAttribute('data-modal')
		let modal = document.querySelector(modalSel)
		const close = modal.querySelector('.js-close')
		const overlay = modal.querySelector('.overlay')

		if (isOverlayClickable) {
			overlay.addEventListener('click', () => {
				modal.classList.remove('active')
				overlay.classList.remove('active')
				html.style.overflow = ''
				html.style.marginRight = `0px`
				overlay.classList.remove('active')
			})
		}

		item.addEventListener('click', (e) => {
			if (e.target) {
				e.preventDefault()
			}

			modal.classList.add('active')
			overlay.classList.add('active')
			html.style.overflow = 'hidden'
			html.style.marginRight = `${scroll}px`
			overlay.classList.add('active')
		})

		close.addEventListener('click', () => {
			modal.classList.remove('active')
			overlay.classList.remove('active')
			html.style.overflow = ''
			html.style.marginRight = `0px`
			overlay.classList.remove('active')
		})
	})

}



function calcScroll() {
	let div = document.createElement('div')

	div.style.width = '50px'
	div.style.height = '50px'
	div.style.overflowY = 'scroll'
	div.style.visibility = 'hidden'

	document.body.appendChild(div)
	let scrollWidth = div.offsetWidth - div.clientWidth
	div.remove()

	return scrollWidth
}