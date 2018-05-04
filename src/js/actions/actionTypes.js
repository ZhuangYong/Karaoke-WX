//common relative
const COMMON = {
    API_LOCAL_TEST_PUSH: "API_LOCAL_TEST_PUSH",
    COMMON_UPDATE_SCREEN: "COMMON_UPDATE_SCREEN",
    COMMON_UPDATE_USER_INFO: "COMMON_UPDATE_USER_INFO",
    COMMON_GLOB_ALERT: "COMMON_GLOB_ALERT",
    COMMON_LOCAL_NETWORK_STATUS: "COMMON_LOCAL_NETWORK_STATUS",
    COMMON_WEIXIN_CONFIG_FINISHED: "COMMON_WEIXIN_CONFIG_FINISHED",
    COMMON_SET_SINGER_LIST: "COMMON_SET_SINGER_LIST",
    COMMON_SET_COMMON_INOF: "COMMON_SET_COMMON_INOF",
    ALERT_TYPE_BIND_DEVICE: "ALERT_TYPE_BIND_DEVICE",
    ALERT_TYPE_FREE_ACTIVE: "ALERT_TYPE_FREE_ACTIVE",
    ALERT_TYPE_WX_API_FAIL: "ALERT_TYPE_WX_API_FAIL",
    ALERT_TYPE_BE_VIP: "ALERT_TYPE_BE_VIP",
    ALERT_TYPE_GONG_XIANG_DONE: "ALERT_TYPE_GONG_XIANG_DONE",
    ALERT_TYPE_DEVICE_NOT_ONLINE: "ALERT_TYPE_DEVICE_NOT_ONLINE",
    COMMON_GET_LOCAL_DATA: "COMMON_GET_LOCAL_DATA",
    ALERT_TYPE_CHANGE_THEME: "ALERT_TYPE_CHANGE_THEME",
};

//user relative
const USER = {
    // STS server
    API_OSS_TOKEN: "API_OSS_TOKEN",
    // OTT登录
    API_OTT_LOGIN: "API_OTT_LOGIN",
    // OTT退出登录
    API_OTT_LOGOUT: "API_OTT_LOGOUT",

    // 获取用户信息
    API_GET_USER_INFO: "API_GET_USER_INFO",

    // 相册上传
    API_OSS_UPLOAD_ALBUM: "API_OSS_UPLOAD_ALBUM",
    // 上传已存储到微信服务器的图片（自建后台）
    API_OSS_UPLOAD_WX_PIC: "API_OSS_UPLOAD_WX_PIC",
    // 查询我的相册列表
    API_GET_PHOTO_ALBUM_LIST: "API_GET_PHOTO_ALBUM_LIST",
    // 删除我的相册图片
    API_PHOTO_ALBUM_DELETE: "API_PHOTO_ALBUM_DELETE",

    // 获取录音分享列表
    API_GET_RECORDS_LIST: "API_GET_RECORDS_LIST",
    // 删除录音
    API_DELETE_RECORDING: "API_DELETE_RECORDING",
    // 更换录音封面图
    API_CHANGE_FIRST_PAGE: "API_CHANGE_FIRST_PAGE",

    // 获取我的订单列表
    API_GET_ORDER_FORM: "API_GET_ORDER_FORM",
    // 删除订单
    API_GET_DELETE_ORDER: "API_GET_DELETE_ORDER",
    // 获取未开发票的订单
    API_GET_INVOICE_ORDER: "API_GET_INVOICE_ORDER",
    // 查开票历史
    API_GET_INVOICE_LIST: "API_GET_INVOICE_LIST",
    // 查询开票详情
    API_GET_INVOICE_DETAIL: "API_GET_INVOICE_DETAIL",
    // 查询当前发票所包含订单列表
    API_GET_INVOICE_DETAIL_ORDER: "API_GET_INVOICE_DETAIL_ORDER",
    // 提交电子发票开票信息
    API_GET_INVOICE_SUBMIT: "API_GET_INVOICE_SUBMIT",

    // 意见反馈问题列表
    API_GET_FEEDBACK_QUESTION_LIST: "API_GET_FEEDBACK_QUESTION_LIST",
    // 意见反馈提交
    API_GET_FEEDBACK_SUBMIT: "API_GET_FEEDBACK_SUBMIT",

    // base64上传图片
    API_UPLOAD_IMG_BASE64: "API_UPLOAD_IMG_BASE64",
    // 微信API上传图片
    API_UPLOAD_IMG_WX: "API_UPLOAD_IMG_WX",
    // 获取微信js sdk config参数
    API_GET_USER_CONFIG: "API_GET_USER_CONFIG",

    // 绑定设备
    API_BIND_DEVICE: "API_BIND_DEVICE"
};

