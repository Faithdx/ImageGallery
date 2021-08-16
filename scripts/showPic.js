//在文档加载时调用
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

//在元素节点之后插入新的节点
function insertAfter(newElement,targetElement) {
	let parent = targetElement.parentNode
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement)
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling)
	}
}

//创建img、p元素
function preparePlaceholder() {
	if (!document.createElement) {
		return false
	}
	if (!document.createTextNode) {
		return false
	}
	if (!document.getElementById) {
		return false
	}
	if (!document.getElementById('imagegallery')) {
		return false
	}
	const placeholder = document.createElement('img')
	placeholder.setAttribute('id','placeholder')
	placeholder.setAttribute('src','./images/008.jpg')
	placeholder.setAttribute('alt','my image gallery')
	const description = document.createElement('p')
	description.setAttribute('id','description')
	const desctext = document.createTextNode('Choose an image')
	description.appendChild(desctext)
	const gallery = document.getElementById('imagegallery')
	insertAfter(placeholder,gallery)
	insertAfter(description,placeholder)
}

//事件处理函数
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
			// return showPic(this) ? false : true
			return showPic(this)
		}
		links[i].onkeypress = links[i].onclick
	}	
}

//切换要显示的图片
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

addLoadEvent(preparePlaceholder)
addLoadEvent(prepareGallery)