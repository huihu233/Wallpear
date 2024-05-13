<template>
	<view class="noticLayout">
		<view class="title">
			<view class="tag">
				<uni-tag :inverted="true" text="标签" type="error"></uni-tag>
			</view>
			<view class="font">
				区域填写标题
			</view>
		</view>
		<view class="info">
			<view class="item">
				咸虾米
			</view>
			<view class="tite">
				<uni-dateformat :date="Date.now()" format="yyyy-MM-dd hh:mm:ss"></uni-dateformat>
			</view>
		</view>

		<view class="content">
			内容区域
		</view>

		<view class="info">
			<view class="item">
				预览
			</view>
			<view class="tite">
				<text>6757</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onShareAppMessage
	} from '@dcloudio/uni-app'

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