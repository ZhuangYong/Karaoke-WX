/**
 * Created by walljack@163.com on 2017/7/11.
 */

const path = require("path");
const PATH_BUILD = path.join(__dirname, '../../build/');
const Merge = require('webpack-merge');
const webpack = require('webpack');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
    devtool: 'cheap-module-source-map',

    output: {
        path: PATH_BUILD,
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: "js/[id][hash].bundle.js",
        sourceMapFilename: '[name].map'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('expand')
            }
        })
    ]

    /*,
    devServer: {
        port: 80,
        host: 'localhost',
        contentBase:'./dist',
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        publicPath: '/build/'
    }*/

});

