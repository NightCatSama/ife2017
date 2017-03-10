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