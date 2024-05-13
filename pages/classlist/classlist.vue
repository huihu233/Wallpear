<template>
	<view class="loadinLayout" v-if="!classList.length && !noData">
		<uni-load-more status="loading" />
	</view>
	<view class="classlist" v-else>
		<navigator :url="'/pages/preview/preview?id='+item._id" class="item" v-for="item in classList" :key=item._id>
			<image :src="item.smallPicurl" mode="aspectFill"></image>
		</navigator>
	</view>
	<view class="loadinLayout" v-if="classList.length || noData">
		<uni-load-more :status="noData ? 'noMore':'loading'" />
	</view>
	<view class="safe-area-inset-bottom">
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		onLoad,
		onUnload,
		onReachBottom,
		onShareAppMessage
	} from '@dcloudio/uni-app'

	import {
		apiGetClassList
	} from '@/api/apis.js'

	import {
		gotoHome
	} from "@/utils/common.js"

	// 列表数据
	const classList = ref([])
	const noData = ref(false)

	let queryparams = {
		pageNum: 2,
		pageSize: 12
	}

	let pageName


	onLoad((option) => {
		let {
			id,
			name
		} = option

		if (!id) {
			gotoHome()
		}

		queryparams.classid = id
		pageName = name

		uni.setNavigationBarTitle({
			title: name
		})

		// 发起请求获取分类列表方法
		getClassList()
	})

	// 触底刷新
	onReachBottom(() => {
		if (noData.value) return;
		queryparams.pageNum += 1
		getClassList()
	})

	onUnload(() => {
		// 离开清除缓存
		uni.removeStorageSync("storgClassList")
	})


	async function getClassList() {
		const res = await apiGetClassList(queryparams)
		if (res.data.length < queryparams.pageSize) {
			noData.value = true
		}
		classList.value = [...classList.value, ...res.data]
		// 将最新的列表数据放入浏览器缓存 storage 中
		uni.setStorageSync("storgClassList", classList.value)

	}

	// 分享给好友
	onShareAppMessage(() => {
		return {
			title: "大虾壁纸" + pageName,
			path: "/pages/classlist/classlist?id=" + queryparams.classid + "&name=" + pageName
		}
	})
</script>

<style lang="scss" scoped>
	.classlist {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5rpx;
		padding: 5rpx;

		.item {
			height: 440rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>