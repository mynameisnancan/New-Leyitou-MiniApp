<template>
	<view class="page-class">
		<wd-navbar fixed title="全域订单详情" left-arrow safeAreaInsetTop @click-left="handleClickLeft"
			:custom-style="`background-color: rgba(255, 255, 255,${barOpacity})`" custom-class="navbar-class" />
		<view class="body" :style="{paddingTop:getNavHeight()+'px'}">
			<view class="gradual-bg-color uni-p-lg">
				<view @click="copyStr(orderData?.orderId)" class="uni-font-color-gray uni-text-26">
					订单ID:{{orderData?.orderId}}
					<wd-icon name="file-copy" size="30rpx"></wd-icon>
				</view>
				<!-- 抖音号模板 -->
				<view
					class="message-module uni-flex uni-items-center uni-justify-around uni-p-sm uni-mt-lg uni-border-radius-xl uni-text-bold">
					<view class="uni-flex uni-flex-wrap uni-items-center uni-flex-column">
						<view>
							<wd-img width="100rpx" height="100rpx" round
								:src="orderData?.dyAuthorInfo?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" />
						</view>
						<text class="uni-text-26">
							{{orderData?.dyAuthorInfo?.nickName || '暂无'}}
						</text>
					</view>
					<view class="uni-flex uni-flex-column uni-items-center">
						<view>
							<baseTag :options="leyitou_order_status" :value="orderData.status"></baseTag>
						</view>
						<view class="uni-text-26">{{orderData.orderCreateTime || '--'}}</view>
						<view>
							<wd-icon name="arrow-right1" size="40rpx"></wd-icon>
						</view>
					</view>
					<view class="uni-flex uni-flex-wrap uni-items-center uni-flex-column">
						<view>
							<wd-img width="100rpx" height="100rpx" round
								:src="orderData?.dyAuthorInfo?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" />
						</view>
						<text class="uni-text-26">
							{{orderData?.dyAuthorInfo?.nickName || '暂无'}}
						</text>
					</view>
				</view>
				<!-- 商品模板 -->
				<view class="message-module uni-flex uni-mt-lg uni-border-radius-xl uni-p-sm">
					<view>
						<wd-img width="200rpx" height="200rpx" :src="orderData?.dyProductInfo?.cover" radius="20rpx" />
					</view>
					<view class="uni-ml-lg uni-text-26 ">
						<view class="uni-text-bold uni-text-warp-2">{{orderData?.dyProductInfo?.title || '暂无商品名称'}}
						</view>
						<view @click="copyStr(orderData?.dyProductInfo?.productId || '')"
							class="uni-mt-sm uni-font-color-black uni-flex uni-items-center">
							商品ID:{{orderData?.dyProductInfo?.productId}}
							<wd-icon name="file-copy" size="30rpx"></wd-icon>
						</view>
						<view class="uni-flex uni-items-center uni-mt-sm">
							<view class="uni-font-color-theme">
								活动佣金：{{orderData?.productRateInfo?.activityCosRatio || 0.0 }}%
							</view>
							<view class="uni-ml-lg">服务费率：{{orderData?.productRateInfo?.serviceRatio || 0.0}}%</view>
						</view>

						<view class="uni-flex uni-mt-sm">
							<view class="uni-text-warp-1">
								{{orderData?.dyShopInfo?.shopName}}
							</view>
							<view @click="copyStr(orderData?.dyShopInfo?.shopId || '')"
								class="uni-ml-sm uni-font-color-black uni-flex uni-items-center">
								ID:{{orderData?.dyShopInfo?.shopId}}
								<wd-icon name="file-copy" size="30rpx"></wd-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="content">
				<!-- 订单数据 -->
				<wd-card>
					<template #title>
						<view class="uni-flex uni-justify-between uni-items-center">
							<view class="uni-text-bold uni-text-lg">订单详情</view>
							<view @click="openCalender" class="uni-text-xl icon">
								<text class="t-icon icon-riqi  "></text>
							</view>
						</view>
					</template>
					<uniorderEchart :dateRange="orderTime" :orderData="uniOrderData" />
				</wd-card>
				<!-- 投放设置 -->
				<wd-card custom-class="card-custom-class">
					<template #title>
						<view class="uni-text-bold uni-text-lg">订单详情</view>
					</template>
					<view class="uni-font-color-black uni-text-26">
						<view class="uni-flex uni-justify-between">
							<view>出价类型</view>
							<view>
								<baseTag :options="sxt_order_bid_type" :value="orderData?.deliverySetting?.bid_type">
								</baseTag>
							</view>
						</view>
						<view class="uni-flex uni-justify-between">
							<view>支付ROI</view>
							<view class='uni-text-bold'>{{ orderData.deliverySetting?.roi_goal || '--' }}</view>
						</view>
						<view class="uni-flex uni-justify-between">
							<view>投放时长</view>
							<view>
								<baseTag :options="sxt_order_delivery_time"
									:value="orderData?.deliverySetting?.delivery_time"></baseTag>
							</view>
						</view>
						<view class="uni-flex uni-justify-between">
							<view>投放金额</view>
							<view class='uni-text-bold'>
								{{ orderData.deliverySetting?.amount || '--' }} 元
							</view>
						</view>
						<view class="uni-flex uni-justify-between">
							<view>是否开启智能优惠券</view>
							<view class='uni-text-bold'>
								{{
								orderData.deliverySetting?.qcpx_mode === 'QCPX_MODE_ON'
								  ? '开启'
								  : '关闭'
							}}
							</view>
						</view>
					</view>
				</wd-card>

				<!-- 投中续费信息 -->
				<wd-card custom-class="card-custom-class">
					<template #title>
						<view class="uni-text-bold uni-text-lg">投中续费信息</view>
					</template>
					<view v-if="orderData.addAmountInfo && orderData?.addAmountInfo.add_amount"
						class="uni-font-color-black uni-text-26">
						<view class="uni-flex uni-justify-between">
							<view>续费订单金额之和</view>
							<view class='uni-text-bold'>
								￥{{ orderData?.addAmountInfo.add_amount || '--' }}
							</view>
						</view>
						<view class="uni-flex uni-justify-between">
							<view>续费次数</view>
							<view class='uni-text-bold'>
								{{ orderData?.addAmountInfo?.add_amount_cnt || '--' }}次
							</view>
						</view>
						<view class="uni-flex uni-justify-between">
							<view>续费订单时长之和</view>
							<view class='uni-text-bold'>
								{{ orderData?.addAmountInfo?.add_delivery_time || '--' }}小时
							</view>
						</view>
					</view>
					<view v-else>
						<wd-status-tip image="search" tip="暂无追投续费信息" />
					</view>
				</wd-card>
			</view>

			<view class="buttom-btn">
				<view class="uni-flex uni-justify-center uni-mt-lg">
					<wd-button @click="addBudgetOrder" custom-class="uni-w-3-4">追投</wd-button>
				</view>
			</view>

			<wd-calendar ref="calendar" type="daterange" v-model="dateValue" @confirm="handleConfirm" :with-cell="false"
				:min-date="getMinDate()" :max-date="getMaxDate()" allow-same-day :z-index="9999" />

			<wd-message-box selector="wd-message-box-slot">
				<view>
					<wd-cell title="追投金额">
						<wd-input-number prop="renewalBudget" clearable v-model="addBudQuery.renewalBudget"
							placeholder="请输入追投金额" :min="100" :max="500000" :step="100" />
					</wd-cell>
					<wd-picker :columns="sxt_order_delivery_time" label="追投时长" v-model="addBudQuery.addDeliveryTime"
						clearable root-portal :z-index="100" />
				</view>
			</wd-message-box>

			<wd-toast />
		</view>
	</view>
