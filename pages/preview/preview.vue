<template>
	<view class="preview" v-if="currentInfo">
		<swiper :circular="true" :current="currentIndex" @change="swiperChange">
			<swiper-item v-for="(item, index) in classList" :key="item._id">
				<image v-if="readImgs.includes(index)" @click="maskChange" :src="item.picurl" mode="aspectFill"></image>
			</swiper-item>
		</swiper>

		<view class="mask" v-if="maskState">
			<view class="goBack" :style="{top: statusBarHeight + 'px'}" @click="goBack">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<view class="count">
				{{ currentIndex + 1 }} / {{ classList.length }}
			</view>
			<view class="time">
				<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">
						信息
					</view>
				</view>
				<view class="box" @click="clickScore">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">
						{{ currentInfo.score }}分
					</view>
				</view>
				<view class="box" @click="clickDownload">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">
						下载
					</view>
				</view>
			</view>
		</view>

		<!-- 详细弹出层 -->
		<uni-popup ref="infoPopup" background-color="#fff" border-radius="30px 30px 0 0">
			<view class="infoPopup">
				<view class="popHeader">
					<view></view>
					<view class="title">
						壁纸信息
					</view>
					<view class="close">
						<uni-icons type="closeempty" size="18" color="#999" @click="clickClose"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y="true" v-if="currentInfo">
					<view class="content">
						<view class="row">
							<view class="label">
								壁纸ID:
							</view>
							<view class="value">
								<text selectable>{{ currentInfo._id }}</text>
							</view>
						</view>
						<!-- <view class="row">
							<view class="label">
								分类:
							</view>
							<view class="value class">
								<text selectable>明星美女</text>
							</view>
						</view> -->
						<view class="row">
							<view class="label">
								发布者:
							</view>
							<view class="value">
								<text selectable>{{ currentInfo.nickname }}</text>
							</view>
						</view>
						<view class="row">
							<view class="label">
								评分:
							</view>
							<view class="value roteBox">
								<uni-rate readonly touchable="false" :value="currentInfo.score" />
								<text class="score">{{ currentInfo.score }}分</text>
							</view>
						</view>
						<view class="row">
							<view class="label">
								摘要:
							</view>
							<view class="value">
								<text selectable>{{ currentInfo.description }}</text>
							</view>
						</view>
						<view class="row">
							<view class="label">
								标签:
							</view>
							<view class="value tabs">
								<view class="tab" v-for="item in currentInfo.tabs" :key="item">
									{{ item }}
								</view>
							</view>
						</view>

						<view class="copyright">
							声明:本图片来用户投稿，非商业使用，用于免费学习交流，如侵犯了您的权益，您可以拷贝壁纸ID举报至平台，邮箱513894357@qq.com，管理将删除侵权壁纸维护您的权益。
						</view>

					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<!-- 打分弹出层 -->
		<uni-popup ref="scorePopup">
			<view class="scorePopup">
				<view class="popHeader">
					<view></view>
					<view class="title">
						{{isScore ? '评分过了~' : '壁纸评分'}}
					</view>
					<view class="close">
						<uni-icons type="closeempty" size="18" color="#999" @click="clickScoreClose"></uni-icons>
					</view>
				</view>

				<view class="content">
					<uni-rate touchable="true" :allow-half="true" v-model="userScore" disabled-color="#ffca3e"
						:disabled="isScore" />
					<text class="text">{{userScore ? userScore : 0}}分</text>
				</view>
				<view class="footer">
					<button @click="submitScore" :disabled=" !userScore || isScore" type="default" size="mini"
						plain>确认评分</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad,
		onShareAppMessage
	} from '@dcloudio/uni-app'
	import {
		getStatusBarHeight
	} from '@/utils/system.js'
	import {
		apiSetScore,
		apiWriteDownload,
		apiDetailWall
	} from '@/api/apis.js'
	import {
		gotoHome
	} from '../../utils/common';

	const statusBarHeight = getStatusBarHeight()

	// 预览遮罩
	const maskState = ref(true)
	// 详细弹出层 ref
	const infoPopup = ref(null)
	// 打分弹出层 ref
	const scorePopup = ref(null)
	// 评分
	const userScore = ref(0)
	// 列表数据
	const classList = ref(0)
	// 当前壁纸id
	const currentId = ref('')
	// 当前壁纸在列表中的下标
	const currentIndex = ref(0)
	// 当前壁纸的详细信息
	const currentInfo = ref(null)
	// 看过的壁纸
	const readImgs = ref([0])
	// 是否打过分
	const isScore = ref(false)

	onLoad(async (e) => {
		currentId.value = e.id
		if (!e.id) {
			gotoHome()
		}
		if (e.type == "share") {
			const res = await apiDetailWall({
				id: currentId.value
			})

			classList.value = uni.getStorageSync('storgClassList') || res.data
			classList.value = transfromImg(classList.value)
			currentIndex.value = classList.value.findIndex(item => item._id == currentId.value)
			// 获取当前壁纸的详细信息
			currentInfo.value = classList.value[currentIndex.value]
			// 提前缓存要预览的图片
			readImgsFun()
		} else {
			// 页面详细数据处理前
			let storgClassList = uni.getStorageSync('storgClassList') || []
			// 将小图转成大图
			classList.value = transfromImg(storgClassList)

			currentIndex.value = classList.value.findIndex(item => item._id == currentId.value)
			// 获取当前壁纸的详细信息
			currentInfo.value = classList.value[currentIndex.value]
			// 提前缓存要预览的图片
			readImgsFun()
		}
	})


	// 处理数据将小图转换成大图
	const transfromImg = (arrList) => {
		return arrList.map(item => {
			return {
				...item,
				picurl: item.smallPicurl.replace("_small.webp", ".jpg")
			}
		})
	}

	// 轮播图切换
	function swiperChange(e) {
		const {
			detail: {
				current
			}
		} = e
		// 需改当前下标
		currentIndex.value = current
		// 获取当前壁纸的详细信息
		currentInfo.value = classList.value[currentIndex.value]
		// 提前缓存要预览的图片
		readImgsFun()
	}

	/**
	 * 将要提前预览的壁纸的下标话缓存起来
	 */
	function readImgsFun() {
		readImgs.value.push(
			(currentIndex.value - 1) <= 0 ? classList.value.length - 1 : currentIndex.value - 1,
			currentIndex.value,
			(currentIndex.value + 1) >= classList.value.length - 1 ? 1 : currentIndex.value + 1
		)
		// 数组去重
		readImgs.value = [...new Set(readImgs.value)]
	}


	// 遮罩状态
	const maskChange = () => {
		maskState.value = !maskState.value
	}

	// 点击打开弹出层
	const clickInfo = () => {
		infoPopup.value.open('bottom')
	}

	// 点击关闭弹出层
	const clickClose = () => {
		infoPopup.value.close()
	}

	// 点击打分弹窗
	const clickScore = () => {
		if (currentInfo.value.userScore) {
			isScore.value = true
			userScore.value = currentInfo.value.userScore
		}
		scorePopup.value.open('center')
	}
	// 点击关闭打分弹窗
	const clickScoreClose = () => {
		scorePopup.value.close()
		userScore.value = 0
		isScore.value = false
	}

	// 提交分数
	const submitScore = async () => {
		// 加载 loding
		uni.showLoading({
			title: "提交中",
			mask: true
		})
		// 分类id
		const classid = currentInfo.value.classid
		// 当前壁纸id
		const wallId = currentInfo.value._id
		const result = await apiSetScore({
			classid,
			wallId,
			userScore: userScore.value
		})
		// 取消加载框
		uni.hideLoading()
		// 提示信息
		if (result.errCode === 0) {

			// 消息提示框
			uni.showToast({
				title: "添加成功",
				icon: "none"
			})

			classList.value[currentIndex.value].userScore = userScore.value
			uni.setStorageSync('storgClassList', classList.value)

			// 关闭打分框
			clickScoreClose()
		}
	}

	// 下载图片
	async function clickDownload() {
		// #ifdef H5
		uni.showModal({
			content: "请长按保存壁纸",
			showCancel: false
		})
		// #endif

		// #ifndef H5
		try {
			uni.showLoading({
				title: "下载中...",
				mask: true
			})

			let {
				classid,
				_id: wallId
			} = currentInfo.value

			// 记录下载的图片
			const res = await apiWriteDownload({
				classid,
				wallId
			})
			// if (res.erroCode != 0) throw res;

			uni.getImageInfo({
				src: currentInfo.value.picurl,
				success(res) {
					console.log(res);
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success(res) {
							console.log(res)
						},
						fail: err => {
							if (err.errMsg = "saveImageToPhotosAlbum:fail cancel") {
								uni.showToast({
									title: "保存失败,请从新下载",
									icon: "none"
								})
								return;
							}
							uni.showModal({
								title: "授权提示",
								content: "需要授权保存相册",
								success: res => {
									if (res.confirm) {
										uni.openSetting({
											success(setting) {
												if (setting.authSetting[
														'scope.writePhotosAlbum'
													]) {
													uni.showToast({
														title: "授权成功",
														icon: "none"
													})
												} else {
													uni.showToast({
														title: "授权失败",
														icon: "none"
													})
												}
											}
										})
									}
								}
							})
						},
						complete: () => {
							uni.hideLoading()
						}
					})
				}
			})

		} catch (e) {
			console.log(e)
			uni.hideLoading()
		}

		// #endif
	}

	// 返回上级
	const goBack = () => {
		uni.navigateBack({
			success: () => {

			},
			fail: (err) => {
				uni.reLaunch({
					url: "/pages/index/index"
				})
			}
		})
	}

	// 分享给好友
	onShareAppMessage(() => {
		return {
			title: "壁纸详情",
			path: "/pages/preview/preview?id=" + currentId.value + "&type=share"
		}
	})
