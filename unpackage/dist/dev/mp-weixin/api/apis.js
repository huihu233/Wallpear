"use strict";
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
  return utils_request.request({
    url: "/userInfo"
  });
}
function apiGetuserWallList(data = {}) {
  return utils_request.request({
    url: "/userWallList",
    data
  });
}
function apiGetNoticeDetail(data = {}) {
  return utils_request.request({
    url: "/wallNewsDetail",
    data
  });
}
function apiSearchData(data = {}) {
  return utils_request.request({
    url: "/searchWall",
    data
  });
}
exports.apiDetailWall = apiDetailWall;
exports.apiGetBanner = apiGetBanner;
exports.apiGetClassList = apiGetClassList;
exports.apiGetClassif = apiGetClassif;
exports.apiGetDayRandom = apiGetDayRandom;
exports.apiGetNoticeDetail = apiGetNoticeDetail;
exports.apiGetNoticeList = apiGetNoticeList;
exports.apiGetUserInfo = apiGetUserInfo;
exports.apiGetuserWallList = apiGetuserWallList;
exports.apiSearchData = apiSearchData;
exports.apiSetScore = apiSetScore;
exports.apiWriteDownload = apiWriteDownload;
