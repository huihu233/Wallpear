<template>
	<view class="layout">
		<view class="navbar">
			<view class="statusBar" :style="{height: statusBarHeight+'px'}">

			</view>
			<view class="titleBar" :style="{height: titleBarHeight + 'px'}">
				<view class="title">
					{{ navBarTitle }}
				</view>
				<view class="search" v-if="isShowSearch" @click="onSearch">
					<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
					<text class="text">搜索</text>
				</view>
			</view>
		</view>
		<view class="fill" :style="{height: navBarHeight + 'px'}">

		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps
	} from 'vue'
	import {
		getStatusBarHeight,
		getTitleBarHeight,
		getNavBarHeight
	} from '@/utils/system.js'

	const props = defineProps({
		navBarTitle: {
			type: String,
			default: "标题"
		},
		isShowSearch: {
			type: Boolean,
			default: false
		}
	})

	let statusBarHeight = getStatusBarHeight()
	let titleBarHeight = getTitleBarHeight()
	let navBarHeight = getNavBarHeight()

	function onSearch() {
		uni.navigateTo({
			url: "/pages/search/search"
		})
	}
</script>

<style lang="scss" scoped>
	.layout {
		.navbar {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10;
			width: 100%;
			background:
				linear-gradient(to bottom, transparent, #fff 400rpx),
				linear-gradient(to right, #beecd8 20%, #F4E2D8);

			.statusBar {}

			.titleBar {
				display: flex;
				align-items: center;
				padding: 0 30rpx;

				.title {
					font-size: 22px;
					font-weight: 700;
					color: $text-font-color-1;
				}

				.search {
					width: 220rpx;
					height: 50rpx;
					border-radius: 60rpx;
					background: rgba(255, 255, 255, .4);
					border: 1px solid #fff;
					margin-left: 30rpx;
					color: #999;
					font-size: 28rpx;
					display: flex;
					align-items: center;

					.icon {
						margin-left: 10rpx;
					}

					.text {
						padding-left: 10rpx;
					}
				}
			}
		}

		.fill {}
	}
</style>