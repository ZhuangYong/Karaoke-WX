webpackJsonp([22],{752:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),n=function get(e,t,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var n=Object.getPrototypeOf(e);return null===n?void 0:get(n,t,r)}if("value"in o)return o.value;var i=o.get;if(void 0!==i)return i.call(r)},i=r(0),a=_interopRequireDefault(i),u=r(287),s=_interopRequireDefault(u),l=r(87),c=r(106),p=r(291),f=_interopRequireDefault(p),d=r(1),h=_interopRequireDefault(d),b=r(896),y=_interopRequireDefault(b),g=r(172),_=_interopRequireDefault(g),m=r(292),v=r(286),P=r(810),w=_interopRequireDefault(P),O=r(290),j=function(e){function Login(e){_classCallCheck(this,Login);var t=_possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).call(this,e));return n(Login.prototype.__proto__||Object.getPrototypeOf(Login.prototype),"title",t).call(t,"登录"),t.state={matchParams:t.props.match.params},t}return _inherits(Login,e),o(Login,[{key:"componentDidUpdate",value:function(e){var t=this.props.match.params;e.match.params.state!==t.state&&this.setState({matchParams:t})}},{key:"render",value:function(){var e=this;return a.default.createElement(w.default,{src:y.default,disabled:void 0===this.state.matchParams.uuid,content:this.matchPages(),imgStyle:{width:"180px"},buttonLabel:"确认登录",hideButton:"home"!==this.state.matchParams.state,touchTap:function(){if(!window.sysInfo.isWeixin)return void e.props.action_setGlobAlert("请在微信客户端操作");var t=e.state.matchParams.uuid;if(void 0!==t){var r={uuid:t};e.props.ottLoginAction(r,(0,v.reqHeader)(r),function(e){var t=e.status,r=e.data;e.msg;302===parseInt(t,10)?window.location.href=r:1===parseInt(t,10)&&_.default.replace("/login/success")})}}})}},{key:"matchPages",value:function(){var e=this.state.matchParams,t="";switch(e.state){case"home":t="微信授权金麦客登录确认";break;case"success":t="恭喜您，登录成功";break;case"failed":t="您的登录出现了问题";break;case"invalid":t="扫描二维码已失效";break;default:_.default.replace("/*")}return t}}]),Login}(s.default);j.defaultProps={result:{}},j.propTypes={result:h.default.object};var k=function(e,t){return{result:e.app.user.ottLogin}},R=function(e,t){return{ottLoginAction:(0,f.default)(m.OTTLogin,e),action_setGlobAlert:(0,f.default)(O.setGlobAlert,e)}};t.default=(0,c.withRouter)((0,l.connect)(k,R)(j))},810:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),a=_interopRequireDefault(i),u=r(293),s=_interopRequireDefault(u),l={submitBtn:{position:"absolute",left:"50%",bottom:"80px",marginLeft:"-120px",width:"240px",height:"50px",borderRadius:"50px",overflow:"hidden"}},c=function(e){function ButtonPage(e){return _classCallCheck(this,ButtonPage),_possibleConstructorReturn(this,(ButtonPage.__proto__||Object.getPrototypeOf(ButtonPage)).call(this,e))}return _inherits(ButtonPage,e),n(ButtonPage,[{key:"render",value:function(){return a.default.createElement("section",{style:o({},{width:"100%"},this.props.style)},a.default.createElement("header",null,this.props.headerDom||a.default.createElement("div",null,a.default.createElement("img",{style:o({},{display:"block",margin:"130px auto 0",width:"100px"},this.props.imgStyle),src:this.props.src,alt:""}),a.default.createElement("div",{style:o({},{marginTop:"8px",textAlign:"center",color:"#ff8632",fontSize:"18px"},this.props.contentStyle)},this.props.content))),!this.props.hideButton&&a.default.createElement(s.default,{disabled:this.props.disabled,backgroundColor:"#ff6832",disabledBackgroundColor:"#ccc",label:this.props.buttonLabel,style:o({},l.submitBtn,this.props.raisedButtonStyles),buttonStyle:this.props.buttonStyles,labelStyle:o({},{lineHeight:"50px",fontSize:"18px",color:"#fff"},this.props.buttonLabelStyles),onClick:this.props.touchTap}))}}]),ButtonPage}(a.default.Component);t.default=c},896:function(e,t,r){e.exports=r.p+"img/login.png?966603e4940750db2eba658a077d68a7"}});