</template>

<script setup lang="ts">
	import type {
		SxtUniOrderDetailMergeVo,
		SxtUniOrderDataMergeVo,
		OrderAddUnigetQuery
	} from '@/sub_page/api/index/types'
	import type {
		SxtUniOrderDataInfo
	} from '@/api/index/types'
	import {
		getUniOrderDetail,
		getUniOrderData,
		orderAddUniBudget
	} from '@/sub_page/api/index/index'
	import {
		useDict
	} from '@/utils/dict'
	import {
		ref,
		toRefs
	} from 'vue'
	import {
		getNavHeight,
		copyStr,
		setThemePageBgColor 
	} from '@/utils/utils'
	import {
		getTodayDate
	} from '@/utils/date'
	import dayjs from 'dayjs'
	import { onLoad, onPageScroll,onShow } from '@dcloudio/uni-app'
	import uniorderEchart from './components/uniorderEchart'
	import {
		getMaxDate,
		getMinDate
	} from '@/utils/date'
	import { useMessage, useToast } from 'wot-design-uni'

	const message = useMessage('wd-message-box-slot')
	const toast = useToast()

	const orderId = ref<number>()
	const dateValue = ref<number[]>([Date.now(), Date.now()])
	const orderTime = ref([getTodayDate(), getTodayDate()])
	const orderData = ref<SxtUniOrderDetailMergeVo>({
		status: undefined
	})
	//导航栏透明度
	const barOpacity = ref<number>(0)
	// ehcart数据源
	const uniOrderData = ref<SxtUniOrderDataMergeVo[]>([])
	const calendar = ref()

	// 追投参数
	const addBudQuery = ref<OrderAddUnigetQuery>({
		addAmount: 100,
		addDeliveryTime: 2,
		orderId: '',
	});

	// 根据页面滚动修改导航栏透明度
	const updateOpacity = (event : any) => {
		const scrollTop = event.scrollTop
		let height = getNavHeight()
		if (event.scrollTop < 0) {
			barOpacity.value = 0
		} else if (scrollTop <= height) {
			barOpacity.value = Math.round(scrollTop / height * 100) / 100
		} else {
			barOpacity.value = 1
		}
	}

	const {
		leyitou_order_status,
		sxt_order_bid_type,
	} = toRefs(useDict(['leyitou_order_status', 'sxt_order_bid_type']))
	const { sxt_order_delivery_time } = toRefs(useDict(['sxt_order_delivery_time'], true))
	// 获取echart图表数据
	const getUniOrderDataApi = () => {
		if (!orderId.value) return
		getUniOrderData({
			orderId: orderId.value,
			timeStart: orderTime.value[0],
			timeEnd: orderTime.value[1]
		}).then(res => {
			uniOrderData.value = res.data
		})
	}

	// 获取订单详情数据
	const getUniOrderDetailApi = () => {
		if (!orderId.value) return
		getUniOrderDetail(orderId.value).then(res => {
			orderData.value = res.data
		})
	}
	const init = () => {
		if (orderId.value) {
			getUniOrderDetailApi()
			getUniOrderDataApi()
		}
	}

	const openCalender = () => {
		calendar.value?.open()
	}

	const handleConfirm = ({ value } : any) => {
		if (value.length === 2) {
			orderTime.value = [
				dayjs(value[0]).format("YYYY-MM-DD"),
				dayjs(value[1]).format("YYYY-MM-DD")
			]
			getUniOrderDataApi()
		}
	}

	const handleClickLeft = () => {
		uni.navigateBack()
	}

	onLoad((data : any) => {
		if (data.orderId) {
			orderId.value = data.orderId
			addBudQuery.value.orderId = data.orderId
			init()
		}
	})
	
	onShow(() => {
		setThemePageBgColor()
	})

	onPageScroll((event : any) => {
		updateOpacity(event)
	})

	const addBudgetOrder = () => {
		message
			.confirm({
				closeOnClickModal: false,
				title: '追加订单预算'
			})
			.then(() => {
				orderAddUniBudgetApi()
			})
	}

	const orderAddUniBudgetApi = () => {
		orderAddUniBudget(addBudQuery.value).then(res => {
			if (res.code == 200) {
				toast.success(res.msg)
			} else {
				toast.error(res.msg)
			}
		})
	}

	// // 允许当前文件样式穿透
	// defineOptions({
	// 	options: {
	// 		styleIsolation: 'shared'
	// 	}
	// })
