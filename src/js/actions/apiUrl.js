export default {
    // 第三方支付
    "API_THIRD_PAY_THIRD_WX_AUTH": "/thirdPay/thirdWxAuth",
    // OTT登录
    "API_OTT_LOGIN": "/user/loginAuth",
    // OTT退出登录
    "API_OTT_LOGOUT": "/user/wxloginOut",

    // 充值接口
    'API_RECHARGE_SUBMIT': '/recharge/doRecharge',

    // 获取支付列表
    "API_GET_PAY_LIST": "/music/listPayProduct",
    // 支付宝支付
    "API_ALI_PAY": "/pay/alipayPay",
    // 获取微信支付参数
    "API_GET_WX_PAY_PARAMS": "/pay/jsPay",
    // OTT免费激活
    "API_DEVICE_REGISTER": "/user/userActivation",

    // 绑定设备
    "API_BIND_DEVICE": "/user/wxBind",

    /**
     * 获取用户信息
     * 返回参数如下：
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
     * tag（机型模式）: kid-小朋友
     * type(1-可以使用充值卡；2-不能使用)
     * deviceUuid设备唯一uuid
     */
    "API_GET_USER_INFO": "/user/info",
    // 获取微信js sdk config参数
    "API_GET_USER_CONFIG": "/user/config",

    // 录音分享播放详情
    "API_QUERY_USER_SOUND": "/user/qryUserSound",
    // 录音编辑提交
    "API_UPLOAD_SOUND_ALBUM": "/user/uploadSoundAlbum",
    // 获取录音关联图片
    "API_GET_ALL_PICS": "/user/getAllPics",
    // 录音列表
    "API_RECORDS_LIST": "/user/qryUserSoundList",
    // 删除录音
    "API_DELETE_RECORDING": "/user/deleteUserSound",
    // 更换录音封面图
    "API_CHANGE_FIRST_PAGE": "/user/changeFirstPage",

    // base64上传图片
    "API_UPLOAD_IMG_BASE64": "/upload/uploadImgBase64",
    // 微信API上传图片
    "API_UPLOAD_IMG_WX": "/upload/uploadWeixin",

    // 意见反馈问题列表
    "API_GET_FEEDBACK_QUESTION_LIST": "/feedback/listQuestion",
    // 意见反馈提交
    "API_GET_FEEDBACK_SUBMIT": "/feedback/feedbackSubmit",

    // STS server
    "API_OSS_TOKEN": "/ossToken/accessToken",

    /**
     * 相册上传
     * @param type 1: 相册图片 2: 反馈图片
     * @param key 上传OSS时图片的storeAs
     */
    "API_OSS_UPLOAD_ALBUM": "/ossToken/ossUploadAlbum",

    /**
     * 上传已存储到微信服务器的图片（自建后台）
     * keys-图片Id,以逗号隔开
     * type-类型,1-相册图片 2-反馈图片
     */
    "API_OSS_UPLOAD_WX_PIC": "/ossToken/ossUploadWxPic",

    // 查询我的相册列表
    "API_PHOTO_ALBUM_LIST": "/user/qryWxUserAlbum",
    // 删除我的相册图片
    "API_PHOTO_ALBUM_DELETE": "/user/deleteAlbum",

    // 获取我的订单列表
    "API_GET_ORDER_FORM": "/invoice/orderList",

    // 删除订单
    "API_GET_DELETE_ORDER": "/invoice/deleteOrder",

    // 获取未开发票的订单
    "API_GET_INVOICE_ORDER": "/invoice/invoiceOrder",

    // 查开票历史
    "API_GET_INVOICE_LIST": "/invoice/invoiceList",

    /**
     * 查询开票详情
     * 输出参数：
     * time：开票时间
     * fplx：发票类型2增值税普通发票
     * gfmc：发票抬头
     * gfsh：发票税号
     * status：1 申请开票 2 开票中 3 开票成功
     * id：记录标识id
     * totalAmount：发票金额
     * url：发票下载地址，开票成功存在
     */
    "API_GET_INVOICE_DETAIL": "/invoice/invoiceDetail",

    /**
     * 查询当前发票所包含订单列表
     * id
     */
    "API_GET_INVOICE_DETAIL_ORDER": "/invoice/listInvoiceOrder",

    /**
     * 提交电子发票开票信息
     * 传入参数：
     * ids:订单id，多个逗号隔开
     * gflx: 发票抬头种类01企业、02机关事业单位、03个人、04其它
     * gfmc: 发票抬头
     * gfsh: 发票纳税人识别号
     * gfsj: 开票人电话
     */
    "API_GET_INVOICE_SUBMIT": "/invoice/submitInvoice",

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

    /**
     * 已点列表
     * 传入参数：type：songChoosed（默认可不传，返回已点歌曲列表）
     * 传入参数：type：history（返回最近唱过歌曲列表）
     */
    "API_CHOOSE_LIST": "/music/getRecordJson",
    // 热门搜索关键字，cms后台可定义
    "API_GET_HOT_WORD": "/music/searchKeyList",

    // 歌星列表
    "API_GET_SINGER_CATEGORY_ALBUM": "/singer_catagory/album",
    // 歌手歌曲列表
    "API_GET_ACTORS_ALBUM": "/actors/album",
    // 分类歌曲列表
    "API_GET_CAT_ALBUM": "/cat/album",

    "API_GET_OTT_DEVICE_STATUS": "/deviceNet/qryStatus",

    "API_LOCAL_TEST_PUSH": "/localserver/status",

    "API_GET_LOCAL_LANGUAGE": "/locales/",

    "API_GET_COMMENT_LIST": "/comment/listComments",

    "API_GET_COMMENT_REPLY_LIST": "/comment/listReplys",

    "API_GET_COMMENT_OR_REPLY": "/comment/commentOrReply",

    "API_GET_COMMENT_OR_REPLY_DELETE": "/comment/deleteCommentOrReply",

    "API_GET_COMMENT_GET_LIKE": "/comment/getLikeNum",

    "API_GET_COMMENT_LIKE_OR_CANCEL": "/comment/likeOrCancel"
};
