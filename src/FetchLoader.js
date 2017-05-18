import {fetchFunction,fetchCss,scriptParse} from './fetch.js'
import {checkType,taskFn} from './util.js'


function FetchLoader() {
	this.cfg = {
		baseURL: "",
		hash: ""
	};

	this.cash = {};
	this.type = "";
	this.tasks = [];
	this.url = "";
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

		var cfg = fetchJS.cfg;
		if (cfg.baseURL) {
			self.url = cfg.baseURL + u;
		} else {
			self.url = u;
		}

		if (cfg.hash) {
			self.url += "?" + cfg.hash;
		}

		//check cash
		if (fetchJS.cash.hasOwnProperty(self.url)) {
			return
		}


		if (type === 'css') {
			var fn = function() {
				self.next()
			}
			window.fetchJS.cash[self.url] = "css";
			fetchCss(self.url, fn);

		} else if (type === 'js') {
			//fetch
			var fn = function(source) {
				var tmp = `
						(function(url) {
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
									window.fetchJS.cash[url] = a.default;
									return 
								}else{
									window.fetchJS.cash[url] = a;
									return
								}

								
							}
							${source}
							if (hasData(exports)) {
								if (exports.default) {
									window.fetchJS.cash[url] = exports.default;
									return
								}else{
									window.fetchJS.cash[url] = exports;
									return
								}
							}
							if (hasData(module.exports)) {
								if (module.exports.default) {
									window.fetchJS.cash[url] = module.exports.default
									return
								}else{
									window.fetchJS.cash[url] = module.exports
									return
								}
								
							}
						})('${self.url}')
					`;
				scriptParse(tmp);
				self.next();
			}
			fetchFunction(self.url, fn);
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
		callback && callback(window.fetchJS.cash[self.url]);
		self.next();
	})
	return this;
};


FetchLoader.prototype.asynImport = function(url){

	var a = new FetchLoader().import(url);
	return a;
}


export {FetchLoader};