let container = document.querySelector('.container')
let title = document.querySelector('.title')

let bounds = container.getBoundingClientRect()
let width = container.offsetWidth
let height = container.offsetHeight
let center = {
	cx: width / 2,
	cy: height / 2
}
let diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2

function getMousePos(e) {
	return {
		px: e.clientX - bounds.left,
		py: e.clientY - bounds.top
	}
}

function setStyles(pos, center) {
	if (!pos) {
		title.style.cssText = ''
		return false
	}
	let x = ~~((pos.px - center.cx) / (width / 2) * 8)
	let y = ~~((pos.py - center.cy) / (height / 2) * 8)
	let deg = -getAngle(pos, center)
	let intensity = getDistance(pos, center) / diagonal / 2
	title.style.cssText = `
		background-image: linear-gradient(${deg}deg, rgba(255, 255, 255, ${intensity}) 0%, rgba(255, 255, 255, 0) 80%);
		background-image: -webkit-linear-gradient(${deg}deg, rgba(255, 255, 255, ${intensity / 2}) 0%, rgba(255, 255, 255, 0) 80%);
		transform: translateY(${pos.py / height * -0.5}px) rotateX(${pos.py < center.cy ? -x : x}deg) rotateY(${y}deg) rotateZ(0);
		-webkit-transform: translateY(${pos.py / height * -0.5}px) rotateX(${pos.py < center.cy ? -x : x}deg) rotateY(${y}deg) rotateZ(0);
	`
}

container.addEventListener('mousemove', (e) => {
	let pos = getMousePos(e)
	let deg = getAngle(pos, center)
	setStyles(pos, center)
})

container.addEventListener('mouseleave', (e) => {
	let pos = getMousePos(e)
	let deg = getAngle(pos, center)
	setStyles()
})

function getDistance({ px, py }, { cx, cy }) {
    return ~~Math.sqrt(Math.pow((px - cx), 2) + Math.pow((py - cy), 2))
}

function getAngle({ px, py }, { cx, cy }) {
	let x = px - cx
	let y = py - cy
	let hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
	let cos = x / hypotenuse
	let radian = Math.acos(cos)
	let angle = 180 / (Math.PI / radian)
	if (y < 0) {
		angle = -angle
	} else if ((y == 0) && (x < 0)) {
		angle = 180
	}
	return angle
}