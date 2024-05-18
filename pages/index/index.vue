<template>
	<view class="homeLayout pageBg">
		<custom-nav-bar :isShowSearch="true"></custom-nav-bar>
		<view class="banner">
			<swiper :indicator-dots="true" indicator-color="rgba(255,255,255,0.5)" :autoplay="true" :interval="3000"
				indicator-active-color="#fff" circular :duration="1000">
				<swiper-item v-for="item in bannerList" :key="item._id">

					<navigator v-if="item.target == 'miniProgram'" :url='item.url' target="miniProgram"
						:app-id="item.appid" class="link">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>
					<navigator v-else :url='`/pages/classlist/classlist?${item.url}`' class="link">
						<image :src="item.picurl" mode="aspectFill"></image>
					</navigator>

				</swiper-item>
			</swiper>
		</view>

		<view class="notice">
			<view class="left">
				<uni-icons type="sound-filled" size="20"></uni-icons>
				<text class="text">公告</text>
			</view>
			<view class="center">
				<swiper :autoplay="true" vertical :interval="3000" circular :duration="500">
					<swiper-item v-for="item in noticeList" :key="item._id" @click="goNotice(item._id)">
						<view class="item-text">{{item.title}}</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="forward" size="20" color="#28b389"></uni-icons>
			</view>
		</view>

		<view class="select">
			<common-title>
				<template v-slot:left>
					每日推荐
				</template>
				<template v-slot:right>
					<view class="date">
						<uni-icons type="calendar" size="18" color="#28b389"></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</view>

					</view>
				</template>
			</common-title>
			<view class="content">
				<scroll-view scroll-x="true">
					<view class="box" v-for="item in randomList" :key="item._id" @click="goPreview(item._id)">
						<image :src="item.smallPicurl" mode="aspectFill"></image>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="theme">
			<common-title>
				<template v-slot:left>
					专题精选
				</template>
				<template v-slot:right>
					<navigator url="/pages/classify/classify" open-type="reLaunch">More+</navigator>
				</template>
			</common-title>

			<view class="content">
				<theme-item v-for="item in classifyList" :key="item._id" :data="item"></theme-item>
				<theme-item :isShow="true"></theme-item>
			</view>
		</view>

	</view>

</template>

<script setup>
	import {
		ref
	} from 'vue'

	import {
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app'


	import CommonTitle from '../../components/common-title/common-title.vue'
	import ThemeItem from '../../components/theme-item/theme-item.vue'
	import {
		apiGetBanner,
		apiGetDayRandom,
		apiGetNoticeList,
		apiGetClassif
	} from '@/api/apis.js'

	const bannerList = ref([])
	const randomList = ref([])
	const noticeList = ref([])
	const classifyList = ref([])

	// 获取轮播图
	const getBanner = async () => {
		let res = await apiGetBanner()
		bannerList.value = res.data
	}

	// 获取随机9张图片
	const getDayRandom = async () => {
		let res = await apiGetDayRandom()
		randomList.value = res.data
	}

	// 获取公告 
	const getNoticeList = async () => {
		let res = await apiGetNoticeList({
			select: true
		})
		noticeList.value = res.data

	}

	// 获取分类列表
	const getClassify = async () => {
		let res = await apiGetClassif({
			select: true
		})
		classifyList.value = res.data

	}

	// 跳转到预览页
	const goPreview = (id) => {
		uni.navigateTo({
			url: "/pages/preview/preview?id=" + id + "&type=share",
		})
		uni.setStorageSync("storgClassList", randomList.value)
	}

	const goNotice = (id) => {
		uni.navigateTo({
			url: "/pages/notice/detail?id=" + id
		})
	}

	// 分享给好友
	onShareAppMessage(() => {
		return {
			title: "大虾壁纸",
			path: "/pages/index/index"
		}
	})

	// 分享到朋友圈
	onShareTimeline(() => {
		return {
			title: "大虾壁纸"
		}
	})

	getBanner()
	getDayRandom()
	getNoticeList()
	getClassify()
</script>

<style lang="scss" scoped>
	.homeLayout {
		.banner {
			width: 750rpx;
			padding: 30rpx 0;

			swiper {
				width: 750rpx;
				height: 340rpx;

				&-item {
					width: 100%;
					height: 100%;
					padding: 0 30rpx;

					.link {
						width: 100%;
						height: 100%;

						image {
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}


				}
			}
		}

		.notice {
			width: 690rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #f9f9f9;
			margin: 0 auto;
			display: flex;
			border-radius: 40rpx;

			.left {
				width: 140rpx;
				display: flex;
				justify-content: center;
				align-items: cneter;

				:deep() {
					.uni-icons {
						color: $brand-theme-color !important;
					}
				}


				.text {
					margin-left: 5rpx;
					color: $text-font-color-1;
					font-weight: 600;
					font-size: 28rpx;
				}
			}

			.center {
				flex: 1;

				swiper {
					height: 100%;

					.item-text {
						height: 100%;
						font-size: 30rpx;
						color: #666;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}

			.right {
				width: 70rpx;
			}
		}

		.select {
			padding-top: 50rpx;

			.date {
				display: flex;
				justify-content: center;
				align-items: center;
				color: $text-font-color-1;

				.text {
					margin-left: 5rpx;
				}
			}

			.content {
				width: 720rpx;
				margin-left: 30rpx;
				margin-top: 30rpx;

				scroll-view {
					width: 720rpx;
					white-space: nowrap;

					.box {
						width: 200rpx;
						height: 430rpx;
						display: inline-block;
						margin-right: 15rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.box:last-child {
						margin-right: 30rpx;
					}
				}
			}
		}

		.theme {
			padding: 50rpx 0;

			navigator {
				font-size: 32rpx;
				color: #888;
			}

			.content {
				margin-top: 30rpx;
				padding: 0 30rpx;
				display: grid;
				gap: 15rpx;
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
</style>