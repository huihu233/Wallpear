<template>
	<view class="noticLayout" v-if="data">
		<view class="title" v-if="data.data.title">
			<view class="tag">
				<uni-tag :inverted="true" text="标签" type="error"></uni-tag>
			</view>
			<view class="font">
				{{ data.data.title }}
			</view>
		</view>
		<view class="info">
			<view class="item">
				咸虾米
			</view>
			<view class="tite">
				<uni-dateformat :date="data.data.publish_date" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>

		<view class="content">
			<mp-html :content="data.data.content" />
		</view>

		<view class="info">
			<view class="item">
				阅读
			</view>
			<view class="tite">
				<text>{{ data.data.view_count }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onShareAppMessage,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref
	} from 'vue'
	import {
		apiGetNoticeDetail
	} from '@/api/apis.js'

	const data = ref(null)

	let noticeId

	onLoad((e) => {
		noticeId = e.id
		getNoticeDetail()
		if (e.name) {
			uni.setNavigationBarTitle({
				title: e.name
			})
		}

	})

	const getNoticeDetail = async () => {
		data.value = await apiGetNoticeDetail({
			id: noticeId
		})
	}




	// 分享给好友
	onShareAppMessage(() => {
		return {
			title: "大虾壁纸",
			path: "/pages/index/index"
		}
	})
</script>

<style lang="scss" scoped>
	.noticLayout {
		padding: 30rpx;

		.title {
			display: flex;
			align-items: center;

			.font {
				font-size: 40rpx;
				font-weight: 700;
				margin-left: 20rpx;
			}
		}

		.content {
			font-size: 30rpx;
			font-weight: 700;
		}

		.info {
			margin: 30rpx 0;
			display: flex;
			font-size: 25rpx;
			color: $text-font-color-3;

			.item {
				margin-right: 20rpx;
			}
		}

	}
</style>