const
    webpack = require('webpack'),
    devWebpackConfig = require('../../src/config/webpack.dev'),
    path = require('path');

const PATH_ROOT = path.join(__dirname, '/../../');

// (Mandatory): Istanbul instrumenter for post-transpilation of babel code
/*devWebpackConfig.module.rules = [
    {
        test: /\.(js|jsx)$/,
        include: path.resolve('./src'),
        exclude: /(test|node_modules|bower_components)/,
        loader: 'istanbul-instrumenter-loader'
    }
];*/

// Custom config for Karma + Webpack + Enzyme + Babel
//devWebpackConfig.module.rules[0]["query"] = {};
//devWebpackConfig.module.rules[0].query["presets"] = ["es2015", "react", "airbnb"];
// devWebpackConfig.output.publicPath ='/base/';
// devWebpackConfig.entry = 'setup.karma.js';
devWebpackConfig.module.rules[0]["use"].pop();
devWebpackConfig.module.rules[1]["use"].pop();
devWebpackConfig.plugins.pop();

/*devWebpackConfig.module.rules.push(
    {
        test: /\.js$/,
        include: [
            PATH_SRC_JS
        ],
        exclude: [
            path.join(PATH_SRC, 'js/containers')
        ],
        use: [
            {
                loader: "istanbul-instrumenter-loader",
                query: {
                    presets: ["es2015", "react", "airbnb"]
                }
            }
        ]
    }
);*/

devWebpackConfig["externals"] = {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
};

console.log(
    '!!!!! Information !!!!!\n',
    '- Karma uses webpack development config for testing.'
);

module.exports = function (config) {
    config.set({
        singleRun: true,
        resolve: {
            extensions: ['', '.js', '.jsx','.ts']
        },
        frameworks: ['jasmine'],
        files: [
            path.join(PATH_ROOT, 'build/js/polyfills.js'),
            path.join(PATH_ROOT, 'build/js/vendor.js'),
            path.join(PATH_ROOT, 'build/js/init.js'),
            path.join(PATH_ROOT, 'build/js/main.js'),
            path.join(PATH_ROOT, 'build/js/**/*.js'),
            'setup.karma.js'
        ],
        plugins: [
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-jasmine',
            'karma-coverage',
            'karma-jasmine-html-reporter',
            'karma-coverage-istanbul-reporter'
        ],
        preprocessors: {
            'setup.karma.js': ['webpack', 'sourcemap']
        },
        reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
        coverageIstanbulReporter: {
            reports: ['html', 'lcovonly'],
            fixWebpackSourcePaths: true,
            dir: './coverage'
        },
        webpack: devWebpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
        webpackServer: {
            noInfo: true
        },
        logLevel: config.LOG_INFO,
        port: 88
    })
};
