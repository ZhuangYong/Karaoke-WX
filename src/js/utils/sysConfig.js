/**
 * Created by walljack@163.com on 2017/7/26.
 */

let projectConfig = {};
if (process.env.NODE_ENV === 'production') {
    projectConfig = require('../../config/project.config.prod');
} else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    projectConfig = require('../../config/project.config.dev');
} else if (process.env.NODE_ENV === 'pre') {
    projectConfig = require('../../config/project.config.prod.pre');
}

module.exports = projectConfig;
