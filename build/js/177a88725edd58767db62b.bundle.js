webpackJsonp([17],{773:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=n(0),i=_interopRequireDefault(o),a=n(777),u=_interopRequireDefault(a),l=n(105),s=n(106),c=n(288),f=_interopRequireDefault(c),p=n(1),d=_interopRequireDefault(p),m=n(289),y=n(283),_=n(170),h=_interopRequireDefault(_),v=n(788),b=_interopRequireDefault(v),g=n(820),E=_interopRequireDefault(g),O=n(169),C={loading:{position:"relative",display:"flex",justifyContent:"center",height:(0,y.toRem)(100),fontSize:(0,y.toRem)(28),alignItems:"center",clear:"both",backgroundColor:"#fff"},deselect:{position:"absolute",top:"50%",left:"10px",marginTop:"-10px",width:"20px",height:"20px",border:"1px solid #999",borderRadius:"20px"},selected:{position:"absolute",top:"50%",left:"10px",marginTop:"-10px",width:"20px",height:"20px",backgroundColor:"#878979",borderRadius:"20px"}},R=function(e){return i.default.createElement(O.SvgIcon,{style:e.style},i.default.createElement("path",{style:{fillRule:"evenodd",clipRule:"evenodd"},d:"M13.729,11.236L1.722,0.294c-0.394-0.392-1.033-0.392-1.427,0c-0.394,0.392-0.394,1.028,0,1.42l11.283,10.283L0.296,22.28c-0.394,0.392-0.394,1.028,0,1.42c0.394,0.392,1.033,0.392,1.427,0l12.007-10.942c0.21-0.209,0.3-0.486,0.286-0.76C14.029,11.723,13.939,11.446,13.729,11.236z"}))},w=function(e){function invoiceList(e){_classCallCheck(this,invoiceList);var t=_possibleConstructorReturn(this,(invoiceList.__proto__||Object.getPrototypeOf(invoiceList)).call(this,e));return t.state={orderForm:{},orderList:[],offLine:!1,currentPage:0,pageSize:999},t}return _inherits(invoiceList,e),r(invoiceList,[{key:"componentDidUpdate",value:function(e){if(e.orderForm.invoiceListStamp!==this.props.orderForm.invoiceListStamp){var t=this.props.orderForm.invoiceListData||{data:{}},n=t.data,r=n||{result:[]},o=r.result;this.setState({orderList:o})}}},{key:"componentDidMount",value:function(){0===this.state.currentPage&&this.loadMoreAction()}},{key:"render",value:function(){var e=this.state.orderList;return i.default.createElement("section",{style:{backgroundColor:"#d7d7d7",minHeight:document.documentElement.clientHeight||document.body.clientHeight}},e.length>0?i.default.createElement("div",null,e.map(function(e){return i.default.createElement("section",{key:e.id,style:{position:"relative",marginBottom:(0,y.toRem)(20),backgroundColor:"#fff"}},i.default.createElement("ul",{style:{listStyle:"none",padding:(0,y.toRem)(20)+" "+(0,y.toRem)(20),margin:0,fontSize:(0,y.toRem)(28),color:"#999",lineHeight:(0,y.toRem)(60)},onClick:function(){3===parseInt(e.status,10)&&(0,y.linkTo)("user/InvoiceDetail/"+e.id,!1,null)}},i.default.createElement("li",null,i.default.createElement("span",null,e.time),i.default.createElement("span",{style:{color:3===parseInt(e.status,10)?"#fd6934":"#999",float:"right"}},i.default.createElement("span",null,3===e.status?"已开票":"待出票"),i.default.createElement(R,{style:{marginLeft:(0,y.toRem)(10),width:(0,y.toRem)(16.5),height:(0,y.toRem)(24),color:3===parseInt(e.status,10)?"#fd6934":"#999"}}))),i.default.createElement("li",null,"发票类型: ",i.default.createElement("span",{style:{color:"#212121"}},e.name)),i.default.createElement("li",null,"发票金额: ",i.default.createElement("span",{style:{color:"#212121"}},"¥",e.amount))))}),i.default.createElement("div",{style:C.loading},i.default.createElement("span",null,"亲爱滴，已经到底了"))):i.default.createElement("div",null,this.state.offLine?i.default.createElement(b.default,{style:{paddingTop:(0,y.toRem)(350)}}):i.default.createElement(E.default,{style:{paddingTop:(0,y.toRem)(350)}})))}},{key:"loadMoreAction",value:function(){var e=this,t=this.state.currentPage+1,n=this.state.pageSize,r={page:t,pageSize:n};this.props.getInvoiceListAction(r,(0,y.reqHeader)(r),null,function(t,n){n.code===h.default.CODE_OFF_LINE&&e.setState({offLine:!0})})}}]),invoiceList}(u.default);w.defaultProps={orderForm:{}},w.propTypes={orderForm:d.default.object};var P=function(e,t){return{orderForm:e.app.user.orderForm}},k=function(e,t){return{getInvoiceListAction:(0,f.default)(m.getInvoiceList,e)}};t.default=(0,s.withRouter)((0,l.connect)(P,k)(w))},777:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=n(0),i=n(284),a=_interopRequireDefault(i),u=(n(106),n(105),n(19)),l=_interopRequireDefault(u),s=function(e){function BaseComponent(e){_classCallCheck(this,BaseComponent);var t=_possibleConstructorReturn(this,(BaseComponent.__proto__||Object.getPrototypeOf(BaseComponent)).call(this,e));return t.bindState.bind(t),t.title=t.title.bind(t),a.default.setHistory(t.props.history),t}return _inherits(BaseComponent,e),r(BaseComponent,[{key:"render",value:function(){return React.createElement("div",null)}},{key:"bindState",value:function(e){var t=this;return function(n){var r={};r[e]=n,t.setState(r)}}},{key:"title",value:function(e){document.title=e}},{key:"validUserStatus",value:function(e,t,n){var r=t||{},o=r.data,i=o||{},a=i.systemTime,u=i.timeStamp,s=this.isVip(e),c=this.isBindDevice(e),f=this.isFreeActivation(e);if("string"==typeof c)return n&&n(c),"正在获取用户信息";if(!1===c)return n&&n("",l.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1;if(!0===c){if(!0===f)return n&&n("",l.default.COMMON.ALERT_TYPE_FREE_ACTIVE),!1;if(!1===f)return function(){return!(!a||!u)&&!(a-u>72e4)}()?!1!==s||(n&&n("",l.default.COMMON.ALERT_TYPE_BE_VIP),!1):(n&&n("",l.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}}},{key:"validUserBindDevice",value:function(e,t){var n=this.isBindDevice(e);return"string"==typeof n?(t&&t(n),n):!1===n?(t&&t("",l.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1):!0===n||void 0}},{key:"validUserDeviceOnline",value:function(e,t){var n=e||{},r=n.data,o=r||{},i=o.systemTime,a=o.timeStamp;if(i&&a){return!!!(i-a>72e4)||(t&&t("",l.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}return t&&t("",l.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1}},{key:"isFreeActivation",value:function(e){var t=e||{},n=t.status,r=t.data;if(void 0!==n){return 1===r.isFreeActivation}return"正在获取用户信息"}},{key:"isBindDevice",value:function(e){var t=e||{},n=t.status,r=t.msg,o=t.data;if(void 0!==n){if(-100===n)return"请使用微信操作";if(1===n){var i=o.isReDevice;o.bindExpireTime;return 1===i}return r||"获取用户信息失败，请稍后重试！"}return"正在获取用户信息"}},{key:"isVip",value:function(e){var t=e||{},n=t.status,r=t.data;if(void 0!==n){var o=r.vipStatus,i=r.expireTime;return 1===o&&(new Date).getTime()<i}return"正在获取用户信息"}},{key:"vipTime",value:function(e){var t=e||{},n=t.status,r=t.data;if(void 0!==n){var o=r.vipStatus,i=r.expireTime;return 1===o?i-(new Date).getTime():"0"}return"正在获取用户信息"}}]),BaseComponent}(o.Component);t.default=s},779:function(e,t,n){e.exports=n.p+"img/common/bg_no_network.png?ec6f187423c8d73d62f1171882f62080"},788:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),i=n(0),a=_interopRequireDefault(i),u=n(779),l=_interopRequireDefault(u),s={noResult:{height:"100%",width:"100%",zIndex:-1,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},c=function(e){function NoWifi(e){return _classCallCheck(this,NoWifi),_possibleConstructorReturn(this,(NoWifi.__proto__||Object.getPrototypeOf(NoWifi)).call(this,e))}return _inherits(NoWifi,e),o(NoWifi,[{key:"componentDidMount",value:function(){window.lockShowNoWIfi=!0}},{key:"componentWillUnmount",value:function(){window.lockShowNoWIfi=!1}},{key:"render",value:function(){var e=this.props.style||{};return a.default.createElement("div",{style:r({},s.noResult,e)},a.default.createElement("img",{src:l.default,style:{maxWidth:"7rem"}}),a.default.createElement("p",{style:{color:"#7e7e7e",margin:0,fontSize:".4rem"}},"网络已被带走"))}}]),NoWifi}(a.default.Component);t.default=c},820:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),i=n(0),a=_interopRequireDefault(i),u=n(821),l=_interopRequireDefault(u),s={noResult:{height:"100%",width:"100%",zIndex:-1,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},c=function(e){function NoOrdering(e){return _classCallCheck(this,NoOrdering),_possibleConstructorReturn(this,(NoOrdering.__proto__||Object.getPrototypeOf(NoOrdering)).call(this,e))}return _inherits(NoOrdering,e),o(NoOrdering,[{key:"render",value:function(){var e=this.props.style||{};return a.default.createElement("div",{style:r({},s.noResult,e)},a.default.createElement("img",{src:l.default,style:{maxWidth:"7rem"}}),a.default.createElement("p",{style:{color:"#7e7e7e",margin:0,fontSize:".4rem"}},this.props.message||"还没有订单哟"))}}]),NoOrdering}(a.default.Component);t.default=c},821:function(e,t,n){e.exports=n.p+"img/common/bg_no_ordering.png?16e8c25df8f49bf6c2cdd60f114afccc"}});