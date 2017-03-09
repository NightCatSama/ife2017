export default function createGui() {
    let gui = new dat.GUI()

	let param = {
		widthSegments: 20,
		heightSegments: 20,
		depthSegments: 20,
		torusSegments: 20,
		wireframe: false
	}

	const change = () => {
		this.cat.geometry.dispose()
		this.cat.geometry = new THREE.BoxGeometry(this.cat_size.width, this.cat_size.height, this.cat_size.depth, param.widthSegments, param.heightSegments, param.depthSegments)
		this.cat.material.wireframe = param.wireframe
		Array.from(this.wheel, (wheel) => {
			wheel.geometry.dispose()
			wheel.material.wireframe = param.wireframe
			wheel.geometry = new THREE.TorusGeometry(12, 6, 16, param.torusSegments)
		})
	}
	
	gui.add(param, 'widthSegments', 1, 40, 1).onChange(change)
	gui.add(param, 'heightSegments', 1, 40, 1).onChange(change)
	gui.add(param, 'depthSegments', 1, 40, 1).onChange(change)
	gui.add(param, 'torusSegments', 1, 40, 1).onChange(change)
	gui.add(param, 'wireframe').onChange(change)

	gui.open()
}