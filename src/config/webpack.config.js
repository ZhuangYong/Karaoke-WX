process.noDeprecation = true;
module.exports = function(env) {
    return require(`./webpack.${env}.js`);
};
