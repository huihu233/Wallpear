"use strict";const e=require("../../common/vendor.js"),a=require("../../api/apis.js");if(!Array){(e.resolveComponent("custom-nav-bar")+e.resolveComponent("uni-icons")+e.resolveComponent("uni-load-more"))()}Math||((()=>"../../components/custom-nav-bar/custom-nav-bar.js")+(()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js")+(()=>"../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js"))();const o={__name:"user",setup(o){let n=e.ref({});function t(){e.index.navigateTo({url:"/pages/classlist/classlist?name=我的下载&type=download"})}function i(){e.index.navigateTo({url:"/pages/classlist/classlist?name=我的评分&type=score"})}function s(){e.index.navigateTo({url:"/pages/notice/detail?id=6536358ce0ec19c8d67fbe82&name=常见问题"})}function r(){e.index.navigateTo({url:"/pages/notice/detail?id=653507c6466d417a3718e94b&name=获取最新"})}return e.onLoad((async()=>{n.value=await a.apiGetUserInfo()})),e.onShareAppMessage((()=>({title:"大虾壁纸",path:"/pages/user/user"}))),(a,o)=>e.e({a:e.unref(n).data},e.unref(n).data?{b:e.p({navBarTitle:"我的"}),c:e.t(e.unref(n).data.IP),d:e.t(e.unref(n).data.address.province||e.unref(n).data.address.country),e:e.p({type:"download-filled",size:"20",color:"#28b389"}),f:e.t(e.unref(n).data.downloadSize),g:e.p({type:"right",size:"15",color:"#aaa"}),h:e.o(t),i:e.p({type:"star-filled",size:"20",color:"#28b389"}),j:e.t(e.unref(n).data.scoreSize),k:e.p({type:"right",size:"15",color:"#aaa"}),l:e.o(i),m:e.p({type:"chatboxes-filled",size:"20",color:"#28b389"}),n:e.p({type:"right",size:"15",color:"#aaa"}),o:e.p({type:"notification-filled",size:"20"}),p:e.p({type:"right",size:"15",color:"#aaa"}),q:e.o(r),r:e.p({type:"flag-filled",size:"20"}),s:e.p({type:"right",size:"15",color:"#aaa"}),t:e.o(s)}:{v:e.p({status:"loading"})})}},n=e._export_sfc(o,[["__scopeId","data-v-8922d47d"]]);o.__runtimeHooks=2,wx.createPage(n);
