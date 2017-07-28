// 各个页面后退时的默认路径

let defaultBackPath = {

    // 注册登录
    '/login/register2': '/login/register',
    '/login/register': '/login/signin',
    '/login/signin': '/home',

    // 首页
    '/home': '/home,/',
    '/': '/,/home',

    // 外部链接页面
    '/external': '/home',

    '/member/home': '/home',
    '/member/account': '/member/home',
    '/member/activity': '/member/home',
};

// 特殊路径，类似末尾带有参数类型的/member/activity/16
let specialPath = [];

export {defaultBackPath, specialPath};

export default defaultBackPath;
