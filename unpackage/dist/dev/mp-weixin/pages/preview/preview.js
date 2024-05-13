"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_system = require("../../utils/system.js");
const api_apis = require("../../api/apis.js");
const utils_common = require("../../utils/common.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_dateformat2 + _easycom_uni_rate2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_rate = () => "../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_dateformat + _easycom_uni_rate + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "preview",
  setup(__props) {
    const statusBarHeight = utils_system.getStatusBarHeight();
    const maskState = common_vendor.ref(true);
    const infoPopup = common_vendor.ref(null);
    const scorePopup = common_vendor.ref(null);
    const userScore = common_vendor.ref(0);
    const classList = common_vendor.ref(0);
    const currentId = common_vendor.ref("");
    const currentIndex = common_vendor.ref(0);
    const currentInfo = common_vendor.ref(null);
    const readImgs = common_vendor.ref([0]);
    const isScore = common_vendor.ref(false);
    common_vendor.onLoad(async (e) => {
      currentId.value = e.id;
      if (!e.id) {
        utils_common.gotoHome();
      }
      if (e.type == "share") {
        const res = await api_apis.apiDetailWall({
          id: currentId.value
        });
        classList.value = common_vendor.index.getStorageSync("storgClassList") || res.data;
        classList.value = transfromImg(classList.value);
        currentIndex.value = classList.value.findIndex((item) => item._id == currentId.value);
        currentInfo.value = classList.value[currentIndex.value];
        readImgsFun();
      } else {
        let storgClassList = common_vendor.index.getStorageSync("storgClassList") || [];
        classList.value = transfromImg(storgClassList);
        currentIndex.value = classList.value.findIndex((item) => item._id == currentId.value);
        currentInfo.value = classList.value[currentIndex.value];
        readImgsFun();
      }
    });
    const transfromImg = (arrList) => {
      return arrList.map((item) => {
        return {
          ...item,
          picurl: item.smallPicurl.replace("_small.webp", ".jpg")
        };
      });
    };
    function swiperChange(e) {
      const {
        detail: {
          current
        }
      } = e;
      currentIndex.value = current;
      currentInfo.value = classList.value[currentIndex.value];
      readImgsFun();
    }
    function readImgsFun() {
      readImgs.value.push(
        currentIndex.value - 1 <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
        currentIndex.value,
        currentIndex.value + 1 >= classList.value.length - 1 ? 1 : currentIndex.value + 1
      );
      readImgs.value = [...new Set(readImgs.value)];
    }
    const maskChange = () => {
      maskState.value = !maskState.value;
    };
    const clickInfo = () => {
      infoPopup.value.open("bottom");
    };
    const clickClose = () => {
      infoPopup.value.close();
    };
    const clickScore = () => {
      if (currentInfo.value.userScore) {
        isScore.value = true;
        userScore.value = currentInfo.value.userScore;
      }
      scorePopup.value.open("center");
    };
    const clickScoreClose = () => {
      scorePopup.value.close();
      userScore.value = 0;
      isScore.value = false;
    };
    const submitScore = async () => {
      common_vendor.index.showLoading({
        title: "提交中",
        mask: true
      });
      const classid = currentInfo.value.classid;
      const wallId = currentInfo.value._id;
      const result = await api_apis.apiSetScore({
        classid,
        wallId,
        userScore: userScore.value
      });
      common_vendor.index.hideLoading();
      if (result.errCode === 0) {
        common_vendor.index.showToast({
          title: "添加成功",
          icon: "none"
        });
        classList.value[currentIndex.value].userScore = userScore.value;
        common_vendor.index.setStorageSync("storgClassList", classList.value);
        clickScoreClose();
      }
    };
    async function clickDownload() {
      try {
        common_vendor.index.showLoading({
          title: "下载中...",
          mask: true
        });
        let {
          classid,
          _id: wallId
        } = currentInfo.value;
        const res = await api_apis.apiWriteDownload({
          classid,
          wallId
        });
        common_vendor.index.getImageInfo({
          src: currentInfo.value.picurl,
          success(res2) {
            console.log(res2);
            common_vendor.index.saveImageToPhotosAlbum({
              filePath: res2.path,
              success(res3) {
                console.log(res3);
              },
              fail: (err) => {
                if (err.errMsg = "saveImageToPhotosAlbum:fail cancel") {
                  common_vendor.index.showToast({
                    title: "保存失败,请从新下载",
                    icon: "none"
                  });
                  return;
                }
                common_vendor.index.showModal({
                  title: "授权提示",
                  content: "需要授权保存相册",
                  success: (res3) => {
                    if (res3.confirm) {
                      common_vendor.index.openSetting({
                        success(setting) {
                          if (setting.authSetting["scope.writePhotosAlbum"]) {
                            common_vendor.index.showToast({
                              title: "授权成功",
                              icon: "none"
                            });
                          } else {
                            common_vendor.index.showToast({
                              title: "授权失败",
                              icon: "none"
                            });
                          }
                        }
                      });
                    }
                  }
                });
              },
              complete: () => {
                common_vendor.index.hideLoading();
              }
            });
          }
        });
      } catch (e) {
        console.log(e);
        common_vendor.index.hideLoading();
      }
    }
    const goBack = () => {
      common_vendor.index.navigateBack({
        success: () => {
        },
        fail: (err) => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }
      });
    };
    common_vendor.onShareAppMessage(() => {
      return {
        title: "壁纸详情",
        path: "/pages/preview/preview?id=" + currentId.value + "&type=share"
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentInfo.value
      }, currentInfo.value ? common_vendor.e({
        b: common_vendor.f(classList.value, (item, index, i0) => {
          return common_vendor.e({
            a: readImgs.value.includes(index)
          }, readImgs.value.includes(index) ? {
            b: common_vendor.o(maskChange, item._id),
            c: item.picurl
          } : {}, {
            d: item._id
          });
        }),
        c: currentIndex.value,
        d: common_vendor.o(swiperChange),
        e: maskState.value
      }, maskState.value ? {
        f: common_vendor.p({
          type: "back",
          color: "#fff",
          size: "20"
        }),
        g: common_vendor.unref(statusBarHeight) + "px",
        h: common_vendor.o(goBack),
        i: common_vendor.t(currentIndex.value + 1),
        j: common_vendor.t(classList.value.length),
        k: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "hh:mm"
        }),
        l: common_vendor.p({
          date: /* @__PURE__ */ new Date(),
          format: "MM月dd日"
        }),
        m: common_vendor.p({
          type: "info",
          size: "28"
        }),
        n: common_vendor.o(clickInfo),
        o: common_vendor.p({
          type: "star",
          size: "28"
        }),
        p: common_vendor.t(currentInfo.value.score),
        q: common_vendor.o(clickScore),
        r: common_vendor.p({
          type: "download",
          size: "23"
        }),
        s: common_vendor.o(clickDownload)
      } : {}, {
        t: common_vendor.o(clickClose),
        v: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        w: currentInfo.value
      }, currentInfo.value ? {
        x: common_vendor.t(currentInfo.value._id),
        y: common_vendor.t(currentInfo.value.nickname),
        z: common_vendor.p({
          readonly: true,
          touchable: "false",
          value: currentInfo.value.score
        }),
        A: common_vendor.t(currentInfo.value.score),
        B: common_vendor.t(currentInfo.value.description),
        C: common_vendor.f(currentInfo.value.tabs, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item
          };
        })
      } : {}, {
        D: common_vendor.sr(infoPopup, "2dad6c07-6", {
          "k": "infoPopup"
        }),
        E: common_vendor.p({
          ["background-color"]: "#fff",
          ["border-radius"]: "30px 30px 0 0"
        }),
        F: common_vendor.t(isScore.value ? "评分过了~" : "壁纸评分"),
        G: common_vendor.o(clickScoreClose),
        H: common_vendor.p({
          type: "closeempty",
          size: "18",
          color: "#999"
        }),
        I: common_vendor.o(($event) => userScore.value = $event),
        J: common_vendor.p({
          touchable: "true",
          ["allow-half"]: true,
          ["disabled-color"]: "#ffca3e",
          disabled: isScore.value,
          modelValue: userScore.value
        }),
        K: common_vendor.t(userScore.value ? userScore.value : 0),
        L: common_vendor.o(submitScore),
        M: !userScore.value || isScore.value,
        N: common_vendor.sr(scorePopup, "2dad6c07-9", {
          "k": "scorePopup"
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dad6c07"], ["__file", "E:/学习/前端/uniapp/Wallpaper/pages/preview/preview.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