</script>

<style lang="scss" scoped>
	.preview {
		width: 100%;
		height: 100vh;
		position: relative;

		swiper {
			width: 100%;
			height: 100%;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.mask {
			&>view {
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				color: #fff;
			}

			.goBack {
				position: absolute;
				width: 38px;
				height: 38px;
				background: rgba(0, 0, 0, .5);
				top: 0;
				left: 30px;
				margin-left: 0rpx;
				border-radius: 100px;
				backdrop-filter: blur(10rpx);
				border: 1rpx solid rgba(255, 255, 255, .3);
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.count {
				top: 10vh;
				width: fit-content;
				background: rgba(0, 0, 0, .3);
				font-size: 28rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(10rpx);
			}

			.time {
				width: fit-content;
				font-size: 140rpx;
				top: calc(10vh + 80rpx);
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4rpx rgba(0, 0, 0, .3);
			}

			.date {
				font-size: 34rpx;
				top: calc(10vh + 230rpx);
				text-shadow: 0 2rpx rgba(0, 0, 0, .3);
			}

			.footer {
				background: rgba(255, 255, 255, .8);
				bottom: 10vh;
				width: 65vw;
				height: 120rpx;
				border-radius: 120rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				box-shadow: 0 2rpx 0 rgba(0, 0, 0, .2);
				backdrop-filter: blur(20rpx);

				&>view {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 2rpx 12rpx;

					.text {
						font-size: 26rpx;
						color: $text-font-color-2;
					}
				}
			}
		}

		.popHeader {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				color: $text-font-color-2;
				font-size: 26rpx;
			}

			.close {
				padding: 6rpx;
			}
		}

		.infoPopup {

			background-color: #fff;
			padding: 30rpx;
			border-radius: 30rpx 30rpx 0 0;
			overflow: hidden;

			scroll-view {
				max-height: 60vh;

				.content {
					.row {
						display: flex;
						align-items: center;
						padding: 16rpx 0;
						font-size: 32rpx;
						line-height: 1.7em;

						.label {
							color: $text-font-color-3;
							width: 140rpx;
							text-align: right;
							font-size: 30rpx;
							margin-right: 20rpx;
						}

						.value {
							flex: 1;
							width: 0;
						}

						.roteBox {
							display: flex;
							align-items: center;

							.score {
								margin-left: 20rpx;
								color: $text-font-color-2;

							}
						}

						.tabs {
							display: flex;
							flex-wrap: wrap;

							.tab {
								box-sizing: border-box;
								border: 1px solid $brand-theme-color;
								color: $brand-theme-color;
								font-size: 22rpx;
								padding: 0 30rpx;
								border-radius: 40rpx;
								line-height: 40rpx;
								margin: 0 10rpx 10rpx 0;

							}
						}

						.class {
							color: $brand-theme-color;
						}
					}

					.copyright {
						padding: 20rpx;
						font-size: 28rpx;
						background: #f6f6f6;
						color: #666;
						border-radius: 10rpx;
						margin: 20rpx 0;
						line-height: 1.6em;
					}

				}

			}
		}

		.scorePopup {
			background: #fff;
			padding: 30rpx;
			width: 70vw;
			border-radius: 30rpx;

			.content {
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 30rpx 0;

				.text {
					color: #ffca3e;
					margin-left: 30rpx;
				}
			}

			.footer {
				display: flex;
				justify-content: center;

			}
		}

	}
</style>