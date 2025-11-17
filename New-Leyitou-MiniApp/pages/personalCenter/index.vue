<template>
	<view class="content">
		<view class="uni-h-380 uni-w-full header">
			<view class="head-portrait uni-flex uni-items-center">
				<wd-img v-if="userData.avatar" width="140rpx" height="140rpx" round mode="" :src="config.baseUrl+userData.avatar" />
				<wd-img v-else width="140rpx" height="140rpx" round mode=""
					src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
				<view class="uni-ml-lg">
					<wd-text :text="userData.nickName || '请登录'" size="40rpx"></wd-text>
				</view>
			</view>
			<view class="uni-border-radius-lg setting uni-flex uni-items-center">
				<wd-icon name="shezhi" size="35rpx"></wd-icon>
				<view class="uni-text-lg  uni-ml-5" @click="skipPage('/sub_page/pages/centerSetting/index')">设置</view>
			</view>
		</view>
		<view class="uni-pt-xl">
			<wd-card title="我的菜单" custom-title-class="uni-text-sm uni-text-bold">
				<view class="uni-flex-wrap">
					<template v-for="(item,index) in manageList" :key="index">
						<view  v-if="lookPermissions(item.permission)" @click="skipPage(item.path)"
							class="uni-p-sm uni-flex-column uni-items-center">
							<view class="icon">
								<text :class="item.icon"></text>
							</view>
							<view class="uni-font-color-black">{{item.name}}</view>
						</view>
					</template>
				</view>
				<template #footer></template>
			</wd-card>
		</view>
	</view>
</template>

<script setup lang="ts">
	import  config from '@/config'
	import type {
		SysUserVo
	} from '@/api/user/types'
	import {
		ref
	} from 'vue'
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app'
	import {
		useUserStore
	} from '@/store/user'
	import {
		getToken
	} from '@/utils/auth.ts'
	import {
		setThemeColor,
		lookPermissions
	}from '@/utils/utils'
	const userStore = useUserStore();

	const userData = ref<SysUserVo>({})

	const tabbar = ref('/pages/personalCenter/index');

	const manageList = ref([
		{
			name: '投放工具',
			icon: 't-icon icon-gongju',
			path: '/sub_page/pages/creationTool/index',
			permission: ''
		},
		{
			name: '投放记录',
			icon: 't-icon icon-shangpinliebiao',
			path: '/sub_page/pages/createRecord/index',
			permission: 'leyitou:sxt_order_create_record:list'
		},
		{
			name: '追投记录',
			icon: 't-icon icon-jilu',
			path: '/sub_page/pages/addRecord/index',
			permission: 'leyitou:sxt_order_add_record:list'
		},
		{
			name: '终止记录',
			icon: 't-icon icon-zhongzhiguanli',
			path: '/sub_page/pages/terminationRecord/index',
			permission: 'leyitou:sxt_order_termination_record:list'
		},
		{
			name: '商品列表',
			icon: 't-icon icon-shangpin',
			path: '/sub_page/pages/commodityList/index',
			permission: 'leyitou:qc_uni_product:list'
		},
		{
			name: '素材管理',
			icon: 't-icon icon-sucai',
			path: '/sub_page/pages/videoManage/index',
			permission: 'leyitou:sxt_video:list'
		},
	])

	const tabbarChange = ({
		value
	} : any) => {
		uni.switchTab({
			url: value
		})
	}

	//跳转页面
	const skipPage = (page : string) => {
		uni.navigateTo({
			url: page
		})
	}


	onShow(() => {
		setThemeColor()
		if (getToken()) {
			userData.value = uni.getStorageSync('userInfo')
		} else {
			userData.value={}
		}
	})
	onLoad(() => {
		// userInfo.value = uni.getStorageSync('userInfo')
	})
</script>

<style scoped lang="scss">
	.wot-theme-dark .header {
		background-color: var(--wot-dark-background, #1b1b1b);
	}

	.icon {
		font-size: 50rpx;
		color: var(--wot-text-primary-color, var(--wot-color-theme, #4d80f0));
	}

	.header {
		background-color: #e7eaf9;
		position: relative;
	}

	.head-portrait {
		position: absolute;
		left: 10%;
		top: 38%;
	}

	.setting {
		border: 1px solid #ffffff;
		padding: 12rpx 20rpx;
		position: absolute;
		right: 5%;
		top: 50%;
		color: #999;
	}

	.color-f56c6c {
		color: #f56c6c
	}
</style>

<style lang="scss">
	
	page {
		background-color: #f6f7fb;
	}
	// 设置黑夜模式下的样式
	.wot-theme-dark{
		.content{
			height: 100vh;
			background-color: #000000 !important;
		}
	}
</style>