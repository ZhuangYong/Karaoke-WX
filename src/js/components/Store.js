// webpack编译时，根据nodejs环境变量加载不同的配置文件，生产环境的代码中不包含调试工具
// 可以通过cross-env包来设置环境变量
//
if (process.env.NODE_ENV === 'production') {
    // 生产环境store配置
    module.exports = require('./Store.prod');
} else {
    // 开发环境store配置
    // dev环境下ContextPath指向根路径
    HYAPP.ContextPath = '';
    module.exports = require('./Store.dev');
}
