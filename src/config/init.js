/**
 * Created by walljack@163.com on 2017/7/26.
 */

var projectConfig = {};
if (process.env.NODE_ENV === 'production') {
    projectConfig = require('./project.config.prod');
} else if (process.env.NODE_ENV === 'development') {
    projectConfig = require('./project.config.dev');
} else if (process.env.NODE_ENV === 'pre') {
    projectConfig = require('./project.config.prod.pre');
}
