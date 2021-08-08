function prepareGallery() {
	if (!document.getElementsByTagName) {
		return false
	}
	if (!document.getElementById) {
		return false
	}
	if (!document.getElementById('imagegallery')) {
		return false
	}
	const gallery = document.getElementById('imagegallery')
	const links = gallery.getElementsByTagName('a')
	for (let i = 0; i < links.length; i++) {
		links[i].onclick = function () {
			return showPic(this) ? false : true
		}
	}
}

function showPic(whichpic) {
	if (!document.getElementById('placeholder')) return false
	const source = whichpic.getAttribute('href')
	const placeholder = document.getElementById('placeholder')
	if (placeholder.nodeName != 'IMG') return false
	placeholder.setAttribute('src', source)

	if (document.getElementById('description')) {
		const text = whichpic.getAttribute('title') ? whichpic.getAttribute('title') : ''
		const description = document.getElementById('description')
		if (description.firstChild.nodeType == 3) {
			description.firstChild.nodeValue = text
		}
	}
	return true
}

function addLoadEvent(func) {
	let oldonload = window.onload
	if (typeof window.onload != 'function') {
		window.onload = func
	} else {
		window.onload = function () {
			oldonload()
			func()
		}
	}
}

addLoadEvent(prepareGallery)
