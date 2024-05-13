import {
	request
} from '@/utils/request.js'

// 获取轮播图图片
export function apiGetBanner() {
	return request({
		url: '/homeBanner',
		// method: 'post'
	})
}

// 获取随机图片
export function apiGetDayRandom() {
	return request({
		url: '/randomWall'
	})
}

// 获取公告
export function apiGetNoticeList(data = {}) {
	return request({
		url: '/wallNewsList',
		data
	})
}

// 获取分类列表
export function apiGetClassif(data = {}) {
	return request({
		url: '/classify',
		data
	})
}

// 获取壁纸列表
export function apiGetClassList(data = {}) {
	return request({
		url: '/wallList',
		data
	})
}

// 为壁纸打分
export function apiSetScore(data = {}) {
	return request({
		url: '/setupScore',
		data
	})
}

// 壁纸下载记录
export function apiWriteDownload(data = {}) {
	return request({
		url: '/downloadWall',
		data
	})
}

// 单张壁纸的详情
export function apiDetailWall(data = {}) {
	return request({
		url: '/detailWall',
		data
	})
}

// 用户个人信息
export function apiGetUserInfo() {
	return uni.request({
		url: ""
	})
}