// 一些通用的方法
import {JSEncrypt} from 'jsencrypt';
import md5 from 'md5';
import sysConfig from "./sysConfig";
import navUtils from "./navUtils";
import ActionTypes from "../actions/actionTypes";
import Base64 from "Base64";

/**
 * 返回特定格式时间字符串
 * @param time
 * @param cFormat
 * @returns {*}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        if (('' + time).length === 10) time = parseInt(time, 0) * 1000;
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return timeStr;
}

/**
 * 根据时间戳返回对应的y，m，d
 * @param  {[type]} tNum [description]
 * @return {string}      [description]
 */
export function timeToYmd(tNum, sep) {
    let date = tNum ? new Date(tNum) : new Date();
    let y = date.getFullYear() + '';
    let m = (date.getMonth() + 101 + '').substring(1);
    let d = (date.getDate() + 100 + '').substring(1);

    if (sep === '年月日') {
        return y + '年' + m + '月' + d + '日';
    } else if (typeof sep === 'string') {
        return [y, m, d].join(sep);
    } else {
        return [y, m, d].join('-');
    }
}

export function timeToYmdSec(tNum, sep1, sep2) {
    let ymd = timeToYmd(tNum, sep1);
    let date = tNum ? new Date(tNum) : new Date();
    // let h = date.getHours();
    let h = (date.getHours() + 100 + '').substring(1);
    // let m = date.getMinutes();
    let m = (date.getMinutes() + 100 + '').substring(1);
    if (sep2) {
        return ymd + ' ' + [h, m].join(sep2);
    } else {
        return ymd + ' ' + [h, m].join(':');
    }
}


/**
 * 生成相关联的时间
 * 参考当前时间分别返回：
 * 三分钟之内显示 刚刚，
 * 一小时之内显示 xx分钟之前，
 * 当天显示 今天 时:分,
 * 不是当天显示 xxxx年xx月xx日 时:分
 * @param  {[type]} tNum [description]
 * @return {[type]}      [description]
 */
export function timeToRelative(tNum, curt) {
    let cur = curt ? new Date(curt) : new Date();
    let t = new Date(tNum);
    let diff = cur.getTime() - tNum;
    let re;

    let dbHours = (t.getHours() + 100 + '').substring(1);
    let dbMinutes = (t.getMinutes() + 100 + '').substring(1);

    if (diff < 180000) {
        // 3*60*1000
        re = '刚刚';
    } else if (diff < 3600000) {
        // 60*60*1000
        re = Math.round(diff / 60000) + '分钟之前';
    } else if (diff < 86400000 && t.getDate() === cur.getDate()) {
        // 24小时之内，且天数和当前是同一天
        // 24*60*60*1000
        re = '今天 ' + dbHours + ':' + dbMinutes;
    } else {
        re = timeToYmd(tNum) + ' ' + dbHours + ':' + dbMinutes;
    }
    return re;
}


/**
 * 检查当前设备环境，是否是android，ios，微信
 * @return {[type]} [description]
 */
export function chkDevice() {
    let ua = navigator.userAgent.toLowerCase();
    let isWeixin = ua.indexOf('micromessenger') !== -1;
    let isAndroid = ua.indexOf('android') !== -1;
    let isIos = (ua.indexOf('iphone') !== -1) || (ua.indexOf('ipad') !== -1);
    // console.log(process.env);

    const env = process.env.NODE_ENV;
    if (env === "development" || env === "expandTest") {
        isWeixin = true;
    }
    return {
        isWeixin: isWeixin,
        isAndroid: isAndroid,
        isIos: isIos
    };
}

export function getWxinfoFromSession() {
    return JSON.parse(window.sessionStorage.getItem("wxInfo") || "{}");
}

// 获取url?后某参数
export function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return /*unescape(*/r[2]/*)*/;
    }
    return null;
}

/**
 * 计算iscroll的option.click的选项的值，在设置iscroll时，option.clidk的值采用这个方法返回的值。
 *
 * 如果直接设置option.click为true，ios要双击才能触发单击事件，如果设置为false，ios可以触发单击事件，
 * 但是android又不能触发事件了，所以需要检测机型来设置。
 *
 * @return {boolean} [description]
 */
export function iScrollClick() {
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent))
        return false;
    if (/Silk/i.test(navigator.userAgent))
        return false;
    if (/Android/i.test(navigator.userAgent)) {
        let chromeVersion = 0;
        if (/Chrome/i.test(navigator.userAgent)) {
            chromeVersion = navigator.userAgent.substr(navigator.userAgent.indexOf('Chrome') + 7, 2);
        }
        let s = navigator.userAgent.substr(navigator.userAgent.indexOf('Android') + 8, 3);
        if (parseFloat(s[0] + s[2]) < 44) {
            if (chromeVersion < 40) {
                return false;
            }
        }
        return true;
    }
}

