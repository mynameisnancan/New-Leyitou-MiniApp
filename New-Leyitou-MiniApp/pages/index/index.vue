<template>
	<view class="page-class">
		<!-- 顶部logo -->
		<wd-navbar custom-class="custom-wd-navbar" fixed safeAreaInsetTop>
			<template #title>
				<view class="uni-flex-center">
					<image class="logo-img" src="https://pick.idoutech.com/uploadPath/image/logo.png"></image>
					<text class="logo-center-text">乐意投</text>
				</view>
			</template>
		</wd-navbar>
		<view :style="{paddingTop:offsetTop+'px'}" class="sticky-content">
			<wd-sticky :offset-top="offsetTop" custom-class="uni-w-full">
				<!-- 日期筛选 -->
				<dateTabs sticky class="base-wd-tabs uni-w-full" @change="dateTabChange" slidable="always"
					inactiveColor="#acd9fe" color="#ffffff">
				</dateTabs>
			</wd-sticky>
		</view>
		<view class="body">
			<view class="data-overview">
				<swiper class="swiper" :indicator-dots="false" indicator-active-color="#5f9ffe">
					<swiper-item class="swiper-item">
						<view class="money">
							<view v-for="(item,index) in getStatisticsConfig()" :key="index" class="money-item">
								<view class="uni-text-26">{{item.label}}</view>
								<view class="uni-text-bold uni-text-36">
									<wd-count-to :endVal="getStatisticsValue(item.prop) || 0"
										color="#ffffff"></wd-count-to>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="options-module">
					<view class="options">
						<view class="item-container">
							<template v-for="(item,index) in optionsItems" :key="index">
								<view v-if="lookPermissions(item.permission)" @click="skipModule(item.path)"
									class="options-item">
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
		<view class="tab-content uni-m-lg uni-px-sm uni-flex uni-items-center  uni-border-radius-lg">
			<wd-tabs v-model="listType" @change="getStatisticeData">
				<wd-tab title="商品全域" name="uniOrder">
				</wd-tab>
				<wd-tab title="直播带货" name="order">
				</wd-tab>
			</wd-tabs>
			<view class="uni-w-1-5 uni-flex uni-items-center" @click="openFilter">
				<wd-icon name="search" size="32rpx" color="#848794"></wd-icon>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list-content">
			<view v-if="listType === 'uniOrder'">
				<uniOrderList v-model:orderQuery="uniOrderQuery" v-model:timeQuery="timeQuery" ref="uniOrderListRef">
				</uniOrderList>
			</view>
			<view v-else-if="listType === 'order'">
				<orderList v-model:orderQuery="orderQuery" v-model:timeQuery="timeQuery" ref="orderListRef" />
			</view>
		</view>

		<!-- 筛选条件弹出框 -->
		<tableQuery v-model:visible="queryVisible" :queryForm="listType === 'uniOrder' ? uniOrderQuery : orderQuery"
			:queryType="listType" @confirm="queryConfirm" />

		<view class="register" v-if="showLogin">
			<view>当前尚未登录，登录后可正常使用</view>
			<wd-button @click="login" size="small">立即登录</wd-button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import type {
		SxtUinOrderQuery,
		SxtUniOrderStatisticsVo,
		SxtOrderQuery,
		SxtOrderStatisticsVO
	} from '@/api/index/types'
	import {
		getUniOrderStatistics,
		getOrderStatistics
	} from '@/api/index/index'
	import { onShow, onPullDownRefresh, onLoad, onReachBottom } from '@dcloudio/uni-app'
	import {
		getRect
	} from 'wot-design-uni/components/common/util'
	import { ref, onMounted, nextTick, computed } from 'vue'
	import {
		lookPermissions,
		sumRoiFun,
		setThemeColor,
		setThemePageBgColor,
	} from '@/utils/utils.ts'

	import tableQuery from './components/uniOrderList/tableQuery.vue'
	import uniOrderList from './components/uniOrderList/uniOrderList.vue'
	import orderList from './components/orderList/orderList.vue'
	import dateTabs from './components/dateTabs/index.vue'

	// 是否显示 未登录弹出框
	const showLogin = ref<boolean>(true)
	const uniOrderListRef = ref()
	const orderListRef = ref()
	const queryFormRef = ref()
	const uniOrderQuery = ref<SxtUinOrderQuery>({
		orderId: undefined,
		status: undefined,
		productId: undefined,
		userId: undefined,
		authorId: undefined,
	})
	const orderQuery = ref<SxtOrderQuery>({
		status: undefined,
		userId: undefined,
		uid: undefined,
		advertiserId: undefined,
		productId: undefined,
		videoId: undefined,
		orderId: undefined,
		timeType: 1,
		timeStart: undefined,
		timeEnd: undefined,
		orderBy: undefined,
		sort: 1,
		sortField: 'createTime',
		sortType: 1,
	})
	const queryForm = ref<any>()
	const timeQuery = ref({
		timeStart: undefined,
		timeEnd: undefined
	})
	// 随心推全域订单汇总统计数据
	const uniOrderStatisticsData = ref<SxtUniOrderStatisticsVo>({
		allAmount: 0,
		allOrderNum: 0,
		statCostForRoi2: 0,
		totalPayOrderCountForRoi2: 0,
		totalPayOrderGmvForRoi2: 0,
	})
	// 订单统计数据
	const orderStatisticsData = ref<SxtOrderStatisticsVO>({
		allOrderNum: 0,
		allAmount: 0,
		allStatCost: 0,
		allPayOrderAmount: 0,
		allPayOrderCount: 0
	})
	// 全域订单统计prop配置
	const uniOrderSwiperConfig = [
		{
			prop: 'allAmount',
			label: '投放中订单数'
		},
		{
			prop: 'allOrderNum',
			label: '累计投放金额'
		},
		{
			prop: 'statCostForRoi2',
			label: '累计消耗金额'
		},
		{
			prop: 'totalPayOrderCountForRoi2',
			label: '成交订单数'
		},
		{
			prop: 'totalPayOrderGmvForRoi2',
			label: '成交订单金额'
		},
		{
			prop: 'roi',
			label: '成交ROI'
		},
	]
	// 订单统计prop配置
	const orderSwiperConfig = [
		{
			prop: 'allOrderNum',
			label: '投放中订单数'
		},
		{
			prop: 'allAmount',
			label: '累计投放金额'
		},
		{
			prop: 'allStatCost',
			label: '累计消耗金额'
		},
		{
			prop: 'allPayOrderAmount',
			label: '成交订单数'
		},
		{
			prop: 'allPayOrderCount',
			label: '成交订单金额'
		},
		{
			prop: 'roi',
			label: '成交ROI'
		},
	]

	// 快捷入口页面
	const optionsItems = [
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
	]
	// 筛选弹窗
	const queryVisible = ref<boolean>(false)
	const offsetTop = ref<number>(0)
	// 列表类型
	const listType = ref<'uniOrder' | 'order'>('uniOrder')
	// 计算ROI
	const sumRoi = computed(() => {
		if (listType.value === 'uniOrder') {
			return sumRoiFun(
				uniOrderStatisticsData.value.totalPayOrderGmvForRoi2 || 0,
				uniOrderStatisticsData.value.statCostForRoi2 || 0,
			);
		}
		return sumRoiFun(
			orderStatisticsData.value.allAmount || 0,
			orderStatisticsData.value.allStatCost || 0,
		);
	});
	// 获取统计数据配置
	const getStatisticsConfig = () => {
		if (listType.value === 'uniOrder') {
			return uniOrderSwiperConfig
		} else {
			return orderSwiperConfig
		}
	}
	// 获取统计数据
	const getStatisticsValue = (prop : string) => {
		if (prop === 'roi') return sumRoi.value
		if (listType.value === 'uniOrder') {
			return Number(uniOrderStatisticsData.value[prop as keyof SxtUniOrderStatisticsVo]) || 0
		} else if (listType.value === 'order') {
			return Number(orderStatisticsData.value[prop as keyof SxtOrderStatisticsVO]) || 0
		}
	}

	// 时间tab修改事件
	const dateTabChange = (date : any) => {
		if (date.length === 2) {
			timeQuery.value = {
				timeStart: date[0],
				timeEnd: date[1]
			}
		} else {
			timeQuery.value = {
				timeStart: date[0],
				timeEnd: date[0]
			}
		}
		getStatisticeData()
	}

	// 列表类型修改事件
	const getTabsDataList = () => {
		if (listType.value === 'uniOrder') {
			uniOrderListRef.value?.loadData()
		} else if (listType.value === 'order') {
			orderListRef.value?.loadData()
		}
	}

	// 打开筛选弹窗
	const openFilter = () => {
		queryVisible.value = true
	}

	// 跳转登录页
	function login() {
		uni.navigateTo({
			url: '/sub_page/pages/loginModePage/index',
			animationType: 'slide-in-right'
		})
	}

	const queryConfirm = (query : SxtUinOrderQuery | SxtOrderQuery) => {
		console.log(query)
		if (query === null) {
			if (listType.value === 'uniOrder') {
				uniOrderQuery.value = {
					orderId: undefined,
					status: undefined,
					productId: undefined,
					userId: undefined,
					authorId: undefined,
				}
			} else if (listType.value === 'order') {
				orderQuery.value = {
					status: undefined,
					userId: undefined,
					uid: undefined,
					advertiserId: undefined,
					productId: undefined,
					videoId: undefined,
					orderId: undefined,
					timeType: 1,
					timeStart: undefined,
					timeEnd: undefined,
					orderBy: undefined,
					sort: 1,
					sortField: 'createTime',
					sortType: 1,
				}
			}
		} else if (listType.value === 'uniOrder') {
			uniOrderQuery.value = query
		} else if (listType.value === 'order') {
			orderQuery.value = query
		}
		queryForm.value = query
	}

	// 获取统计数据
	const getStatisticeData = () => {
		if (listType.value === 'uniOrder') {
			getUniOrderStatisticsApi()
		} else {
			getOrderStatisticsApi()
		}
	}

	// 查询随心推全域订单汇总统计数据
	const getUniOrderStatisticsApi = () => {
		getUniOrderStatistics({
			sort: 1,
			...queryForm.value,
			...timeQuery.value
		}).then(res => {
			uniOrderStatisticsData.value = res.data
		})
	}

	// 查询订单统计数据
	const getOrderStatisticsApi = () => {
		getOrderStatistics({
			sort: 1,
			...queryForm.value,
			...timeQuery.value
		}).then(res => {
			orderStatisticsData.value = res.data
		})
	}

	const refreshList = () => {
		queryForm.value = {
			orderId: undefined,
			status: undefined,
			productId: undefined,
			userId: undefined,
			authorId: undefined,
		}
		getStatisticeData()
	}

	const skipModule = (path : string) => {
		uni.navigateTo({
			url: path,
			animationType: 'slide-in-right'
		})
	}

	onShow(() => {
		if (uni.getStorageSync('userInfo')) {
			showLogin.value = uni.getStorageSync('userInfo').userName ? false : true
			uniOrderListRef.value?.loadData()
			getStatisticeData()
		}
		setThemePageBgColor()
	})

	onReachBottom(() => {
		getTabsDataList()
	})


	onMounted(() => {
		const { statusBarHeight } = uni.getSystemInfoSync()
		offsetTop.value = 44 + (statusBarHeight || 0)
	})

	onPullDownRefresh(() => {
		if (!showLogin.value) {
			refreshList()
		}
	})

	onShow(() => {
		setThemeColor()
	})
