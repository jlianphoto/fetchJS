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


export {checkType , taskFn}