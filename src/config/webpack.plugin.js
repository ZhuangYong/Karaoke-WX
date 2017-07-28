/**
 * Created by walljack@163.com on 2017/7/12.
 */
'use strict';

function HtmlHandel(option) {
    this.option = option;
}

HtmlHandel.prototype.apply = function (compile) {
    let paths = this.option.paths;
    compile.plugin('compilation', function (compilation, options) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
            console.log(htmlPluginData.assets.js);
            for (let i = paths.length - 1; i >= 0; i--) {
                htmlPluginData.assets.js.unshift(paths[i]);
            }
            callback(null, htmlPluginData);
        });
        /*compilation.plugin('html-webpack-plugin-after-emit',function (htmlPluginData,callback) {
         console.log('-----------------');
         console.log(htmlPluginData.html.source());
         console.log('-----------------');

         callback(null,htmlPluginData);
         });*/
    });
};

module.exports = {
    HtmlHandel
};
