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
export const createBox = function({ width = 100, height = 100, depth = 100, Segments = 20 }) {
	var geometry = new THREE.BoxGeometry(width, height, depth, Segments, Segments, Segments)
	var material = new THREE.MeshPhongMaterial({
		color: this.cat_color,
		wireframe: this.DEBUG
	})

	let cube = new THREE.Mesh(geometry, material)
	return cube
}

//  生成圆环
export const createTorus = function() {
	var geometry = new THREE.TorusGeometry(12, 6, 16, 50)
	var material = new THREE.MeshPhongMaterial({
		color: this.cat_color,
		wireframe: this.DEBUG
	})

	let torus = new THREE.Mesh(geometry, material)
	return torus
}