webpackJsonp([25],{776:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=function get(e,t,r){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,t);if(void 0===n){var i=Object.getPrototypeOf(e);return null===i?void 0:get(i,t,r)}if("value"in n)return n.value;var o=n.get;if(void 0!==o)return o.call(r)},o=r(0),u=_interopRequireDefault(o),a=r(777),l=_interopRequireDefault(a),c=r(105),s=r(106),f=r(288),p=_interopRequireDefault(f),v=r(283),d=r(289),_={orderings:{height:"100%",width:"100%",zIndex:-1,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},y=function(e){function InvoiceDetail(e){_classCallCheck(this,InvoiceDetail);var t=_possibleConstructorReturn(this,(InvoiceDetail.__proto__||Object.getPrototypeOf(InvoiceDetail)).call(this,e));return i(InvoiceDetail.prototype.__proto__||Object.getPrototypeOf(InvoiceDetail.prototype),"title",t).call(t,"开票"),t}return _inherits(InvoiceDetail,e),n(InvoiceDetail,[{key:"componentDidMount",value:function(){var e={id:this.props.match.params.id};this.props.getInvoiceDetailAction(e,(0,v.reqHeader)(e),null)}},{key:"render",value:function(){var e=this.props.orderForm.invoiceDetailData||{url:""},t=e.url;return u.default.createElement("div",{style:_.orderings},u.default.createElement("img",{src:t,style:{maxWidth:"7rem"}}))}}]),InvoiceDetail}(l.default);y.defaultProps={},y.propTypes={};var b=function(e,t){return{orderForm:e.app.user.orderForm}},m=function(e,t){return{getInvoiceDetailAction:(0,p.default)(d.getInvoiceDetail,e)}};t.default=(0,s.withRouter)((0,c.connect)(b,m)(y))},777:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(284),u=_interopRequireDefault(o),a=(r(106),r(105),r(19)),l=_interopRequireDefault(a),c=function(e){function BaseComponent(e){_classCallCheck(this,BaseComponent);var t=_possibleConstructorReturn(this,(BaseComponent.__proto__||Object.getPrototypeOf(BaseComponent)).call(this,e));return t.bindState.bind(t),t.title=t.title.bind(t),u.default.setHistory(t.props.history),t}return _inherits(BaseComponent,e),n(BaseComponent,[{key:"render",value:function(){return React.createElement("div",null)}},{key:"bindState",value:function(e){var t=this;return function(r){var n={};n[e]=r,t.setState(n)}}},{key:"title",value:function(e){document.title=e}},{key:"validUserStatus",value:function(e,t,r){var n=t||{},i=n.data,o=i||{},u=o.systemTime,a=o.timeStamp,c=this.isVip(e),s=this.isBindDevice(e),f=this.isFreeActivation(e);if("string"==typeof s)return r&&r(s),"正在获取用户信息";if(!1===s)return r&&r("",l.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1;if(!0===s){if(!0===f)return r&&r("",l.default.COMMON.ALERT_TYPE_FREE_ACTIVE),!1;if(!1===f)return function(){return!(!u||!a)&&!(u-a>72e4)}()?!1!==c||(r&&r("",l.default.COMMON.ALERT_TYPE_BE_VIP),!1):(r&&r("",l.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}}},{key:"validUserBindDevice",value:function(e,t){var r=this.isBindDevice(e);return"string"==typeof r?(t&&t(r),r):!1===r?(t&&t("",l.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1):!0===r||void 0}},{key:"validUserDeviceOnline",value:function(e,t){var r=e||{},n=r.data,i=n||{},o=i.systemTime,u=i.timeStamp;if(o&&u){return!!!(o-u>72e4)||(t&&t("",l.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}return t&&t("",l.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1}},{key:"isFreeActivation",value:function(e){var t=e||{},r=t.status,n=t.data;if(void 0!==r){return 1===n.isFreeActivation}return"正在获取用户信息"}},{key:"isBindDevice",value:function(e){var t=e||{},r=t.status,n=t.msg,i=t.data;if(void 0!==r){if(-100===r)return"请使用微信操作";if(1===r){var o=i.isReDevice;i.bindExpireTime;return 1===o}return n||"获取用户信息失败，请稍后重试！"}return"正在获取用户信息"}},{key:"isVip",value:function(e){var t=e||{},r=t.status,n=t.data;if(void 0!==r){var i=n.vipStatus,o=n.expireTime;return 1===i&&(new Date).getTime()<o}return"正在获取用户信息"}},{key:"vipTime",value:function(e){var t=e||{},r=t.status,n=t.data;if(void 0!==r){var i=n.vipStatus,o=n.expireTime;return 1===i?o-(new Date).getTime():"0"}return"正在获取用户信息"}}]),BaseComponent}(i.Component);t.default=c}});