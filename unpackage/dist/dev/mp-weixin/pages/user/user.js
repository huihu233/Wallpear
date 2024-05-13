"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_custom_nav_bar2 + _easycom_uni_icons2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    let userInfo = common_vendor.ref({});
    common_vendor.onLoad(async () => {
      userInfo.value = await api_apis.apiGetUserInfo();
      console.log(userInfo.value);
    });
    function goClassList() {
      common_vendor.index.navigateTo({
        url: "/pages/classlist/classlist"
      });
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: "大虾壁纸",
        path: "/pages/user/user"
      };
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          navBarTitle: "我的"
        }),
        b: common_vendor.p({
          type: "download-filled",
          size: "20",
          color: "#28b389"
        }),
        c: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        d: common_vendor.o(goClassList),
        e: common_vendor.p({
          type: "star-filled",
          size: "20",
          color: "#28b389"
        }),
        f: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        g: common_vendor.p({
          type: "chatboxes-filled",
          size: "20",
          color: "#28b389"
        }),
        h: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        i: common_vendor.p({
          type: "notification-filled",
          size: "20"
        }),
        j: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        k: common_vendor.p({
          type: "flag-filled",
          size: "20"
        }),
        l: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "E:/学习/前端/uniapp/Wallpaper/pages/user/user.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
