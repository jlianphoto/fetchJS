import {fetchFunction,fetchCss,scriptParse} from './fetch.js'
import {checkType, parseAlias ,taskFn} from './util.js'

import Vue from 'vue';
window.vue = Vue;


function FetchLoader() {
	this.cfg = {
		baseURL: "",
		hash: "",
		alias : {
			"vue" : Vue,
			"element-ui":""
		}
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

FetchLoader.prototype._next = function() {
	var fn = this.tasks.shift();
	fn && fn();
};


FetchLoader.prototype._import = function(u){
		var self = this;
	taskFn.call(this, function() {

		let type = checkType(u);

		var cfg = fetchJS.cfg;

		// handle baseURL
		if (cfg.baseURL) {
			self.url = cfg.baseURL + u;
		} else {
			self.url = u;
		}

		/*
		* handle alias
		* url = baseURL + alias + url
		*/
		if (cfg.alias) {
			// element-ui/lib/mixins/emitter
			self.url += parseAlias(u);
		}


		// handle hash
		if (cfg.hash) {
			self.url += "?" + cfg.hash;
		}



		//check cash
		if (fetchJS.cash.hasOwnProperty(self.url)) {
			return self;
		}


		if (type === 'css') {
			var fn = function() {
				self._next()
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


							function require(){
								
								return vue
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
				self._next();
			}
			fetchFunction(self.url, fn);
		}
	})


	if (this.start) {
		this._next();
		this.start = false;
	}
	return this;
}


FetchLoader.prototype.import = function(depend) {
	if (typeof depend === "string") {
		this._import(depend)
		return this;
	}

	if (Array.isArray(depend)) {
		depend.forEach(url=>{
			this._import(url);
		})
		return this;
	}
};


FetchLoader.prototype.then = function(callback) {
	var self = this;

	taskFn.call(this, function() {
		console.log(callback)
		callback && callback(window.fetchJS.cash[self.url]);
		self._next();
	})
	return this;
};




FetchLoader.prototype.asynImport = function(url){

	var a = new FetchLoader().import(url);
	return a;
}


export {FetchLoader};