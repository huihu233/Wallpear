"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "theme-item",
  props: {
    data: {
      type: Object,
      default: {
        enable: true,
        name: "可爱萌宠",
        picurl: "https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/xxmBizhi/20231010/1696900747351_2102.jpg",
        select: true,
        sort: 1,
        updateTime: 1711531708806,
        _id: "6524a48f6523417a8a8b825d"
      }
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !__props.isShow
      }, !__props.isShow ? common_vendor.e({
        b: __props.data.picurl,
        c: common_vendor.t(__props.data.name),
        d: common_vendor.unref(utils_common.compareTimestamp)(__props.data.updateTime)
      }, common_vendor.unref(utils_common.compareTimestamp)(__props.data.updateTime) ? {
        e: common_vendor.t(common_vendor.unref(utils_common.compareTimestamp)(__props.data.updateTime))
      } : {}, {
        f: "/pages/classlist/classlist?id=" + __props.data._id + "&name=" + __props.data.name
      }) : {
        g: common_assets._imports_0,
        h: common_vendor.p({
          type: "more-filled",
          size: "30",
          color: "#fff"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/学习/前端/uniapp/Wallpaper/components/theme-item/theme-item.vue"]]);
wx.createComponent(Component);
