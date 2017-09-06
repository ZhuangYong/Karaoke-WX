webpackJsonp([8],{732:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=function get(e,t,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,t);if(void 0===r){var a=Object.getPrototypeOf(e);return null===a?void 0:get(a,t,n)}if("value"in r)return r.value;var o=r.get;if(void 0!==o)return o.call(n)},i=n(0),l=_interopRequireDefault(i),u=n(101),s=n(102),c=n(748),f=n(747),d=_interopRequireDefault(f),p=n(762),h=_interopRequireDefault(p),m=n(166),g=n(815),_=_interopRequireDefault(g),b=n(50),y=n(277),v=n(296),E=_interopRequireDefault(v),S=n(750),O=_interopRequireDefault(S),A={commonSingerList:{position:"absolute",height:"100%",overflowY:"auto",width:"100%"},loading:{position:"relative",display:"flex",justifyContent:"center",height:30,fontSize:"14px",marginBottom:84,alignItems:"center"},loadingBar:{boxShadow:"none",top:"none",left:"none",transform:"none",marginLeft:-50},hotFilter:{position:"absolute",top:"1.7rem",display:"flex",justifyContent:"center",alignItems:"center",width:"100%",fontSize:".4rem",color:"#ff6832",icon:{width:".5rem",display:"flex",height:".5rem",borderRadius:"50%",marginLeft:".267rem",alignItems:"center",justifyContent:"center",border:"1px solid #ff6832"}}},C=function(e){function SingerList(e){_classCallCheck(this,SingerList);var t=_possibleConstructorReturn(this,(SingerList.__proto__||Object.getPrototypeOf(SingerList)).call(this,e)),n=t.props.match.params||{},r=n.title;return o(SingerList.prototype.__proto__||Object.getPrototypeOf(SingerList.prototype),"title",t).call(t,r),t.state={pageSize:20,pageData:[],loading:!1,currentPage:0,lastPage:!1,keyWord:"",id:0,openHotChoose:!1,anchorEl:null},t.onScroll=t.onScroll.bind(t),t.getHotKey=t.getHotKey.bind(t),t.refreshPage=t.refreshPage.bind(t),t.loadMoreAction=t.loadMoreAction.bind(t),t.handleHotPanel=t.handleHotPanel.bind(t),t}return _inherits(SingerList,e),a(SingerList,[{key:"componentDidUpdate",value:function(e){if(e.songs.getSingerAlbumStamp!==this.props.songs.getSingerAlbumStamp){var t=this.props.songs.getSingerAlbum||{data:{result:[],lastPage:!1}},n=t.data,r=n.result,a=n.lastPage;this.setState({pageData:[].concat(_toConsumableArray(this.state.pageData),_toConsumableArray(r||[])),lastPage:a,loading:!1})}}},{key:"componentDidMount",value:function(){0===this.state.currentPage&&this.loadMoreAction()}},{key:"render",value:function(){var e=this,t=(this.props.songs.getSingerAlbum,this.props.common),n=t.w,r=(t.h,n/375*42),a=this.state.keyWord;return l.default.createElement(m.Paper,{zDepth:0},l.default.createElement(h.default,null),l.default.createElement("div",{className:"common-singer-list",style:A.commonSingerList,onScroll:this.onScroll.bind(this)},l.default.createElement("div",{style:A.hotFilter},a||"热门",l.default.createElement("div",{style:A.hotFilter.icon,onClick:this.handleHotPanel},l.default.createElement(E.default,{color:"#ff6832"})),l.default.createElement(m.Popover,{style:{boxShadow:"rgba(128, 128, 128, 0.51) 1px 1px 20px 3px"},open:this.state.openHotChoose,anchorEl:this.state.anchorEl,anchorOrigin:{horizontal:"middle",vertical:"top"},targetOrigin:{horizontal:"middle",vertical:"bottom"},onRequestClose:function(){e.setState({openHotChoose:!1})}},l.default.createElement("div",{className:"hot-key"},this.getHotKey()))),l.default.createElement(m.List,{className:"single-list",style:{paddingTop:"2.4rem"}},this.state.pageData.map(function(e){return l.default.createElement(m.ListItem,{innerDivStyle:{paddingLeft:"2rem"},className:"single-item",key:e.id,onTouchTap:function(){(0,y.linkTo)("songs/singerId/"+e.id+"/"+e.nameNorm,!1,null)},leftAvatar:l.default.createElement(m.Avatar,{style:{overflow:"hidden"},src:e.image,size:r}),rightIcon:l.default.createElement(_.default,null),primaryText:l.default.createElement("div",{style:{fontSize:".4rem"}},e.nameNorm)})})),l.default.createElement("div",{style:A.loading},this.state.loading?l.default.createElement(m.RefreshIndicator,{size:30,left:70,top:0,loadingColor:"#FF9800",status:"loading",style:A.loadingBar}):"",l.default.createElement("span",null,this.state.lastPage?"亲爱滴，已经到底了":"正在加载"))),l.default.createElement(O.default,{selectedIndex:0}))}},{key:"onScroll",value:function(e){if(!this.state.loading&&e.target.classList&&e.target.classList.contains("common-singer-list")){e.target.scrollHeight-(e.target.scrollTop+e.target.clientHeight)<50&&this.loadMoreAction()}}},{key:"loadMoreAction",value:function(){if(!this.state.loading&&!this.state.lastPage){var e=this.state.currentPage+1,t=this.state,n=t.pageSize,a=t.keyWord,o=t.id,i=r({currentPage:e,pageSize:n,keyword:a,id:o},this.props.match.params);this.props.action_getSingerList(i,(0,y.reqHeader)(i)),this.setState({currentPage:e,loading:!0})}}},{key:"refreshPage",value:function(){this.setState({pageData:[]}),this.state.currentPage=0,this.state.loading=!1,this.state.lastPage=!1,this.loadMoreAction()}},{key:"handleHotPanel",value:function(e){e.preventDefault(),this.setState({openHotChoose:!0,anchorEl:e.currentTarget})}},{key:"getHotKey",value:function(){var e=this,t="ABCDEFGHIJKLMNOPQRSTUVWXYZ",n=this.state.keyWord,r=[];r.push(""===n?l.default.createElement("p",{className:"active",key:"热门"},"热门"):l.default.createElement("p",{onClick:function(){e.chooseKey("")},key:"热门"},"热门"));var a=!0,o=!1,i=void 0;try{for(var u,s=t[Symbol.iterator]();!(a=(u=s.next()).done);a=!0)!function(){var t=u.value;n===t?r.push(l.default.createElement("p",{className:"active",key:t},t)):r.push(l.default.createElement("p",{onClick:function(){e.chooseKey(t)},key:t},t))}()}catch(e){o=!0,i=e}finally{try{!a&&s.return&&s.return()}finally{if(o)throw i}}return r}},{key:"chooseKey",value:function(e){this.setState({openHotChoose:!1,keyWord:e}),this.state.keyWord=e,this.refreshPage()}}]),SingerList}(d.default),P=function(e,t){return{songs:e.app.songs,common:e.app.common}},R=function(e,t){return{action_getSingerList:(0,b.bindActionCreators)(c.getSingerCategoryAlbum,e)}};t.default=(0,s.withRouter)((0,u.connect)(P,R)(C))},747:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),a=n(0),o=n(278),i=_interopRequireDefault(o),l=(n(102),n(101),n(19)),u=_interopRequireDefault(l),s=function(e){function BaseComponent(e){_classCallCheck(this,BaseComponent);var t=_possibleConstructorReturn(this,(BaseComponent.__proto__||Object.getPrototypeOf(BaseComponent)).call(this,e));return t.bindState.bind(t),t.title=t.title.bind(t),i.default.setHistory(t.props.history),t}return _inherits(BaseComponent,e),r(BaseComponent,[{key:"render",value:function(){return React.createElement("div",null)}},{key:"bindState",value:function(e){var t=this;return function(n){var r={};r[e]=n,t.setState(r)}}},{key:"title",value:function(e){document.title=e}},{key:"validUserStatus",value:function(e,t,n){var r=t||{},a=r.data,o=a||{},i=o.systemTime,l=o.timeStamp,s=this.isVip(e),c=this.isBindDevice(e),f=this.isFreeActivation(e);if("string"==typeof c)return n&&n(c),"正在获取用户信息";if(!1===c)return n&&n("",u.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1;if(!0===c){if(!0===f)return n&&n("",u.default.COMMON.ALERT_TYPE_FREE_ACTIVE),!1;if(!1===f)return function(){return!(!i||!l)&&!(i-l>72e4)}()?!1!==s||(n&&n("",u.default.COMMON.ALERT_TYPE_BE_VIP),!1):(n&&n("",u.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}}},{key:"validUserBindDevice",value:function(e,t){var n=this.isBindDevice(e);return"string"==typeof n?(t&&t(n),n):!1===n?(t&&t("",u.default.COMMON.ALERT_TYPE_BIND_DEVICE),!1):!0===n||void 0}},{key:"validUserDeviceOnline",value:function(e,t){var n=e||{},r=n.data,a=r||{},o=a.systemTime,i=a.timeStamp;if(o&&i){return!!!(o-i>72e4)||(t&&t("",u.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1)}return t&&t("",u.default.COMMON.ALERT_TYPE_DEVICE_NOT_ONLINE),!1}},{key:"isFreeActivation",value:function(e){var t=e||{},n=t.status,r=t.data;if(void 0!==n){return 1===r.isFreeActivation}return"正在获取用户信息"}},{key:"isBindDevice",value:function(e){var t=e||{},n=t.status,r=t.msg,a=t.data;if(void 0!==n){if(-100===n)return"请使用微信操作";if(1===n){var o=a.isReDevice;a.bindExpireTime;return 1===o}return r||"获取用户信息失败，请稍后重试！"}return"正在获取用户信息"}},{key:"isVip",value:function(e){var t=e||{},n=t.status,r=t.data;if(void 0!==n){var a=r.vipStatus,o=r.expireTime;return 1===a&&(new Date).getTime()<o}return"正在获取用户信息"}}]),BaseComponent}(a.Component);t.default=s},748:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function getShareAudio(e,t){var n=s.default.apiDomain+l.default.API_QUERY_USER_SOUND;return function(r){(0,o.comFetch)(r,e,{url:n,headers:t,action:a.default.AUDIO.API_GET_SHARE_AUDIO},null)}}function getRecommend(e,t){var n=s.default.apiDomain+l.default.API_QUERY_ALBUM;return function(r){(0,o.comFetch)(r,e,{url:n,headers:t,action:a.default.SONG.API_GET_RECOMMEND},null)}}function push(e,t,n,r){var i=s.default.apiDomain+l.default.API_PUSH;return function(l){(0,o.comFetch)(l,e,{url:i,headers:t,action:a.default.SONG.API_PUSH},n,r)}}function pushLocal(e,t,n,r,i){var u=e+l.default.API_PUSH;return function(e){(0,o.comFetch)(e,t,{url:u,type:"get",headers:n,timeout:3e3,action:a.default.SONG.API_PUSH},r,i)}}function getChooseList(e,t){var n=s.default.apiDomain+l.default.API_CHOOSE_LIST;return function(r){(0,o.comFetch)(r,e,{url:n,headers:t,action:a.default.SONG.API_CHOOSE_LIST},null)}}function getHistorySongList(e,t){var n=s.default.apiDomain+l.default.API_CHOOSE_LIST;return function(r){(0,o.comFetch)(r,e,{url:n,headers:t,action:a.default.SONG.API_CHOOSE_HISTORY_LIST},null)}}function setSongTop(e,t,n){var r=s.default.apiDomain+l.default.API_SET_SONG_TOP;return function(i){(0,o.comFetch)(i,e,{url:r,headers:t,action:a.default.SONG.API_SET_SONG_TOP},n)}}function getSingerCategoryAlbum(e,t,n){var r=s.default.apiDomain+l.default.API_GET_SINGER_CATEGORY_ALBUM;return function(i){(0,o.comFetch)(i,e,{url:r,headers:t,action:a.default.SONG.API_GET_SINGER_CATEGORY_ALBUM},n)}}function getActorsAlbum(e,t,n){var r=s.default.apiDomain+l.default.API_GET_ACTORS_ALBUM;return function(i){(0,o.comFetch)(i,e,{url:r,headers:t,action:a.default.SONG.API_GET_ACTORS_ALBUM},n)}}function getCatAlbum(e,t,n){var r=s.default.apiDomain+l.default.API_GET_CAT_ALBUM;return function(i){(0,o.comFetch)(i,e,{url:r,headers:t,action:a.default.SONG.API_GET_CAT_ALBUM},n)}}function getCatSongList(e,t,n){var r=s.default.apiDomain+l.default.API_GET_CAT_ALBUM;return function(i){(0,o.comFetch)(i,e,{url:r,headers:t,action:a.default.SONG.API_GET_CAT_SONG_LIST},n)}}function getRankAlbum(e,t,n){var r=s.default.apiDomain+l.default.API_QUERY_ALBUM;return function(i){(0,o.comFetch)(i,e,{url:r,headers:t,action:a.default.SONG.API_GET_RANK_ALBUM},n)}}function getAlbumRecommend(e,t,n){var r=s.default.apiDomain+l.default.API_QUERY_ALBUM_RECOMMEND;return function(i){(0,o.comFetch)(i,e,{url:r,headers:t,action:a.default.SONG.API_QUERY_ALBUM_RECOMMEND},n)}}function getAlbumRecommendSongList(e,t,n){var r=s.default.apiDomain+l.default.API_QUERY_ALBUM_RECOMMEND;return function(i){(0,o.comFetch)(i,e,{url:r,headers:t,action:a.default.SONG.API_QUERY_ALBUM_RECOMMEND_SONG_LIST},n)}}function getRanking(e,t,n){var r=s.default.apiDomain+l.default.API_QUERY_ALBUM;return function(i){(0,o.comFetch)(i,e,{url:r,headers:t,action:a.default.SONG.API_QUERY_RANKING},n)}}Object.defineProperty(t,"__esModule",{value:!0}),t.getShareAudio=getShareAudio,t.getRecommend=getRecommend,t.push=push,t.pushLocal=pushLocal,t.getChooseList=getChooseList,t.getHistorySongList=getHistorySongList,t.setSongTop=setSongTop,t.getSingerCategoryAlbum=getSingerCategoryAlbum,t.getActorsAlbum=getActorsAlbum,t.getCatAlbum=getCatAlbum,t.getCatSongList=getCatSongList,t.getRankAlbum=getRankAlbum,t.getAlbumRecommend=getAlbumRecommend,t.getAlbumRecommendSongList=getAlbumRecommendSongList,t.getRanking=getRanking;var r=n(19),a=_interopRequireDefault(r),o=n(23),i=n(103),l=_interopRequireDefault(i),u=n(70),s=_interopRequireDefault(u)},749:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _objectWithoutProperties(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=n(71),i=_interopRequireDefault(o),l=n(0),u=_interopRequireDefault(l),s=n(1),c=_interopRequireDefault(s),f=n(277),d={position:"absolute",top:"66px"},p=function(e){function Input(e){_classCallCheck(this,Input);var t=_possibleConstructorReturn(this,(Input.__proto__||Object.getPrototypeOf(Input)).call(this,e));return t.state={hash:(0,f.getRandomString)(24),value:"",errorText:""},t.handelValidate.bind(t),t}return _inherits(Input,e),a(Input,[{key:"componentDidMount",value:function(){var e=this.props.doValidate;e&&e(this.handelValidate.bind(this),this.state.hash)}},{key:"render",value:function(){var e=this.props,t=(e.onChange,e.errorStyle,e.errorText,e.minLength,e.maxLength,e.bindState,e.validate,e.doValidate,_objectWithoutProperties(e,["onChange","errorStyle","errorText","minLength","maxLength","bindState","validate","doValidate"]));return u.default.createElement(i.default,r({ref:"input",errorStyle:d,errorText:this.state.errorText,onChange:this.handelChange.bind(this)},t))}},{key:"handelChange",value:function(e,t){this.setState({value:t}),this.handelValidate(t);var n=this.props.bindState;n&&n(t)}},{key:"handelValidate",value:function(e){e=e||this.state.value;var t="",n=this.props.validate,r=this.props.minLength,a=this.props.maxLength;if("string"==typeof e&&(r&&e.length<r&&(t="长度不能小于"+r),a&&e.length>a&&(t="长度不能大于"+a)),!t&&"string"==typeof n)switch(n){case"account":/^[a-zA-z]\w{3,15}$/.test(e)||(t=this.props.errorText)}return this.setState({errorText:t}),t}}]),Input}(u.default.Component);t.default=p,p.propTypes={minLength:c.default.number,maxLength:c.default.number,errorStyle:c.default.object,validate:c.default.any,bindState:c.default.func,doValidate:c.default.func}},750:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=n(0),i=_interopRequireDefault(o),l=n(166),u=n(277),s=n(1),c=_interopRequireDefault(s),f=n(747),d=_interopRequireDefault(f),p=n(24),h=n(101),m=n(751),g=_interopRequireDefault(m),_=n(752),b=_interopRequireDefault(_),y=n(753),v=_interopRequireDefault(y),E=n(754),S=_interopRequireDefault(E),O=n(755),A=_interopRequireDefault(O),C={nav:{height:60,position:"fixed",borderTop:"1px solid #efeeef",bottom:"0",zIndex:"2",playController:{position:"relative",paddingLeft:0,paddingRight:0,circle:{position:"absolute",top:-55,height:110,arc:{border:"1px solid #efeeef",position:"absolute",marginLeft:-34,left:"50%",width:68,height:40,bottom:40,borderRadius:"40px 40px 0 0",backgroundColor:"white"},maskLine:{height:56,borderTop:"1px solid white",width:64,position:"absolute",bottom:0,left:"50%",marginLeft:-32,backgroundColor:"white"},maskArc:{height:55,width:"100%",position:"absolute",bottom:0,backgroundColor:"white"},icon:{position:"absolute",left:"50%",marginLeft:-28,width:56,bottom:18}}},label:{position:"absolute",width:"100%",textAlign:"center",bottom:4,left:0}}},P=function(e){function MBottomNavigation(e){_classCallCheck(this,MBottomNavigation);var t=_possibleConstructorReturn(this,(MBottomNavigation.__proto__||Object.getPrototypeOf(MBottomNavigation)).call(this,e));return t.state={selectedIndex:t.props.selectedIndex},t}return _inherits(MBottomNavigation,e),a(MBottomNavigation,[{key:"render",value:function(){var e=this,t=0===this.state.selectedIndex?b.default:g.default,n=2===this.state.selectedIndex?S.default:v.default,a=["#999","#999","#999"];return a[this.state.selectedIndex]="#ff6832",i.default.createElement(l.BottomNavigation,{selectedIndex:this.state.selectedIndex,style:C.nav},i.default.createElement(l.BottomNavigationItem,{label:i.default.createElement("div",{style:r({},C.nav.label,{color:a[0]})},"主页"),icon:i.default.createElement("div",{style:{height:30,marginBottom:12}},i.default.createElement("img",{style:{height:"100%"},src:t})),onTouchTap:function(){return e.navSelect(0)}}),i.default.createElement(l.BottomNavigationItem,{style:C.nav.playController,label:i.default.createElement("div",{style:r({},C.nav.label,{color:a[1]})},"播控"),icon:i.default.createElement("div",{style:C.nav.playController.circle},i.default.createElement("div",{style:C.nav.playController.circle.arc}),i.default.createElement("div",{style:C.nav.playController.circle.maskLine}),i.default.createElement("div",{style:C.nav.playController.circle.maskArc}),i.default.createElement("img",{style:C.nav.playController.circle.icon,src:A.default})),onTouchTap:function(){return e.navSelect(1)}}),i.default.createElement(l.BottomNavigationItem,{label:i.default.createElement("div",{style:r({},C.nav.label,{color:a[2]})},"我的"),icon:i.default.createElement("div",{style:{height:30,marginBottom:12}},i.default.createElement("img",{style:{height:"100%"},src:n})),onTouchTap:function(){return e.navSelect(2)}}))}},{key:"navSelect",value:function(e){switch(this.setState({selectedIndex:e}),e){case 0:(0,u.linkTo)("home",!1,null);break;case 1:(0,u.linkTo)("controller/",!1,null);break;case 2:(0,u.linkTo)("user",!1,null)}}}]),MBottomNavigation}(d.default);P.propTypes={selectedIndex:c.default.number},P.defaultProps={selectedIndex:0};var R=function(e,t){return{}},w=function(e,t){return{}};t.default=(0,p.withRouter)((0,h.connect)(R,w)(P))},751:function(e,t,n){e.exports=n.p+"img/common/nav_index.png?f587230d14e97fe3edc24933ff28f97c"},752:function(e,t,n){e.exports=n.p+"img/common/nav_index_on.png?b4a94c832861bea691015dd45b804220"},753:function(e,t,n){e.exports=n.p+"img/common/nav_me.png?e84268d0fc58e6264bb6518f670f30b7"},754:function(e,t,n){e.exports=n.p+"img/common/nav_me_on.png?abfda0a35e4303b76b1647488e2c0859"},755:function(e,t,n){e.exports=n.p+"img/common/nav_controll.png?35546dfe602b00e96b2d7681785459c1"},757:function(e,t,n){var r=n(758);"string"==typeof r&&(r=[[e.i,r,""]]);n(280)(r,{});r.locals&&(e.exports=r.locals)},758:function(e,t,n){t=e.exports=n(279)(),t.push([e.i,".search-header .search-bar-panel{top:0;z-index:6;width:100%;color:#fff;position:fixed;padding:.13rem .107rem;text-align:center;height:1.2rem;background:-webkit-gradient(linear,0 100,283 0,from(#ff6932),to(#ff8332));display:inline-table!important}.search-header .search-bar-panel .key-word-input{margin:0;padding:0;overflow:hidden;width:100%!important;display:flex!important;border-radius:1.2rem;background-color:#fe9e62!important;height:.93rem!important;border:1px solid #fe9e62}.search-header .search-bar-panel .key-word-input div:first-child{display:flex;width:90%;height:100%;justify-content:center;align-items:center;bottom:auto!important}.search-header .search-bar-panel .key-word-input hr{display:none!important}.search-header .search-bar-panel .key-word-input input{height:.9rem!important;padding-left:5%!important;color:#fff!important}.search-header .search-bar-panel .key-word-input font{font-size:.4rem}.search-header .search-bar-panel .key-word-input img.search{height:12px;margin-right:4px}.search-header .search-bar-panel .key-word-input img.voice{display:block;padding:6px 10px 6px 18px;width:40px;height:30px;position:absolute;right:12px;z-index:1}.search-header .search-bar-panel .search-button{width:14%;display:table-cell}.search-header .search-panel{width:100%;height:100%;z-index:2;position:fixed;background-color:#fff}.search-header .search-panel .search-words{height:100%;padding:12px;padding-top:0}.search-header .search-panel .search-words .hot-words{display:flex;flex-wrap:wrap}.search-header .search-panel .search-words .hot-words .word{margin:4px 0 0 4px!important}.search-header .search-panel .search-words .history-words-title{height:.8rem;margin-top:.6rem}",""]),t.locals={barBaseHeight:"1.2rem"}},759:function(e,t,n){e.exports=n.p+"img/common/icon_voice.png?fb3acfa27b8a407b649d03a4a0f43840"},760:function(e,t,n){e.exports=n.p+"img/common/icon_search.png?0fb44260fa7b8de5f8c3c4dbf1ab4fa6"},762:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),a=n(0),o=_interopRequireDefault(a);n(757);var i=n(101),l=n(749),u=_interopRequireDefault(l),s=n(747),c=_interopRequireDefault(s),f=n(277),d=n(102),p=n(759),h=_interopRequireDefault(p),m=n(760),g=_interopRequireDefault(m),_=function(e){function SearchHeaderFake(e){return _classCallCheck(this,SearchHeaderFake),_possibleConstructorReturn(this,(SearchHeaderFake.__proto__||Object.getPrototypeOf(SearchHeaderFake)).call(this,e))}return _inherits(SearchHeaderFake,e),r(SearchHeaderFake,[{key:"render",value:function(){return o.default.createElement("div",{className:"search-header"},o.default.createElement("span",{className:"search-bar-panel",style:{display:"flex!important"}},o.default.createElement(u.default,{ref:"input",className:"key-word-input",hintText:o.default.createElement("div",null,o.default.createElement("img",{className:"search",src:g.default}),o.default.createElement("font",null,"请输入你要找的歌曲或歌星"),o.default.createElement("img",{onClick:function(){(0,f.linkTo)("voiceSearch",!1,"")},className:"voice",src:h.default})),hintStyle:{color:"white",textAlign:"center",width:"100%"},onTouchTap:function(){(0,f.linkTo)("song/search",!1,null)}})))}}]),SearchHeaderFake}(c.default);t.default=(0,d.withRouter)((0,i.connect)(function(){return{}},function(){return{}})(_))},815:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=_interopRequireDefault(r),o=n(22),i=_interopRequireDefault(o),l=n(20),u=_interopRequireDefault(l),s=function(e){return a.default.createElement(u.default,e,a.default.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}))};s=(0,i.default)(s),s.displayName="HardwareKeyboardArrowRight",s.muiName="SvgIcon",t.default=s}});