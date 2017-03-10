import { createBox, createTorus, createPlane, writeName } from './initObject'
import { initAmbientLight, initDirectionalLight, initSpotLight } from './initLight'
import initGui from './initGui'
import initCamera from './initCamera'

class MyThree {
	constructor() {
		this.DEBUG = false

		//  小车颜色
		this.cat_color = 0xFFFFFF
		
		//  小车尺寸
		this.cat_size = {
			width: 150,
			height: 100,
			depth: 100,
			segments: 20
		}

		//  地板尺寸
		this.plane_size = {
			width: 2000,
			height: 2000,
			segments: 20
		}
		//  轮子半径
		this.wheel_size = {
			radius: 18,
			segments: 20
		}

		//  放置参照物数组
		this.reference = []

		//  放置辅助线数组
		this.helper = []

		//  放置贴图
		this.texture = []

		//  初始化
		this.init()
	}
	//  初始化Three
	init() {
		this.initScene()
		this.initThree()
		this.initLight()
		this.initPlane()
		this.initCat()
		this.render()
		this.initGui()
		this.initControls()
		this.initStats()
	}
	//  初始化GUI
	initGui() {
		initGui.call(this)
	}
	//  初始化控制器
	initControls() {
		this.controls = new THREE.OrbitControls(this.camera)
		this.controls.enablePan = false
		this.controls.domElement = this.wrap
	}
	//  初始化检测器 
	initStats() {
		this.stats = new Stats()
		document.body.appendChild(this.stats.dom)
	}
	//  初始化场景
	initScene() {
		this.scene = new THREE.Scene()
	}
	//  初始化渲染器
	initThree() {
		this.wrap = document.body
		this.width = this.wrap.clientWidth
		this.height = this.wrap.clientHeight
		this.camera = initCamera.call(this)
		this.renderer = new THREE.WebGLRenderer({
			antialias: true  //  抗锯齿效果
		})
		this.renderer.gammaInput = true         //  表示所有纹理和颜色应当使用预乘的gamma值来输入
		this.renderer.gammaOutput = true        //  表示所有纹理和颜色应当使用预乘的gamma值来输出
		this.renderer.shadowMap.enabled = true  //  场景中使用阴影贴图
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap  //  阴影贴图类型定义 (未经过滤BasicShadowMap，百分比接近过滤PCFShadowMap，默认为带着色器双线性过滤的百分比接近过滤PCFSoftShadowMap)

		this.renderer.setSize(this.width, this.height)
		this.wrap.appendChild(this.renderer.domElement)
		this.renderer.setClearColor(0xF3F3F3, 1.0)
	}
	//  初始化光照
	initLight() {
		this.Amlight = initAmbientLight.call(this)  //  初始化环境光
		this.scene.add(this.Amlight)

		this.Dilight = initDirectionalLight.call(this)  //  初始化平行光
		this.Dilight.position.set(60, 80, -80)
		this.scene.add(this.Dilight)

		this.SpotLight = initSpotLight.call(this)
		this.SpotLight.position.set(130, 170, -170)
		this.scene.add(this.SpotLight)

		//  聚光灯辅助线
		var spotLightHelper = new THREE.SpotLightHelper(this.SpotLight)
		spotLightHelper.visible = this.DEBUG
		this.helper.push(spotLightHelper)
		this.scene.add(spotLightHelper)
	}
	//  画地板
	initPlane() {
		this.plane = createPlane.call(this)
		this.plane.geometry.rotateX(-Math.PI / 2)
		this.plane.position.set(0, -(this.cat_size.height / 2 + this.wheel_size.radius), 0)
		this.scene.add(this.plane)
	}
	//  画小车咯
	initCat() {
		//  先画车身
		this.cat = createBox.call(this)
		this.scene.add(this.cat)
		
		//  再画四个轮子
		var pos = [this.cat_size.width * 0.5 - 20, -this.cat_size.height * 0.5, this.cat_size.depth * 0.5]
		var status = [[1, 1], [-1, -1], [1, -1], [-1, 1]]
		this.wheel = Array.from(new Array(4), (v, i) => {
			let torus = createTorus.call(this)
			torus.position.set(pos[0] * status[i][0], pos[1], pos[2] * status[i][1])
			this.scene.add(torus)
			return torus
		})
	}
	//  开始渲染
	render() {
		this.animation()
		this.stats && this.stats.begin()
		Array.from(this.texture, texture => texture.needsUpdate = true)
		this.renderer.render(this.scene, this.camera)
		this.stats && this.stats.end()
		requestAnimationFrame(this.render.bind(this))
	}
	//  动画
	animation() {

	}
}

let obj = new MyThree()

