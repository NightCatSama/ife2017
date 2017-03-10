/*  初始化模型  */
function initObject() {
	var geometry = new THREE.BoxGeometry(50, 50, 50, 1, 1, 1)

	var material = new THREE.MeshLambertMaterial({
		color: 0x02980b9,
		needsUpdate: true,
		wireframe: false
	})

	cube = new THREE.Mesh(geometry, material)
	cube.castShadow = true
	scene.add(cube)

	var geometry = new THREE.PlaneBufferGeometry(10000, 10000)
	geometry.rotateX(-Math.PI / 2)
	var material = new THREE.MeshPhongMaterial({
		color: 0x333333,
		overdraw: 0.5
	})
	plane = new THREE.Mesh(geometry, material)
	plane.position.set(0, -80, 0)
	plane.receiveShadow = true
	scene.add(plane)
}

var Gradient = 0
export const writeName = function(cxt, width = 1800, height = 1200, image, type) {
    cxt.clearRect(0, 0, width, height)

	type === 1 ? cxt.drawImage(image, 0, 0, width, height) : cxt.drawImage(image, (image.width - image.height) / 2, 0, image.height, image.height, 0, 0, height, height)

	/* 指定渐变区域 */
	var grad = cxt.createLinearGradient(width / 2 - 600, height / 2 - 200, width / 2 + 600, height / 2 + 200)
	/* 指定几个颜色 */
	grad.addColorStop(Gradient % 1, 'rgba(6, 219, 198, .8)')
	grad.addColorStop((Gradient + 0.2) % 1, 'rgba(155, 89, 182, .8)')
	grad.addColorStop((Gradient + 0.4) % 1, 'rgba(52, 152, 255, .8)')
	grad.addColorStop((Gradient + 0.6) % 1, 'rgba(253, 99, 53, .8)')
	grad.addColorStop((Gradient + 0.8) % 1, 'rgba(253, 236, 53, .8)')
	grad.addColorStop((Gradient + 1) % 1, 'rgba(102, 219, 6, .8)')

	var txt = 'NightCAT'
	cxt.font = `bold ${type === 1 ? 120 : 80}px Courier New`
	var length = cxt.measureText(txt)
	cxt.textAlign = "center"
	cxt.fillStyle = grad
	cxt.fillText(txt, width / 2, height / 2)
}

//  生成个长方体
export const createBox = function () {
	var { width, height, depth, segments } = this.cat_size
	var geometry = new THREE.BoxGeometry(width, height, depth, segments, segments, segments)

	//  加载纹理
	let canvas = document.createElement('CANVAS')
	let cxt = canvas.getContext('2d')
	canvas.width = 1024
	canvas.height = 512

	let canvas2 = document.createElement('CANVAS')
	let cxt2 = canvas2.getContext('2d')
	canvas2.width = 512
	canvas2.height = 512

	let img = new Image()

	img.onload = () => {
		setInterval(() => {
			Gradient += 0.01
			writeName(cxt, canvas.width, canvas.height, img, 1)
			writeName(cxt2, canvas2.width, canvas2.height, img, 2)
		}, 16)
	}
	img.src = '../../asset/image/bg.jpg'

	var cubeMaterial = Array.from(new Array(6), (v, i) => {
		let texture
		if (i <= 1) {
			texture = new THREE.Texture(canvas2)
		}
		else {
			texture = new THREE.Texture(canvas)
		}
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping
		this.texture.push(texture)
		return new THREE.MeshPhongMaterial({
			color: this.cat_color,
			wireframe: this.DEBUG,
			overdraw: true,
			map: texture
		})
	})

	let cube = new THREE.Mesh(geometry, new THREE.MultiMaterial(cubeMaterial))
	cube.castShadow = true
	return cube
}

//  生成圆环
export const createTorus = function () {
	var geometry = new THREE.TorusGeometry(this.wheel_size.radius - 6, 6, this.wheel_size.segments, 50)
	var texture = new THREE.TextureLoader().load('/asset/image/wheel.png')
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping
	texture.repeat.set(20, 1)
	var material = new THREE.MeshPhongMaterial({
		color: this.cat_color,
		wireframe: this.DEBUG,
		map: texture
	})

	let torus = new THREE.Mesh(geometry, material)
	return torus
}

//  生成平面
export const createPlane = function () {
	var { width, height, segments } = this.plane_size
	var geometry = new THREE.PlaneGeometry(width, height, segments, segments)
	var texture = new THREE.TextureLoader().load('/asset/image/wood.png')
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping
	texture.repeat.set(20, 20)
	var material = new THREE.MeshPhongMaterial({
		color: 0xFFFFFF,
		wireframe: this.DEBUG,
		map: texture
	})

	let plane = new THREE.Mesh(geometry, material)
	plane.receiveShadow = true
	return plane
}