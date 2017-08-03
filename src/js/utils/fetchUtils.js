import fetch from 'isomorphic-fetch';
// import * as cryptoUtils from './cryptoUtils';

export function cryptoFetch(options, succ, fail) {
    let url = options.url;
    let param = options.param;
    let fetchOption = {
        method: 'post'
    };
    // 设置参数
    // todo_ 参数加密，响应解密
    if (options.type === 'get') {
        fetchOption.method = 'get';
        let qstr = [];
        for (let k in param) {
            qstr.push(encodeURIComponent(k) + '=' + encodeURIComponent(param[k]));
        }
        qstr = qstr.join('&');
        url += '?' + qstr;
    } else {
        let form = new FormData();
        for (let l in param) {
            form.append(l, param[l]);
        }
        fetchOption.body = form;
    }

    fetch(url, fetchOption).then(function (response) {
        return response.json();
    }).then(function (json) {
        succ && succ(json, true);
    }).catch(function (err) {
        fail && fail(err, false);
    });
}

/**
 * 通用fetch方法，默认情况下开始请求时会dispatch一个pending的action，如果不需要可以在option中设置noTrackStatus为true
 * @param  {Function}   dispatch [description]
 * @param  {{type}}   param    请求参数
 * @param  {{type}}   options  请求选项
 *    options传入属性说明:
 *    url 请求地址(必须) string 'http://www.fake.com/abc'
 *    type 请求类型(可选) string 'get'|'post'
 *    action 请求状态变化时发送的action(必须) string 'GET_USER_INFO'
 *    noTrackStatus 是否不跟踪请求状态(可选) boolean true|false
 *
 * @param  {Function} callback 请求成功回调，用于接口请求成功后的操作(继续请求其他接口)
 * @return {[type]}          [description]
 */
export function comFetch(dispatch, param, options = {
    url: "",
    headers: "",
    action: "",
    formData: "",
    noTrackStatus: ""
}, callback) {

    let url = options.url;
    let fetchOption = {
        method: 'POST'
    };

    if (options.headers) {
        fetchOption.headers = options.headers;
    }
    // 根据get/post请求方式设置请求参数，除非指定为get类型，默认都按post发送请求
    if (options.type === 'get') {
        fetchOption.method = 'get';
        let queryStr = [];
        for (let k in param) {
            queryStr.push(encodeURIComponent(k) + '=' + encodeURIComponent(param[k]));
        }
        queryStr = queryStr.join('&');
        url += '?' + queryStr;
    } else if (options.formData) {
        let form = new FormData();
        for (let k in param) {
            form.append(k, param[k]);
        }
        fetchOption.body = form;
    } else {
        let queryStr = [];
        for (let k in param) {
            queryStr.push(encodeURIComponent(k) + '=' + encodeURIComponent(param[k]));
        }
        queryStr = queryStr.join('&');

        fetchOption.body = queryStr;
    }
    // 如果没有设置不跟踪请求状态，开始请求时分派pending的action
    if (!options.noTrackStatus) {
        dispatch({
            type: options.action,
            fetchStatus: 0,
            error: null,
            param: param
        });
    }
    fetchOption.headers['content-type'] = "application/x-www-form-urlencoded; charset=UTF-8";
    // 发起请求
    fetch(url, fetchOption).then(function (response) {
        return response.json();
    }).then(function (json) {
        const {status, msg} = json;
        if (status === 0) throw Error(msg);
        try {
            dispatch({
                type: options.action,
                fetchStatus: 200,
                data: json,
                error: null,
                param: param
            });
        } catch (err) {
            console.log(err);
            console.log('fetch success but dispatch error!');
        }
        callback && callback(json);
        // 请求成功回调
    }).catch(function (err) {
        console.log(err);
        dispatch({
            type: options.action,
            fetchStatus: 1,
            msg: '网络不给力，请稍后再试',
            error: err,
            param: param
        });
    });
}


/**
 * 通用fetch请求返回处理方法
 * @param  {{type}} state   [description]
 * @param  {{type}} action  [description]
 * @param  {{type}} keys    需要处理的字段，一般可以包括 loading, data, msg, stamp
 * @param  {type} options 处理选项
 *    options传入属性说明:
 *    clearPreData 请求时清除之前的data(可选) boolean true|false
 *    peel 对成功返回的两层接口数据进行一层剥离，假设返回{code: '000000',msg:'12345',data: {...}}，传入peel之后直接返回data: {...}
 *    pendingCallback 处理状态为pending的action时的回调函数，在fetchProcess返回之前对store自定义修改
 *    succCallback 处理状态为succ的action时的回调函数，在fetchProcess返回之前对store自定义修改
 *    errorLoading 出错时不取消loading标志，使页面一直转圈
 * @return {[type]}         [description]
 */
export function fetchProcess(state, action, keys = {}, options = {}) {
    options = options || {};
    switch (action.fetchStatus) {
        case 0:
            return pendingProcess(state, action, keys, options);
        case 200:
            return succProcess(state, action, keys, options);
        case 1:
            return errorProcess(state, action, keys, options);
        default:
            return state;
    }
}
// 请求开始时发送的action处理
function pendingProcess(state, action, keys, options) {
    let obj = {};

    if (keys.loading) {
        obj[keys.loading] = true;
    }
    if (keys.msg) {
        obj[keys.msg] = '';
    }
    if (keys.data) {
        if (options.clearPreData) {
            obj[keys.data] = null;
        }
    }
    if (options.pendingCallback) {
        let tmp = options.pendingCallback(state, action);
        obj = Object.assign({}, obj, tmp);
    }
    return Object.assign({}, state, obj);
}
// 请求成功返回，并成功转为json时发送的action处理
function succProcess(state, action, keys, options) {
    let obj = {};

    if (keys.loading) {
        obj[keys.loading] = false;
    }
    if (keys.msg) {
        obj[keys.msg] = '';
    }
    if (keys.data) {
        if (options.peel) {
            obj[keys.data] = action.data && action.data.data || {};
        } else {
            obj[keys.data] = action.data || {};
        }
    }
    if (keys.stamp) {
        obj[keys.stamp] = state[keys.stamp] + 1;
    }
    if (keys.type) {
        obj[keys.type] = action.param.type;
    }
    if (options.succCallback) {
        let tmp = options.succCallback(state, action);
        obj = Object.assign({}, obj, tmp);
    }
    return Object.assign({}, state, obj);
}
// 请求出错时发送的action处理
function errorProcess(state, action, keys, options) {
    let obj = {};

    // 如果设置了errorLoading, 接口出错时不取消loading，使页面一直转圈
    if (!options.errorLoading) {
        if (keys.loading) {
            obj[keys.loading] = false;
        }
    }

    if (keys.msg) {
        obj[keys.msg] = action.msg;
    }
    return Object.assign({}, state, obj);
}