/**
 * 处理富文本编辑器的内容
 * 主要替换掉富文本编辑器中插入的style
 *
 * @param  {[type]} rawText 原始文本
 * @return {[type]}         [description]
 */
export function processRichText(rawText) {
    return rawText.replace(/(style=.+?"|color=.+?")/g, '');
}

/**
 * 把对象数组转换成一个对象，新对象包含了原对象数组中的各个对象。
 * 指定原对象数组中每个对象的一个属性，用它的值来作为新对象中指向各个对象的属性名。
 * eg.
 * 转换前
 * arr = [
 *    {k:'obj1',x:1,y:2,z:3},
 *    {k:'obj2',x:4,y:5,z:6}
 * ]
 *
 * arrToObj(arr, 'k');
 * 转换后
 * obj = {
	 * 	ojb1: {k:'obj1',x:1,y:2,z:3},
	 * 	obj2: {k:'obj2',x:4,y:5,z:6}
	 * }
 *
 * @param {[type]} arr 待转换的对象数组
 * @param {[type]} key 作为对象索引的属性的属性名
 */
export function arrToObj(arr, key) {
    let i, tmp, obj = {};
    for (i = 0; i < arr.length; i++) {
        tmp = arr[i];
        if (!obj.hasOwnProperty(tmp[key])) {
            obj[tmp[key]] = tmp;
        }
    }
    return obj;
}

/**
 * 设置已读未读提醒
 */
export function checkid(id) {
    let readedIds = localStorage.getItem('readedIds');
    let isread = false;
    if (readedIds) {
        readedIds = JSON.parse(readedIds);
    } else {
        readedIds = [];
    }
    for (let i = 0; i < readedIds.length; i++) {
        if (readedIds[i] === id) {
            isread = true;
        }
    }
    return isread;
}

/**
 * 生成随机字符串
 */
export function getRandomString(len) {
    let seed = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let index, str = '';
    for (let i = 0; i < len; i++) {
        index = Math.round(Math.random() * 61);
        str += seed[index];
    }
    return str;
}

/**
 * 生成随机字符串
 */
export function writeAnalyjs(len) {
    let analyjs = document.getElementById('analyjs');
    let oScript = document.createElement("script");
    oScript.id = "analyjs";
    oScript.type = "text/javascript";
    oScript.src = "https://s4.cnzz.com/z_stat.php?id=1258600689&web_id=1258600689";
    oScript.setAttribute("async", true);
    oScript.setAttribute("defer", true);
    analyjs && analyjs.remove();
    document.body.appendChild(oScript);
}

/**
 * 前往指定的页面
 * @param  {string} link         页面path
 * @param  {boolean} requireLogin 是否需要登录
 * @return {type}              [description]
 */
export function linkTo(link, requireLogin, info) {
    let fullLink;
    if (link.indexOf('http') === 0) {
        fullLink = link;
        location.href = link;
        return [];
    } else {
        fullLink = sysConfig.contextPath + link;
    }

    if (requireLogin) {
        navUtils.forward(sysConfig.contextPath + '/login');
    } else {
        navUtils.forward(fullLink);
    }
}


