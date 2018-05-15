/**
 * Created by walljack@163.com on 2017/7/11.
 */

const path = require("path");
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const PATH_BUILD = path.join(__dirname, '../../build/');
module.exports = Merge(CommonConfig, {
    output: {
        path: PATH_BUILD,
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: "js/[id][hash].bundle.js",
        sourceMapFilename: '[name].map'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('pre')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
});
