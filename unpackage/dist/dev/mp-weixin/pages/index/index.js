"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  (_easycom_custom_nav_bar2 + _easycom_uni_icons2 + _easycom_uni_dateformat2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_uni_icons + _easycom_uni_dateformat + CommonTitle + ThemeItem)();
}
const CommonTitle = () => "../../components/common-title/common-title.js";
const ThemeItem = () => "../../components/theme-item/theme-item.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const bannerList = common_vendor.ref([]);
    const randomList = common_vendor.ref([]);
    const noticeList = common_vendor.ref([]);
    const classifyList = common_vendor.ref([]);
    const getBanner = async () => {
      let res = await api_apis.apiGetBanner();
      bannerList.value = res.data;
    };
    const getDayRandom = async () => {
      let res = await api_apis.apiGetDayRandom();
      randomList.value = res.data;
    };
    const getNoticeList = async () => {
      let res = await api_apis.apiGetNoticeList({
        select: true
      });
      noticeList.value = res.data;
    };
    const getClassify = async () => {
      let res = await api_apis.apiGetClassif({
        select: true
      });
      classifyList.value = res.data;
    };
    const goPreview = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/preview/preview?id=" + id + "&type=share"
      });
      common_vendor.index.setStorageSync("storgClassList", randomList.value);
    };
    const goNotice = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/notice/detail?id=" + id
      });
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: "大虾壁纸",
        path: "/pages/index/index"
      };
    });
    common_vendor.onShareTimeline(() => {
      return {
        title: "大虾壁纸"
      };
    });
    getBanner();
    getDayRandom();
    getNoticeList();
    getClassify();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          isShowSearch: true
        }),
        b: common_vendor.f(bannerList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.target == "miniProgram"
          }, item.target == "miniProgram" ? {
            b: item.picurl,
            c: item.url,
            d: item.appid
          } : {
            e: item.picurl,
            f: `/pages/classlist/classlist?${item.url}`
          }, {
            g: item._id
          });
        }),
        c: common_vendor.p({
          type: "sound-filled",
          size: "20"
        }),
        d: common_vendor.f(noticeList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item._id,
            c: common_vendor.o(($event) => goNotice(item._id), item._id)
          };
        }),
        e: common_vendor.p({
          type: "forward",
          size: "20",
          color: "#28b389"
        }),
        f: common_vendor.p({
          type: "calendar",
          size: "18",
          color: "#28b389"
        }),
        g: common_vendor.p({
          date: Date.now(),
          format: "dd日"
        }),
        h: common_vendor.f(randomList.value, (item, k0, i0) => {
          return {
            a: item.smallPicurl,
            b: item._id,
            c: common_vendor.o(($event) => goPreview(item._id), item._id)
          };
        }),
        i: common_vendor.f(classifyList.value, (item, k0, i0) => {
          return {
            a: item._id,
            b: "1cf27b2a-7-" + i0,
            c: common_vendor.p({
              data: item
            })
          };
        }),
        j: common_vendor.p({
          isShow: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/学习/前端/uniapp/Wallpaper/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
