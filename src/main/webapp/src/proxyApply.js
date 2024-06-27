function base() {
	console.log("base");
}

const newBase = new Proxy(base, {
	apply(target, that, args) {
		target.call(that, ...args);
		console.log("proxy base");
	},
});

newBase();

newBase.apply(null);
