import {
	fetchFunction,
	fetchCss,
	scriptParse
} from './fetch.js'
import {
	checkType,
	taskFn
} from './util.js'



window.fetchJS = new FetchLoader();


function FetchLoader() {
	this.cfg = {
		baseURL: "",
		hash: ""
	};

	this.type = "";
	this.tasks = [];

	//start
	this.start = true;
}

FetchLoader.prototype.config = function(cfg) {
	for (let k in this.cfg) {
		this.cfg[k] = cfg[k];
	}
};

FetchLoader.prototype.next = function() {
	var fn = this.tasks.shift();
	fn && fn();
};


FetchLoader.prototype.import = function(u) {
	var self = this;
	taskFn.call(this, function() {

		let type = checkType(u);
		let url = "";

		if (this.cfg.baseURL) {
			url = this.cfg.baseURL + u;
		} else {
			url = u;
		}

		if (this.cfg.hash) {
			url += "?" + this.cfg.hash;
		}

		if (type === 'css') {
			var fn = function() {
				self.next()
			}
			fetchCss(url, fn);

		} else if (type === 'js') {
			//fetch
			var fn = function(source) {
				var tmp = `
						(function() {
							var exports = {};
							var module = {};
							module.exports = {};

							function hasData(a) {
								for (let k in a) {
									return true
								}
								return false
							}

							function define(id, b , fn) {
								
								var a = fn();

								if (a.default) {
									window.fetchJS.exports = a.default;
									return 
								}else{
									window.fetchJS.exports = fn();
									return
								}

								
							}
							${source}
							if (hasData(exports)) {
								if (exports.default) {
									window.fetchJS.exports = exports.default;
									return
								}else{
									window.fetchJS.exports = exports;
									return
								}
							}
							if (hasData(module.exports)) {
								if (module.exports.default) {
									window.fetchJS.exports = module.exports.default;
									return
								}else{
									window.fetchJS.exports = module.exports;
									return
								}
								
							}
						})()
					`;
				scriptParse(tmp);
				self.next();
			}
			fetchFunction(url, fn);
		}
	})


	if (this.start) {
		this.next();
		this.start = false;
	}
	return this;

};

FetchLoader.prototype.then = function(callback) {
	var self = this;
	taskFn.call(this, function() {
		callback && callback(window.fetchJS.exports);
		self.next();
	})
	return this;
};



export default fetchJS;