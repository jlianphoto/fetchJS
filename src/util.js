// check the type of source;
function checkType(url){
	let str = url.replace(/\?\S+/g,"");
	let type = "";

	if (str.lastIndexOf('.css')>0) {
		type = 'css';
	}else if(str.lastIndexOf('.js')>0){
		type = 'js';
	}
	return type;
}


function parseAlias(url){
	var urlArr = url.split("/");
	var alias = fetchJS.alias;
	for(let k in fetchJS.alias){
		if (urlArr[0] === alias[k]) {
			urlArr[0] = alias[k];
		}
	}
	var url = urlArr.join("/");
	return url
}


//taskFn
function taskFn(fn){
	var self = this;
	var func = (function(){
		return function(){
			fn.call(self)
		}
	})()

	this.tasks.push(func);
}


export {checkType , taskFn , parseAlias}