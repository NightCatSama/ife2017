//  给光源添加一个模型
const addMeshToLight = function(light, color = 0xFB1238, size = 5) {
    var geometry = new THREE.SphereGeometry(size, 12, 8)
	var material = new THREE.MeshLambertMaterial({
		color: color,
		wireframe: this.DEBUG
	})
	let sphere = new THREE.Mesh(geometry, material)
	this.reference.push(sphere)

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
    return DiLight
}

//  生成聚光灯
export const initSpotLight = function() {
	let SpotLight = new THREE.SpotLight(0x666666)
	//  如果设置为 true ，光照将投射动态阴影
	SpotLight.castShadow = true
	//  光线散射角度
	SpotLight.angle = Math.PI / 6
	//  光强的数值
	SpotLight.intensity = 1.5
	//  聚光锥的半影衰减百分比。在0和1之间的值。默认为0
	SpotLight.penumbra = 0
	//  沿着光照距离的衰退量。 在“物理正确”模式中，decay = 2将实现现实世界的光衰减。
	SpotLight.decay = 2
	//  光强为0处到光源的距离，0表示无穷大
	SpotLight.distance = 800
	//  存储在一个Vector2中的阴影贴图的宽度和高度。
	SpotLight.shadow.mapSize.width = 1024
	SpotLight.shadow.mapSize.height = 1024
	//  阴影的空间观察视角
	SpotLight.shadow.camera.near = 1
	SpotLight.shadow.camera.far = 1000

	addMeshToLight.call(this, SpotLight)
	return SpotLight
}