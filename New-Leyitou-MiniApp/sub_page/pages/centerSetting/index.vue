<template>
	<wd-navbar @click-left="goBack" title="设置" :bordered="false" left-arrow fixed placeholder
		safeAreaInsetTop></wd-navbar>
	<view class="content uni-p-30">
		<wd-cell-group>
			<wd-cell title="主题色设置" clickable @click="setTheme" />
		</wd-cell-group>
		<wd-button type="error" @click="loginOut" custom-class="uni-w-full uni-mt-20">退出登录</wd-button>
	</view>

	<wd-message-box />
	<wd-toast />
	<wd-popup v-model="themeShow" custom-class="uni-border-radius-sm">
		<view class="uni-p-lg">
			<view><wd-text type="primary" text="主题颜色："></wd-text></view>
			<view class="uni-flex uni-p-lg">
				<view v-for="(item,index) in themes" @click="updateTheme(item)" :key="index"
					class="uni-w-60 uni-h-60 uni-mx-sm uni-border-radius-sm uni-flex-center"
					:style="{backgroundColor:item}">
					<wd-icon v-if="checkColor == item" name="check" size="40rpx" color="#fff"></wd-icon>
				</view>
			</view>
			<view class="uni-flex uni-items-center">
				<wd-text type="primary" text="深色模式："></wd-text>
				<view class="uni-ml-10"><wd-switch v-model="themeChecked" active-value="dark" inactive-value="light"
						@change="themeChange" /></view>
			</view>
			<view class="uni-flex uni-justify-end">
				<wd-button @click="saveTheme">确定</wd-button>
			</view>
		</view>
	</wd-popup>
</template>

<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app'
	import { useMessage, useToast } from 'wot-design-uni'
	import { useUserStore } from '@/store/user';
	import { goBack } from '@/utils/utils.ts'
	import { useThemeStore } from '@/store/useTheme'
	import { ref } from 'vue'
	const userStore = useUserStore();
	const message = useMessage()
	const toast = useToast()
	const themeStore = useThemeStore();
	const themes = themeStore.themeSetting;
	//深色
	const themeChecked = ref<string>();
	//主题色
	const checkColor = ref<string>('')

	//退出登录
	const loginOut = () => {
		message
			.confirm({
				msg: '是否退出登录',
				title: '提示'
			})
			.then(() => {
				userStore.logOut().then(res => {
					if (res.code == 200) {
						toast.success(res.msg)
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 500)

					}
				})
			})
			.catch(() => {
				console.log('点击了取消按钮')
			})
	}

	const themeShow = ref(false)
	// 打开主题色弹框
	const setTheme = () => {
		themeShow.value = true
	}
	// 设置主题色
	const updateTheme = (color : string) => {
		checkColor.value = color;
		themeStore.updateColorTheme(checkColor.value)
	}
	//设置深色模式
	const themeChange = () => {
		themeStore.updateTheme(themeChecked.value)
	}
	//保存
	const saveTheme = () => {
		themeShow.value = false
		themeStore.updateTheme(themeChecked.value)
		themeStore.updateColorTheme(checkColor.value)
		uni.setStorageSync(
			'theme',
			{
				theme: themeChecked.value,
				themeVars: {
					colorTheme: checkColor.value
				}
			}
		)
		toast.success('修改成功')
	}

	onLoad(() => {
		themeChecked.value = themeStore.theme
		checkColor.value = themeStore.themeVars.colorTheme
	})
</script>

<style scoped lang="scss">
	:deep(.wd-card) {
		margin-top: 20rpx !important;
		margin: 0px !important;
	}
</style>

<style lang="scss" scoped>
	.content {
		background-color: #f6f7fb;
		height: 100vh;
	}
	// 设置黑夜模式下的样式
	.wot-theme-dark{
		.content{
			background-color:#000000
		}
	}
</style>