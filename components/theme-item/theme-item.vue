<template>
	<view class="themeItem">
		<navigator :url="'/pages/classlist/classlist?id='+data._id+'&name='+data.name" class="box" v-if="!isShow">
			<image class="pic" :src="data.picurl" mode="aspectFill"></image>
			<view class="mask">
				{{ data.name }}
			</view>
			<view class="top">
				{{ compareTimestamp(data.updateTime) }}前更新
			</view>
		</navigator>

		<navigator url="../../pages/classify/classify" open-type="reLaunch" class="box more" v-else>
			<image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="30" color="#fff"></uni-icons>
				更多
			</view>
		</navigator>
	</view>
</template>

<script setup>
	import {
		compareTimestamp
	} from '@/utils/common.js'
	import {
		defineProps
	} from 'vue'
	const props = defineProps({
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
	})
</script>

<style lang="scss">
	.themeItem {
		.box {
			height: 340rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;

			.pic {
				width: 100%;
				height: 100%;
			}

			.mask {
				position: absolute;
				bottom: 0px;
				left: 0px;
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				color: #fff;
				background: rgba(0, 0, 0, .2);
				backdrop-filter: blur(20rpx);
				font-weight: 600;
			}

			.top {
				position: absolute;
				top: 0px;
				left: 0px;
				color: #fff;
				font-size: 22rpx;
				background-color: rgba(250, 129, 90, .7);
				backdrop-filter: blur(20rpx);
				border-bottom-right-radius: 20rpx;
				transform-origin: left top;
				transform: scale(0.8);
				padding: 6rpx 14rpx;
			}

			.top::before {
				content: "·";
				color: #fff;
			}
		}

		.more {
			.mask {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>