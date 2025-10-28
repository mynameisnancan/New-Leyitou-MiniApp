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
	
	<!-- 日期筛选 -->
	<baseTabs 
		class="base-wd-tabs" 
		@change="dateTabChange" 
		sticky 
		slidable="always" 
		inactiveColor="#acd9fe"
		color="#ffffff"
	>
	</baseTabs>
	
	<view class="body">
		<view class="data-overview">
			<swiper class="swiper" :indicator-dots="false" indicator-active-color="#5f9ffe">
				<swiper-item  class="swiper-item">
					<view class="money">
						<view class="money-item">
							<view class="uni-text-26">投放中订单数</view>
							<view class="uni-text-bold uni-text-36">
								<wd-count-to :endVal="statisticsData.allOrderNum || 0"  color="#ffffff"></wd-count-to> 
							</view>
						</view>
						<view class="money-item">
							<view class="uni-text-26">累计投放金额</view>
							<view class="uni-text-bold uni-text-36">
								<wd-count-to :endVal="statisticsData.allAmount || 0"  color="#ffffff"></wd-count-to> 
							</view>
						</view>
						<view class="money-item">
							<view class="uni-text-26">累计消耗金额</view>
							<view class="uni-text-bold uni-text-36">
								<wd-count-to :endVal="statisticsData.allStatCost || 0"  color="#ffffff"></wd-count-to> 
							</view>
						</view>
						<view class="money-item">
							<view class="uni-text-26">成交订单数</view>
							<view class="uni-text-bold uni-text-36">
								<wd-count-to :endVal="statisticsData.allPayOrderCount || 0"  color="#ffffff"></wd-count-to> 
							</view>
						</view>
						<view class="money-item">
							<view class="uni-text-26">成交订单金额</view>
							<view class="uni-text-bold uni-text-36">
								<wd-count-to :endVal="statisticsData.allPayOrderAmount || 0"  color="#ffffff"></wd-count-to> 
							</view>
						</view>
						<view class="money-item">
							<view class="uni-text-26">成交ROI</view>
							<view class="uni-text-bold uni-text-36">
								<wd-count-to :endVal="sumRoiFun(statisticsData.allAmount||0,statisticsData.allStatCost||0)"  color="#ffffff"></wd-count-to> 
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="options-module">
				<view class="options">
					<view class="item-container">
						 <template v-for="(item,index) in optionsItems" :key="index">
							<view class="options-item" v-if="lookPermissions(item.permission)">
								<view class="icon">
									<text :class="item.icon"></text>
								</view>
								<view class="options-name">{{item.name}}</view>
							</view> 
						 </template>
					 </view>
				</view>
			</view>
		</view>
	</view>
	
	<!-- 列表类型切换 -->
	<view class="uni-m-lg uni-px-sm uni-flex uni-items-center uni-bg-color-white">
		<wd-tabs v-model="listType" @click="listTabChange">
			<wd-tab title="商品全域" name="商品全域">
			</wd-tab>
			<wd-tab title="直播带货" name="直播带货">
			</wd-tab>
		</wd-tabs>
		<view class="uni-w-1-5 uni-flex uni-items-center" @click="openFilter">
			<wd-icon name="search" size="32rpx" color="#848794"></wd-icon>
		</view>
	</view>
	<!-- 列表 -->
	<view class="uni-p-lg">
		<view>
			<orderList></orderList>
		</view>
	</view>
	
	<!-- 筛选条件弹出框 -->
	<tableQuery v-model:visible="queryVisible" />
	
	<view class="register" v-if="showLogin">
		<view>当前尚未登录，登录后可正常使用</view>
		<wd-button @click="login" size="small">立即登录</wd-button>
	</view>
	
</template>

