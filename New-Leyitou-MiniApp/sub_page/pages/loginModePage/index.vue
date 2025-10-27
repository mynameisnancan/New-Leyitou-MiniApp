<template>
	<wd-navbar @click-left="goBack" :bordered="false" fixed left-arrow safeAreaInsetTop
		custom-style="background-color: transparent !important;"></wd-navbar>
	<view class="content">
		<view class="uni-p-20">
			<view class="logo">
				乐意投
			</view>
			<view class="login-method">
				<template v-if="authorizationStatus">
					<wd-button custom-class="quick-login" @click="quickLogin">快捷登录</wd-button>
				</template>
				<template v-else>
					<wd-button custom-class="quick-login" :open-type="agreementValue ? 'chooseAvatar' : ''"
						@chooseavatar="onChooseAvatar" @click="quickLogin">快捷注册</wd-button>
				</template>
				<wd-button custom-class="account-login" @click="accountLogin('account')" plain>账号密码登录</wd-button>
			</view>
			<view class="agreement uni-mt-xl">
				<wd-checkbox v-model="agreementValue" shape="square"></wd-checkbox>
				<wd-text custom-class="uni-ml-sm" text="我已阅读并同意"></wd-text>
				<view class="privacy-policy" @click="openPrivacyPolicy">
					<wd-text type="primary" text="《隐私政策》" />
				</view>
				<wd-text text="和"></wd-text>
				<view class="user-service-agreement" @click="openUserServiceAgreement">
					<wd-text type="primary" text="《用户服务协议》" />
				</view>
			</view>
			<view class="other-login" @click="accountLogin('phone')">
				<view class="uni-text-28">
					<wd-text text="其他方式登录"></wd-text>
				</view>
				<view class="phone-icon">
					<wd-icon name="shouji" size="44rpx" />
				</view>
				<view class="phone-login">手机号登录</view>
			</view>
		</view>
	</view>
	<wd-popup v-model="focus" closable custom-style="width:70%;">
		<view class="tn-text-center tn-pt-sm">编辑昵称</view>
		<view class="tn-p-xl">
			<view
				class="uni-p-sm uni-border-radius-sm tn-input tn-sm tn-text-left tn-border tn-gray-disabled_border tn-input">
				<input type="nickname" v-model="nickname" class="weui-input" placeholder="请输入昵称"
					@change="nickNameChange" />
			</view>
			<view class="tn-mt tn-flex justify-end">
				<wd-button @click="quickLogin">
					确定
				</wd-button>
			</view>
		</view>
	</wd-popup>

	<!-- 隐私政策 -->
	<!-- <privacyPolicy v-model:open="showPrivacyPolicy"/> -->

	<!-- 用户服务协议 -->
	<!-- <userServiceAgreement v-model:open="showUserServiceAgreement" /> -->

	<wd-message-box selector="wd-message-box-slot">
		<template>
			<view class="agreement">
				<text>请先同意</text>
				<view class="privacy-policy" @click="openPrivacyPolicy">
					<wd-text type="primary" text="《隐私政策》" />
				</view>
				<text>和</text>
				<view class="user-service-agreement" @click="openUserServiceAgreement">
					<wd-text type="primary" text="《用户服务协议》" />
				</view>
			</view>
		</template>
	</wd-message-box>
</template>

<script setup lang="ts">
	import {
		nextTick,
		reactive,
		ref
	} from 'vue'
	import {
		useUserStore
	} from '@/store/user.ts'
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useMessage
	} from 'wot-design-uni'
	import {
		goBack
	} from '@/utils/utils.ts'

	const message = useMessage('wd-message-box-slot')
	const store = useUserStore()
	const userData = reactive({
		userInfo: {}
	})
	const focus = ref(false)

	const avatarUrl = ref('') // 头像
	const nickname = ref('') // 昵称
	const authorizationStatus = ref(true) // 当前微信是否授权过， true是，false否
	const showPrivacyPolicy = ref(false)
	const agreementValue = ref(false)

	const showUserServiceAgreement = ref(false)
	const agreementShow = ref(false)
	// 快捷登录
	function quickLogin() {
		if (!agreementValue.value) {
			verifyCheck()
			return;
		}
		focus.value = false
		uni.login({
			provider: 'weixin', //使用微信登录
			success: function(loginRes) {

			}
		});
	}


	function accountLogin(type:string, xcxBindCode?:string) {
		if (!agreementValue.value) {
			verifyCheck()
			return;
		}
		uni.navigateTo({
			url: `/sub_page/pages/quickLoginPage/index`,
			animationType: 'slide-in-right'
		})
	}

	function getPhoneNumber(data) {
		console.log(data)
		userData.userInfo = data
	}

	// 获取头像
	function onChooseAvatar(url) {
		avatarUrl.value = url.detail.avatarUrl
		focus.value = true
	}

	function nickNameChange(e) {
		console.log(e)
	}

	// 打开隐私政策
	function openPrivacyPolicy() {
		showPrivacyPolicy.value = true
	}

	// 打开用户协议
	function openUserServiceAgreement() {
		showUserServiceAgreement.value = true
	}

	// 校验是否勾选隐私政策和用户协议
	function verifyCheck() {
		if (!agreementValue.value) {
			message
				.confirm({
					title: '提示'
				})
				.then(() => {
					agreementValue.value = true
				}).catch((error) => {
					console.log(error)
				})
		}
	}


	onShow(() => {})
</script>

<style lang="scss">
	page {
		background-color: #ecf3ff;
		background-image: url(https://www.doulaoban.com/assets/bg.03067133.png);
		background-repeat: no-repeat;
		background-position: center top;
		background-size: 100% 50%;
	}

	.agreement {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;

		.uni-data-checklist .checklist-group .checklist-box {
			margin: 0px;
		}
	}

	.base-container {
		padding: 20rpx;
	}

	.logo {
		text-align: center;
		font-size: 50rpx;
		margin-top: 40%;
		letter-spacing: 5px;
	}

	.wot-theme-dark {
		.logo {
			color: var(--wot-dark-theme-color, #000);
		}
	}

	.login-method {
		margin-top: 60rpx;
		display: flex;
		flex-direction: column;

		.quick-login {
			border-radius: 40rpx;
			color: white;
			text-align: center;
			font-size: 28rpx;
		}

		.account-login {
			// padding: 10px 0px;
			// width: 400rpx;
			border-radius: 40rpx;
			// border: 1px solid #2561ff;
			color: #2561ff;
			text-align: center;
			margin-top: 40rpx;
			font-size: 28rpx;
		}
	}

	.other-login {
		margin-top: 40rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;

		.phone-icon {
			width: 30px;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			border: 1px solid #e1e1e1;
			border-radius: 50%;
			font-size: 12px;
			margin: 7px 0px;
			color: var(--wot-text-primary-color, var(--wot-color-theme, #4d80f0));
		}

		.phone-login {
			font-size: 24rpx;
			color: #777c85;
		}
	}

	.under-line-color {
		color: #2a2a2c;
	}
	
</style>