</script>

<style lang="scss">
	.body {
		background-color: rgb(246, 247, 251);
		position: relative;
	}

	.base-wd-tabs {
		background-color: #144fe9 !important;

		.wd-tabs__nav {
			background-color: #144fe9 !important;
		}
	}

	.data-overview {
		position: relative;
		background-color: #144fe9;
		width: 100%;
		border-bottom-left-radius: 22%;
		border-bottom-right-radius: 22%;
	}

	.swiper {
		height: 300rpx;

		.swiper-item {
			height: 280rpx !important;
			margin-bottom: 10rpx;
		}
	}

	.money {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		color: white;

		.money-item {
			min-width: 33vw;
			height: 50%;
			margin-top: 30rpx;
			text-align: center;
			color: rgb(130, 185, 245);
		}
	}

	.register {
		position: fixed;
		bottom: 3%;
		left: 5%;
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

	.custom-wd-navbar {
		background: #144fe9 !important;
	}



	.sticky-content {
		background-color: #144fe9;
	}

	:deep(.wd-navbar.is-border::after) {
		background: #144fe9 !important;
	}

	.options-module {
		padding: 0px 20rpx;

		.options {
			padding: 10rpx 0rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: white;
			border-radius: 10px;
			font-size: 28rpx;

			.item-container {
				width: 100%;
				position: relative;
				display: flex;
				flex-wrap: nowrap;
			}
		}

		.options-item {
			// flex-grow: 1;
			// flex-shrink: 0;
			text-align: center;
			padding: 5px 0px;
			width: 20%;

			.icon {
				font-size: 50rpx;
				color: var(--wot-text-primary-color, var(--wot-color-theme, #4d80f0));
			}
		}

		.options-name {
			font-weight: 500;
		}
	}

	.tab-content {
		background-color: white;
	}

	.list-content {
		padding: 0rpx 20rpx 20rpx 20rpx;
	}

	.logo-img {
		width: 50rpx;
		height: 50rpx;
	}

	.logo-center-text {
		color: #ffffff;
		font-size: 32rpx;
		font-weight: bold;
		margin-left: 20rpx;
		letter-spacing: 10rpx;
	}

	.page-class {
		background-color: #f6f7fb;
		min-height: 100vh;
	}

	// 设置黑夜模式下的样式
	.wot-theme-dark {
		.custom-wd-navbar {
			background: #1b1b1b !important;
		}

		.wd-navbar.is-border::after {
			background: #1b1b1b !important;
		}

		.wd-sticky__container {
			background-color: #1b1b1b !important;
		}

		.base-wd-tabs {
			background-color: #1b1b1b !important;
		}

		.wd-tabs__nav {
			background-color: #1b1b1b !important;
		}

		.data-overview {
			background-color: #1b1b1b !important;
		}

		.sticky-content {
			background-color: #1b1b1b !important;
		}

		.options-module {
			background-color: #1b1b1b !important;
		}

		.options {
			background-color: #1d1e1f !important;
		}

		.options-name {
			color: var(--wot-dark-color3, rgba(232, 230, 227, .8));
		}

		.tab-content {
			background-color: #1b1b1b !important;
		}

		.commoditys-item {
			background-color: #1b1b1b !important;
			color: var(--wot-dark-color3, rgba(232, 230, 227, .8));

			.data-top {
				border-top: 1px solid var(--wot-dark-color3, rgba(232, 230, 227, .8));
			}
		}
	}
</style>