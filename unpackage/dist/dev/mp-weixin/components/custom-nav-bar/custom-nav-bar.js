"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "custom-nav-bar",
  props: {
    navBarTitle: {
      type: String,
      default: "标题"
    },
    isShowSearch: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    let statusBarHeight = utils_system.getStatusBarHeight();
    let titleBarHeight = utils_system.getTitleBarHeight();
    let navBarHeight = utils_system.getNavBarHeight();
    function onSearch() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(statusBarHeight) + "px",
        b: common_vendor.t(__props.navBarTitle),
        c: __props.isShowSearch
      }, __props.isShowSearch ? {
        d: common_vendor.p({
          type: "search",
          color: "#888",
          size: "18"
        }),
        e: common_vendor.o(onSearch)
      } : {}, {
        f: common_vendor.unref(titleBarHeight) + "px",
        g: common_vendor.unref(navBarHeight) + "px"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-412fc155"], ["__file", "E:/学习/前端/uniapp/Wallpaper/components/custom-nav-bar/custom-nav-bar.vue"]]);
wx.createComponent(Component);
