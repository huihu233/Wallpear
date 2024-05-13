"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
const _sfc_main = {
  __name: "classlist",
  setup(__props) {
    const classList = common_vendor.ref([]);
    const noData = common_vendor.ref(false);
    let queryparams = {
      pageNum: 2,
      pageSize: 12
    };
    let pageName;
    common_vendor.onLoad((option) => {
      let {
        id,
        name
      } = option;
      if (!id) {
        utils_common.gotoHome();
      }
      queryparams.classid = id;
      pageName = name;
      common_vendor.index.setNavigationBarTitle({
        title: name
      });
      getClassList();
    });
    common_vendor.onReachBottom(() => {
      if (noData.value)
        return;
      queryparams.pageNum += 1;
      getClassList();
    });
    common_vendor.onUnload(() => {
      common_vendor.index.removeStorageSync("storgClassList");
    });
    async function getClassList() {
      const res = await api_apis.apiGetClassList(queryparams);
      if (res.data.length < queryparams.pageSize) {
        noData.value = true;
      }
      classList.value = [...classList.value, ...res.data];
      common_vendor.index.setStorageSync("storgClassList", classList.value);
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: "大虾壁纸" + pageName,
        path: "/pages/classlist/classlist?id=" + queryparams.classid + "&name=" + pageName
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !classList.value.length && !noData.value
      }, !classList.value.length && !noData.value ? {
        b: common_vendor.p({
          status: "loading"
        })
      } : {
        c: common_vendor.f(classList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: "/pages/preview/preview?id=" + item._id,
            c: item._id
          };
        })
      }, {
        d: classList.value.length || noData.value
      }, classList.value.length || noData.value ? {
        e: common_vendor.p({
          status: noData.value ? "noMore" : "loading"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd381383"], ["__file", "E:/学习/前端/uniapp/Wallpaper/pages/classlist/classlist.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
