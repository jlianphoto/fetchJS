fetchJS
========

A simple module loader enabling dynamic module workflows in browsers.

support `js`and `css` , `import` and `then` are Synchronous;

Version 0.0.1

# use
```js
<script src="./dist/fetchJS.js"></script>
<script>
	//config
	fetchJS.config({
		baseURL : "127.0.0.1",
		hash    :  version
	})
	
	fetchJS.import('dataTime.css')
	.import('dataTime.js')
	.then(function(module){
		console.log(module);
	});
</script>
```

### config API
```js
fetchJS.config({
	baseURL : "127.0.0.1",
	hash    :  version,
	alias   :  {}
})
```

#### baseURL
`baseURL` type`String`,default `""`;

Example

```js
fetchJS.config({
  baseURL: 'http://192.168.0.1:8080/iver/dist/components/'
});

fetchJS.import('dataTime.js');
```

will load `dataTime` from `http://192.168.0.1:8080/iver/dist/components/dataTime.js`.

#### hash

`hash` : type `String`,default `""`;

Example

```js
fetchJS.config({
  baseURL: 'http://192.168.0.1:8080/iver/dist/components/',
  hash :  "201705011229",
  alias : {}
});

fetchJS.import('dataTime.js');
```
will load `dataTime` from `http://192.168.0.1:8080/iver/dist/components/dataTime.js?201705011229 `

#### alias

`alias` : type `Object` , default `null`

Example

```js
fetchJS.config({
  alias : {
	iver : "local/package"	
  }
});

fetchJS.import('dataTime.js')
```
will load `dataTime` from `local/package/dataTime.js`


### fetchJS API

#### import(Synchronous)

- {String}

```js
fetchJS.import("../src/index.js").then(function(resource){
	console.log(resource)
})
```



**dependencs**
- {Array}

the resource is from the last dependence
```js
fetchJS.import(["../css/a.css" , "../js/a.js"]).then(function(resource){
	console.log(resource)
})
```


#### asynImport
**asynchronous import**
- {String}

```js
fetchJS.asynImport("../src/a.js").then(function(resource){
	console.log(resoure)
})
```



### get Async Components for VUE

use fetchJS in vue-cli to get components from CDN

```js
export default {
  components:{
    myComponent : (resolve, reject)=>{
        fetchJS.import(['iver.min.css',components/iver/iver.js])
        .then(response=>{
          resolve(response);
        })
    }
  }
}
```


