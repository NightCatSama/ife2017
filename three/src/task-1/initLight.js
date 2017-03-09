/*  初始化光照  */
function initLight() {
	//  环境光
	AmLight = new THREE.AmbientLight(0xFFFFFF)
	scene.add(AmLight)

	//  聚光光源
	SpotLight = new THREE.SpotLight(0xFFFFFF)
	SpotLight.position.set(-100, 140, 120)

	//  如果设置为 true ，光照将投射动态阴影
	SpotLight.castShadow = true

	//  光线散射角度
	SpotLight.angle = Math.PI / 6

	//  光强的数值
	SpotLight.intensity = 2

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

	//  给聚光光源一个模型
	var geometry = new THREE.SphereGeometry(5, 12, 5)
	var material = new THREE.MeshLambertMaterial({
		color: 0xFFFFFF,
		needsUpdate: true,
		wireframe: false
	})
	SpotSphere = new THREE.Mesh(geometry, material)
	SpotLight.add(SpotSphere)
	scene.add(SpotLight)

	//  光线辅助线
	var ls = new THREE.SpotLightHelper(SpotLight)
	scene.add(ls)

	//  点光源
	light = new THREE.PointLight(0xFFD412, 1, 0)
	light.position.set(30, 30, 30)
	light.shadow.camera.near = 1
	light.shadow.camera.far = 500
	light.shadow.bias = 0.01

	//  给点光源一个模型
	var geometry = new THREE.SphereGeometry(5, 12, 5)
	var material = new THREE.MeshLambertMaterial({
		color: 0xFFD412,
		needsUpdate: true,
		wireframe: false
	})
	sphere = new THREE.Mesh(geometry, material)
	sphere.castShadow = true
	light.add(sphere)
	scene.add(light)
}

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