webpackJsonp([10],{752:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),a=function get(e,t,r){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,t);if(void 0===n){var a=Object.getPrototypeOf(e);return null===a?void 0:get(a,t,r)}if("value"in n)return n.value;var o=n.get;if(void 0!==o)return o.call(r)},o=r(0),i=_interopRequireDefault(o),l=r(105),u=r(106),c=r(767),s=r(766),f=_interopRequireDefault(s),d=r(782),p=_interopRequireDefault(d),m=r(169),h=r(53),_=r(283),b=r(841),g=_interopRequireDefault(b),y=r(768),v=_interopRequireDefault(y),A="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",O=[{id:"defaultData0",wxPic:A},{id:"defaultData1",wxPic:A},{id:"defaultData2",wxPic:A},{id:"defaultData3",wxPic:A},{id:"defaultData4",wxPic:A},{id:"defaultData5",wxPic:A},{id:"defaultData6",wxPic:A},{id:"defaultData7",wxPic:A},{id:"defaultData8",wxPic:A},{id:"defaultData9",wxPic:A}],E=function(e){function CatAlbum(e){_classCallCheck(this,CatAlbum);var t=_possibleConstructorReturn(this,(CatAlbum.__proto__||Object.getPrototypeOf(CatAlbum)).call(this,e));return a(CatAlbum.prototype.__proto__||Object.getPrototypeOf(CatAlbum.prototype),"title",t).call(t,"分类"),t.state={},t}return _inherits(CatAlbum,e),n(CatAlbum,[{key:"componentDidUpdate",value:function(e){}},{key:"componentDidMount",value:function(){var e={id:"home"};this.props.action_getCatAlbum(e,(0,_.reqHeader)(e))}},{key:"render",value:function(){var e=this.props.songs.getCatAlbum||{data:{result:[{name:"主题",data:O}]}};return i.default.createElement(m.Paper,{zDepth:0,style:{paddingTop:"1.2rem"}},i.default.createElement(p.default,null),e.data.result.map(function(e){var t=e.name,r=e.data;if("主题"===t)return i.default.createElement(m.Paper,{key:t,zDepth:0,style:{paddingBottom:66}},i.default.createElement(g.default,{data:r,labelKey:"name",idKey:"id",imgKey:"wxPic",linHeadKey:"songs/catId/"}),i.default.createElement(v.default,{selectedIndex:0}))}))}}]),CatAlbum}(f.default),C=function(e,t){return{songs:e.app.songs}},w=function(e,t){return{action_getCatAlbum:(0,h.bindActionCreators)(c.getCatAlbum,e)}};t.default=(0,u.withRouter)((0,l.connect)(C,w)(E))},766:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),a=r(0),o=r(284),i=_interopRequireDefault(o),l=(r(106),r(105),r(19)),u=_interopRequireDefault(l),c=function(e){function BaseComponent(e){_classCallCheck(this,BaseComponent);var t=_possibleConstructorReturn(this,(BaseComponent.__proto__||Object.getPrototypeOf(BaseComponent)).call(this,e));return t.bindState.bind(t),t.title=t.title.bind(t),i.default.setHistory(t.props.history),t}return _inherits(BaseComponent,e),n(BaseComponent,[{key:"render",value:function(){return React.createElement("div",null)}},{key:"bindState",value:function(e){var t=this;return function(r){var n={};n[e]=r,t.setState(n)}}},{key:"title",value:function(e){document.title=e}},{key:"validUserStatus",value:function(e,t,r){var n=t||{},a=n.data,o=a||{},i=o.systemTime,l=o.timeStamp,c=this.isVip(e),s=this.isBindDevice(e),f=this.isFreeActivation(e);if("string"==typeof s)return r&&r(s),"正在获取用户信息";if(!1===s)return r&&r("",u.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1;if(!0===s){if(!0===f)return r&&r("",u.default.COMMON.ALERT_TYPE_FREE_ACTIVE),!1;if(!1===f)return function(){return!(!i||!l)&&!(i-l>72e4)}()?!1!==c||(r&&r("",u.default.COMMON.ALERT_TYPE_BE_VIP),!1):(r&&r("",u.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}}},{key:"validUserBindDevice",value:function(e,t){var r=this.isBindDevice(e);return"string"==typeof r?(t&&t(r),r):!1===r?(t&&t("",u.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1):!0===r||void 0}},{key:"validUserDeviceOnline",value:function(e,t){var r=e||{},n=r.data,a=n||{},o=a.systemTime,i=a.timeStamp;if(o&&i){return!!!(o-i>72e4)||(t&&t("",u.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}return t&&t("",u.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1}},{key:"isFreeActivation",value:function(e){var t=e||{},r=t.status,n=t.data;if(void 0!==r){return 1===n.isFreeActivation}return"正在获取用户信息"}},{key:"isBindDevice",value:function(e){var t=e||{},r=t.status,n=t.msg,a=t.data;if(void 0!==r){if(-100===r)return"请使用微信操作";if(1===r){var o=a.isReDevice;a.bindExpireTime;return 1===o}return n||"获取用户信息失败，请稍后重试！"}return"正在获取用户信息"}},{key:"isVip",value:function(e){var t=e||{},r=t.status,n=t.data;if(void 0!==r){var a=n.vipStatus,o=n.expireTime;return 1===a&&(new Date).getTime()<o}return"正在获取用户信息"}}]),BaseComponent}(a.Component);t.default=c},767:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function getShareAudio(e,t){var r=c.default.apiDomain+l.default.API_QUERY_USER_SOUND;return function(n){(0,o.comFetch)(n,e,{url:r,headers:t,action:a.default.AUDIO.API_GET_SHARE_AUDIO},null)}}function getRecommend(e,t,r,n){var i=c.default.apiDomain+l.default.API_QUERY_ALBUM;return function(l){(0,o.comFetch)(l,e,{url:i,headers:t,action:a.default.SONG.API_GET_RECOMMEND},r,n)}}function push(e,t,r,n){var i=c.default.apiDomain+l.default.API_PUSH;return function(l){(0,o.comFetch)(l,e,{url:i,headers:t,action:a.default.SONG.API_PUSH},r,n)}}function pushLocal(e,t,r,n,i){var u=e+l.default.API_PUSH;return function(e){(0,o.comFetch)(e,t,{url:u,type:"get",headers:r,timeout:3e3,action:a.default.SONG.API_PUSH},n,i)}}function getChooseList(e,t,r,n){var i=c.default.apiDomain+l.default.API_CHOOSE_LIST;return function(l){(0,o.comFetch)(l,e,{url:i,headers:t,action:a.default.SONG.API_CHOOSE_LIST},r,n)}}function getHistorySongList(e,t){var r=c.default.apiDomain+l.default.API_CHOOSE_LIST;return function(n){(0,o.comFetch)(n,e,{url:r,headers:t,action:a.default.SONG.API_CHOOSE_HISTORY_LIST},null)}}function setSongTop(e,t,r){var n=c.default.apiDomain+l.default.API_SET_SONG_TOP;return function(i){(0,o.comFetch)(i,e,{url:n,headers:t,action:a.default.SONG.API_SET_SONG_TOP},r)}}function getSingerCategoryAlbum(e,t,r,n){var i=c.default.apiDomain+l.default.API_GET_SINGER_CATEGORY_ALBUM;return function(l){(0,o.comFetch)(l,e,{url:i,headers:t,action:a.default.SONG.API_GET_SINGER_CATEGORY_ALBUM},r,n)}}function getActorsAlbum(e,t,r,n){var i=c.default.apiDomain+l.default.API_GET_ACTORS_ALBUM;return function(l){(0,o.comFetch)(l,e,{url:i,headers:t,action:a.default.SONG.API_GET_ACTORS_ALBUM},r,n)}}function getCatAlbum(e,t,r){var n=c.default.apiDomain+l.default.API_GET_CAT_ALBUM;return function(i){(0,o.comFetch)(i,e,{url:n,headers:t,action:a.default.SONG.API_GET_CAT_ALBUM},r)}}function getCatSongList(e,t,r,n){var i=c.default.apiDomain+l.default.API_GET_CAT_ALBUM;return function(l){(0,o.comFetch)(l,e,{url:i,headers:t,action:a.default.SONG.API_GET_CAT_SONG_LIST},r,n)}}function getRankAlbum(e,t,r,n){var i=c.default.apiDomain+l.default.API_QUERY_ALBUM;return function(l){(0,o.comFetch)(l,e,{url:i,headers:t,action:a.default.SONG.API_GET_RANK_ALBUM},r,n)}}function getAlbumRecommend(e,t,r){var n=c.default.apiDomain+l.default.API_QUERY_ALBUM_RECOMMEND;return function(i){(0,o.comFetch)(i,e,{url:n,headers:t,action:a.default.SONG.API_QUERY_ALBUM_RECOMMEND},r)}}function getAlbumRecommendSongList(e,t,r,n){var i=c.default.apiDomain+l.default.API_QUERY_ALBUM_RECOMMEND;return function(l){(0,o.comFetch)(l,e,{url:i,headers:t,action:a.default.SONG.API_QUERY_ALBUM_RECOMMEND_SONG_LIST},r,n)}}function getRanking(e,t,r){var n=c.default.apiDomain+l.default.API_QUERY_ALBUM;return function(i){(0,o.comFetch)(i,e,{url:n,headers:t,action:a.default.SONG.API_QUERY_RANKING},r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.getShareAudio=getShareAudio,t.getRecommend=getRecommend,t.push=push,t.pushLocal=pushLocal,t.getChooseList=getChooseList,t.getHistorySongList=getHistorySongList,t.setSongTop=setSongTop,t.getSingerCategoryAlbum=getSingerCategoryAlbum,t.getActorsAlbum=getActorsAlbum,t.getCatAlbum=getCatAlbum,t.getCatSongList=getCatSongList,t.getRankAlbum=getRankAlbum,t.getAlbumRecommend=getAlbumRecommend,t.getAlbumRecommendSongList=getAlbumRecommendSongList,t.getRanking=getRanking;var n=r(19),a=_interopRequireDefault(n),o=r(21),i=r(107),l=_interopRequireDefault(i),u=r(72),c=_interopRequireDefault(u)},768:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),o=r(0),i=_interopRequireDefault(o),l=r(169),u=r(283),c=r(1),s=_interopRequireDefault(c),f=r(766),d=_interopRequireDefault(f),p=r(25),m=r(105),h=r(769),_=_interopRequireDefault(h),b=r(770),g=_interopRequireDefault(b),y=r(771),v=_interopRequireDefault(y),A=r(772),O=_interopRequireDefault(A),E=r(773),C=(_interopRequireDefault(E),r(774)),w=_interopRequireDefault(C),R={nav:{height:"1.4rem",position:"fixed",borderTop:"1px solid #efeeef",bottom:-1,zIndex:"5",playController:{position:"relative",paddingLeft:0,paddingRight:0,circle:{position:"absolute",top:"-.93rem",height:"2.4rem",arc:{border:"1px solid #efeeef",position:"absolute",marginLeft:"-.907rem",left:"50%",width:"1.813rem",height:"1.067rem",bottom:"1.1rem",borderRadius:"1.067rem 1.067rem 0 0",backgroundColor:"white"},maskLine:{height:"1.493rem",borderTop:"1px solid white",width:"1.707rem",position:"absolute",bottom:0,left:"50%",marginLeft:"-.853rem",backgroundColor:"white"},maskArc:{height:"1.467rem",width:"100%",position:"absolute",bottom:0,backgroundColor:"white"},icon:{position:"absolute",left:"50%",marginLeft:"-.7rem",width:"1.4rem",bottom:".56rem",backgroundColor:"#ff6d32",borderRadius:"50%"}}},label:{position:"absolute",width:"100%",textAlign:"center",bottom:4,left:0,fontSize:".267rem"}}},P=function(e){function MBottomNavigation(e){_classCallCheck(this,MBottomNavigation);var t=_possibleConstructorReturn(this,(MBottomNavigation.__proto__||Object.getPrototypeOf(MBottomNavigation)).call(this,e));return t.state={selectedIndex:t.props.selectedIndex},t}return _inherits(MBottomNavigation,e),a(MBottomNavigation,[{key:"render",value:function(){var e=this,t=this.state.selectedIndex,r=0===t?g.default:_.default,a=2===t?O.default:v.default,o=["#999","#999","#999"];return o[t]="#ff6832",i.default.createElement(l.BottomNavigation,{selectedIndex:t,style:R.nav},i.default.createElement(l.BottomNavigationItem,{style:{paddingTop:".213rem",paddingBottom:".113rem",maxWidth:"100%"},label:i.default.createElement("div",{style:n({},R.nav.label,{color:o[0],bottom:".107rem"})},"主页"),icon:i.default.createElement("div",{style:{height:".667rem",marginBottom:".4rem",display:"flex",justifyContent:"center",alignItems:"center"}},i.default.createElement("img",{style:{height:".667rem",width:".62rem"},src:r})),onTouchTap:function(){return 0!==t&&e.navSelect(0)}}),i.default.createElement(l.BottomNavigationItem,{style:n({},R.nav.playController,{maxWidth:"100%"}),label:i.default.createElement("div",{style:n({},R.nav.label,{color:o[1],bottom:".107rem"})},"播控"),icon:i.default.createElement("div",{style:R.nav.playController.circle},i.default.createElement("div",{style:R.nav.playController.circle.arc}),i.default.createElement("div",{style:R.nav.playController.circle.maskLine}),i.default.createElement("div",{style:R.nav.playController.circle.maskArc}),i.default.createElement("img",{style:R.nav.playController.circle.icon,src:(this.props.common.commonInfo.stopNavFlash,w.default)})),onTouchTap:function(){return 1!==t&&e.navSelect(1)}}),i.default.createElement(l.BottomNavigationItem,{style:{paddingTop:".213rem",paddingBottom:".113rem",maxWidth:"100%"},label:i.default.createElement("div",{style:n({},R.nav.label,{color:o[2],bottom:".107rem"})},"我的"),icon:i.default.createElement("div",{style:{height:".667rem",marginBottom:".4rem",display:"flex",justifyContent:"center",alignItems:"center"}},i.default.createElement("img",{style:{height:".667rem",width:".667rem"},src:a})),onTouchTap:function(){return 2!==t&&e.navSelect(2)}}))}},{key:"navSelect",value:function(e){switch(this.setState({selectedIndex:e}),e){case 0:(0,u.linkTo)("",!1,null);break;case 1:(0,u.linkTo)("controller/",!1,null);break;case 2:(0,u.linkTo)("user",!1,null)}}}]),MBottomNavigation}(d.default);P.propTypes={selectedIndex:s.default.number},P.defaultProps={selectedIndex:0};var S=function(e,t){return{common:e.app.common}},T=function(e,t){return{}};t.default=(0,p.withRouter)((0,m.connect)(S,T)(P))},769:function(e,t,r){e.exports=r.p+"img/common/nav_index.png?f587230d14e97fe3edc24933ff28f97c"},770:function(e,t,r){e.exports=r.p+"img/common/nav_index_on.png?b4a94c832861bea691015dd45b804220"},771:function(e,t,r){e.exports=r.p+"img/common/nav_me.png?e84268d0fc58e6264bb6518f670f30b7"},772:function(e,t,r){e.exports=r.p+"img/common/nav_me_on.png?abfda0a35e4303b76b1647488e2c0859"},773:function(e,t,r){e.exports=r.p+"img/common/nav_controll_gif.png?b6c8794a706723245e6e70d34944ded5"},774:function(e,t,r){e.exports=r.p+"img/common/nav_controll.png?35546dfe602b00e96b2d7681785459c1"},775:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _objectWithoutProperties(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),o=r(73),i=_interopRequireDefault(o),l=r(0),u=_interopRequireDefault(l),c=r(1),s=_interopRequireDefault(c),f=r(283),d={position:"absolute",top:"66px"},p=function(e){function Input(e){_classCallCheck(this,Input);var t=_possibleConstructorReturn(this,(Input.__proto__||Object.getPrototypeOf(Input)).call(this,e));return t.state={hash:(0,f.getRandomString)(24),value:"",errorText:"",trim:t.props.trim||!1,trimStart:t.props.trimStart||!1},t.handelValidate.bind(t),t}return _inherits(Input,e),a(Input,[{key:"componentDidMount",value:function(){var e=this.props.doValidate;e&&e(this.handelValidate.bind(this),this.state.hash)}},{key:"render",value:function(){var e=this.props,t=(e.onChange,e.errorStyle,e.errorText,e.minLength,e.maxLength,e.bindState,e.validate,e.doValidate,e.trim,e.trimStart,_objectWithoutProperties(e,["onChange","errorStyle","errorText","minLength","maxLength","bindState","validate","doValidate","trim","trimStart"]));return u.default.createElement(i.default,n({ref:"input",errorStyle:d,errorText:this.state.errorText,onChange:this.handelChange.bind(this)},t))}},{key:"handelChange",value:function(e,t){this.state.trim&&(t=t.trim()),this.state.trimStart&&(t=t.replace(/^( )*/g,"")),this.setState({value:t}),this.handelValidate(t);var r=this.props.bindState;r&&r(t)}},{key:"handelValidate",value:function(e){e=e||this.state.value;var t="",r=this.props.validate,n=this.props.minLength,a=this.props.maxLength;if("string"==typeof e&&(n&&e.length<n&&(t="长度不能小于"+n),a&&e.length>a&&(t="长度不能大于"+a)),!t&&"string"==typeof r)switch(r){case"account":/^[a-zA-z]\w{3,15}$/.test(e)||(t=this.props.errorText)}return this.setState({errorText:t}),t}}]),Input}(u.default.Component);t.default=p,p.propTypes={minLength:s.default.number,maxLength:s.default.number,errorStyle:s.default.object,validate:s.default.any,bindState:s.default.func,doValidate:s.default.func}},776:function(e,t,r){var n=r(777);"string"==typeof n&&(n=[[e.i,n,""]]);r(286)(n,{});n.locals&&(e.exports=n.locals)},777:function(e,t,r){t=e.exports=r(285)(),t.push([e.i,".search-header .search-bar-panel{top:0;z-index:6;width:100%;color:#fff;position:fixed;padding:.13rem .107rem;text-align:center;height:1.2rem;background:-webkit-gradient(linear,0 100,283 0,from(#ff6932),to(#ff8332));display:inline-table!important}.search-header .search-bar-panel .key-word-input{margin:0;padding:0;overflow:hidden;width:100%!important;display:flex!important;border-radius:1.2rem;background-color:#fe9e62!important;height:.93rem!important;border:1px solid #fe9e62}.search-header .search-bar-panel .key-word-input div:first-child{display:flex;width:90%;height:100%;justify-content:center;align-items:center;bottom:auto!important}.search-header .search-bar-panel .key-word-input hr{display:none!important}.search-header .search-bar-panel .key-word-input input{height:.9rem!important;padding-left:5%!important;color:#fff!important;font-size:.4rem!important}.search-header .search-bar-panel .key-word-input font{font-size:.4rem}.search-header .search-bar-panel .key-word-input img.search{height:.32rem;margin-right:.107rem}.search-header .search-bar-panel .key-word-input img.voice{display:block;padding:.16rem .267rem .16rem .48rem;width:1.067rem;height:.8rem;position:absolute;right:.32rem;z-index:1}.search-header .search-bar-panel .search-button{width:1.4rem;display:table-cell}.search-header .search-panel{width:100%;height:100%;z-index:4;position:fixed;background-color:#fff}.search-header .search-panel .search-words{height:100%;padding:12px;padding-top:0}.search-header .search-panel .search-words .hot-words{display:flex;flex-wrap:wrap}.search-header .search-panel .search-words .hot-words .word{border-radius:.5rem!important;margin:.107rem 0 0 4px!important}.search-header .search-panel .search-words .hot-words .word span{font-size:.32rem!important;line-height:.4rem!important;padding:.2rem .32rem!important}.search-header .search-panel .search-words .history-words-title{height:.8rem;margin-top:.6rem}.search-header.gray .search-bar-panel{top:1.2rem;background:#d7d7d7}.search-header.gray .search-bar-panel .key-word-input{background-color:#fff!important;border:1px solid #fff!important}.search-header.gray .search-bar-panel .key-word-input div:first-child{color:#999}",""]),t.locals={barBaseHeight:"1.2rem"}},778:function(e,t,r){e.exports=r.p+"img/common/icon_voice.png?fb3acfa27b8a407b649d03a4a0f43840"},779:function(e,t,r){e.exports=r.p+"img/common/icon_search.png?0fb44260fa7b8de5f8c3c4dbf1ab4fa6"},782:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),a=r(0),o=_interopRequireDefault(a);r(776);var i=r(105),l=r(775),u=_interopRequireDefault(l),c=r(766),s=_interopRequireDefault(c),f=r(283),d=r(106),p=r(778),m=_interopRequireDefault(p),h=r(779),_=_interopRequireDefault(h),b=r(783),g=_interopRequireDefault(b),y=r(784),v=_interopRequireDefault(y),A=function(e){function SearchHeaderFake(e){return _classCallCheck(this,SearchHeaderFake),_possibleConstructorReturn(this,(SearchHeaderFake.__proto__||Object.getPrototypeOf(SearchHeaderFake)).call(this,e))}return _inherits(SearchHeaderFake,e),n(SearchHeaderFake,[{key:"render",value:function(){var e=this.props.grayTheme||"",t=_.default,r=m.default;return"gray"===e&&(t=v.default,r=g.default),o.default.createElement("div",{className:"search-header "+e,onTouchTap:function(){(0,f.linkTo)("song/search",!1,null)}},o.default.createElement("span",{className:"search-bar-panel",style:{display:"flex!important"}},o.default.createElement(u.default,{ref:"input",className:"key-word-input",hintText:o.default.createElement("div",null,o.default.createElement("img",{className:"search",src:t}),o.default.createElement("font",null,"请输入你要找的歌曲或歌星"),o.default.createElement("img",{onTouchTap:function(e){e.preventDefault(),e.stopPropagation(),(0,f.linkTo)("voiceSearch",!1,"")},className:"voice",src:r})),hintStyle:{color:"white",textAlign:"center",width:"100%"}})))}}]),SearchHeaderFake}(s.default);t.default=(0,d.withRouter)((0,i.connect)(function(){return{}},function(){return{}})(A))},783:function(e,t,r){e.exports=r.p+"img/common/icon_voice_gray.png?2a3901e992d5705d0be944c98c155048"},784:function(e,t,r){e.exports=r.p+"img/common/icon_search_gray.png?abedcb8e0409cebc1dc4a1314c17b21b"},841:function(e,t,r){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),a=r(0),o=_interopRequireDefault(a),i=r(106),l=r(105),u=r(766),c=_interopRequireDefault(u),s=r(1),f=_interopRequireDefault(s),d=r(169),p=r(283),m=r(291),h=function(e){function GradeList(e){return _classCallCheck(this,GradeList),_possibleConstructorReturn(this,(GradeList.__proto__||Object.getPrototypeOf(GradeList)).call(this,e))}return _inherits(GradeList,e),n(GradeList,[{key:"render",value:function(){var e=this.props.data,t=this.props.labelKey,r=this.props.imgKey,n=this.props.idKey,a=this.props.linHeadKey,i=this.props.title,l=this.props.common,u=l.w,c=l.h,s=3.467*u/10-4,f=.267*u/10,h=2;return u>=568&&c<u&&(h=3,f=.16*u/10,s=2.28*u/10-4),o.default.createElement("div",null,i&&o.default.createElement(d.CardTitle,{title:i}),o.default.createElement(d.GridList,{cellHeight:s,padding:f,style:{margin:"0.133rem"},cols:h},e.map(function(e){return o.default.createElement(d.GridTile,{className:"grade-tile",key:e[n],title:e[t],titleStyle:{display:"flex",marginRight:"16px",justifyContent:"center",alignItems:"center",color:"black",fontSize:".293rem"},titleBackground:"transparent",onClick:function(){e[t]&&(0,p.linkTo)(""+a+e[n]+"/"+e[t]+"/"+(0,m.btoa)(e[r]),!1,null)}},o.default.createElement("div",{style:{height:"83%"},className:"img-not-loaded"},o.default.createElement("img",{src:e[r],style:{width:"100%",display:"table-cell",margin:"auto"}})))})))}}]),GradeList}(c.default);h.propTypes={data:f.default.array,title:f.default.string,labelKey:f.default.string,imgKey:f.default.string,idKey:f.default.string,linHeadKey:f.default.string},h.defaultProps={data:[]},t.default=(0,i.withRouter)((0,l.connect)(function(e){return{common:e.app.common}},function(){return{}})(h))}});