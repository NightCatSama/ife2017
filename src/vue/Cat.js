import Observer from './Observer.js'

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
		this.$template = template
		this.$el = el
		this.$watcher = this.__initWatcher(watch)
		this.__observer__ = new Observer(data, this.$watcher)
		this.$data = this.__observer__
		this.__render()
	}
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
	$watch(key, fn) {
		if (this.$watcher[key]) {
			this.$watcher[key].push(this.__bindContext(fn))
		}
		else {
			this.$watcher[key] = [this.__bindContext(fn)]
		}
	}
	__bindWatch(watch) {
		for (let key in watch) {
			watch[key] = this.__bindContext(watch[key])
		}
		return watch
	}
	__bindContext(fn) {
		if (typeof fn !== 'function')
			return
		
		return fn.bind(this)
	}
	__render() {
		this.$el.innerHTML = this.__parseTemplate()
	}
	__parseTemplate() {
		let data = this.$data
		return this.$template.replace(RE, (...arg) => {
			let key = arg[1].trim().replace(/\[(\d+)\]/g, '.$1')
			let keyArr = key.split('.')
			if (keyArr.length === 1) {
				return data[key]
			}
			let result = data
			let i = 0
			while (typeof result === 'object') {
				result = result[keyArr[i]]
				i++
			}
			return result
		})
	}
}