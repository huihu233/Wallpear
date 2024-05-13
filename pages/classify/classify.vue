<template>
	<view class="classLayout pageBg">
		<custom-nav-bar navBarTitle="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="item in classifyList" :key="item._id" :data="item"></theme-item>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onShareAppMessage
	} from '@dcloudio/uni-app'
	import {
		apiGetClassif
	} from '@/api/apis.js'
	const classifyList = ref([])

	// 获取分类列表
	const getClassify = async () => {
		let res = await apiGetClassif({
			pageSize: 15
		})
		classifyList.value = res.data
	}

	getClassify()

	// 分享给好友
	onShareAppMessage(() => {
		return {
			title: "大虾壁纸",
			path: "/pages/index/index"
		}
	})
</script>

<style lang="scss" scoped>
	.classify {
		padding: 30rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15rpx;
	}
</style>