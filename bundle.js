'use strict';

class Observer {
	constructor (data) {
		for (let key in data) {
			this.convert(data, key);
		}
		return data
	}
	convert (data, key) {
		let value = data[key];
		Object.defindProperty(data, key, {
			enumerable: true,
			configurable: true,
			get: function reactiveGetter() {
				console.log('你访问了' + key);
				return value
			},
			set: function reactiveSetter(newVal) {
				console.log('你设置了' + key, newVal);
				return newVal
			}
		});
	}
}

console.log(Observer);

let obj = {
	a: 1,
	b: 2
};

let app1 = Observer(obj);

app1.a = 10;
