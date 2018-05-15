/**
 * Created by walljack@163.com on 2017/9/7.
 */

import intl from 'react-intl-universal';

export default{
    //回到顶部出现位置
    NEED_SCROLL_TOP_HEIGHT: 1000,
    //底部toast显示时间
    TOAST_BOTTOM_SHOW_TIME: 2000,
    //点歌成功显示结果icon时间
    PUSH_SONG_RESULT_ICON_SHOW: 2000,
    //不在线code
    CODE_OFF_LINE: "CODE_OFF_LINE",

    STRING_NO_WIFI: intl.get("msg.network.die"),

    // downloadStatus: 1下载完成 0等待下载 2下载失败 3 正在下载
    DOWNLOAD_STATUS_NOT_DOWN: 0,
    DOWNLOAD_STATUS_DOWNING: 3,
    DOWNLOAD_STATUS_DONE: 1,
    DOWNLOAD_STATUS_DOWN_FAILED: 2,

    // 弹幕应用版本号要求
    BARRAGE_MIN_OTT_VERSION: '1.1.3',

    // 音效 应用版本号要求（nst_sk_a3； sk_stb）
    EFFECT_NST_MIN_OTT_VERSION: '1.1.4.3',

    // 音效 系统版本号要求（nst_sk_a3； sk_stb）
    EFFECT_MIN_OTT_ROM_VERSION: '1.0.18',

    EFFECT_NST_CHANNEL_LIST: ["nst_sk_a3", "nst_m3", "nst_a3"],

    // k1 音效
    EFFECT_K1_CHANNEL_LIST: ["gg_stb", "gg_k1_child", "gx_gg_k1", "gg_k1_haiwai"],

    EFFECT_GG_CHANNEL_LIST: ["gg_laobanka", "gg_f886_ahfy"],

    VIP_ALERT_TIME: 15 * 20 * 60 * 60 * 1000,

    // 支付类型： 共享
    PAY_TYPE_GONG_XIANG: 'gongxiang',

    // 赠送时间
    DISCOUNT_TYPE_TIME: 2,
    // 赠送金额
    DISCOUNT_TYPE_MONEY: 1,

    // K1 渠道号
    CHANNEL_CODE_K1_LIST: ["gx_gg_k1", "gg_k1haiwai", "gg_stb"], // , "gg_k1_child"

    // 小朋友模式tag值
    TAG_CHILD_MODE: 'child',

    // 相册中选中图片缓存信息key值
    ALBUM_SESSION_KEY: 'albumFormData',

    // 不显示商城入口机型值
    NOT_SHOW_SHOP_CHANNELS: ['gx_gg_k1', 'switch_gx_gg_k1', 'gg_k1_haiwai', 'switch_gg_k1'],

};
