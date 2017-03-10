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

//  生成个长方体
export const createBox = function() {
	var { width, height, depth, segments } = this.cat_size
	var geometry = new THREE.BoxGeometry(width, height, depth, segments, segments, segments)
	var material = new THREE.MeshPhongMaterial({
		color: this.cat_color,
		wireframe: this.DEBUG
	})

	let cube = new THREE.Mesh(geometry, material)
	cube.castShadow = true
	return cube
}

//  生成圆环
export const createTorus = function() {
	var geometry = new THREE.TorusGeometry(this.wheel_size.radius - 6, 6, this.wheel_size.segments, 50)
	var material = new THREE.MeshPhongMaterial({
		color: this.cat_color,
		wireframe: this.DEBUG
	})

	let torus = new THREE.Mesh(geometry, material)
	return torus
}

//  生成平面
export const createPlane = function() {
	var { width, height, segments } = this.plane_size
	var geometry = new THREE.PlaneGeometry(width, height, segments, segments)
	var material = new THREE.MeshPhongMaterial({
		color: 0x27ae60,
		wireframe: this.DEBUG
	})

	let plane = new THREE.Mesh(geometry, material)
	plane.receiveShadow = true
	return plane
}