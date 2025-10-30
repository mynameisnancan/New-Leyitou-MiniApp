<template>
	<wd-navbar @click-left="goBack" :bordered="false" left-arrow fixed safeAreaInsetTop
		custom-style="background-color: transparent !important;">
	</wd-navbar>
	<view class="content">
		<view style="padding-top: 200rpx;">
			<view class="password-login" v-if="loginMode == 'account'">
				<view>密码登录</view>
				<view class="tn-mt-xs">输入账号和密码登录</view>
			</view>
			<view class="password-login" v-else>
				<view>验证码登录</view>
				<view class="tn-mt-xs">输入手机号和验证码登录</view>
			</view>
		</view>
		<view class="input-template">
			<template v-if="loginMode == 'account'">
				<view class="custom-input">
					<wd-input v-model="loginForm.username" type="text" :no-border="true"
						placeholder="请输入用户名"></wd-input>
				</view>
				<view class="custom-input">
					<wd-input v-model="loginForm.password" show-password clearable :no-border="true"
						placeholder="请输入密码"></wd-input>
				</view>
				<view class="custom-input uni-flex uni-justify-between">
					<wd-input v-model="loginForm.code" custom-class="uni-w-4-5" type="text" :no-border="true"
						placeholder="请输入验证码"></wd-input>
					<view>
						<image v-if="codeUrl" :src="'data:image/jpg;base64,' + codeUrl" class="code-image"
							@click="getCodeApi"></image>
						<wd-loading v-else size="40rpx" />
					</view>
				</view>
				<template>
					<view class="get-code"></view>
				</template>
			</template>
			<template v-else>
				<view class="custom-input">
					<wd-input v-model="loginForm.username" type="text" :no-border="true"
						placeholder="请输入用户名"></wd-input>
				</view>
				<view class="custom-input">
					<wd-input v-model="loginForm.code" type="text" :no-border="true" placeholder="请输入验证码">
						<template #suffix>
							<view v-if="showGetCode" class="get-code" @click="getPhoneCode">获取验证码</view>
							<wd-count-down v-else ref="countDownRef" :time="60000" format="ss" @finish="onFinish" />
						</template>
					</wd-input>
				</view>
			</template>
			<wd-button custom-class="uni-w-full uni-mt-20" @click="login">登录</wd-button>
			<view class="login-mode uni-mt-20">
				<view @click="cutLoginMode">
					<text v-if="loginMode == 'phone'"><wd-text text="账号密码登录"></wd-text></text>
					<text v-else><wd-text text="手机号登录"></wd-text></text>
				</view>
				<template v-if="loginMode == 'account'">
					<!-- <TnCheckbox  v-model="rememberPwd" :active-color="loginBtnColor">记住密码</TnCheckbox> -->
					<!-- <view @click="toForgetPassWordPage">
					忘记密码?
				</view> -->
				</template>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref
	} from "vue";
	import {
		useUserStore
	} from "@/store/user.ts";
	import {
		getCode
	} from '@/api/login'
	import { LoginData } from '@/api/types';
	import { goBack } from '@/utils/utils.ts'
	const userStore = useUserStore();

	const loginMode = ref("account");
	const countDownRef = ref(null);
	const showGetCode = ref(true);
	let loginForm = ref<LoginData>({
		username: "",
		password: "",
		code: "",
		tenantId: '000000',
		uuid: ''
	});
	const codeUrl = ref();
	// 记住密码
	const rememberPwd = ref<boolean>(true)
	//登录
	async function login() {
		const res = await userStore.login(loginForm.value);
		if (res) {
			const userInfo = await userStore.getInfo();
			uni.setStorageSync('username',loginForm.value.username)
			if(rememberPwd.value){
				uni.setStorageSync('pwd',loginForm.value.password)
			}else{
				uni.removeStorageSync('pwd')
			}
			if (userInfo) {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}

		}
	}

	// 获取图形验证码
	function getCodeApi() {
		getCode().then(res => {
			codeUrl.value = res.data.img
			loginForm.value.uuid = res.data.uuid
		})
	}

	// 账号密码登录 ，手机号登录 切换事件
	function cutLoginMode() {
		loginMode.value = loginMode.value == "account" ? "phone" : "account";
		loginForm.value = {
			username: loginForm.value.username,
			password: loginForm.value.password,
			code: "",
			tenantId: '000000',
		};
	}

	//获取手机验证码
	function getPhoneCode() {
		showGetCode.value = false;
		countDownRef.value.start();
	}

	//验证码倒计时结束
	function onFinish() {
		showGetCode.value = true;
	}


	onLoad(() => {
		getCodeApi()
		const pwd = uni.getStorageSync('pwd')
		const username = uni.getStorageSync('username')
		if(pwd) {
			loginForm.value.username = username
			loginForm.value.password = pwd
		}
	})
</script>

<style scoped lang="scss">
	.password-login {
		padding: 40rpx 40rpx 0rpx 40rpx;
		:first-child{
			 font-size: 25px;
			 letter-spacing:2px;
		}
		:last-child{
			 font-size: 13px;
			 color: #9ca0ab;
			 letter-spacing:2px;
		}
	}

	.input-template {
		padding: 20px;

		.get-code {
			width: 60px;
			font-size: 20rpx;
			color: #4d80f0;
			display: flex;
			align-items: center;
		}
	}

	.custom-input {
		background-color: #fff;
		margin-top: 20rpx;
		border-radius: 20rpx;
		padding: 20rpx 20rpx;
	}

	.wot-theme-dark .custom-input {
		background-color: #1b1b1b;
	}

	.login-mode {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
		color: #838496;
	}




	// .wot-theme-dark .wd-icon-eye-close {
	// 	background-color: #fff !important;
	// }

	// .wot-theme-dark .wd-icon-view{
	// 	background-color: #fff !important;
	// }

	// :deep(.wd-input-custom){
	// 	background-color: #f6f7fb !important;
	// }

	// :deep(.wd-icon-eye-close) {
	// 	background-color: #f6f7fb;
	// }

	// :deep(.wd-icon-view) {
	// 	background-color: #f6f7fb ;
	// }

	// :deep(.wd-count-down) {
	// 	color: #4d80f0;
	// }

	// :deep(.wot-theme-dark .wd-input-custom) {
	// 	background-color: #1b1b1b !important;
	// }

	.content {
		height: 100vh;
		background-color: #ecf3ff;
	}
	
	.wot-theme-dark{
		.password-login{
			color: var(--wot-dark-theme-color, #000);
		}
	}
	

	.code-image {
		width: 120rpx;
		height: 100%;
	}
</style>