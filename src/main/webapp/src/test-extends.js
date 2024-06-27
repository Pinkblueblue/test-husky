/**
 * 缺点：
 * 1. 破坏了原来的原型
 * 2. 修改继承之后的原型，会破坏原来的原型
 * 3. 父类的实例属性没有继承
 */
function Extends(sup, base) {
	// update prototype
	function temp(...args) {
		sup.call(this, ...args);
		base.call(this, ...args);
	}

	temp.prototype = Object.create(Object.assign({}, sup.prototype, base.prototype));

	// update constructor
	temp.prototype.constructor = base;

	return temp;
}

function Person(name) {
	this.name = name;
}

function Peter(name, age) {
	this.age = age;
}

Peter.prototype.date = "2018";

const newPeter = Extends(Person, Peter);

const peter = new newPeter("peter", 19);

console.log(peter);
console.log(peter.name, peter.date);
