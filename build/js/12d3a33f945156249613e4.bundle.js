webpackJsonp([12],{1098:function(e,t,a){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function getPayList(e,t){var a=s.default.apiDomain+l.default.API_GET_PAY_LIST;return function(i){(0,r.comFetch)(i,e,{url:a,headers:t,action:n.default.Pay.API_GET_PAY_LIST},null)}}function alipayPay(e,t,a){var i=s.default.apiDomain+l.default.API_ALI_PAY;return function(o){(0,r.comFetch)(o,e,{url:i,headers:t,action:n.default.Pay.API_ALI_PAY},a)}}function getWXPayParams(e,t,a){var i=s.default.apiDomain+l.default.API_GET_WX_PAY_PARAMS;return function(o){(0,r.comFetch)(o,e,{url:i,headers:t,action:n.default.Pay.API_GET_WX_PAY_PARAMS},a)}}function deviceRegister(e,t,a){var i=s.default.apiDomain+l.default.API_DEVICE_REGISTER;return function(o){(0,r.comFetch)(o,e,{url:i,headers:t,action:n.default.Pay.API_DEVICE_REGISTER},a)}}Object.defineProperty(t,"__esModule",{value:!0}),t.getPayList=getPayList,t.alipayPay=alipayPay,t.getWXPayParams=getWXPayParams,t.deviceRegister=deviceRegister;var i=a(18),n=_interopRequireDefault(i),r=a(21),o=a(107),l=_interopRequireDefault(o),u=a(72),s=_interopRequireDefault(u)},1099:function(e,t,a){e.exports=a.p+"img/pay_checkbox.png?81f8f0bdb47f6d94c2de0019da4168eb"},1100:function(e,t,a){e.exports=a.p+"img/pay_checkbox_selected.png?104f6aa31af1199d32d4fca5dcdad166"},1101:function(e,t,a){e.exports=a.p+"img/pay_success.png?8b79c70c6f9f2d8b921f2325eb944b28"},1102:function(e,t,a){e.exports=a.p+"img/pay_failed.png?32a85b1855933e80779c5f89a53700c3"},1103:function(e,t,a){e.exports=a.p+"img/device_register.png?cde4598d9f64e073eaa7d4ac7a22c031"},1104:function(e,t,a){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=a(0),n=_interopRequireDefault(i),r=a(24),o=_interopRequireDefault(r),l=a(20),u=_interopRequireDefault(l),s=function(e){return n.default.createElement(u.default,e,n.default.createElement("path",{d:"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"}))};s=(0,o.default)(s),s.displayName="ActionFavoriteBorder",s.muiName="SvgIcon",t.default=s},764:function(e,t,a){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function defineProperties(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,a){return t&&defineProperties(e.prototype,t),a&&defineProperties(e,a),e}}(),n=function get(e,t,a){null===e&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(void 0===i){var n=Object.getPrototypeOf(e);return null===n?void 0:get(n,t,a)}if("value"in i)return i.value;var r=i.get;if(void 0!==r)return r.call(a)},r=a(0),o=_interopRequireDefault(r),l=a(287),u=_interopRequireDefault(l),s=a(87),c=a(106),d=a(291),p=_interopRequireDefault(d),f=a(1),y=_interopRequireDefault(f),m=a(1098),h=a(286),g=a(172),b=_interopRequireDefault(g),_=a(1099),P=(_interopRequireDefault(_),a(1100)),v=(_interopRequireDefault(P),a(1101)),E=_interopRequireDefault(v),S=a(1102),w=_interopRequireDefault(S),I=a(1103),x=_interopRequireDefault(I),A=a(810),T=_interopRequireDefault(A),R=a(109),C=_interopRequireDefault(R),D=a(88),k=_interopRequireDefault(D),L=a(290),O=a(292),B=a(18),q=_interopRequireDefault(B),N=a(169),Y=a(1104),G=(_interopRequireDefault(Y),a(313)),W=_interopRequireDefault(G),j=a(170),U=_interopRequireDefault(j),M={itemBox:{width:"100%",height:"50px",backgroundColor:"#fff",boxSizing:"border-box",borderBottom:"1px solid #b2b2b2"},itemBoxActive:{width:"100%",height:"50px",backgroundColor:"#e8e2d8",boxSizing:"border-box",borderBottom:"1px solid #b2b2b2"},itemLeft:{float:"left",marginLeft:"20px",maxWidth:"70%",lineHeight:"50px",fontSize:"16px",color:"#252525"},itemRight:{float:"right",marginRight:"20px",maxWidth:"20%",lineHeight:"50px",fontSize:"16px",color:"#c48848"},submitButton:{height:"50px",position:"fixed",bottom:"1rem",left:"50%",marginLeft:"-120px",width:"240px",borderRadius:"50px",overflow:"hidden",label:{fontSize:18,fontWeight:500}},payResult:{title:{textAlign:"center",margin:"3rem 0 1rem 0"},subTitle:{textAlign:"center"}}},X=function(e){function Pay(e){_classCallCheck(this,Pay);var t=_possibleConstructorReturn(this,(Pay.__proto__||Object.getPrototypeOf(Pay)).call(this,e));n(Pay.prototype.__proto__||Object.getPrototypeOf(Pay.prototype),"title",t).call(t,"支付");var a={state:(0,h.getQueryString)("state")||"",pollingId:(0,h.getQueryString)("pollingId")||"",deviceId:(0,h.getQueryString)("deviceId")||"",openid:(0,h.getQueryString)("openid")||"",defaultChooseProductId:(0,h.getQueryString)("productId")||""};return t.state={matchParams:a,payListActiveItem:{productId:null,price:null},isCheckboxChecked:!0,payList:[],buttonPage:null,openDialog:!1,payType:"",payResult:""},t.pay=t.pay.bind(t),t.wxPay=t.wxPay.bind(t),t.aliPay=t.aliPay.bind(t),t.handleClose=t.handleClose.bind(t),t.handleAction=t.handleAction.bind(t),t}return _inherits(Pay,e),i(Pay,[{key:"componentDidUpdate",value:function(e){e.result.payListStamp!==this.props.result.payListStamp&&this.updatePayList()}},{key:"componentDidMount",value:function(){this.matchPages(),this.state.payResult=""}},{key:"componentWillUnmount",value:function(){this.state.payResult=""}},{key:"render",value:function(){var e=this,t=this.state.payList,a=this.state.payListActiveItem,i=this.state.isCheckboxChecked,n=this.state.matchParams,r=window.sysInfo.isWeixin,l=this.props.weixinConfigFinish,u=r&&!l,s=[o.default.createElement(k.default,{className:"cancel-button",label:"以后再说",primary:!0,onClick:this.handleClose}),o.default.createElement(k.default,{className:"sure-button",label:"立即开通",primary:!0,onClick:this.handleAction})];return o.default.createElement("div",null,this.state.payResult?o.default.createElement("div",null,"PAY_RESULT_SUCCESS"===this.state.payResult?o.default.createElement("div",null,o.default.createElement("h2",{style:M.payResult.title},"恭喜你成功支付！"),o.default.createElement("p",{style:M.payResult.subTitle},a&&a.productName),o.default.createElement(N.RaisedButton,{backgroundColor:"#ff6832",buttonStyle:M.submitButton,label:"确认",labelStyle:M.submitButton.label,labelColor:"white",onClick:function(){""!==n.openid?setTimeout(function(){window.WeixinJSBridge&&window.WeixinJSBridge.call("closeWindow"),window.AlipayJSBridge&&window.AlipayJSBridge.call("closeWebview")},100):window.history.back()}})):o.default.createElement("div",null,o.default.createElement("h2",{style:M.payResult.title},"呜~支付失败！"),o.default.createElement("p",{style:M.payResult.subTitle},"不甘心，再试一次"),o.default.createElement(N.RaisedButton,{backgroundColor:"#ff6832",buttonStyle:M.submitButton,label:"确认",labelStyle:M.submitButton.label,labelColor:"white",onClick:function(){e.setState({payResult:""})}}))):o.default.createElement("div",null,"home"===n.state?o.default.createElement("div",null,o.default.createElement("section",null,this.state.payType!==U.default.PAY_TYPE_GONG_XIANG?o.default.createElement("header",{style:M.itemBox},o.default.createElement("div",{style:M.itemLeft},"VIP会员套餐")):"",o.default.createElement("ul",{style:{padding:0,margin:0,listStyle:"none"}},this.state.payType===U.default.PAY_TYPE_GONG_XIANG?t.map(function(t){return o.default.createElement(N.ListItem,{key:t.productId,innerDivStyle:{paddingTop:".56rem",paddingLeft:"1.7rem"},style:{height:"3rem",borderBottom:".01rem solid #d7d7d7",paddingBottom:"3.1rem"},primaryText:o.default.createElement("span",{style:{marginLeft:"2.2rem",marginTop:".1rem",marginBottom:".2rem",fontSize:".42rem"}},o.default.createElement("div",{style:{position:"absolute",left:".2rem",top:"1.2rem"}},a.productId===t.productId?o.default.createElement(W.default,{color:"#ff6832",className:"payCircle"}):o.default.createElement("div",{style:{width:".64rem",margin:".067rem",height:".64rem",border:"1px solid gray",borderRadius:"50%"}})),t.productName),secondaryText:o.default.createElement("div",{style:{marginLeft:"2.2rem",marginTop:".4rem",overflow:"visible"}},o.default.createElement("p",{style:{margin:".38rem 0",color:"red",fontSize:".32rem"}},t.discountType===U.default.DISCOUNT_TYPE_TIME?"赠送"+t.discountValue+"分钟":"",t.discountType===U.default.DISCOUNT_TYPE_MONEY?"立减"+t.discountValue+"元":"",t.discountType!==U.default.DISCOUNT_TYPE_TIME&&t.discountType!==U.default.DISCOUNT_TYPE_MONEY&&t.description),o.default.createElement("p",{style:{margin:".38rem 0",color:"#ff6832",fontSize:".52rem"}},"￥",t.price," ",t.orgprice&&t.discountType===U.default.DISCOUNT_TYPE_MONEY?o.default.createElement("font",{style:{textDecoration:"line-through",color:"gray"}},"￥"+t.orgprice):"")),leftAvatar:o.default.createElement("div",{style:{height:"2.4rem",width:"2.4rem",left:"1.16rem",overflow:"hidden"}},o.default.createElement("img",{src:t.wxImg,style:{width:"100%"}})),onTouchTap:function(){e.setState({payListActiveItem:t})}})}):t.map(function(t){return o.default.createElement("li",{key:t.productId,style:a.productId===t.productId?M.itemBoxActive:M.itemBox,onTouchTap:function(){e.setState({payListActiveItem:t})}},o.default.createElement("div",{style:M.itemLeft},t.productName),o.default.createElement("div",{style:M.itemRight},t.price))})),this.state.payType===U.default.PAY_TYPE_GONG_XIANG?o.default.createElement(N.Subheader,{inset:!0,style:{paddingLeft:"1.067rem",marginBottom:"1rem",textAlign:"left",fontSize:".32rem",color:"#002222"}},"购买时长越多越优惠，马上支付开始欢唱吧！"):"",o.default.createElement(N.ListItem,{primaryText:o.default.createElement("span",{style:{display:"flex",justifyContent:"center",alignItems:"center"}},o.default.createElement("span",null,i?o.default.createElement(W.default,{color:"#ff6832",className:"payCircle"}):o.default.createElement("div",{style:{width:".64rem",margin:".067rem",height:".64rem",border:"1px solid gray",borderRadius:"50%"}})),o.default.createElement("a",{style:{color:i?"#ff6832":"gray",fontSize:".4rem",textDecoration:"underline"}},"同意 ",o.default.createElement("font",{onTouchTap:function(){(0,h.linkTo)("protocol",!1,null)}},"《金麦客支付协议》"))),onTouchTap:function(){e.setState({isCheckboxChecked:!i})}})),o.default.createElement(T.default,{style:{position:"relative",height:"80px",clear:"both"},headerDom:o.default.createElement("div",{style:{textAlign:"center",color:"#252525",fontSize:"14px"}},"支付金额: ",o.default.createElement("span",{style:{color:"#c48848"}},a&&a.price,"元")),disabled:u||!(i&&a&&null!==a.productId),icon:u?o.default.createElement(N.CircularProgress,{size:18,thickness:1}):null,raisedButtonStyles:{bottom:0},buttonLabel:"确认支付",touchTap:this.pay})):this.state.buttonPage,o.default.createElement("br",null),o.default.createElement("br",null),o.default.createElement("div",null,o.default.createElement(C.default,{className:"dialog-panel",actionsContainerStyle:{borderTop:".01rem solid #e0e0e0",textAlign:"center"},contentStyle:{textAlign:"center"},actions:s,modal:!1,open:this.state.openDialog,onRequestClose:this.handleClose},"确定开通金麦客VIP体验权"))))}},{key:"handleAction",value:function(){var e=this.props.action_setGlobAlert,t=this.props.getUserInfoAction;this.setState({openDialog:!1});var a={};this.props.deviceRegisterAction(a,(0,h.reqHeader)(a),function(a){1===a.status?(e("成功开通"),t({},(0,h.reqHeader)({}))):e("开通失败"),window.history.back()})}},{key:"handleClose",value:function(){this.setState({openDialog:!1})}},{key:"pay",value:function(){window.sysInfo.isWeixin?this.wxPay():this.aliPay()}},{key:"wxPay",value:function(){var e=this,t=this.props.action_setGlobAlert,a=this.props.getUserInfoAction,i=this.state.payListActiveItem.productId,n=this.state.matchParams,r=null,o={productId:i};""!==n.openid?(o.uuid=n.pollingId,o.openid=n.openid,r=(0,h.reqHeader)(o,(0,h.getEncryptHeader)({deviceId:n.deviceId}))):r=(0,h.reqHeader)(o),this.props.getWXPayParamsAction(o,r,function(i){var r=i.data;window.wx&&window.wx.chooseWXPay({timestamp:r.timeStamp,nonceStr:r.nonceStr,package:r.package,signType:r.signType,paySign:r.paySign,success:function(i){if(e.state.payType===U.default.PAY_TYPE_GONG_XIANG){if(""===n.openid){var r=JSON.parse(window.sessionStorage.getItem("wxInfo")||"{}"),o={url:location.origin+"?uuid="+r.data.uuid+"&userid="+r.data.userId+"&deviceId="+r.data.deviceId},l={wxId:r.data.uuid||"",deviceId:r.data.deviceId||""};a(o,(0,h.reqHeader)(o,(0,h.getEncryptHeader)(l)))}e.setState({payResult:"PAY_RESULT_SUCCESS"})}else t("支付成功"),""!==n.openid?setTimeout(function(){window.WeixinJSBridge.call("closeWindow")},500):(a({},(0,h.reqHeader)({})),window.history.back())},cancel:function(e){t("取消支付"),""!==n.openid?setTimeout(function(){window.WeixinJSBridge.call("closeWindow")},500):window.history.back()},fail:function(a){e.state.payType===U.default.PAY_TYPE_GONG_XIANG?e.setState({payResult:"PAY_RESULT_FAIL"}):t("",q.default.COMMON.ALERT_TYPE_WX_API_FAIL)}})})}},{key:"aliPay",value:function(){var e=this.state.payListActiveItem.productId,t=this.state.matchParams,a={uuid:t.pollingId,productId:e},i=(0,h.getEncryptHeader)({deviceId:t.deviceId});this.props.alipayAction(a,(0,h.reqHeader)(a,i),function(e){var t=e.data;window.location.href=t.payUrl})}},{key:"updatePayList",value:function(){var e=this.props.result.payListData||{data:[]},t=e.data,a=this.state.defaultChooseProductId;if(t&&t[0]){var i=t[0];i=a?t.filter(function(e){return e.productId===a})[0]||i:t.filter(function(e){return 1===e.isRecommend})[0]||i,this.setState({payListActiveItem:i,payList:t,payType:t[0].productType})}}},{key:"matchPages",value:function(){var e=this,t=this.state.matchParams;switch(t.state){case"home":var a={},i=null;i=""!==t.deviceId?(0,h.reqHeader)(a,(0,h.getEncryptHeader)({deviceId:t.deviceId})):(0,h.reqHeader)(a),this.props.getPayListAction(a,i);break;case"aliPaySuccess":this.setState({payResult:this.state.payType===U.default.PAY_TYPE_GONG_XIANG?"PAY_RESULT_SUCCESS":"",buttonPage:o.default.createElement(T.default,{src:E.default,content:"充值成功",buttonLabel:"关闭",touchTap:function(){window.AlipayJSBridge.call("closeWebview")}})});break;case"aliPayFailed":this.setState({payResult:this.state.payType===U.default.PAY_TYPE_GONG_XIANG?"PAY_RESULT_FAIL":"",buttonPage:o.default.createElement(T.default,{src:w.default,content:"充值失败，请重新充值",buttonLabel:"关闭",touchTap:function(){window.AlipayJSBridge.call("closeWebview")}})});break;case"deviceRegister":this.setState({buttonPage:o.default.createElement(T.default,{src:x.default,imgStyle:{width:"162.5px"},content:"恭喜你获得金麦客VIP体验资格哟！",contentStyle:{color:"#c48848"},buttonLabel:"马上体验",touchTap:function(){e.setState({openDialog:!0})}})});break;default:b.default.replace("/*")}}}]),Pay}(u.default);X.defaultProps={result:{}},X.propTypes={result:y.default.object};var z=function(e,t){return{result:e.app.pay,weixinConfigFinish:e.app.common.weixinConfigFinish}},H=function(e,t){return{getPayListAction:(0,p.default)(m.getPayList,e),action_setGlobAlert:(0,p.default)(L.setGlobAlert,e),getWXPayParamsAction:(0,p.default)(m.getWXPayParams,e),deviceRegisterAction:(0,p.default)(m.deviceRegister,e),getUserInfoAction:(0,p.default)(O.getUserInfo,e),alipayAction:(0,p.default)(m.alipayPay,e)}};t.default=(0,c.withRouter)((0,s.connect)(z,H)(X))},810:function(e,t,a){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(e[i]=a[i])}return e},n=function(){function defineProperties(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,a){return t&&defineProperties(e.prototype,t),a&&defineProperties(e,a),e}}(),r=a(0),o=_interopRequireDefault(r),l=a(293),u=_interopRequireDefault(l),s=(a(169),{submitBtn:{position:"absolute",left:"50%",bottom:"80px",marginLeft:"-120px",width:"240px",height:"50px",borderRadius:"50px",overflow:"hidden"}}),c=function(e){function ButtonPage(e){return _classCallCheck(this,ButtonPage),_possibleConstructorReturn(this,(ButtonPage.__proto__||Object.getPrototypeOf(ButtonPage)).call(this,e))}return _inherits(ButtonPage,e),n(ButtonPage,[{key:"render",value:function(){return o.default.createElement("section",{style:i({},{width:"100%"},this.props.style)},o.default.createElement("header",null,this.props.headerDom||o.default.createElement("div",null,o.default.createElement("img",{style:i({},{display:"block",margin:"130px auto 0",width:"100px"},this.props.imgStyle),src:this.props.src,alt:""}),o.default.createElement("div",{style:i({},{marginTop:"8px",textAlign:"center",color:"#ff8632",fontSize:"18px"},this.props.contentStyle)},this.props.content))),!this.props.hideButton&&o.default.createElement(u.default,{icon:this.props.icon,disabled:this.props.disabled,backgroundColor:"#ff6832",disabledBackgroundColor:"#ccc",label:this.props.buttonLabel,style:i({},s.submitBtn,this.props.raisedButtonStyles),buttonStyle:this.props.buttonStyles,labelStyle:i({},{lineHeight:"50px",fontSize:"18px",color:"#fff"},this.props.buttonLabelStyles),onClick:this.props.touchTap}))}}]),ButtonPage}(o.default.Component);t.default=c}});