"use strict";const e=require("../../common/vendor.js"),t=require("../../api/apis.js");if(!Array){(e.resolveComponent("uni-tag")+e.resolveComponent("uni-dateformat")+e.resolveComponent("mp-html"))()}Math||((()=>"../../uni_modules/uni-tag/components/uni-tag/uni-tag.js")+(()=>"../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js")+(()=>"../../uni_modules/mp-html/components/mp-html/mp-html.js"))();const a={__name:"detail",setup(a){const n=e.ref(null);let o;e.onLoad((t=>{o=t.id,i(),t.name&&e.index.setNavigationBarTitle({title:t.name})}));const i=async()=>{n.value=await t.apiGetNoticeDetail({id:o})};return e.onShareAppMessage((()=>({title:"大虾壁纸",path:"/pages/index/index"}))),(t,a)=>e.e({a:n.value},n.value?e.e({b:n.value.data.title},n.value.data.title?{c:e.p({inverted:!0,text:"标签",type:"error"}),d:e.t(n.value.data.title)}:{},{e:e.p({date:n.value.data.publish_date,format:"yyyy-MM-dd hh:mm:ss"}),f:e.p({content:n.value.data.content}),g:e.t(n.value.data.view_count)}):{})}},n=e._export_sfc(a,[["__scopeId","data-v-f06798f2"]]);a.__runtimeHooks=2,wx.createPage(n);
