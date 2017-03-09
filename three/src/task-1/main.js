import { createBox, createTorus } from './initObject'
import { initAmbientLight, initDirectionalLight } from './initLight'
import initGui from './initGui'
import initCamera from './initCamera'

class MyThree {
	constructor() {
		this.cat_color = 0xFFFFFF
		this.cat_size = {
			width: 150,
			height: 100,
			depth: 100
		}
		this.DEBUG = false
		this.initStats()
		this.initScene()
		this.initThree()
		this.initLight()
		this.initCat()
		this.render()
		initGui.call(this)
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
		this.renderer.shadowMap.enabled = true  //  场景中使用阴影贴图
		this.renderer.gammaInput = true         //  表示所有纹理和颜色应当使用预乘的gamma值来输入
		this.renderer.gammaOutput = true        //  表示所有纹理和颜色应当使用预乘的gamma值来输出
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
	}
	//  画小车咯
	initCat() {
		//  先画车身
		this.cat = createBox.call(this, this.cat_size)
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
		this.renderer.render(this.scene, this.camera)
		this.stats && this.stats.end()
		requestAnimationFrame(this.render.bind(this))
	}
	//  动画
	animation() {

	}
}

let obj = new MyThree()