export function loadScript(url, callback) {
    const queryScript = document.querySelector("[src='" + url + "']");
    if (queryScript) return;

    let script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) { //IE
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" ||
                script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else { //Others: Firefox, Safari, Chrome, and Opera
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    document.head.appendChild(script);
}

/**
 *
 * @param Oid
 * @returns {{appId: string, appVersion: string, wxId: string, deviceId: string, mac: string, terminalType: string, timeStamp: string, version: string, channel: string}}
 * 测试默认 3c3cf52ccf882f55db3445524e60f10d //guang pu
 * 2f8ea06784194d56c19d96d4d75a1b6b // jin biao
 * 7ec58553c6bdcca24eb7a33bfcd84bd3 // a du
 * 0ab25001ad1cd646887242fcaebf752f //xiong xiao song
 * 607a674586b0024ac5343e2cb8b82e4c // 蒋程
 * 59a3254c724a852d10052c65c2c5dfd1 // 朱琴
 */
export function getEncryptHeader(Oid) {
    let sessionOid = {};
    const userInfo = getWxinfoFromSession();
    if (userInfo.status === 1) {
        const {data} = userInfo;
        sessionOid = {
            wxId: data.uuid,
            deviceId: data.deviceId
        };
    }
    Oid && (Oid = Object.assign({}, sessionOid, Oid));
    !Oid && (Oid = sessionOid);
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKsWVIYQxtPV5MN+3IJJp5bSIcNfYB4AyG0b9C7NSHNP0VmdH5dVBpYFb70wDwLa9YZwFocO1sjxnkZJv83/oA0CAwEAAQ==');
    //if (!Oid.wxId || !Oid.deviceId) throw Error("微信id或设备id不能为空");
    return {
        appId: encrypt.encrypt('kalaebb34de801bb67fd'),
        appVersion: sysConfig.appVersion,
        wxId: encrypt.encrypt(Oid.wxId || ""),
        deviceId: encrypt.encrypt(Oid.deviceId || ""),
        mac: encrypt.encrypt('mac'),
        // deviceId: encrypt.encrypt("2f8ea06784194d56c19d96d4d75a1b6b"),
        // mac: encrypt.encrypt('28070d000119'),
        terminalType: 'weixin',
        timeStamp: new Date().getTime().toString(),
        version: 'v1.0',
        channel: 'official',
        language: getLanguageCookie()
    };
}

export function reqHeader(data, header, isReturnSign) {
    if (typeof header === 'undefined') {
        header = getEncryptHeader();
    }
    let obj = Object.assign({}, header, data);
    let str = Object.keys(obj).sort().map((key) => {
        if (key !== 'sign') {
            return key + '=' + obj[key];
        }
    }).join("&");
    str += '&e93a7f98d53ec404931c87606ea0bd92';
    // console.log(str);
    if (isReturnSign) return md5(str);
    header.sign = md5(str);
    return header;
}

export function setCookie(name, value, expireDays) {
    let date = new Date();
    date.setDate(date.getDate() + expireDays);
    document.cookie = name + "=" + escape(value) + ((expireDays === null) ? "" : ";path=/;expires=" + date.toGMTString());
}

export function removeCookie(name) {
    let exp = new Date();
    exp.setTime(exp.getTime() - 100);
    let val = this.getCookie(name);
    if (val !== null)
        document.cookie = name + "=" + val + ";path=/;expires=" + exp.toGMTString();
}

export function getCookie(name) {
    if (document.cookie.length > 0) {
        let cStart, cEnd;
        cStart = document.cookie.indexOf(name + "=");
        if (cStart !== -1) {
            cStart = cStart + name.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) cEnd = document.cookie.length;
            return unescape(document.cookie.substring(cStart, cEnd));
        }
        return "";
    }
    return "";
}

export function expireT(time) {
    let expireT = (time - new Date().getTime()) / (1000 * 60 * 60 * 24);
    return expireT.toFixed(2);
}

export function wxConfig(data = {}) {
    window.wx && window.wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
            'getNetworkType',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'scanQRCode',
            'startRecord',
            'stopRecord',
            'translateVoice',
            'chooseWXPay',
            'chooseImage',
            'getLocalImgData',
            'uploadImage'
        ]
    });
}


// 微信分享
export function wxShare(shareData) {
    // 分享到朋友圈
    window.wx && window.wx.onMenuShareTimeline({
        title: shareData.title + "---" + shareData.desc, // 分享标题
        link: shareData.link, // 分享链接
        imgUrl: shareData.imgUrl, // 分享图标
        trigger: function () {
        },
        success: function () {
        },
        cancel: function () {
        },
        fail: function () {
        }

    });
    // 分享给朋友
    window.wx && window.wx.onMenuShareAppMessage({
        title: shareData.title, // 分享标题
        desc: shareData.desc, // 分享描述
        link: shareData.link, // 分享链接
        imgUrl: shareData.imgUrl, // 分享图标
        type: shareData.type, // 分享类型,music、video或link，不填默认为link
        dataUrl: shareData.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
        trigger: function () {
        },
        success: function () {
        },
        cancel: function () {
        },
        fail: function () {
        }
    });

    /*// 分享到QQ
    window.wx && window.wx.onMenuShareQQ({
        title: shareData.title, // 分享标题
        desc: shareData.desc, // 分享描述
        link: shareData.link, // 分享链接
        imgUrl: shareData.imgUrl, // 分享图标
        trigger: function () {
        },
        success: function () {
        },
        cancel: function () {
        },
        fail: function () {
        }
    });
    // 分享到腾讯微博
    window.wx && window.wx.onMenuShareWeibo({
        title: shareData.title, // 分享标题
        desc: shareData.desc, // 分享描述
        link: shareData.link, // 分享链接
        imgUrl: shareData.imgUrl, // 分享图标
        trigger: function () {
        },
        success: function () {
        },
        cancel: function () {
        },
        fail: function () {
        }
    });
    // 分享到QQ空间
    window.wx && window.wx.onMenuShareQZone({
        title: shareData.title, // 分享标题
        desc: shareData.desc, // 分享描述
        link: shareData.link, // 分享链接
        imgUrl: shareData.imgUrl, // 分享图标
        trigger: function () {
        },
        success: function () {
        },
        cancel: function () {
        },
        fail: function () {
        }
    });*/
}