const SONG = {
    API_GET_RECOMMEND: "API_GET_RECOMMEND",
    API_PUSH: "API_PUSH",
    API_CHOOSE_LIST: "API_CHOOSE_LIST",
    API_CHOOSE_HISTORY_LIST: "API_CHOOSE_HISTORY_LIST",
    API_SET_SONG_TOP: "API_SET_SONG_TOP",
    API_GET_SINGER_CATEGORY_ALBUM: "API_GET_SINGER_CATEGORY_ALBUM",
    API_GET_SINGER_LIST_ALBUM: "API_GET_SINGER_LIST_ALBUM",
    API_GET_ACTORS_ALBUM: "API_GET_ACTORS_ALBUM",
    API_GET_CAT_ALBUM: "API_GET_CAT_ALBUM",
    API_GET_CAT_SONG_LIST: "API_GET_CAT_SONG_LIST",
    API_GET_RANK_ALBUM: "API_GET_RANK_ALBUM",
    API_QUERY_ALBUM_RECOMMEND: "API_QUERY_ALBUM_RECOMMEND",
    API_QUERY_ALBUM_RECOMMEND_SONG_LIST: "API_QUERY_ALBUM_RECOMMEND_SONG_LIST",
    API_QUERY_RANKING: "API_QUERY_RANKING",
    API_GET_FEEDBACK_QUESTION_LIST: "API_GET_FEEDBACK_QUESTION_LIST",
    API_GET_FEEDBACK_SUBMIT: "API_GET_FEEDBACK_SUBMIT"
};
//audio relative
const AUDIO = {
    API_GET_SHARE_AUDIO: "API_GET_SHARE_AUDIO",
    // 录音编辑提交
    API_UPLOAD_SOUND_ALBUM: "API_UPLOAD_SOUND_ALBUM",
    // 获取录音关联图片
    API_GET_ALL_PICS: "API_GET_ALL_PICS",
};

const SEARCH = {
    API_GET_HOT_WORD: "API_GET_HOT_WORD",
    API_SEARCH: "API_SEARCH"
};

const Pay = {
    // 充值接口
    API_RECHARGE_SUBMIT: 'API_RECHARGE_SUBMIT',
    // 获取支付列表
    API_GET_PAY_LIST: "API_GET_PAY_LIST",
    // 支付宝支付
    API_ALI_PAY: "API_ALI_PAY",
    // 获取微信支付参数
    API_GET_WX_PAY_PARAMS: "API_GET_WX_PAY_PARAMS",
    // OTT免费激活
    API_DEVICE_REGISTER: "API_DEVICE_REGISTER"
};

const DEVICE = {
    API_GET_OTT_DEVICE_STATUS: "API_GET_OTT_DEVICE_STATUS"
};

const COMMENT = {
    API_GET_COMMENT_LIST: "API_GET_COMMENT_LIST",
    API_GET_COMMENT_REPLY_LIST: "API_GET_COMMENT_REPLY_LIST",
    API_GET_COMMENT_OR_REPLY: "API_GET_COMMENT_OR_REPLY",
    API_GET_COMMENT_OR_REPLY_DELETE: "API_GET_COMMENT_OR_REPLY_DELETE",
    API_GET_COMMENT_GET_LIKE: "API_GET_COMMENT_GET_LIKE",
    API_GET_COMMENT_LIKE_OR_CANCEL: "API_GET_COMMENT_LIKE_OR_CANCEL",
};

export default {
    COMMON,
    USER,
    AUDIO,
    SONG,
    SEARCH,
    Pay,
    DEVICE,
    COMMENT
};