</script>

<style lang="scss" scoped>
	.body {
		background-color: #d8eaff;
	}

	.content {
		background-color: #f6f7fb;
		padding-bottom: 150rpx;
	}

	.gradual-bg-color {
		background: linear-gradient(to bottom, #d8eaff 0%, #dff0ff 50%, #eaf4fd 75%, #edf4fa 100%);
		width: 100%;
	}

	.message-module {
		border: 1px solid white;
		background-color: #eef9ff;
	}

	.buttom-btn {
		width: 100%;
		position: fixed;
		left: 0px;
		bottom: 0%;
		background-color: white;
		padding: 20rpx;
		z-index: 99;
	}
</style>
<style lang="scss">
	.page-class {
		background-color: #f6f7fb;
	}

	.card-custom-class {
		padding: 0rpx 20rpx 20rpx 20rpx !important;
	}

	// 设置黑夜模式下的样式
	.wot-theme-dark {
		.gradual-bg-color {
			background: #1d1e1f !important;
		}

		.message-module {
			background: #1b1b1b !important;
			color: var(--wot-dark-color3, rgba(232, 230, 227, .8));
			border: 1px solid var(--wot-dark-color3, rgba(232, 230, 227, .8));
		}

		.buttom-btn {
			background: #1d1e1f !important;
		}

		.content {
			background: #1d1e1f !important;
			padding-bottom: 150rpx;
		}

		.body {
			background: #1d1e1f !important;
		}

		.navbar-class {
			background: #1d1e1f !important;
		}

		.page-class {
			background-color: #1d1e1f !important;
		}
	}
</style>