// 去除字符串所有标点
export function stripScript(s) {
    let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    let rs = "";
    for (let i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

export function toRem(px) {
    const designW = 750;
    return px * 10 / designW + "rem";
}

export function dynaPush(funcParam = {
    ottInfo: {},
    userInfo: {},
    param: {},
    localNetIsWork: false,
    action_pushLocal: f => f,
    action_setLocalNet: f => f,
    action_push: f => f,
    action_setGlobAlert: f => f,
    success: f => f,
    fail: f => f

}) {
    const {ottInfo, userInfo, param, localNetIsWork, action_pushLocal, action_setLocalNet, action_push, action_setGlobAlert, success, fail} = funcParam;
    const {data} = ottInfo || {};
    const {userInfoData} = userInfo || {};
    const {deviceIp, devicePort, networkType, systemTime, timeStamp} = data || {};
    const localParam = Object.assign({}, param, {
        debug: sysConfig.environment !== "product",
        deviceId: userInfoData.data.deviceId
    });
    const header = reqHeader(param);
    const localHeader = reqHeader(localParam);
    const localPri = `http://${deviceIp}:${devicePort}`;
    const ottIsOnLine = () => {
        if (systemTime && timeStamp) return !(systemTime - timeStamp > 12 * 60 * 1000);
        return false;
    };
    if (!ottIsOnLine()) {
        action_setGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE);
        return;
    }
    if (typeof window.gxTime !== 'undefined') {
        if (window.gxTime === 0) {
            action_setGlobAlert("", ActionTypes.COMMON.ALERT_TYPE_GONG_XIANG_DONE);
            return;
        }
    }
    const renderPushResult = (res) => {
        const {status, data} = res;
        const pushMsg = JSON.parse(data.msg || "{}");
        if (status === 1 && pushMsg.ret && pushMsg.ret === 'SUCCESS') {
            success && success(res);
        } else {
            fail && fail("操作失败");
        }
    };
    if (localNetIsWork && (networkType === 'wifi' || networkType === 'eth') && deviceIp && devicePort && userInfoData && userInfoData.data) {
        action_pushLocal(localPri, localParam, localHeader, success, (msg, err, rejectCode) => {
            if (!window.handelErrs) window.handelErrs = {};
            if (window.handelErrs[rejectCode]) return;
            action_setLocalNet(false);
            action_push(param, header, renderPushResult, fail);
            window.handelErrs[rejectCode] = true;
        });
    } else {
        action_push(param, header, renderPushResult, fail);
    }
}

/**
 * 微信授权后重定向到某链接
 * @param appId 微信授权服务号appId
 * @param apiDomain 接口地址
 * @param cbUrl 重定向链接字符串
 * @returns {string}
 */
export function wxAuthorizedUrl(appId, apiDomain, cbUrl) {

    const env = process.env.NODE_ENV;
    let redirectUri = `${encodeURIComponent(apiDomain)}%2Fwx%2Fprocess%2Flogin%2F${encodeURIComponent(Base64.btoa(cbUrl))}`;
    if (env === "expand" || env === "expandTest" || env === 'master') {
        redirectUri = `${encodeURIComponent(apiDomain)}%2Fuser%2FweChatCallback%3Fparam=${encodeURIComponent(cbUrl)}`;
    }

    // 微信授权登录链接
    const wxAuthorizedLink = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=test&connect_redirect=1#wechat_redirect`;

    return `${apiDomain}/wx/process/toUrl?url=${encodeURIComponent(wxAuthorizedLink)}`;
}

// 检测是否获取用户信息
export function isGetUserInfo() {
    const pathNames = [
        '/pay/',
        '/login/',
        '/recordingPlay/',
        '/recording/'
    ];
    let bool = true;

    pathNames.map(pathName => {
        if (location.pathname.indexOf(pathName) > -1) bool = false;
    });

    return bool;
}

// 解决精度问题
// 加法
export function accAdd(arg1, arg2) {
    let r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

// 减法
export function subtr(arg1, arg2) {
    let r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}


export function formatTime(second) {
    if (!second) return "00:00:00";
    let h = '0' + parseInt(second / (60 * 60), 0);
    let m = '0' + parseInt((second - h * 60 * 60) / 60, 0);
    let s = '0' + second % 60;
    h = h.substr(h.length - 2, h.length);
    m = m.substr(m.length - 2, m.length);
    s = s.substr(s.length - 2, s.length);
    return h + ":" + m + ":" + s;
}

export function isLongWordLanguage() {
    return ['TW', 'HK', 'CN', 'zh-TW', 'zh-CN', 'zh-HK'].indexOf(getCookie("language")) < 0;
}
export function getLanguageCookie() {
    let lan = getCookie("language");
    switch (lan) {
        case 'zh-TW':
        case 'zh-HK':
            lan = 'HK';
            break;
        case 'zh-CN':
            lan = 'CN';
            break;
        case 'en-US':
            lan = 'EN';
            break;
        default:
            break;
    }
    return lan;
}
