//webpack.config.js
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var myConfig = {
    //entry: "./client/main.js",
    entry: {
        bundle: ["./client/main.js"],
        vendor: []
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.scss','.css'],
    },
    output: {
        // filename: "assets/bundle.js",
        // path: __dirname,
        path: path.join(__dirname, "./build/assets/"),
        filename: '[name].[chunkhash:8].js',
        //filename: '[name].[hash:8].js',
        //filename: '[name].[contenthash:8].js',
        //filename: '[name].js',
        chunkFilename: '[id].js',
        publicPath: './assets/',
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue'},
            //{ test: /\.css$/, loader: "style!css" },
            {
                test: /\.css$/,
                loader: //"style!css"
                    ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/,
                loaders: //["style", "css", "sass"]
                    ExtractTextPlugin.extract("style-loader", "css-loader","sass-loader")
            },
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            {
                test   : /\.(ttf|eot|svg|svg|woff|woff(2))(\?t\=[0-9]+)?$/,
                loader : 'file'
            }
        ]
    },
    // babel: {
    //     presets: ['es2015'],
    //     plugins: ['transform-runtime',["component", [
    //         {
    //             "libraryName": "element-ui",
    //             "styleLibraryName": "theme-default"
    //         }
    //     ]]]
    // },
    plugins:[
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['bundle','vendor']
        // }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['vendor','bundle'],
            // Modules must be shared between all entries
            minChunks: 2 // 提取所有chunks共同依赖的模块
        }),
        new HtmlWebpackPlugin({
            title: 'My App',
            template: 'index.html',
            filename: '../index.html'
        }),
        new ExtractTextPlugin("[name].[contenthash:8].css", {
            allChunks: true
        }),
    ]
};

if (process.env.NODE_ENV === 'production') {
    myConfig.plugins.unshift(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));
    myConfig.plugins.unshift(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    myConfig.plugins.unshift(new webpack.optimize.OccurenceOrderPlugin());

} else {
    module.exports.devtool = '#source-map'
}

module.exports = myConfig;