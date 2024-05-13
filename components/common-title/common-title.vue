<template>
	<view class="common-title">
		<view class="title_name">
			<slot name="left"></slot>
		</view>
		<view class="custom">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script setup>

</script>

<style>
	.common-title {
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title_name {
		font-size: 40rpx;
	}
</style>