# [Day 1](https://nightcatsama.github.io/My-ThreeJS/dist/day1)

---

### 1. 模型更新

`
cube.geometry.dispose();
cube.geometry = new THREE.BoxGeometry(param.width, param.height, param.depth, param.widthSegments, param.heightSegments, param.depthSegments);
`
### 2. 材质更新

`
material.needsUpdate = true;
cube = new THREE.Mesh(geometry, material);

cube.material.wireframe = param.wireframe
`

### 3. FPS检测器的使用 (three.js/examples/js/libs/stats.min.js)
`
stats = new Stats();
document.body.appendChild(stats.dom);
// ...
stats.begin();
renderer.render(scene, camera);
stats.end();
`

### 4. 添加阴影
####在Three.js中，能形成阴影的光源只有THREE.DirectionalLight与THREE.SpotLight；而相对地，能表现阴影效果的材质只有THREE.LambertMaterial与THREE.PhongMaterial。(THREE.LambertMaterial 无法形成阴影！！？)
渲染器
`
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
`
所有跟产生阴影有光物体
`
box.castShadow = true;
light.castShadow = true;
`
所有接收阴影的物体
`
plane.receiveShadow = true;
`