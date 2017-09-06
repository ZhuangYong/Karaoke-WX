webpackJsonp([13],{746:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),i=n(0),r=_interopRequireDefault(i),a=n(101),s=n(102),l=n(747),u=_interopRequireDefault(l);n(764);var f=n(277),c=function(e){function Suggestions(e){_classCallCheck(this,Suggestions);var t=_possibleConstructorReturn(this,(Suggestions.__proto__||Object.getPrototypeOf(Suggestions)).call(this,e)),n=(0,f.getQueryString)("bondDeviceId");return(0,f.linkTo)("user/feedback/home/"+n,!1,null),t}return _inherits(Suggestions,e),o(Suggestions,[{key:"render",value:function(){return r.default.createElement("div",null,"gggg")}}]),Suggestions}(u.default),p=function(e,t){return{}},d=function(e,t){return{}};t.default=(0,s.withRouter)((0,a.connect)(p,d)(c))},747:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),i=n(0),r=n(278),a=_interopRequireDefault(r),s=(n(102),n(101),n(19)),l=_interopRequireDefault(s),u=function(e){function BaseComponent(e){_classCallCheck(this,BaseComponent);var t=_possibleConstructorReturn(this,(BaseComponent.__proto__||Object.getPrototypeOf(BaseComponent)).call(this,e));return t.bindState.bind(t),t.title=t.title.bind(t),a.default.setHistory(t.props.history),t}return _inherits(BaseComponent,e),o(BaseComponent,[{key:"render",value:function(){return React.createElement("div",null)}},{key:"bindState",value:function(e){var t=this;return function(n){var o={};o[e]=n,t.setState(o)}}},{key:"title",value:function(e){document.title=e}},{key:"validUserStatus",value:function(e,t,n){var o=t||{},i=o.data,r=i||{},a=r.systemTime,s=r.timeStamp,u=this.isVip(e),f=this.isBindDevice(e),c=this.isFreeActivation(e);if("string"==typeof f)return n&&n(f),"正在获取用户信息";if(!1===f)return n&&n("",l.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1;if(!0===f){if(!0===c)return n&&n("",l.default.COMMON.ALERT_TYPE_FREE_ACTIVE),!1;if(!1===c)return function(){return!(!a||!s)&&!(a-s>72e4)}()?!1!==u||(n&&n("",l.default.COMMON.ALERT_TYPE_BE_VIP),!1):(n&&n("",l.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}}},{key:"validUserBindDevice",value:function(e,t){var n=this.isBindDevice(e);return"string"==typeof n?(t&&t(n),n):!1===n?(t&&t("",l.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1):!0===n||void 0}},{key:"validUserDeviceOnline",value:function(e,t){var n=e||{},o=n.data,i=o||{},r=i.systemTime,a=i.timeStamp;if(r&&a){return!!!(r-a>72e4)||(t&&t("",l.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}return t&&t("",l.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1}},{key:"isFreeActivation",value:function(e){var t=e||{},n=t.status,o=t.data;if(void 0!==n){return 1===o.isFreeActivation}return"正在获取用户信息"}},{key:"isBindDevice",value:function(e){var t=e||{},n=t.status,o=t.msg,i=t.data;if(void 0!==n){if(-100===n)return"请使用微信操作";if(1===n){var r=i.isReDevice;i.bindExpireTime;return 1===r}return o||"获取用户信息失败，请稍后重试！"}return"正在获取用户信息"}},{key:"isVip",value:function(e){var t=e||{},n=t.status,o=t.data;if(void 0!==n){var i=o.vipStatus,r=o.expireTime;return 1===i&&(new Date).getTime()<r}return"正在获取用户信息"}}]),BaseComponent}(i.Component);t.default=u},756:function(e,t,n){e.exports=n.p+"fonts/iconfont.eot?c930aafad3dc193752b0fbea5b8f2745"},764:function(e,t,n){var o=n(765);"string"==typeof o&&(o=[[e.i,o,""]]);n(280)(o,{});o.locals&&(e.exports=o.locals)},765:function(e,t,n){t=e.exports=n(279)(),t.push([e.i,"@font-face{font-family:silkiconfont;src:url("+n(756)+");src:url("+n(756)+'#iefix) format("embedded-opentype"),url('+n(766)+') format("woff"),url('+n(767)+') format("truetype"),url('+n(768)+'#silkiconfont) format("svg");font-weight:400;font-style:normal}@keyframes rotate{0%{transform:rotate(0deg);-webkit-transform:rotate(0deg)}to{transform:rotate(1turn);-webkit-transform:rotate(1turn)}}.silk-listcontrol-wrapper{overflow:hidden}.silk-listcontrol-wrapper-default{position:absolute;top:0;bottom:0;left:0;width:100%}.silk-listcontrol-scroller{z-index:1;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;-webkit-text-size-adjust:none;text-size-adjust:none}.silk-listcontrol-scroller-horizontal{display:inline-block}.silk-listcontrol-scroller-vertical{position:relative}.silk-listcontrol-loadwrapper{display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;width:100%;height:50px;line-height:50px;position:absolute;color:#8f8e93;font-size:14px}.silk-listcontrol-loadwrapper-up{top:-50px}.silk-listcontrol-loadtip{display:-webkit-inline-box;display:inline-flex;-webkit-box-align:center;align-items:center}.silk-listcontrol-icon{font-family:silkiconfont!important;font-size:14px;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale;color:#3587f2;transition:transform .4s;-webkit-transition:-webkit-transform .4s}.silk-listcontrol-text{padding-left:5px}',""])},766:function(e,t){e.exports="data:application/font-woff;base64,"},767:function(e,t,n){e.exports=n.p+"fonts/iconfont.ttf?12a921df8a802d25de8ab8424fb51dd7"},768:function(e,t,n){e.exports=n.p+"fonts/iconfont.svg?a5e81d2f2094a8fb82b6a84067a7fd4e"}});