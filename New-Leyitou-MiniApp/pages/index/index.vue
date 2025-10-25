<template>
	<!-- 顶部logo -->
	<wd-navbar custom-class="custom-wd-navbar" safeAreaInsetTop>
		<template #title>
			<view class="uni-flex-center">
				<image class="logo-img" src="https://pick.idoutech.com/uploadPath/image/logo.png"></image>
				<text class="logo-center-text">乐意投</text>
			</view>
		</template>
	</wd-navbar>
	
	
	<view class="register" v-if="showLogin">
		<view>当前尚未登录，登录后可正常使用</view>
		<wd-button @click="login" size="small">立即登录</wd-button>
	</view>
	
</template>

<script setup lang="ts">
	import {onShow} from '@dcloudio/uni-app'
	import { ref } from 'vue'
	
	// 是否显示 未登录弹出框
	const showLogin = ref<boolean>(true)
	
	
	function login(){
		uni.navigateTo({
			url: '/sub_page/pages/loginModePage/index',
			animationType: 'slide-in-right'
		})
	}
	
	onShow(() => {
		console.log(uni.getStorageSync('userInfo'))
		showLogin.value = uni.getStorageSync('userInfo').userName ? false : true
	})
</script>

<style lang="scss">
	.register{
		position: fixed;
		bottom: 3%;
		left:5%;
		width: 90%;
		border-radius: 25px;
		background-color: #2c364f;
		opacity: 0.8;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 3px;
		color: white;
	}
	
	.custom-wd-navbar{
		background-color: #144fe9 !important;
	}
	
	.logo-img{
	  width: 50rpx;
	  height: 50rpx;
	}
	
	.logo-center-text{
		color: #ffffff;
		font-size: 32rpx;
		font-weight: bold;
		margin-left: 20rpx;
		letter-spacing: 10rpx;
	}
</style>
