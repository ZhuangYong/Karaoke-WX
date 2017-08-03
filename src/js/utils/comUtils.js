// 一些通用的方法
import {JSEncrypt} from 'jsencrypt';
import md5 from 'md5';
import sysConfig from "./sysConfig";

/**
 * 根据时间戳返回对应的y，m，d
 * @param  {[type]} tNum [description]
 * @return {[type]}      [description]
 */
export function timeToYmd(tNum, sep) {
    let date = tNum ? new Date(tNum) : new Date();
    let y = date.getFullYear() + '';
    let m = (date.getMonth() + 101 + '').substring(1);
    let d = (date.getDate() + 100 + '').substring(1);

    if (sep == '年月日') {
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
    } else if (diff < 86400000 && t.getDate() == cur.getDate()) {
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
    let isWeixin = ua.indexOf('micromessenger') != -1;
    let isAndroid = ua.indexOf('android') != -1;
    let isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);

    return {
        isWeixin: isWeixin,
        isAndroid: isAndroid,
        isIos: isIos
    };
}

/**
 * 计算iscroll的option.click的选项的值，在设置iscroll时，option.clidk的值采用这个方法返回的值。
 *
 * 如果直接设置option.click为true，ios要双击才能触发单击事件，如果设置为false，ios可以触发单击事件，
 * 但是android又不能触发事件了，所以需要检测机型来设置。
 *
 * @return {[type]} [description]
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
            } else {
                return true;
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
    let re = rawText.replace(/(style=.+?"|color=.+?")/g, '');
    return re;
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
        if (readedIds[i] == id) {
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

export function getEncryptHeader(Oid = {deviceId: "", wxId: ""}) {
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey('MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKsWVIYQxtPV5MN+3IJJp5bSIcNfYB4AyG0b9C7NSHNP0VmdH5dVBpYFb70wDwLa9YZwFocO1sjxnkZJv83/oA0CAwEAAQ==');
    //if (!Oid.wxId || !Oid.deviceId) throw Error("微信id或设备id不能为空");
    // Oid.deviceId = '5aff14de2397f47b8af33d0230c51630';
    return {
        appId: encrypt.encrypt('kalaebb34de801bb67fd'),
        appVersion: sysConfig.appVersion,
        wxId: encrypt.encrypt(Oid.wxId),
        deviceId: encrypt.encrypt(Oid.deviceId),
        mac: encrypt.encrypt('mac'),
        terminalType: 'weixin',
        timeStamp: new Date().getTime().toString(),
        version: 'v1.0',
        channel: 'official'
    };
}

export function reqHeader(data, header) {
    let isReturnSign = true;
    if (typeof header === 'undefined') {
        header = getEncryptHeader();
        isReturnSign = false;
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
