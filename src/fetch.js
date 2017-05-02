function fetchFetch(url , fn){
	fetch(url)
	.then(function(res) {
		return res.text();
    })
    .then(function(source){;
    	fn(source);
	})
	.catch(function(msg){
		throw new Error(msg)
	})
}

function xhrFetch(url , fn){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status == 200 || xhr.status == 304) {
        	var source = xhr.responseText;
          	fn(source)
        }
        else {
          error();
        }
      }
    };
    xhr.open("GET", url, true);
    xhr.send(null);
}

//run script
function scriptParse(source){
	var head = document.head || document.body || document.documentElement;

	var script = document.createElement('script');
	script.text = source;

	head.appendChild(script);
		head.removeChild(script);
}


//fetch css
function fetchCss(url,fn){
	let head = document.getElementsByTagName('head')[0];
	let link = document.createElement('link');
  
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = url;
	
	let existingLinks = findExistingCSS(url , head);

	if (existingLinks.length){
		head.insertBefore(link, existingLinks[0]);
	}else{
		head.appendChild(link);
	}

	link.onload = function(){
		fn()
	};

}


function findExistingCSS(url , head){
	var links = head.getElementsByTagName('link');
	var arr = [];
	for (let i = 0; i < links.length; i++) {
		arr.push(links[i])
	}
	return arr;
}



var fetchFunction = window.fetch ? fetchFetch: xhrFetch;;



export {fetchFunction , fetchCss ,scriptParse}