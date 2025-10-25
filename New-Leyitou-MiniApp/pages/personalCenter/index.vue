<template>
	<view class="content">
		<view class="uni-h-350 uni-w-full header">
			<view class="head-portrait">
				<wd-img width="140rpx" height="140rpx" round mode=""
					src="https://img2.baidu.com/it/u=1071451148,1162169494&fm=253&fmt=auto&app=120&f=JPEG?w=667&h=500" />
				<!-- <wd-skeleton theme="avatar" /> -->
			</view>
			<view class="uni-border-radius-lg setting uni-flex uni-items-center">
				<wd-icon name="shezhi" size="35rpx"></wd-icon>
				<view class="uni-text-lg  uni-ml-5" @click="skipPage('/sub_page/pages/centerSetting/index')">设置</view>
			</view>
		</view>
		<view class="uni-pt-xl">
			<wd-card title="管理中心" custom-title-class="uni-text-sm uni-text-bold">
				<view class="uni-flex-wrap">
					<view v-for="(item,index) in manageList" :key="index" @click="skipPage(item.path)" class="uni-p-sm uni-flex-column uni-items-center">
						<wd-icon :name="item.icon" size="22px"></wd-icon>
						<!-- <view class="uni-font-color-black">	{{item.name}}</view> -->
						<wd-text :text="item.name"></wd-text>
					</view>
				</view>
				<template #footer></template>
			</wd-card>
		</view>
		
		
		<!-- <wd-tabbar v-model="tabbar" fixed placeholder @change="tabbarChange" custom-class="uni-h-100" safeAreaInsetBottom>
			<template v-for="(item,index) in routes" :key="index">
				<wd-tabbar-item :title="item.meta.title" :icon="item.meta.icon" :name="item.component"></wd-tabbar-item>
			</template>
		</wd-tabbar> -->
	</view>
</template>

<script setup lang="ts">
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
	const userStore = useUserStore();
	// const routes = userStore.routes;
	const routes = uni.getStorageSync('routes')

	const tabbar = ref('/pages/personalCenter/index');
	
	const manageList = ref([
		{
			name:'订单列表',
			path:'/sub_page/pages/orderList/index',
			icon:'list'
		},
		{
			name:'缴费记录',
			path:'/sub_page/pages/payRecord/index',
			icon:'list'
		},
	])

	const tabbarChange = ({
		value
	}:any) => {
		uni.switchTab({
			url: value
		})
	}
	
	//跳转页面
	const skipPage = (page:string) => {
		uni.navigateTo({
			url:page
		})
	}
	
	const skipOpenVersion  = () => {
		uni.switchTab({
			url:'/pages/openVersion/index'
		})
	}
	

	onShow(() => {
		tabbar.value = '/pages/personalCenter/index'
		if(getToken()){
			 
		}else{
			uni.redirectTo({
				url:"/sub_page/pages/loginModePage/index"
			})
		}
	})
	onLoad(() => {
		// userInfo.value = uni.getStorageSync('userInfo')
	})
</script>

<style scoped lang="scss">
	
	.wot-theme-dark .header{
		background-color: var(--wot-dark-background, #1b1b1b);
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
	.color-f56c6c{
		color:#f56c6c
	}
</style>

<style lang="scss">
	page{
		background-color: #f6f7fb;
	}
</style>