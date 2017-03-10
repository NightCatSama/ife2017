/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("__webpack_require__(1);\n__webpack_require__(2);\n__webpack_require__(3);\n__webpack_require__(4);\nmodule.exports = __webpack_require__(5);\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi main\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///multi_main?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e,t){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(\"undefined\"!=typeof exports)t(exports);else{var i={exports:{}};t(i.exports),e.initCamera=i.exports}}(this,function(e){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0}),e[\"default\"]=function(){var e=new THREE.PerspectiveCamera(45,this.width/this.height,1,1e4);return e.position.x=300,e.position.y=300,e.position.z=500,e.up.x=0,e.up.y=1,e.up.z=0,e.lookAt(this.scene.position),e}});\n\n//////////////////\n// WEBPACK FOOTER\n// ./dist/task-3/initCamera.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./dist/task-3/initCamera.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e,t){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(\"undefined\"!=typeof exports)t(exports);else{var n={exports:{}};t(n.exports),e.initGui=n.exports}}(this,function(e){\"use strict\";function t(){var e=this,t=new dat.GUI,n={catSegments:this.cat_size.segments,torusSegments:this.wheel_size.segments,planeSegments:this.plane_size.segments,wireframe:this.DEBUG,showHelper:this.DEBUG},r=function(){var t=e.cat_size,r=t.width,a=t.height,i=t.depth;e.cat.geometry.dispose(),e.cat.geometry=new THREE.BoxGeometry(r,a,i,n.catSegments,n.catSegments,n.catSegments),e.cat.material.wireframe=n.wireframe,e.plane.geometry.dispose(),e.plane.geometry=new THREE.PlaneGeometry(e.plane_size.width,e.plane_size.height,n.planeSegments,n.planeSegments),e.plane.geometry.rotateX(-Math.PI/2),e.plane.material.wireframe=n.wireframe,Array.from(e.wheel,function(e){e.geometry.dispose(),e.material.wireframe=n.wireframe,e.geometry=new THREE.TorusGeometry(12,6,16,n.torusSegments)}),Array.from(e.reference,function(e){e.material.wireframe=n.wireframe})},a=function(){Array.from(e.helper,function(e){e.visible=!e.visible})};t.add(n,\"catSegments\",1,40,1).onChange(r),t.add(n,\"torusSegments\",1,40,1).onChange(r),t.add(n,\"planeSegments\",1,40,1).onChange(r),t.add(n,\"wireframe\").onChange(r),t.add(n,\"showHelper\").onChange(a),t.open()}Object.defineProperty(e,\"__esModule\",{value:!0}),e[\"default\"]=t});\n\n//////////////////\n// WEBPACK FOOTER\n// ./dist/task-3/initGui.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./dist/task-3/initGui.js?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e,t){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(\"undefined\"!=typeof exports)t(exports);else{var i={exports:{}};t(i.exports),e.initLight=i.exports}}(this,function(e){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var t=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16454200,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,n=new THREE.SphereGeometry(i,12,8),r=new THREE.MeshLambertMaterial({color:t,wireframe:this.DEBUG}),a=new THREE.Mesh(n,r);this.reference.push(a),e.add(a)};e.initAmbientLight=function(){var e=new THREE.AmbientLight(6710886);return e},e.initDirectionalLight=function(){var e=new THREE.DirectionalLight(10066329,.8);return e},e.initSpotLight=function(){var e=new THREE.SpotLight(6710886);return e.castShadow=!0,e.angle=Math.PI/6,e.intensity=1.5,e.penumbra=0,e.decay=2,e.distance=800,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.camera.near=1,e.shadow.camera.far=1e3,t.call(this,e),e}});\n\n//////////////////\n// WEBPACK FOOTER\n// ./dist/task-3/initLight.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./dist/task-3/initLight.js?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e,t){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(\"undefined\"!=typeof exports)t(exports);else{var r={exports:{}};t(r.exports),e.initObject=r.exports}}(this,function(e){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var t=0,r=e.writeName=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1800,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1200,o=arguments[3],i=arguments[4];e.clearRect(0,0,r,a),1===i?e.drawImage(o,0,0,r,a):e.drawImage(o,(o.width-o.height)/2,0,o.height,o.height,0,0,a,a);var n=e.createLinearGradient(r/2-600,a/2-200,r/2+600,a/2+200);n.addColorStop(t%1,\"rgba(6, 219, 198, .8)\"),n.addColorStop((t+.2)%1,\"rgba(155, 89, 182, .8)\"),n.addColorStop((t+.4)%1,\"rgba(52, 152, 255, .8)\"),n.addColorStop((t+.6)%1,\"rgba(253, 99, 53, .8)\"),n.addColorStop((t+.8)%1,\"rgba(253, 236, 53, .8)\"),n.addColorStop((t+1)%1,\"rgba(102, 219, 6, .8)\");var h=\"NightCAT\";e.font=\"bold \"+(1===i?120:80)+\"px Courier New\";e.measureText(h);e.textAlign=\"center\",e.fillStyle=n,e.fillText(h,r/2,a/2)};e.createBox=function(){var e=this,a=this.cat_size,o=a.width,i=a.height,n=a.depth,h=a.segments,s=new THREE.BoxGeometry(o,i,n,h,h,h),d=document.createElement(\"CANVAS\"),w=d.getContext(\"2d\");d.width=1024,d.height=512;var l=document.createElement(\"CANVAS\"),p=l.getContext(\"2d\");l.width=512,l.height=512;var g=new Image;g.onload=function(){setInterval(function(){t+=.01,r(w,d.width,d.height,g,1),r(p,l.width,l.height,g,2)},16)},g.src=\"../../asset/image/bg.jpg\";var E=Array.from(new Array(6),function(t,r){var a=void 0;return a=r<=1?new THREE.Texture(l):new THREE.Texture(d),a.wrapS=a.wrapT=THREE.RepeatWrapping,e.texture.push(a),new THREE.MeshPhongMaterial({color:e.cat_color,wireframe:e.DEBUG,overdraw:!0,map:a})}),c=new THREE.Mesh(s,new THREE.MultiMaterial(E));return c.castShadow=!0,c},e.createTorus=function(){var e=new THREE.TorusGeometry(this.wheel_size.radius-6,6,this.wheel_size.segments,50),t=(new THREE.TextureLoader).load(\"/asset/image/wheel.png\");t.wrapS=t.wrapT=THREE.RepeatWrapping,t.repeat.set(20,1);var r=new THREE.MeshPhongMaterial({color:this.cat_color,wireframe:this.DEBUG,map:t}),a=new THREE.Mesh(e,r);return a},e.createPlane=function(){var e=this.plane_size,t=e.width,r=e.height,a=e.segments,o=new THREE.PlaneGeometry(t,r,a,a),i=(new THREE.TextureLoader).load(\"/asset/image/wood.png\");i.wrapS=i.wrapT=THREE.RepeatWrapping,i.repeat.set(20,20);var n=new THREE.MeshPhongMaterial({color:16777215,wireframe:this.DEBUG,map:i}),h=new THREE.Mesh(o,n);return h.receiveShadow=!0,h}});\n\n//////////////////\n// WEBPACK FOOTER\n// ./dist/task-3/initObject.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./dist/task-3/initObject.js?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(t,i){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4),__webpack_require__(3),__webpack_require__(2),__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (i), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(\"undefined\"!=typeof exports)i(require(\"./initObject\"),require(\"./initLight\"),require(\"./initGui\"),require(\"./initCamera\"));else{var e={exports:{}};i(t.initObject,t.initLight,t.initGui,t.initCamera),t.main=e.exports}}(this,function(t,i,e,n){\"use strict\";function s(t){return t&&t.__esModule?t:{\"default\":t}}function h(t,i){if(!(t instanceof i))throw new TypeError(\"Cannot call a class as a function\")}var a=s(e),r=s(n),o=function(){function t(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,\"value\"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,e,n){return e&&t(i.prototype,e),n&&t(i,n),i}}(),l=function(){function e(){h(this,e),this.DEBUG=!1,this.cat_color=16777215,this.cat_size={width:150,height:100,depth:100,segments:20},this.plane_size={width:2e3,height:2e3,segments:20},this.wheel_size={radius:18,segments:20},this.reference=[],this.helper=[],this.texture=[],this.init()}return o(e,[{key:\"init\",value:function(){this.initScene(),this.initThree(),this.initLight(),this.initPlane(),this.initCat(),this.render(),this.initGui(),this.initControls(),this.initStats()}},{key:\"initGui\",value:function(){a[\"default\"].call(this)}},{key:\"initControls\",value:function(){this.controls=new THREE.OrbitControls(this.camera),this.controls.enablePan=!1,this.controls.domElement=this.wrap}},{key:\"initStats\",value:function(){this.stats=new Stats,document.body.appendChild(this.stats.dom)}},{key:\"initScene\",value:function(){this.scene=new THREE.Scene}},{key:\"initThree\",value:function(){this.wrap=document.body,this.width=this.wrap.clientWidth,this.height=this.wrap.clientHeight,this.camera=r[\"default\"].call(this),this.renderer=new THREE.WebGLRenderer({antialias:!0}),this.renderer.gammaInput=!0,this.renderer.gammaOutput=!0,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=THREE.PCFSoftShadowMap,this.renderer.setSize(this.width,this.height),this.wrap.appendChild(this.renderer.domElement),this.renderer.setClearColor(15987699,1)}},{key:\"initLight\",value:function(){this.Amlight=i.initAmbientLight.call(this),this.scene.add(this.Amlight),this.Dilight=i.initDirectionalLight.call(this),this.Dilight.position.set(60,80,-80),this.scene.add(this.Dilight),this.SpotLight=i.initSpotLight.call(this),this.SpotLight.position.set(130,170,-170),this.scene.add(this.SpotLight);var t=new THREE.SpotLightHelper(this.SpotLight);t.visible=this.DEBUG,this.helper.push(t),this.scene.add(t)}},{key:\"initPlane\",value:function(){this.plane=t.createPlane.call(this),this.plane.geometry.rotateX(-Math.PI/2),this.plane.position.set(0,-(this.cat_size.height/2+this.wheel_size.radius),0),this.scene.add(this.plane)}},{key:\"initCat\",value:function(){var i=this;this.cat=t.createBox.call(this),this.scene.add(this.cat);var e=[.5*this.cat_size.width-20,.5*-this.cat_size.height,.5*this.cat_size.depth],n=[[1,1],[-1,-1],[1,-1],[-1,1]];this.wheel=Array.from(new Array(4),function(s,h){var a=t.createTorus.call(i);return a.position.set(e[0]*n[h][0],e[1],e[2]*n[h][1]),i.scene.add(a),a})}},{key:\"render\",value:function(){this.animation(),this.stats&&this.stats.begin(),Array.from(this.texture,function(t){return t.needsUpdate=!0}),this.renderer.render(this.scene,this.camera),this.stats&&this.stats.end(),requestAnimationFrame(this.render.bind(this))}},{key:\"animation\",value:function(){}}]),e}();new l});\n\n//////////////////\n// WEBPACK FOOTER\n// ./dist/task-3/main.js\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./dist/task-3/main.js?");

/***/ }
/******/ ]);