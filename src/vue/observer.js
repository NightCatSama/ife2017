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

var set = {}
var observeTarget = null

/**
 * Observer
 */
export default class Observer {
	constructor (data, watcher, root) {
		this.__watcher__ = watcher
		this.__root__ = root
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
					val = new Observer(val, this.__watcher__, key)
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
				// console.log('你访问了', key)
				return value
			},
			set: function reactiveSetter(newVal) {
				if (newVal === value || (newVal !== newVal && value !== value)) {
					return
				}
				let k = this.__root__ || key
				if (this.__watcher__ && this.__watcher__[k]) {
					this.__watcher__[k].forEach((fn) => fn(newVal))
				}
				// console.log('你设置了', key, '=>', newVal)
				value = newVal
				this.__watcher__.__render__()
			}
		})
	}
}
