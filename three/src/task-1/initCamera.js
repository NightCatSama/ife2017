export default function() {
	let camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000)
	camera.position.x = 300
	camera.position.y = 300
	camera.position.z = 500
	camera.up.x = 0
	camera.up.y = 1
	camera.up.z = 0
	camera.lookAt(this.scene.position)
    return camera
}