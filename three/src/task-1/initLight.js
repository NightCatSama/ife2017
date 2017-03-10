//  给光源添加一个模型
const addMeshToLight = function(light, color = 0xFB1238, size = 5) {
    var geometry = new THREE.SphereGeometry(size, 12, 8)
	var material = new THREE.MeshLambertMaterial({
		color: color,
		wireframe: true
	})
	let sphere = new THREE.Mesh(geometry, material)
    light.add(sphere)
}

//  生成环境光
export const initAmbientLight = function() {
	let AmLight = new THREE.AmbientLight(0x666666)
    return AmLight
}

//  生成平行光
export const initDirectionalLight = function() {
    let DiLight = new THREE.DirectionalLight(0x999999, 0.8)
    this.DEBUG && addMeshToLight(DiLight)
    return DiLight
}