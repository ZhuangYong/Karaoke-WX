/**
 * Created by walljack@163.com on 2017/7/26.
 */

let projectConfig = {};
let cbUrl = "";
let appId = "";
if (process.env.NODE_ENV === 'production') {
    projectConfig = require('../../config/project.config.prod');
    cbUrl = "aHR0cDovL3d4LmotbWFrZS5jbi8=";
    appId = "wxb948b0bc6e5db6da";
} else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    projectConfig = require('../../config/project.config.dev');
    cbUrl = "aHR0cDovL3d4Zml4LmotbWFrZS5jb20uY24=";
    appId = "wx4688d2b7b85451aa";
} else if (process.env.NODE_ENV === 'pre') {
    projectConfig = require('../../config/project.config.prod.pre');
    cbUrl = "aHR0cDovL3d4cHJlLmotbWFrZS5jbi8=";
    appId = "wxb948b0bc6e5db6da";
}

// 微信授权登录链接
let wxAuthorizedLink = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(projectConfig.apiDomain)}%2Fwx%2Fprocess%2Flogin%2F${encodeURIComponent(cbUrl)}&response_type=code&scope=snsapi_userinfo&state=test&connect_redirect=1#wechat_redirect`;

projectConfig.wxAuthorized = `${projectConfig.apiDomain}/wx/process/toUrl?url=${encodeURIComponent(wxAuthorizedLink)}`;

module.exports = projectConfig;
