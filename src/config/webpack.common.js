/**
 * Created by walljack@163.com on 2017/7/11.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const {HtmlHandel} = require('./webpack.plugin');

const PATH_BUILD = path.join(__dirname, '../../build/');
const PATH_ROOT = path.join(__dirname, '/../../');
const PATH_MAIN_JS = path.join(PATH_ROOT, 'src/js/index.js');
const PATH_SRC = path.join(PATH_ROOT, 'src/');
const PATH_SRC_JS = path.join(PATH_SRC, 'js/');
const PATH_SRC_JS_LIB = path.join(PATH_SRC_JS, 'lib/');
const PATH_SRC_CSS = path.join(PATH_SRC, 'css/');
const PATH_SRC_SASS = path.join(PATH_SRC, 'sass/');
const PATH_MODULES = path.join(PATH_ROOT, 'node_modules/');

module.exports = {
    context: path.join(__dirname, "../"),
    entry: {
        'main': PATH_MAIN_JS,
        'init': [path.join(PATH_SRC_JS_LIB, 'initial')],
        'vendor': ["crypto-js", "material-ui"],
        'polyfills': ["react", "redux", "react-redux", "react-dom", "react-router-dom", "react-router", "react-router-redux", "history"]
    },

    output: {
        path: PATH_BUILD,
        filename: '[name].bundle.js',
        publicPath: '/build/',
        sourceMapFilename: '[name].map'
    },

    resolve: {
        extensions: ['.js'],
        modules: [PATH_SRC, PATH_MODULES]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    PATH_SRC_JS
                ],
                exclude: [
                    path.join(PATH_SRC, 'js/containers'),
                    path.join(PATH_SRC, 'js/lib')
                ],
                use: [
                    {
                        loader: "babel-loader",
                        query: {
                            presets: ['es2015', 'react'],
                            plugins: ['transform-object-assign']
                        }
                    },
                    {
                        loader: "eslint-loader",
                        options: {
                            configFile: path.join(__dirname, '.eslintrc.js'),
                            formatter: require('eslint-friendly-formatter')
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                include: [
                    path.join(PATH_SRC, 'js/containers')
                ],
                use: [
                    {
                        loader: "bundle-loader?lazy"
                    },
                    {
                        loader: "babel-loader",
                        query: {
                            presets: ['es2015', 'react'],
                            plugins: ['transform-object-assign']
                        }
                    },
                    {
                        loader: "eslint-loader",
                        options: {
                            configFile: path.join(__dirname, '.eslintrc.js'),
                            formatter: require('eslint-friendly-formatter')
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: [
                    PATH_SRC_CSS
                ],

                //把css link进去
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader"
                // })
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]

            },

            {
                test: /\.scss$/,
                include: [
                    PATH_SRC_SASS
                ],
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                },{
                    loader: "sass-loader"
                }]
            },

            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 512,
                        name: '[path][name].[ext]?[hash]'
                    }
                }]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),

        /*new HtmlHandel({
         paths: ['init/initial.js']
         }),*/

        new HtmlWebpackPlugin({
            template: path.join(PATH_SRC + 'indexTpl.html'),
            filename: path.join(PATH_ROOT + '/build/index.html'),
            hash: true,
            chunksSortMode: function (chunk1, chunk2) {
                let order = ['polyfills', 'vendor', 'init', 'main'];
                let order1 = order.indexOf(chunk1.names[0]);
                let order2 = order.indexOf(chunk2.names[0]);
                return order1 - order2;
            }
        }),

        // 打开浏览器
        new OpenBrowserPlugin({
            url: 'http://wxzac.j-make.com.cn?uuid=ohSltvwgabfZPNDxc2r14tlf7rwM'
        })
    ]
};