<script setup lang="ts">
	import type {
		SxtUinOrderQuery,
		SxtUniOrderStatisticsVo
	}from '@/api/index/types'
	import {
		getUniOrderStatistics
	}from '@/api/index/index'
	import {onShow} from '@dcloudio/uni-app'
	import { ref } from 'vue'
	import {
		lookPermissions,
		sumRoiFun
	}from '@/utils/utils.ts'
	
	import tableQuery from './components/tableQuery.vue'
	import orderList from './components/orderList.vue'
	
	// 是否显示 未登录弹出框
	const showLogin = ref<boolean>(true)
	const queryFormRef = ref()
	const queryForm = ref<SxtUinOrderQuery>({
		orderId: undefined,
		status: undefined,
		productId: undefined,
		userId: undefined,
		authorId: undefined,
		timeStart: undefined,
		timeEnd: undefined
	})
	const statisticsData = ref<SxtUniOrderStatisticsVo>({
		allOrderNum:0,
		allAmount:0,
		allStatCost:0,
		allPayOrderAmount:0,
		allPayOrderCount:0
	})
	// 快捷入口页面
	const optionsItems = [
		{
			name: '投放工具',
			icon: 't-icon icon-gongju',
			path: '',
			permission:''
		},
		{
			name: '投放记录',
			icon: 't-icon icon-shangpinliebiao',
			path: '',
			permission:''
		},
		{
			name: '追投记录',
			icon: 't-icon icon-jilu',
			path: '',
			permission:''
		},
		{
			name: '终止记录',
			icon: 't-icon icon-zhongzhiguanli',
			path: '',
			permission:''
		},
		{
			name: '商品列表',
			icon: 't-icon icon-shangpin',
			path: '',
			permission:''
		},
	]
	// 筛选弹窗
	const queryVisible = ref<boolean>(false)
	
	// 列表类型
	const listType = ref<'uniOrder' | 'order'>('uniOrder')
	
	// 时间tab修改事件
	const dateTabChange = (date:any) => {
		console.log(date)
	}
	
	// 列表类型修改事件
	const listTabChange = (event:any) => {
		console.log(event)
	}
	
	// 打开筛选弹窗
	const openFilter = () => {
		console.log(123)
		queryVisible.value = true
	}
	
	// 跳转登录页
	function login(){
		uni.navigateTo({
			url: '/sub_page/pages/loginModePage/index',
			animationType: 'slide-in-right'
		})
	}
	
	// 获取统计数据
	const getUniOrderStatisticsApi = () => {
		getUniOrderStatistics({
			sort:1,
			...queryForm.value
		}).then(res => {
			statisticsData.value = res.data
		})
	}
	
	onShow(() => {
		console.log(uni.getStorageSync('userInfo'))
		showLogin.value = uni.getStorageSync('userInfo').userName ? false : true
	})
	
	getUniOrderStatisticsApi()
</script>

<style lang="scss">
	.body {
		background-color: rgb(246, 247, 251);
		position: relative;
	}
	.base-wd-tabs{
		background-color: #144fe9 !important;
		.wd-tabs__nav{
			background-color:#144fe9 !important; 
		}
	}
	.data-overview{
		position: relative;
		background-color: #144fe9;
		width: 100%;
		border-bottom-left-radius: 22%;
		border-bottom-right-radius: 22%;
	}
	.swiper{
		height: 300rpx;
		.swiper-item{
			height: 280rpx !important;
			margin-bottom: 10rpx;
		}
	}
	
	.money{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		color:white;
		.money-item{
			min-width: 33vw;
			height: 50%;
			margin-top: 30rpx;
			text-align: center;
			color:rgb(130, 185, 245);
		}
	}
	
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
	
	.options-module{
		padding: 0px 20rpx;
		.options{
			padding: 10rpx 0rpx;
			 display: flex;
			 align-items: center;
			 justify-content: center;
			 background-color: white;
			 border-radius: 10px;
			 font-size: 28rpx;
		  .item-container{
			  width: 100%;
		  	  position: relative;
		  	  display: flex;
		  	  flex-wrap: nowrap;
			  justify-content: space-around;
		  }
		}
		.options-item{
			flex-grow: 1;
			flex-shrink: 0;
			// margin: 0rpx 10rpx;
			text-align: center;
			padding: 5px 0px;
			max-width: 130rpx;
			width: 130rpx;
			.icon{
				font-size: 50rpx;
				color: var(--wot-text-primary-color, var(--wot-color-theme, #4d80f0));
			}
		}
		 .options-name{
			 font-weight: 500;
		 }
	}
	
	.tab-content{
		background-color: white;
		border-radius: 10rpx;
		padding: 5px;
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
	
	page{
		background-color: #f6f7fb;
	}
</style>
