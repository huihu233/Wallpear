"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
function apiGetBanner() {
  return utils_request.request({
    url: "/homeBanner"
    // method: 'post'
  });
}
function apiGetDayRandom() {
  return utils_request.request({
    url: "/randomWall"
  });
}
function apiGetNoticeList(data = {}) {
  return utils_request.request({
    url: "/wallNewsList",
    data
  });
}
function apiGetClassif(data = {}) {
  return utils_request.request({
    url: "/classify",
    data
  });
}
function apiGetClassList(data = {}) {
  return utils_request.request({
    url: "/wallList",
    data
  });
}
function apiSetScore(data = {}) {
  return utils_request.request({
    url: "/setupScore",
    data
  });
}
function apiWriteDownload(data = {}) {
  return utils_request.request({
    url: "/downloadWall",
    data
  });
}
function apiDetailWall(data = {}) {
  return utils_request.request({
    url: "/detailWall",
    data
  });
}
function apiGetUserInfo() {
  return common_vendor.index.request({
    url: ""
  });
}
exports.apiDetailWall = apiDetailWall;
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassList = apiGetClassList;
exports.apiGetClassif = apiGetClassif;
exports.apiGetDayRandom = apiGetDayRandom;
exports.apiGetNoticeList = apiGetNoticeList;
exports.apiGetUserInfo = apiGetUserInfo;
exports.apiSetScore = apiSetScore;
exports.apiWriteDownload = apiWriteDownload;
