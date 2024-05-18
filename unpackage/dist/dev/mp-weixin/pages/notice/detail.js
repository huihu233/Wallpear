"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_mp_html2 = common_vendor.resolveComponent("mp-html");
  (_easycom_uni_tag2 + _easycom_uni_dateformat2 + _easycom_mp_html2)();
}
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_mp_html = () => "../../uni_modules/mp-html/components/mp-html/mp-html.js";
if (!Math) {
  (_easycom_uni_tag + _easycom_uni_dateformat + _easycom_mp_html)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const data = common_vendor.ref(null);
    let noticeId;
    common_vendor.onLoad((e) => {
      noticeId = e.id;
      getNoticeDetail();
      if (e.name) {
        common_vendor.index.setNavigationBarTitle({
          title: e.name
        });
      }
    });
    const getNoticeDetail = async () => {
      data.value = await api_apis.apiGetNoticeDetail({
        id: noticeId
      });
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: "大虾壁纸",
        path: "/pages/index/index"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: data.value
      }, data.value ? common_vendor.e({
        b: data.value.data.title
      }, data.value.data.title ? {
        c: common_vendor.p({
          inverted: true,
          text: "标签",
          type: "error"
        }),
        d: common_vendor.t(data.value.data.title)
      } : {}, {
        e: common_vendor.p({
          date: data.value.data.publish_date,
          format: "yyyy-MM-dd hh:mm:ss"
        }),
        f: common_vendor.p({
          content: data.value.data.content
        }),
        g: common_vendor.t(data.value.data.view_count)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f737f11"], ["__file", "E:/学习/前端/uniapp/Wallpaper/pages/notice/detail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
