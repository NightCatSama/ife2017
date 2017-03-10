export default function createGui() {
    let gui = new dat.GUI()
	
	let param = {
		catSegments: this.cat_size.segments,
		torusSegments: this.wheel_size.segments,
		planeSegments: this.plane_size.segments,
		wireframe: this.DEBUG,
		showHelper: this.DEBUG
	}

	const change = () => {
		let { width, height, depth } = this.cat_size
		this.cat.geometry.dispose()  //  dispose()  从内存中释放，避免内存泄漏
		this.cat.geometry = new THREE.BoxGeometry(width, height, depth, param.catSegments, param.catSegments, param.catSegments)
		this.cat.material.wireframe = param.wireframe

		this.plane.geometry.dispose()
		this.plane.geometry = new THREE.PlaneGeometry(this.plane_size.width, this.plane_size.height, param.planeSegments, param.planeSegments)
		this.plane.geometry.rotateX(-Math.PI / 2)
		this.plane.material.wireframe = param.wireframe
		
		Array.from(this.wheel, (wheel) => {
			wheel.geometry.dispose()
			wheel.material.wireframe = param.wireframe
			wheel.geometry = new THREE.TorusGeometry(12, 6, 16, param.torusSegments)
		})

		Array.from(this.reference, (mesh) => {
			mesh.material.wireframe = param.wireframe
		})
	}
	
	const switchHelper = () => {
		Array.from(this.helper, (mesh) => {
			mesh.visible = !mesh.visible
		})
	}
	
	gui.add(param, 'catSegments', 1, 40, 1).onChange(change)
	gui.add(param, 'torusSegments', 1, 40, 1).onChange(change)
	gui.add(param, 'planeSegments', 1, 40, 1).onChange(change)
	gui.add(param, 'wireframe').onChange(change)
	gui.add(param, 'showHelper').onChange(switchHelper)

	gui.open()
}