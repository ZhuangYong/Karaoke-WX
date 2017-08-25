export default {
    // OTT登录
    "API_OTT_LOGIN": "/user/loginAuth",

    // 获取支付列表
    "API_GET_PAY_LIST": "/music/listPayProduct",
    // 支付宝支付
    "API_ALI_PAY": "/pay/alipayPay",
    // 获取微信支付参数
    "API_GET_WX_PAY_PARAMS": "/pay/jsPay",
    // OTT免费激活
    "API_DEVICE_REGISTER": "/user/userActivation",

    /**
     * 获取用户信息
     * 参数如下：
     * bindExpireTime: 绑定过期时间戳
     * channel: 渠道号
     * createTime: "2017-06-02 13:19:51"
     * deviceId: 设备id
     * expireTime: vip到期时间
     * headerImg: 微信用户头像
     * isFreeActivation: 是否可以免费激活1（可以）0（不可以）
     * isReDevice: 是否绑定设备1（已绑定）2（未绑定设备）3（绑定过期）
     * mac:（mac地址）
     * nickName: 微信昵称
     * openid: 微信openid
     * registerTime: 1487931075000
     * unionid : "ohSltvwgabfZPNDxc2r14tlf7rwM"
     * userId: 106414
     * uuid: "ohSltvwgabfZPNDxc2r14tlf7rwM"
     * vipStatus: vip状态-1（从未开通过vip）0（vip已过期）1（在vip有效期）
     */
    "API_GET_USER_INFO": "/user/info",
    // 获取微信js sdk config参数
    "API_GET_USER_CONFIG": "/user/config",

    // 录音分享播放详情
    "API_QUERY_USER_SOUND": "/user/qryUserSound",
    // 录音列表
    "API_RECORDS_LIST": "/user/qryUserSoundList",

    // base64上传图片
    "API_UPLOAD_IMG_BASE64": "/upload/uploadImgBase64",
    // 微信API上传图片
    "API_UPLOAD_IMG_WX": "/upload/uploadWeixin",

    // 意见反馈问题列表
    "API_GET_FEEDBACK_QUESTION_LIST": "/feedback/listQuestion",
    // 意见反馈提交
    "API_GET_FEEDBACK_SUBMIT": "/feedback/feedbackSubmit",

    // 查询我的相册列表
    "API_PHOTO_ALBUM_LIST": "/api/getPhotoAlbum.json",
    // 上传我的相册图片
    "API_PHOTO_ALBUM_UPLOAD": "/api/photoAlbumUpload.json",
    // 删除我的相册图片
    "API_PHOTO_ALBUM_DELETE": "/api/photoAlbumDelete.json",

    // 获取我的订单列表
    "API_GET_ORDER_FORM": "/api/getOrderForm.json",

    // 获取歌曲榜单排行
    "API_QUERY_ALBUM": "/rank/album",
    // 获取歌曲热门推荐
    "API_QUERY_ALBUM_RECOMMEND": "/recommend/album",
    // 推送接口
    "API_PUSH": "/music/msgPush",
    // 推送
    "API_SET_SONG_TOP": "/music/msgPush",
    // 搜索
    "API_SEARCH": "/music/search",
    // 已点列表
    "API_CHOOSE_LIST": "/music/getRecordJson",
    // 热门搜索关键字，cms后台可定义
    "API_GET_HOT_WORD": "/music/searchKeyList",

    // 歌星列表
    "API_GET_SINGER_CATEGORY_ALBUM": "/singer_catagory/album",
    // 歌手歌曲列表
    "API_GET_ACTORS_ALBUM": "/actors/album",
    // 分类歌曲列表
    "API_GET_CAT_ALBUM": "/cat/album",

    "API_GET_OTT_DEVICE_STATUS": "/deviceNet/qryStatus"
};
