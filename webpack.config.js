var webpack=require('webpack');
var path = require('path');

var config =  path.resolve(__dirname, './dist/');

console.log(config)

module.exports = {
    entry: "./src/index.js",
    output: {
        path: config,
        filename: "fetchJS.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/, 
                loader: "babel-loader",
                query: {presets: ['es2015']}
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
      ]
};