<template>
	<view class="userLayout pageBg">
		<custom-nav-bar navBarTitle="我的"></custom-nav-bar>
		<view class="userInfo">
			<view class="acatar">
				<image src="../../static/images/xxmLogo.png" mode="aspectFill"></image>
			</view>
			<view class="ip">
				192.168.189.100
			</view>
			<view class="address">
				来自于: 山东
			</view>
		</view>

		<view class="section">
			<view class="list">
				<view class="row" @click="goClassList">
					<view class="left">
						<uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">
							我的下载
						</view>
					</view>
					<view class="right">
						<view class="right">
							<view class="text">
								333
							</view>
							<uni-icons type="right" size="15" color="#aaa"></uni-icons>
						</view>
					</view>
				</view>
				<view class="row">
					<view class="left">
						<uni-icons type="star-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">
							我的评分
						</view>
					</view>
					<view class="right">
						<view class="right">
							<view class="text">
								333
							</view>
							<uni-icons type="right" size="15" color="#aaa"></uni-icons>
						</view>
					</view>
				</view>
				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes-filled" size="20" color="#28b389"></uni-icons>
						<view class="text">
							联系客服
						</view>
					</view>
					<view class="right">
						<view class="right">
							<view class="text">
								333
							</view>
							<uni-icons type="right" size="15" color="#aaa"></uni-icons>
						</view>
					</view>
					<!-- #ifdef MP -->
					<button open-type="contact">联系客服</button>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<button @click="clickContact">拨打电话</button>
					<!-- #endif -->

				</view>
			</view>
		</view>
		<view class="section">
			<view class="list">
				<view class="row">
					<view class="left">
						<uni-icons type="notification-filled" size="20"></uni-icons>
						<view class="text">
							订阅更新
						</view>
					</view>
					<view class="right">
						<view class="right">
							<view class="text">
								333
							</view>
							<uni-icons type="right" size="15" color="#aaa"></uni-icons>
						</view>
					</view>
				</view>
				<view class="row">
					<view class="left">
						<uni-icons type="flag-filled" size="20"></uni-icons>
						<view class="text">
							常见问题
						</view>
					</view>
					<view class="right">
						<view class="right">
							<view class="text">
								333
							</view>
							<uni-icons type="right" size="15" color="#aaa"></uni-icons>
						</view>
					</view>
				</view>
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
		onLoad
	} from '@dcloudio/uni-app'
	import {
		apiGetUserInfo
	} from '@/api/apis.js'

	let userInfo = ref({})

	onLoad(async () => {
		userInfo.value = await apiGetUserInfo()

		console.log(userInfo.value);
	})



	function clickContact() {
		uni.makePhoneCall({
			phoneNumber: '13076682658' //仅为示例
		});
	}

	function goClassList() {
		uni.navigateTo({
			url: "/pages/classlist/classlist"
		})
	}

	// 分享给好友
	onShareAppMessage(() => {
		return {
			title: "大虾壁纸",
			path: "/pages/user/user"
		}
	})
</script>

<style lang="scss" scoped>
	.userLayout {
		.userInfo {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 50rpx 0;

			.acatar {
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.ip {
				font-size: 44rpx;
				color: #333;
				padding: 20rpx 0 5rpx;
			}

			.address {
				font-size: 28rpx;
				color: #aaa;
			}
		}

		.section {
			width: 690rpx;
			margin: 50rpx auto;
			border: 1px solid #eee;
			border-radius: 10rpx;
			box-shadow: 0 0 30rpx rgb(0, 0, 0, .05);

			.list {
				.row {
					height: 100rpx;
					box-sizing: border-box;
					padding: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx #eee solid;
					position: relative;

					.left,
					.right {
						display: flex;
						align-items: center;

						:deep() {
							.uni-icons {
								color: $brand-theme-color !important;
							}
						}

						.text {
							margin: 0 20rpx;

						}
					}

					.right {
						.text {
							color: #aaa;
							margin-right: 10rpx;
						}
					}

					button {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100rpx;
						opacity: 0;
					}
				}

				.row:last-child {
					border-bottom: none;
				}
			}
		}
	}
</style>