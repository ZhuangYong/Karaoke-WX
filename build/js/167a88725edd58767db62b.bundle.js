webpackJsonp([16],{772:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=n(0),i=_interopRequireDefault(o),l=n(777),a=_interopRequireDefault(l),u=n(105),c=n(106),f=n(288),s=_interopRequireDefault(f),d=n(1),p=_interopRequireDefault(d),m=n(289),h=n(283),y=n(170),v=_interopRequireDefault(y),_=n(788),g=_interopRequireDefault(_),b=n(820),E=_interopRequireDefault(b),O=n(169),C=n(293),R=_interopRequireDefault(C),w={loading:{position:"relative",display:"flex",justifyContent:"center",height:(0,h.toRem)(100),fontSize:(0,h.toRem)(28),alignItems:"center",clear:"both",backgroundColor:"#fff"},deselect:{position:"absolute",top:"50%",left:"10px",marginTop:"-10px",width:"20px",height:"20px",border:"1px solid #999",borderRadius:"20px"},selected:{position:"absolute",top:"50%",left:"10px",marginTop:"-10px",width:"20px",height:"20px",backgroundColor:"#ff6832",borderRadius:"20px"}},T=function(e){return i.default.createElement(O.SvgIcon,{style:e.style,viewBox:"0 0 32 32"},i.default.createElement("path",{style:{fillRule:"evenodd",clipRule:"evenodd"},d:"M20.536,15.121l-7.657-7.657c-0.391-0.391-1.024-0.391-1.414,0c-0.391,0.391-0.391,1.024,0,1.414L18.586,16l-7.121,7.121c-0.391,0.391-0.391,1.024,0,1.414c0.391,0.391,1.024,0.391,1.414,0l7.657-7.657c0.24-0.24,0.314-0.568,0.26-0.879C20.85,15.69,20.775,15.361,20.536,15.121z M16,0C7.163,0,0,7.164,0,16c0,8.837,7.163,16,16,16c8.837,0,16-7.163,16-16C32,7.164,24.837,0,16,0z M16,30C8.268,30,2,23.732,2,16C2,8.268,8.268,2,16,2c7.732,0,14,6.268,14,14C30,23.732,23.732,30,16,30z"}))},k=function(e){function InvoiceOrder(e){_classCallCheck(this,InvoiceOrder);var t=_possibleConstructorReturn(this,(InvoiceOrder.__proto__||Object.getPrototypeOf(InvoiceOrder)).call(this,e));return t.state={orderForm:{},orderList:[],offLine:!1,currentPage:0,pageSize:999,orderChosenIds:[],orderChosenTotalMoney:0},t}return _inherits(InvoiceOrder,e),r(InvoiceOrder,[{key:"componentDidUpdate",value:function(e){if(e.orderForm.invoiceOrderStamp!==this.props.orderForm.invoiceOrderStamp){var t=this.props.orderForm.invoiceOrderData||{data:{}},n=t.data,r=n||{result:[]},o=r.result;this.setState({orderList:o})}}},{key:"componentDidMount",value:function(){0===this.state.currentPage&&this.loadMoreAction()}},{key:"render",value:function(){var e=this,t=this.state.orderList,n=this.state.orderChosenIds,r=this.state.orderChosenTotalMoney;return i.default.createElement("section",{style:{backgroundColor:"#d7d7d7",minHeight:document.documentElement.clientHeight||document.body.clientHeight}},i.default.createElement("header",{style:{width:"100%",height:(0,h.toRem)(110),backgroundColor:"#fff",borderBottom:"2px solid #d7d7d7"}},i.default.createElement("div",{style:{float:"left",marginLeft:(0,h.toRem)(20),lineHeight:(0,h.toRem)(110),color:"#212121",fontSize:(0,h.toRem)(36)}},"订票开单"),i.default.createElement("div",{style:{float:"right",marginRight:(0,h.toRem)(20)},onClick:function(){(0,h.linkTo)("user/invoiceList",!1,null)}},i.default.createElement("span",{style:{lineHeight:(0,h.toRem)(110),color:"#fd6a31",fontSize:(0,h.toRem)(24)}},"开票历史"),i.default.createElement(T,{style:{position:"relative",top:(0,h.toRem)(5),marginLeft:(0,h.toRem)(20),color:"#ff7d4f",width:(0,h.toRem)(30),height:(0,h.toRem)(30)}}))),t.length>0?i.default.createElement("div",null,t.map(function(t){return i.default.createElement("section",{key:t.id,style:{position:"relative",backgroundColor:"#fff",marginBottom:(0,h.toRem)(20)}},i.default.createElement("header",{style:n.indexOf(t.id)>=0?w.selected:w.deselect},i.default.createElement(R.default,{style:{position:"absolute",top:0,left:0,width:"20px",height:"20px"},color:"#fff"})),i.default.createElement("ul",{style:{listStyle:"none",padding:"10px 15px 10px 40px",margin:0,fontSize:(0,h.toRem)(28),color:"#999",lineHeight:(0,h.toRem)(60)},onTouchTap:function(){var o=n.indexOf(t.id);o<0?(n.push(t.id),r=(0,h.accAdd)(r,t.payAmount)):(n.splice(o,1),r=(0,h.subtr)(r,t.payAmount)),e.setState({orderChosenIds:n,orderChosenTotalMoney:r})}},i.default.createElement("li",{style:{}},t.orderTime),i.default.createElement("li",null,"设备号: ",i.default.createElement("span",{style:{color:"#212121"}},t.deviceId)),i.default.createElement("li",null,"支付金额: ",i.default.createElement("span",{style:{color:"#212121"}},"¥",t.payAmount)),i.default.createElement("li",null,"支付套餐: ",i.default.createElement("span",{style:{color:"#212121"}},t.productName))))}),i.default.createElement("div",{style:w.loading},i.default.createElement("span",null,"亲爱滴，已经到底了")),i.default.createElement("div",{style:{width:"100%",height:(0,h.toRem)(110)}})):i.default.createElement("div",null,this.state.offLine?i.default.createElement(g.default,{style:{paddingTop:(0,h.toRem)(350)}}):i.default.createElement(E.default,{style:{paddingTop:(0,h.toRem)(350)}})),i.default.createElement("footer",{style:{position:"fixed",bottom:0,left:0,width:"100%",height:(0,h.toRem)(110),borderTop:"1px solid #ddd",backgroundColor:"#fff"}},i.default.createElement("header",{style:{float:"left",position:"relative",width:"auto",height:"100%"},onClick:function(){var r=[],o=0;n.length<t.length&&t.map(function(e){r.push(e.id),o=(0,h.accAdd)(e.payAmount,o)}),e.setState({orderChosenIds:r,orderChosenTotalMoney:o})}},i.default.createElement("div",{style:n.length<t.length?w.deselect:w.selected},i.default.createElement(R.default,{style:{position:"absolute",top:0,left:0,width:"20px",height:"20px"},color:"#fff"})),i.default.createElement("span",{style:{marginLeft:"40px",lineHeight:(0,h.toRem)(110),fontSize:(0,h.toRem)(34),color:"#666"}},"已选（",n.length,"）")),i.default.createElement("div",{style:function(){var e={float:"right",width:(0,h.toRem)(250),height:"100%",fontSize:(0,h.toRem)(34),lineHeight:(0,h.toRem)(110),textAlign:"center",backgroundColor:"#ff6832",color:"#fff"};return n.length<=0&&(e.backgroundColor="#ccc"),e}(),onClick:function(){n.length<=0||(0,h.linkTo)("user/invoiceSubmit/"+n.join("-")+"/"+r.toString().replace(".","-"),!1,null)}},"去开票"),i.default.createElement("div",{style:{float:"right",marginRight:"10px",height:"100%",fontSize:(0,h.toRem)(34),lineHeight:(0,h.toRem)(110),color:"#666"}},"合计: ¥",r)))}},{key:"loadMoreAction",value:function(){var e=this,t=this.state.currentPage+1,n=this.state.pageSize,r={page:t,pageSize:n};this.props.getInvoiceOrderAction(r,(0,h.reqHeader)(r),null,function(t,n){n.code===v.default.CODE_OFF_LINE&&e.setState({offLine:!0,loading:!1})})}}]),InvoiceOrder}(a.default);k.defaultProps={orderForm:{}},k.propTypes={orderForm:p.default.object};var x=function(e,t){return{orderForm:e.app.user.orderForm}},P=function(e,t){return{getInvoiceOrderAction:(0,s.default)(m.getInvoiceOrder,e)}};t.default=(0,c.withRouter)((0,u.connect)(x,P)(k))},777:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=n(0),i=n(284),l=_interopRequireDefault(i),a=(n(106),n(105),n(19)),u=_interopRequireDefault(a),c=function(e){function BaseComponent(e){_classCallCheck(this,BaseComponent);var t=_possibleConstructorReturn(this,(BaseComponent.__proto__||Object.getPrototypeOf(BaseComponent)).call(this,e));return t.bindState.bind(t),t.title=t.title.bind(t),l.default.setHistory(t.props.history),t}return _inherits(BaseComponent,e),r(BaseComponent,[{key:"render",value:function(){return React.createElement("div",null)}},{key:"bindState",value:function(e){var t=this;return function(n){var r={};r[e]=n,t.setState(r)}}},{key:"title",value:function(e){document.title=e}},{key:"validUserStatus",value:function(e,t,n){var r=t||{},o=r.data,i=o||{},l=i.systemTime,a=i.timeStamp,c=this.isVip(e),f=this.isBindDevice(e),s=this.isFreeActivation(e);if("string"==typeof f)return n&&n(f),"正在获取用户信息";if(!1===f)return n&&n("",u.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1;if(!0===f){if(!0===s)return n&&n("",u.default.COMMON.ALERT_TYPE_FREE_ACTIVE),!1;if(!1===s)return function(){return!(!l||!a)&&!(l-a>72e4)}()?!1!==c||(n&&n("",u.default.COMMON.ALERT_TYPE_BE_VIP),!1):(n&&n("",u.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}}},{key:"validUserBindDevice",value:function(e,t){var n=this.isBindDevice(e);return"string"==typeof n?(t&&t(n),n):!1===n?(t&&t("",u.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1):!0===n||void 0}},{key:"validUserDeviceOnline",value:function(e,t){var n=e||{},r=n.data,o=r||{},i=o.systemTime,l=o.timeStamp;if(i&&l){return!!!(i-l>72e4)||(t&&t("",u.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}return t&&t("",u.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1}},{key:"isFreeActivation",value:function(e){var t=e||{},n=t.status,r=t.data;if(void 0!==n){return 1===r.isFreeActivation}return"正在获取用户信息"}},{key:"isBindDevice",value:function(e){var t=e||{},n=t.status,r=t.msg,o=t.data;if(void 0!==n){if(-100===n)return"请使用微信操作";if(1===n){var i=o.isReDevice;o.bindExpireTime;return 1===i}return r||"获取用户信息失败，请稍后重试！"}return"正在获取用户信息"}},{key:"isVip",value:function(e){var t=e||{},n=t.status,r=t.data;if(void 0!==n){var o=r.vipStatus,i=r.expireTime;return 1===o&&(new Date).getTime()<i}return"正在获取用户信息"}},{key:"vipTime",value:function(e){var t=e||{},n=t.status,r=t.data;if(void 0!==n){var o=r.vipStatus,i=r.expireTime;return 1===o?i-(new Date).getTime():"0"}return"正在获取用户信息"}}]),BaseComponent}(o.Component);t.default=c},779:function(e,t,n){e.exports=n.p+"img/common/bg_no_network.png?ec6f187423c8d73d62f1171882f62080"},788:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),i=n(0),l=_interopRequireDefault(i),a=n(779),u=_interopRequireDefault(a),c={noResult:{height:"100%",width:"100%",zIndex:-1,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},f=function(e){function NoWifi(e){return _classCallCheck(this,NoWifi),_possibleConstructorReturn(this,(NoWifi.__proto__||Object.getPrototypeOf(NoWifi)).call(this,e))}return _inherits(NoWifi,e),o(NoWifi,[{key:"componentDidMount",value:function(){window.lockShowNoWIfi=!0}},{key:"componentWillUnmount",value:function(){window.lockShowNoWIfi=!1}},{key:"render",value:function(){var e=this.props.style||{};return l.default.createElement("div",{style:r({},c.noResult,e)},l.default.createElement("img",{src:u.default,style:{maxWidth:"7rem"}}),l.default.createElement("p",{style:{color:"#7e7e7e",margin:0,fontSize:".4rem"}},"网络已被带走"))}}]),NoWifi}(l.default.Component);t.default=f},820:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),i=n(0),l=_interopRequireDefault(i),a=n(821),u=_interopRequireDefault(a),c={noResult:{height:"100%",width:"100%",zIndex:-1,display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}},f=function(e){function NoOrdering(e){return _classCallCheck(this,NoOrdering),_possibleConstructorReturn(this,(NoOrdering.__proto__||Object.getPrototypeOf(NoOrdering)).call(this,e))}return _inherits(NoOrdering,e),o(NoOrdering,[{key:"render",value:function(){var e=this.props.style||{};return l.default.createElement("div",{style:r({},c.noResult,e)},l.default.createElement("img",{src:u.default,style:{maxWidth:"7rem"}}),l.default.createElement("p",{style:{color:"#7e7e7e",margin:0,fontSize:".4rem"}},this.props.message||"还没有订单哟"))}}]),NoOrdering}(l.default.Component);t.default=f},821:function(e,t,n){e.exports=n.p+"img/common/bg_no_ordering.png?16e8c25df8f49bf6c2cdd60f114afccc"}});