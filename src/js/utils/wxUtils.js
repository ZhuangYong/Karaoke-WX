// 微信登录，绑定操作的一些方法

/**
 * 获取微信openid，静默处理，不给用户任何提示
 *
 * @param  {[type]}   code     微信跳转到会员中心首页，url里面带的code
 * @param  {Function} callback 获取微信openid的回调，callback(succ)成功返回succ为true，失败为false
 * @return {[type]}            [description]
 */
export function getWxOpenId(code, callback) {
    // var url = HYAPP.ApiDomain + '/weChat/getWechatWebAccessToken';
    let url = HYAPP.ApiDomain + '/weChat/getBbsWxOpenId';
    let fetchOption = {
        method: 'post',
    };
    let form = new FormData();
    form.append('code', code);
    // 测试用，获取WxopenId接口一开始要传bbs的access_token
    // form.append('access_token', 'ee47c1f14108c38ff23fd45534a3a4c8');
    fetchOption.body = form;

    fetch(url, fetchOption).then(function (response) {
        return response.json();
    }).then(function (json) {
        // if (json.code === '000000') {
        if (json.code === '000000' && json.data && json.data.errno == 0) {
            // HYAPP.user.wxOpenId = json.data.openid;
            HYAPP.user.wxOpenId = json.data.data.openid;
            callback && callback(true);
        } else {
            callback && callback(false);
        }
    }).catch(function (err) {
        callback && callback(false);
    });
}

/**
 * 尝试微信登录，静默处理，不给用户任何提示
 * @param  {Function} callback   微信登录的回调，callback(succ)成功返回succ为true，失败为false
 * @param  {[type]}   testOpenId 测试用微信openId
 * @return {[type]}              [description]
 */
export function wxLogin(callback, testOpenId) {
    const _this = this;
    const form = new FormData();
    let url = "";
    if (HYAPP.wxBindApiType == 1) {
        // 李飞龙的微信登录接口
        url = HYAPP.ApiDomain + '/weChat/loginByWechatOpenid';
        // 李飞龙的微信登录接口参数
        form.append('wechatId', HYAPP.user.wxOpenId || testOpenId);
    } else {
        // 第三方账号登录接口
        url = HYAPP.ApiDomain + '/weChat/bindlogin';
        // 第三方账号登录接口参数
        form.append('connectid', HYAPP.user.wxOpenId || testOpenId);
    }

    let fetchOption = {
        method: 'post',
    };
    fetchOption.body = form;

    fetch(url, fetchOption).then(function (response) {
        return response.json();
    }).then(function (json) {
        // 注意这里调用/weChat/loginByWechatOpenid和/weChat/bindlogin返回的数据格式不同。
        // /weChat/loginByWechatOpenid的json.data结构为{status: true, data: {openId: 'xxx', token: 'xxx'}}
        // /weChat/bindlogin的json.data结构为{openId: 'xxx', token: 'xxx'}
        if (json.code === '000000' && (json.data.status || json.data.token)) {
            if (json.data.status) {
                HYAPP.user.openId = json.data.data.openId;
                HYAPP.user.token = json.data.data.token;
            } else {
                HYAPP.user.openId = json.data.openId;
                HYAPP.user.token = json.data.token;
            }
            HYAPP.user.wxBind = true;
            callback && callback(true);
        } else {
            callback && callback(false);
        }
    }).catch(function (err) {
        callback && callback(false);
    });
}

/**
 * 尝试微信绑定，静默处理，不给用户任何提示
 * @param  {[type]} openid 用户的微信的openid
 * @return {[type]}        [description]
 */
export function wxBind(openid) {
    // 如果已经绑定，或尝试过绑定了就不继续绑定了
    if (!(HYAPP.wxBind || HYAPP.wxBindTried)) {
        let form = new FormData();
        let url = "";
        if (HYAPP.wxBindApiType == 1) {
            // 李飞龙的微信账号绑定接口
            url = HYAPP.ApiDomain + '/userCenter/bindWeChat';
            // 李飞龙的微信账号绑定接口参数
            form.append('wechatId', openid);
            form.append('openId', HYAPP.user.openId);
            form.append('token', HYAPP.user.token);
        } else {
            // 第三方账号绑定接口
            url = HYAPP.ApiDomain + '/userCenter/accountbind';
            // 第三方账号绑定接口参数
            form.append('connectid', openid);
            form.append('username', HYAPP.user.usn);
            form.append('password', HYAPP.user.usp);
        }

        let fetchOption = {
            method: 'post'
        };
        fetchOption.body = form;

        fetch(url, fetchOption).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log('wx bind succ', json);
            HYAPP.wxBindTried = true;
        }).catch(function (err) {
            console.log('wx bind err', err);
        });
    }
}
