"use strict";
const common_vendor = require("../../common/vendor.js");
const api_apis = require("../../api/apis.js");
if (!Array) {
  const _easycom_custom_nav_bar2 = common_vendor.resolveComponent("custom-nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_custom_nav_bar2 + _easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_custom_nav_bar = () => "../../components/custom-nav-bar/custom-nav-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_custom_nav_bar + _easycom_uni_icons + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "user",
  setup(__props) {
    let userInfo = common_vendor.ref({});
    common_vendor.onLoad(async () => {
      userInfo.value = await api_apis.apiGetUserInfo();
    });
    function goClassList() {
      common_vendor.index.navigateTo({
        url: "/pages/classlist/classlist?name=我的下载&type=download"
      });
    }
    function skipMark() {
      common_vendor.index.navigateTo({
        url: "/pages/classlist/classlist?name=我的评分&type=score"
      });
    }
    function goProblem() {
      common_vendor.index.navigateTo({
        url: "/pages/notice/detail?id=6536358ce0ec19c8d67fbe82&name=常见问题"
      });
    }
    function Renewal() {
      common_vendor.index.navigateTo({
        url: "/pages/notice/detail?id=653507c6466d417a3718e94b&name=获取最新"
      });
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: "大虾壁纸",
        path: "/pages/user/user"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(userInfo).data
      }, common_vendor.unref(userInfo).data ? {
        b: common_vendor.p({
          navBarTitle: "我的"
        }),
        c: common_vendor.t(common_vendor.unref(userInfo).data.IP),
        d: common_vendor.t(common_vendor.unref(userInfo).data.address.province || common_vendor.unref(userInfo).data.address.country),
        e: common_vendor.p({
          type: "download-filled",
          size: "20",
          color: "#28b389"
        }),
        f: common_vendor.t(common_vendor.unref(userInfo).data.downloadSize),
        g: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        h: common_vendor.o(goClassList),
        i: common_vendor.p({
          type: "star-filled",
          size: "20",
          color: "#28b389"
        }),
        j: common_vendor.t(common_vendor.unref(userInfo).data.scoreSize),
        k: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        l: common_vendor.o(skipMark),
        m: common_vendor.p({
          type: "chatboxes-filled",
          size: "20",
          color: "#28b389"
        }),
        n: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        o: common_vendor.p({
          type: "notification-filled",
          size: "20"
        }),
        p: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        q: common_vendor.o(Renewal),
        r: common_vendor.p({
          type: "flag-filled",
          size: "20"
        }),
        s: common_vendor.p({
          type: "right",
          size: "15",
          color: "#aaa"
        }),
        t: common_vendor.o(goProblem)
      } : {
        v: common_vendor.p({
          status: "loading"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "E:/学习/前端/uniapp/Wallpaper/pages/user/user.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
