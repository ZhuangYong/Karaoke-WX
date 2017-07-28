/**
 * Created by walljack@163.com on 2017/7/13.
 */
export default function run(){
    return new Promise((resolve,reject)=>{
        let app = require("express")(),
            webpack = require('webpack'),
            config = require('../src/config/webpack.config')("dev"),
            webpackDevMiddleware = require('webpack-dev-middleware'),
            webpackHotMiddleware = require('webpack-hot-middleware');

        let compiler = webpack(config);
//将这个添加到webpack配置文件的入口里面 ?reload=true 设置浏览器是否自动刷新；
        app.use(webpackDevMiddleware(compiler, {
            index:"home.html",
            noInfo: true,
            publicPath: "/build/"
        }));
        app.use(webpackHotMiddleware(compiler));
        app.listen(80);
        return resolve();
    });
}

