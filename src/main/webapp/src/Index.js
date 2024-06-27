const Obj = {};
const proxyObj = new Proxy(Obj, {
	set(target, prop, value) {
		if (prop == "value") {
		}
		console.log("set:", prop, value);
		// target[prop] = value;
		// return true;
		return Reflect.set(target, prop, value);
	},
	get(target, prop) {
		console.log("get: ", prop);
		return target[prop];
	},
	defineProperty(target, property, attribute) {
		console.log("defineProperty: ", property);
		return Reflect.defineProperty(target, property, attribute);
	},
});

proxyObj.name = "zenos";
Reflect.defineProperty(proxyObj, "age", {
	set(value) {
		proxyObj["age"] = value;
		return true;
	},
	get() {
		return 18;
	},
});
console.log(proxyObj.name, proxyObj.age);
console.log("age" in proxyObj);
