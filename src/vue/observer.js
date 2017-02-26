/*  数组监听的方法  */
const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

/*  为对象添加属性  */
const defPrototype = (obj, method, v) => {
	if (obj.hasOwnProperty(method)) return

	Object.defineProperty(obj, method, {
		value: v,
		enumerable: false,
		configurable: false
	})
}

/*  数组代理对象  */
class ArrayProxy extends Array {
	constructor(...args) {
		super(...args)
		methods.forEach((method) => {
			defPrototype(this, method, function() {
				let result = Array.prototype[method].apply(this, arguments)
				return result
			})
		})
	}
}

/**
 * Observer
 */
export default class Observer {
	constructor (data, watcher) {
		this.watcher = watcher
		this.walk(data)
	}
	walk (obj) {
		let val
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				val = obj[key]

				if (Array.isArray(val)) {
					val = new ArrayProxy(...val)
				}
				else if (typeof val === 'object') {
					val = new Observer(val)
				}

				this.convert(key, val)
			}
		}
	}
	convert (key, value) {
		Object.defineProperty(this, key, {
			enumerable: true,
			configurable: true,
			get: function reactiveGetter() {
				return value
			},
			set: function reactiveSetter(newVal) {
				if (newVal === value || (newVal !== newVal && value !== value)) {
					return
				}
				if (this.watcher && this.watcher[key]) {
					this.watcher[key].forEach((fn) => fn(newVal))
				}
				value = newVal
			}
		})
	}
}
