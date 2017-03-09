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

	eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e,t){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(\"undefined\"!=typeof exports)t(exports);else{var i={exports:{}};t(i.exports),e.initCamera=i.exports}}(this,function(e){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0}),e[\"default\"]=function(){var e=new THREE.PerspectiveCamera(45,this.width/this.height,1,1e4);return e.position.x=300,e.position.y=300,e.position.z=500,e.up.x=0,e.up.y=1,e.up.z=0,e.lookAt(this.scene.position),e}});\n\n//////////////////\n// WEBPACK FOOTER\n// ./dist/task-1/initCamera.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./dist/task-1/initCamera.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e,t){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(\"undefined\"!=typeof exports)t(exports);else{var n={exports:{}};t(n.exports),e.initGui=n.exports}}(this,function(e){\"use strict\";function t(){var e=this,t=new dat.GUI,n={widthSegments:20,heightSegments:20,depthSegments:20,torusSegments:20,wireframe:!1},i=function(){e.cat.geometry.dispose(),e.cat.geometry=new THREE.BoxGeometry(e.cat_size.width,e.cat_size.height,e.cat_size.depth,n.widthSegments,n.heightSegments,n.depthSegments),e.cat.material.wireframe=n.wireframe,Array.from(e.wheel,function(e){e.geometry.dispose(),e.material.wireframe=n.wireframe,e.geometry=new THREE.TorusGeometry(12,6,16,n.torusSegments)})};t.add(n,\"widthSegments\",1,40,1).onChange(i),t.add(n,\"heightSegments\",1,40,1).onChange(i),t.add(n,\"depthSegments\",1,40,1).onChange(i),t.add(n,\"torusSegments\",1,40,1).onChange(i),t.add(n,\"wireframe\").onChange(i),t.open()}Object.defineProperty(e,\"__esModule\",{value:!0}),e[\"default\"]=t});\n\n//////////////////\n// WEBPACK FOOTER\n// ./dist/task-1/initGui.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./dist/task-1/initGui.js?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e,t){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(\"undefined\"!=typeof exports)t(exports);else{var i={exports:{}};t(i.exports),e.initLight=i.exports}}(this,function(e){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var t=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16454200,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,n=new THREE.SphereGeometry(i,12,8),r=new THREE.MeshLambertMaterial({color:t,wireframe:!0}),o=new THREE.Mesh(n,r);e.add(o)};e.initAmbientLight=function(){var e=new THREE.AmbientLight(6710886);return e},e.initDirectionalLight=function(){var e=new THREE.DirectionalLight(10066329,.8);return this.DEBUG&&t(e),e}});\n\n//////////////////\n// WEBPACK FOOTER\n// ./dist/task-1/initLight.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./dist/task-1/initLight.js?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e,t){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (t), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(\"undefined\"!=typeof exports)t(exports);else{var o={exports:{}};t(o.exports),e.initObject=o.exports}}(this,function(e){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});e.createBox=function(e){var t=e.width,o=void 0===t?100:t,r=e.height,i=void 0===r?100:r,n=e.depth,s=void 0===n?100:n,c=e.Segments,f=void 0===c?20:c,a=new THREE.BoxGeometry(o,i,s,f,f,f),h=new THREE.MeshPhongMaterial({color:this.cat_color,wireframe:this.DEBUG}),d=new THREE.Mesh(a,h);return d},e.createTorus=function(){var e=new THREE.TorusGeometry(12,6,16,50),t=new THREE.MeshPhongMaterial({color:this.cat_color,wireframe:this.DEBUG}),o=new THREE.Mesh(e,t);return o}});\n\n//////////////////\n// WEBPACK FOOTER\n// ./dist/task-1/initObject.js\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./dist/task-1/initObject.js?");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(t,i){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4),__webpack_require__(3),__webpack_require__(2),__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (i), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if(\"undefined\"!=typeof exports)i(require(\"./initObject\"),require(\"./initLight\"),require(\"./initGui\"),require(\"./initCamera\"));else{var e={exports:{}};i(t.initObject,t.initLight,t.initGui,t.initCamera),t.main=e.exports}}(this,function(t,i,e,n){\"use strict\";function s(t){return t&&t.__esModule?t:{\"default\":t}}function r(t,i){if(!(t instanceof i))throw new TypeError(\"Cannot call a class as a function\")}var a=s(e),h=s(n),o=function(){function t(t,i){for(var e=0;e<i.length;e++){var n=i[e];n.enumerable=n.enumerable||!1,n.configurable=!0,\"value\"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(i,e,n){return e&&t(i.prototype,e),n&&t(i,n),i}}(),c=function(){function e(){r(this,e),this.cat_color=16777215,this.cat_size={width:150,height:100,depth:100},this.DEBUG=!1,this.initStats(),this.initScene(),this.initThree(),this.initLight(),this.initCat(),this.render(),a[\"default\"].call(this),this.controls=new THREE.OrbitControls(this.camera),this.controls.enablePan=!1,this.controls.domElement=this.wrap}return o(e,[{key:\"initStats\",value:function(){this.stats=new Stats,document.body.appendChild(this.stats.dom)}},{key:\"initScene\",value:function(){this.scene=new THREE.Scene}},{key:\"initThree\",value:function(){this.wrap=document.body,this.width=this.wrap.clientWidth,this.height=this.wrap.clientHeight,this.camera=h[\"default\"].call(this),this.renderer=new THREE.WebGLRenderer({antialias:!0}),this.renderer.shadowMap.enabled=!0,this.renderer.gammaInput=!0,this.renderer.gammaOutput=!0,this.renderer.shadowMap.type=THREE.PCFSoftShadowMap,this.renderer.setSize(this.width,this.height),this.wrap.appendChild(this.renderer.domElement),this.renderer.setClearColor(15987699,1)}},{key:\"initLight\",value:function(){this.Amlight=i.initAmbientLight.call(this),this.scene.add(this.Amlight),this.Dilight=i.initDirectionalLight.call(this),this.Dilight.position.set(60,80,-80),this.scene.add(this.Dilight)}},{key:\"initCat\",value:function(){var i=this;this.cat=t.createBox.call(this,this.cat_size),this.scene.add(this.cat);var e=[.5*this.cat_size.width-20,.5*-this.cat_size.height,.5*this.cat_size.depth],n=[[1,1],[-1,-1],[1,-1],[-1,1]];this.wheel=Array.from(new Array(4),function(s,r){var a=t.createTorus.call(i);return a.position.set(e[0]*n[r][0],e[1],e[2]*n[r][1]),i.scene.add(a),a})}},{key:\"render\",value:function(){this.animation(),this.stats&&this.stats.begin(),this.renderer.render(this.scene,this.camera),this.stats&&this.stats.end(),requestAnimationFrame(this.render.bind(this))}},{key:\"animation\",value:function(){}}]),e}();new c});\n\n//////////////////\n// WEBPACK FOOTER\n// ./dist/task-1/main.js\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./dist/task-1/main.js?");

/***/ }
/******/ ]);