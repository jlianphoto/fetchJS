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

### config
```js
fetchJS.config({
	baseURL : "127.0.0.1",
	hash    :  version
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
  hash :  "201705011229"
});

fetchJS.import('dataTime.js');
```
will load `dataTime` from `http://192.168.0.1:8080/iver/dist/components/dataTime.js?201705011229 `


### get Async Components for VUE

use fetchJS in vue-cli to get components from CDN

```js
export default {
  components:{
    myComponent : (resolve, reject)=>{
        fetchJS.import('iver.min.css')
        .import('components/iver/iver.js')  // cdn address
        .then(response=>{
          resolve(response);
        })
    }
  }
}
```


