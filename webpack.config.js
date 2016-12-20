var webpack = require('webpack');
var path = require("path");

module.exports = {
    //页面入口文件配置
    entry: './src/index.js',
    //入口文件输出配置
    //注意publicPath配置，否则webpack-dev-server无法引入dist/build.js
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath : "dist/",
        filename: 'build.js'
    },
    module: {
        //加载器配置
        loaders: [{   //注意loaders 否则babel-loader无法执行
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query:{presets: ['es2015']}
        }]
    }
};
