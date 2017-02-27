import Observer from './observer.js'

/*  匹配双大括号内的内容  */
const RE = /\{\{((?:.|\n)+?)\}\}/g

export default class Cat {
	constructor({
		template,
		el = null,
		data = {},
		watch = {},
		methods = {}
	}) {
		this.$el = el
		this.$template = template || this.$el.innerHTML
		this.$watcher = this.__initWatcher(watch)
		this.$data = new Observer(data, this.$watcher)
		this.__render()
		this.$watcher.__render__ = this.__render.bind(this)
	}
	/*  初始化Watcher  */
	__initWatcher(watch) {
		let obj = {}
		for (let key in watch) {
			if (obj[key]) {
				obj[key].push(this.__bindContext(watch[key]))
			}
			else {
				obj[key] = [this.__bindContext(watch[key])]
			}
		}
		return obj
	}
	/*  绑定方法的上下文指向this  */
	__bindContext(fn) {
		if (typeof fn !== 'function')
			return

		return fn.bind(this)
	}
	/*  开始渲染  */
	__render() {
		let exp = `\`${this.__parseTemplate()}\``
		let code = `
		with (this.$data){
			return eval(arguments[0])
		}
		return exp
		`
		let html = new Function(code).call(this, exp)
		this.$el.innerHTML = html
	}
	/*  模板解析  */
	__parseTemplate() {
		let data = this.$data
		return this.$template.replace(RE, (...arg) => {
			return '${' + arg[1].trim() + '}'
		})
	}
	/*  添加watch  */
	$watch(key, fn) {
		if (this.$watcher[key]) {
			this.$watcher[key].push(this.__bindContext(fn))
		}
		else {
			this.$watcher[key] = [this.__bindContext(fn)]
		}
	}
}