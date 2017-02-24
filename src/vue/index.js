import Observer from './observer.js'

window.Observer = Observer
console.log('======================================')
console.log('定义了全局的Observer，可在控制台中测试。')
console.log('======================================')

let obj = {
	a: 1,
	b: 2
}

let app = new Observer(obj)
console.log(app.b)
console.log(app.a)
app.b = 200
