webpackJsonp([16],{772:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),o=function get(e,t,r){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,t);if(void 0===n){var o=Object.getPrototypeOf(e);return null===o?void 0:get(o,t,r)}if("value"in n)return n.value;var i=n.get;if(void 0!==i)return i.call(r)},i=r(0),l=_interopRequireDefault(i),a=r(777),u=_interopRequireDefault(a),c=r(105),f=r(106),s=r(288),d=_interopRequireDefault(s),p=r(1),h=_interopRequireDefault(p),m=r(289),y=r(283),v=r(170),g=_interopRequireDefault(v),_=r(788),b=_interopRequireDefault(_),O=r(820),E=_interopRequireDefault(O),C=r(169),R=r(293),w=_interopRequireDefault(R),P={loading:{position:"relative",display:"flex",justifyContent:"center",height:(0,y.toRem)(100),fontSize:(0,y.toRem)(28),alignItems:"center",clear:"both",backgroundColor:"#fff"},deselect:{position:"absolute",top:"50%",left:"10px",marginTop:"-10px",width:"20px",height:"20px",border:"1px solid #999",borderRadius:"20px"},selected:{position:"absolute",top:"50%",left:"10px",marginTop:"-10px",width:"20px",height:"20px",backgroundColor:"#ff6832",borderRadius:"20px"}},T=function(e){return l.default.createElement(C.SvgIcon,{style:e.style,viewBox:"0 0 32 32"},l.default.createElement("path",{style:{fillRule:"evenodd",clipRule:"evenodd"},d:"M20.536,15.121l-7.657-7.657c-0.391-0.391-1.024-0.391-1.414,0c-0.391,0.391-0.391,1.024,0,1.414L18.586,16l-7.121,7.121c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.024,0.391,1.414,0l7.657-7.657c0.24-0.24,0.314-0.568,0.26-0.879C20.85,15.69,20.775,15.361,20.536,15.121z M16,0C7.163,0,0,7.164,0,16c0,8.837,7.163,16,16,16c8.837,0,16-7.163,16-16C32,7.164,24.837,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2c7.732,0,14,6.268,14,14C30,23.732,23.732,30,16,30z"}))},k=function(e){function InvoiceOrder(e){_classCallCheck(this,InvoiceOrder);var t=_possibleConstructorReturn(this,(InvoiceOrder.__proto__||Object.getPrototypeOf(InvoiceOrder)).call(this,e));return o(InvoiceOrder.prototype.__proto__||Object.getPrototypeOf(InvoiceOrder.prototype),"title",t).call(t,"开票"),t.state={orderForm:{},orderList:[],offLine:!1,currentPage:0,pageSize:999,orderChosenIds:[],orderChosenTotalMoney:0},t}return _inherits(InvoiceOrder,e),n(InvoiceOrder,[{key:"componentDidUpdate",value:function(e){if(e.orderForm.invoiceOrderStamp!==this.props.orderForm.invoiceOrderStamp){var t=this.props.orderForm.invoiceOrderData||{data:{}},r=t.data,n=r||{result:[]},o=n.result;this.setState({orderList:o})}}},{key:"componentDidMount",value:function(){0===this.state.currentPage&&this.loadMoreAction()}},{key:"render",value:function(){var e=this,t=this.state.orderList,r=this.state.orderChosenIds,n=this.state.orderChosenTotalMoney;return l.default.createElement("section",{style:{backgroundColor:"#d7d7d7",minHeight:document.documentElement.clientHeight||document.body.clientHeight}},l.default.createElement("header",{style:{width:"100%",height:(0,y.toRem)(110),backgroundColor:"#fff",borderBottom:"2px solid #d7d7d7"}},l.default.createElement("div",{style:{float:"left",marginLeft:(0,y.toRem)(20),lineHeight:(0,y.toRem)(110),color:"#212121",fontSize:(0,y.toRem)(36)}},"订票开单"),l.default.createElement("div",{style:{float:"right",marginRight:(0,y.toRem)(20)},onClick:function(){(0,y.linkTo)("user/invoiceList",!1,null)}},l.default.createElement("span",{style:{lineHeight:(0,y.toRem)(110),color:"#fd6a31",fontSize:(0,y.toRem)(24)}},"开票历史"),l.default.createElement(T,{style:{position:"relative",top:(0,y.toRem)(5),marginLeft:(0,y.toRem)(20),color:"#ff7d4f",width:(0,y.toRem)(30),height:(0,y.toRem)(30)}}))),t.length>0?l.default.createElement("div",null,t.map(function(t){return l.default.createElement("section",{key:t.id,style:{position:"relative",backgroundColor:"#fff",marginBottom:(0,y.toRem)(20)},onTouchTap:function(){var o=r.indexOf(t.id);o<0?(r.push(t.id),n=(0,y.accAdd)(n,t.payAmount)):(r.splice(o,1),n=(0,y.subtr)(n,t.payAmount)),e.setState({orderChosenIds:r,orderChosenTotalMoney:n})}},l.default.createElement("header",{style:r.indexOf(t.id)>=0?P.selected:P.deselect},l.default.createElement(w.default,{style:{position:"absolute",top:0,left:0,width:"20px",height:"20px"},color:"#fff"})),l.default.createElement("ul",{style:{listStyle:"none",padding:"10px 15px 10px 40px",margin:0,fontSize:(0,y.toRem)(28),color:"#999",lineHeight:(0,y.toRem)(60)}},l.default.createElement("li",{style:{}},t.orderTime),l.default.createElement("li",null,"设备号: ",l.default.createElement("span",{style:{color:"#212121"}},t.deviceId)),l.default.createElement("li",null,"支付金额: ",l.default.createElement("span",{style:{color:"#212121"}},"¥",t.payAmount)),l.default.createElement("li",null,"支付套餐: ",l.default.createElement("span",{style:{color:"#212121"}},t.productName))))}),l.default.createElement("div",{style:P.loading},l.default.createElement("span",null,"亲爱滴，已经到底了")),l.default.createElement("div",{style:{width:"100%",height:(0,y.toRem)(110)}})):l.default.createElement("div",null,this.state.offLine?l.default.createElement(b.default,{style:{paddingTop:(0,y.toRem)(350)}}):l.default.createElement(E.default,{style:{paddingTop:(0,y.toRem)(350)}})),l.default.createElement("footer",{style:{position:"fixed",bottom:0,left:0,width:"100%",height:(0,y.toRem)(110),borderTop:"1px solid #ddd",backgroundColor:"#fff"}},l.default.createElement("header",{style:{float:"left",position:"relative",width:"auto",height:"100%"},onClick:function(){var n=[],o=0;r.length<t.length&&t.map(function(e){n.push(e.id),o=(0,y.accAdd)(e.payAmount,o)}),e.setState({orderChosenIds:n,orderChosenTotalMoney:o})}},l.default.createElement("div",{style:0!==r.length&&r.length===t.length?P.selected:P.deselect},l.default.createElement(w.default,{style:{position:"absolute",top:0,left:0,width:"20px",height:"20px"},color:"#fff"})),l.default.createElement("span",{style:{marginLeft:"40px",lineHeight:(0,y.toRem)(110),fontSize:(0,y.toRem)(34),color:"#666"}},0!==t.length&&r.length>0?"已选":"全选","（",r.length,"）")),l.default.createElement("div",{style:function(){var e={float:"right",width:(0,y.toRem)(250),height:"100%",fontSize:(0,y.toRem)(34),lineHeight:(0,y.toRem)(110),textAlign:"center",backgroundColor:"#ff6832",color:"#fff"};return r.length<=0&&(e.backgroundColor="#ccc"),e}(),onClick:function(){r.length<=0||(0,y.linkTo)("user/invoiceSubmit/"+r.join("-")+"/"+n.toString().replace(".","-"),!1,null)}},"去开票"),l.default.createElement("div",{style:{float:"right",marginRight:"10px",height:"100%",fontSize:(0,y.toRem)(34),lineHeight:(0,y.toRem)(110),color:"#666"}},"合计: ¥",n)))}},{key:"loadMoreAction",value:function(){var e=this,t=this.state.currentPage+1,r=this.state.pageSize,n={page:t,pageSize:r};this.props.getInvoiceOrderAction(n,(0,y.reqHeader)(n),null,function(t,r){r.code===g.default.CODE_OFF_LINE&&e.setState({offLine:!0,loading:!1})})}}]),InvoiceOrder}(u.default);k.defaultProps={orderForm:{}},k.propTypes={orderForm:h.default.object};var x=function(e,t){return{orderForm:e.app.user.orderForm}},D=function(e,t){return{getInvoiceOrderAction:(0,d.default)(m.getInvoiceOrder,e)}};t.default=(0,f.withRouter)((0,c.connect)(x,D)(k))},777:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),o=r(0),i=r(284),l=_interopRequireDefault(i),a=(r(106),r(105),r(19)),u=_interopRequireDefault(a),c=function(e){function BaseComponent(e){_classCallCheck(this,BaseComponent);var t=_possibleConstructorReturn(this,(BaseComponent.__proto__||Object.getPrototypeOf(BaseComponent)).call(this,e));return t.bindState.bind(t),t.title=t.title.bind(t),l.default.setHistory(t.props.history),t}return _inherits(BaseComponent,e),n(BaseComponent,[{key:"render",value:function(){return React.createElement("div",null)}},{key:"bindState",value:function(e){var t=this;return function(r){var n={};n[e]=r,t.setState(n)}}},{key:"title",value:function(e){document.title=e}},{key:"validUserStatus",value:function(e,t,r){var n=t||{},o=n.data,i=o||{},l=i.systemTime,a=i.timeStamp,c=this.isVip(e),f=this.isBindDevice(e),s=this.isFreeActivation(e);if("string"==typeof f)return r&&r(f),"正在获取用户信息";if(!1===f)return r&&r("",u.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1;if(!0===f){if(!0===s)return r&&r("",u.default.COMMON.ALERT_TYPE_FREE_ACTIVE),!1;if(!1===s)return function(){return!(!l||!a)&&!(l-a>72e4)}()?!1!==c||(r&&r("",u.default.COMMON.ALERT_TYPE_BE_VIP),!1):(r&&r("",u.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}}},{key:"validUserBindDevice",value:function(e,t){var r=this.isBindDevice(e);return"string"==typeof r?(t&&t(r),r):!1===r?(t&&t("",u.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1):!0===r||void 0}},{key:"validUserDeviceOnline",value:function(e,t){var r=e||{},n=r.data,o=n||{},i=o.systemTime,l=o.timeStamp;if(i&&l){return!!!(i-l>72e4)||(t&&t("",u.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}return t&&t("",u.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1}},{key:"isFreeActivation",value:function(e){var t=e||{},r=t.status,n=t.data;if(void 0!==r){return 1===n.isFreeActivation}return"正在获取用户信息"}},{key:"isBindDevice",value:function(e){var t=e||{},r=t.status,n=t.msg,o=t.data;if(void 0!==r){if(-100===r)return"请使用微信操作";if(1===r){var i=o.isReDevice;o.bindExpireTime;return 1===i}return n||"获取用户信息失败，请稍后重试！"}return"正在获取用户信息"}},{key:"isVip",value:function(e){var t=e||{},r=t.status,n=t.data;if(void 0!==r){var o=n.vipStatus,i=n.expireTime;return 1===o&&(new Date).getTime()<i}return"正在获取用户信息"}},{key:"vipTime",value:function(e){var t=e||{},r=t.status,n=t.data;if(void 0!==r){var o=n.vipStatus,i=n.expireTime;return 1===o?i-(new Date).getTime():"0"}return"正在获取用户信息"}}]),BaseComponent}(o.Component);t.default=c},779:function(e,t,r){e.exports=r.p+"img/common/bg_no_network.png?ec6f187423c8d73d62f1171882f62080"},788:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),l=_interopRequireDefault(i),a=r(779),u=_interopRequireDefault(a),c={noResult:{height:"100%",width:"100%",zIndex:-1,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},f=function(e){function NoWifi(e){return _classCallCheck(this,NoWifi),_possibleConstructorReturn(this,(NoWifi.__proto__||Object.getPrototypeOf(NoWifi)).call(this,e))}return _inherits(NoWifi,e),o(NoWifi,[{key:"componentDidMount",value:function(){window.lockShowNoWIfi=!0}},{key:"componentWillUnmount",value:function(){window.lockShowNoWIfi=!1}},{key:"render",value:function(){var e=this.props.style||{};return l.default.createElement("div",{style:n({},c.noResult,e)},l.default.createElement("img",{src:u.default,style:{maxWidth:"7rem"}}),l.default.createElement("p",{style:{color:"#7e7e7e",margin:0,fontSize:".4rem"}},"网络已被带走"))}}]),NoWifi}(l.default.Component);t.default=f},820:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),l=_interopRequireDefault(i),a=r(821),u=_interopRequireDefault(a),c={noResult:{height:"100%",width:"100%",zIndex:-1,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},f=function(e){function NoOrdering(e){return _classCallCheck(this,NoOrdering),_possibleConstructorReturn(this,(NoOrdering.__proto__||Object.getPrototypeOf(NoOrdering)).call(this,e))}return _inherits(NoOrdering,e),o(NoOrdering,[{key:"render",value:function(){var e=this.props.style||{};return l.default.createElement("div",{style:n({},c.noResult,e)},l.default.createElement("img",{src:u.default,style:{maxWidth:"7rem"}}),l.default.createElement("p",{style:{color:"#7e7e7e",margin:0,fontSize:".4rem"}},this.props.message||"还没有订单哟"))}}]),NoOrdering}(l.default.Component);t.default=f},821:function(e,t,r){e.exports=r.p+"img/common/bg_no_ordering.png?16e8c25df8f49bf6c2cdd60f114afccc"}});