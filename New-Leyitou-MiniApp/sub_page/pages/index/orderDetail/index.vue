<template>
	<wd-navbar fixed title="随心推订单详情" left-arrow safeAreaInsetTop @click-left="handleClickLeft"
		:custom-style="`background-color: rgba(255, 255, 255,${barOpacity}) !important;`" />
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
							:src="orderData?.payAuthorInfo?.avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'" />
					</view>
					<text class="uni-text-26">
						{{orderData?.payAuthorInfo?.nickName || '暂无'}}
					</text>
				</view>
				<view class="uni-flex uni-flex-column uni-items-center">
					<view>
						<baseTag :options="leyitou_order_status" :value="orderData?.status"></baseTag>
					</view>
					<view class="uni-text-26">{{orderData?.createTime || '--'}}</view>
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
			<!-- 直播间信息 -->
			<view v-if="orderData?.roomInfo" class="message-module uni-flex uni-mt-lg uni-border-radius-xl uni-p-sm">
				<view>
					<wd-img width="200rpx" height="100%" :src="orderData?.roomInfo?.room_cover" radius="20rpx">
						<template #error>
							<view class="uni-w-full uni-h-full uni-flex-center uni-font-color-gray error-wrap">加载失败
							</view>
						</template>
					</wd-img>
				</view>
				<view class="uni-ml-lg">
					<baseTag :options="leyitou_live_status" :value="orderData?.roomInfo?.room_status" />
					<view>
						{{orderData?.roomInfo?.room_title}}
					</view>
				</view>
			</view>
			<!-- 素材模板 -->
			<view class="message-module uni-flex uni-mt-lg uni-border-radius-xl uni-p-sm">
				<view>
					<!-- `https://douyin.com/video/${orderData?.dyVideoInfo?.videoId}` -->
					<wd-img width="200rpx" height="100%" :src="orderData?.dyVideoInfo?.videoCoverUrl" radius="20rpx">
						<template #error>
							<view class="uni-w-full uni-h-full uni-flex-center uni-font-color-gray error-wrap">加载失败
							</view>
						</template>
					</wd-img>
				</view>
				<view class="uni-ml-lg uni-text-26 uni-font-color-gray">
					<view class="uni-text-bold uni-text-warp-2">{{orderData?.dyVideoInfo?.title}}</view>
					<view class="uni-mt-sm">账号：{{orderData?.dyAuthorInfo?.nickName || '暂无抖音号名称'}}</view>
					<view class="uni-mt-sm">发布时间：{{orderData?.createTime || '--'}}</view>
					<view class="uni-flex uni-justify-between uni-mt-sm uni-text-sm">
						<view class="icon uni-flex uni-flex-column uni-items-center">
							<text class="t-icon icon-24gf-playCircle"></text>
							<view class="uni-text-sm">{{orderData?.dyVideoInfo?.dyTotalPlay}}</view>
						</view>
						<view class="icon uni-flex uni-flex-column uni-items-center">
							<text class="t-icon icon-aixin"></text>
							<view class="uni-text-sm">{{orderData?.dyVideoInfo?.dyLike}}</view>
						</view>
						<view class="icon uni-flex uni-flex-column uni-items-center">
							<text class="t-icon icon-pinglun"></text>
							<view class="uni-text-sm">{{orderData?.dyVideoInfo?.dyComment}}</view>
						</view>
						<view class="icon uni-flex uni-flex-column uni-items-center">
							<text class="t-icon icon-a-ziyuan567"></text>
							<view class="uni-text-sm">{{orderData?.dyVideoInfo?.dyShare}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 商品信息 -->
			<view class="message-module uni-flex uni-mt-lg uni-border-radius-xl uni-p-sm">
				<view>
					<wd-img width="200rpx" height="200rpx" :src="orderData?.dyProductInfo?.cover" radius="20rpx">
						<template #error>
							<view class="uni-w-full uni-h-full uni-flex-center uni-font-color-gray error-wrap">加载失败
							</view>
						</template>
					</wd-img>
				</view>
				<view class="uni-ml-lg uni-text-26">
					<view class="uni-text-warp-2 uni-text-bold">{{orderData?.dyProductInfo?.title || '暂无商品名称'}}</view>
					<view class="uni-mt-sm">{{orderData?.dyShopInfo?.shopName || '暂无店铺名称'}}</view>
					<view class="uni-flex uni-justify-between uni-mt-sm">
						<view>自定义佣金比：--</view>
						<view>自定义售后率：--</view>
					</view>
					<view class="uni-mt-sm">佣金ROI：{{ orderData?.dataLabel ? compute(orderData,'realROI') :0 }}</view>
				</view>
			</view>
		</view>
		<view class="content">
			<!-- 订单详情 -->
			<wd-card custom-class="card-custom-class">
				<template #title>
					<view class="uni-text-bold uni-text-lg">订单详情</view>
				</template>
				<view class="uni-font-color-black uni-text-26">
					<view class="uni-flex uni-justify-between uni-mt-sm">
						<view>营销目标</view>
						<view class="uni-text-bold">{{getLabelByValue(leyitou_order_setting,orderData?.marketingGoal)}}
						</view>
					</view>
					<view v-if="orderData?.marketingGoal === 'LIVE_PROM_GOODS'"
						class="uni-flex uni-justify-between uni-mt-sm">
						<view>直播加热模式</view>
						<view class="uni-text-bold">
							{{getLabelByValue(leyitou_order_setting,orderData?.deliverySetting?.liveroom_heat_mode)}}
						</view>
					</view>
					<view class="uni-flex uni-justify-between uni-mt-sm">
						<view>优化目标</view>
						<view class="uni-text-bold">
							{{getLabelByValue(leyitou_order_setting,orderData?.deliverySetting?.external_action)}}
						</view>
					</view>
					<view class="uni-flex uni-justify-between uni-mt-sm">
						<view>定向设置</view>
						<view class="uni-text-bold">{{formatAudience(orderData?.audience)}}</view>
					</view>
					<view class="uni-flex uni-justify-between uni-mt-sm">
						<view>出价模式</view>
						<view class="uni-text-bold">
							{{getLabelByValue(leyitou_order_setting,orderData?.deliverySetting?.bid_mode)}}</view>
					</view>
					<view class="uni-flex uni-justify-between uni-mt-sm">
						<view>出价方式</view>
						<view class="uni-text-bold">
							{{getLabelByValue(leyitou_order_setting,orderData?.deliverySetting?.bid_type)}}</view>
					</view>
					<view class="uni-flex uni-justify-between uni-mt-sm">
						<view>投放时长</view>
						<view class="uni-text-bold">{{orderData?.deliverySetting?.delivery_time || '--'}}小时</view>
					</view>
					<view class="uni-flex uni-justify-between uni-mt-sm">
						<view>投放总金额</view>
						<view class="uni-text-bold">￥{{orderData?.amount || '0.00'}}</view>
					</view>
					<view class="uni-flex uni-justify-between uni-mt-sm">
						<view>基础金额</view>
						<view class="uni-text-bold">￥{{orderData?.deliverySetting?.amount || '0.00'}}</view>
					</view>
					<view class="uni-flex uni-justify-between uni-mt-sm">
						<view>追投金额</view>
						<view class="uni-text-bold">￥{{orderData?.addAmountInfo?.add_amount || '0.00'}}</view>
					</view>
					<view class="uni-flex uni-justify-between uni-mt-sm">
						<view>追投次数</view>
						<view class="uni-text-bold">{{orderData?.addAmountInfo?.add_amount_cnt || '0.00'}}</view>
					</view>
					<view v-if="orderData?.deliverySetting?.cpa_bid" class="uni-flex uni-justify-between">
						<view>目标出价</view>
						<view class="uni-text-bold">{{ orderData?.deliverySetting?.cpa_bid || '--' }}</view>
					</view>
					<view v-else class="uni-flex uni-justify-between">
						<view>目标支付ROI</view>
						<view class="uni-text-bold">{{ orderData?.deliverySetting?.roi_goal || '--' }}</view>
					</view>
				</view>
			</wd-card>
			<!-- echart图表 -->
			<wd-card>
				<template #title>
					<view class="uni-flex uni-justify-between uni-items-center">
						<view class="uni-text-bold uni-text-lg">订单详情</view>
						<view @click="openCalender" class="uni-text-xl icon">
							<text class="t-icon icon-riqi  "></text>
						</view>
					</view>
				</template>
				<orderEchart :dateRange="orderTime" :orderData="orderEchartData"/>
			</wd-card>
			<!-- 消耗 -->
			<wd-card custom-style="padding:20rpx">
				<view class="uni-text-26">
					<view class="uni-flex uni-justify-between uni-items-center uni-text-26">
						<view class="icon uni-text-26">
							<text class="t-icon icon-jine-tianchong"></text>
							消耗
						</view>
						<view class="uni-text-bold uni-font-color-black">
							￥{{ orderData?.dataLabel ? orderData?.dataLabel.statCost : 0 }}
						</view>
					</view>
					<view class="uni-flex uni-justify-between uni-items-center uni-mt-lg">
						<view class="icon uni-text-26">
							<text class="t-icon icon-24gf-playCircle"></text>
							播放量
						</view>
						<view class="uni-text-bold uni-font-color-black">
							{{   orderData?.dataLabel ? orderData?.dataLabel.totalPlay : 0}}
						</view>
					</view>
					<view class="uni-flex uni-items-center icon uni-text-26 uni-mt-lg">
						<text class="t-icon icon-a-44tubiao-204"></text>
						 成交数据
					</view>
					<view class="uni-flex uni-items-center uni-justify-around uni-text-26 uni-mt-lg">
						<view class="uni-flex uni-flex-column uni-items-center">
							<view class="uni-text-bold uni-font-color-black">{{ orderData?.dataLabel ? orderData?.dataLabel.payOrderCount : 0}}</view>
							<view class="uni-font-color-gray">成交订单数</view>
						</view>
						<view class="uni-flex uni-flex-column uni-items-center">
							<view class="uni-text-bold uni-font-color-black">{{ orderData?.dataLabel ? orderData?.dataLabel.payOrderAmount : 0}}</view>
							<view class="uni-font-color-gray">成交订单金额</view>
						</view>
						<view class="uni-flex uni-flex-column uni-items-center">
							<view class="uni-text-bold uni-font-color-black">{{orderData?.dataLabel ? compute(orderData, 'ROI') : 0}}</view>
							<view class="uni-font-color-gray">成交ROI</view>
						</view>
						<view class="uni-flex uni-flex-column uni-items-center">
							<view class="uni-text-bold uni-font-color-black">{{ orderData?.dataLabel ? compute(orderData, 'realROI') : 0}}</view>
							<view class="uni-font-color-gray">佣金ROI</view>
						</view>
					</view>
					<wd-divider></wd-divider>
					<view class="icon uni-text-26">
						<text class="t-icon icon-zhuanhua"></text>
						转化数据
					</view>
					<view class="uni-flex uni-items-center  uni-text-26 uni-mt-lg">
						<view class="uni-flex uni-flex-column uni-items-center uni-w-1-4">
							<view class="uni-text-bold uni-font-color-black">{{ orderData?.dataLabel ? orderData?.dataLabel.showCnt : 0}}</view>
							<view class="uni-font-color-gray">展示次数</view>
						</view>
						<view class="uni-flex uni-flex-column uni-items-center uni-w-1-4">
							<view class="uni-text-bold uni-font-color-black">{{ orderData?.dataLabel ? compute(orderData, 'CPM') : 0}}</view>
							<view class="uni-font-color-gray">千展费用</view>
						</view>
						<view class="uni-flex uni-flex-column uni-items-center uni-w-1-4">
							<view class="uni-text-bold uni-font-color-black">{{orderData?.dataLabel ? orderData?.dataLabel.clickCnt : 0}}</view>
							<view class="uni-font-color-gray">点击数</view>
						</view>
						<view class="uni-flex uni-flex-column uni-items-center uni-w-1-4">
							<view class="uni-text-bold uni-font-color-black">{{ orderData?.dataLabel ? compute(orderData, 'CTR') : 0}}</view>
							<view class="uni-font-color-gray">点击率</view>
						</view>
					</view>
					<view class="uni-flex uni-items-center  uni-text-26 uni-mt-lg">
						<view class="uni-flex uni-flex-column uni-items-center uni-w-1-4">
							<view class="uni-text-bold uni-font-color-black">{{  orderData?.dataLabel ? orderData?.dataLabel.payOrderCount : 0}}</view>
							<view class="uni-font-color-gray">转化数</view>
						</view>
						<view class="uni-flex uni-flex-column uni-items-center uni-w-1-4">
							<view class="uni-text-bold uni-font-color-black">{{ orderData?.dataLabel ? compute(orderData, 'CVR') : 0}}</view>
							<view class="uni-font-color-gray">转化率</view>
						</view>
						<view class="uni-flex uni-flex-column uni-items-center uni-w-1-4">
							<view class="uni-text-bold uni-font-color-black">{{ orderData?.dataLabel ? compute(orderData, 'CAC') : 0 }}</view>
							<view class="uni-font-color-gray">转化成本</view>
						</view>
					</view>
					<wd-divider></wd-divider>
					<view class="icon uni-text-26">
						<text class="t-icon icon-xianxing-_xiangshangqushi"></text>
						互动数据
					</view>
					<view class="uni-flex uni-items-center  uni-text-26 uni-mt-lg">
						<view class="uni-flex uni-flex-column uni-items-center uni-w-1-4">
							<view class="uni-text-bold uni-font-color-black">{{  orderData?.dataLabel ? orderData?.dataLabel.dyLike : 0}}</view>
							<view class="uni-font-color-gray">点赞次数</view>
						</view>
						<view class="uni-flex uni-flex-column uni-items-center uni-w-1-4">
							<view class="uni-text-bold uni-font-color-black">{{  orderData?.dataLabel ? orderData?.dataLabel.dyComment : 0}}</view>
							<view class="uni-font-color-gray">评论次数</view>
						</view>
						<view class="uni-flex uni-flex-column uni-items-center uni-w-1-4">
							<view class="uni-text-bold uni-font-color-black">{{ orderData?.dataLabel ? orderData?.dataLabel.dyShare : 0 }}</view>
							<view class="uni-font-color-gray">分享次数</view>
						</view>
						<view class="uni-flex uni-flex-column uni-items-center uni-w-1-4">
							<view class="uni-text-bold uni-font-color-black">{{  orderData?.dataLabel ? orderData?.dataLabel.dyFollow : 0 }}</view>
							<view class="uni-font-color-gray">新增粉丝数</view>
						</view>
					</view>
					<view class="uni-flex uni-items-center  uni-text-26 uni-mt-lg">
						<view class="uni-flex uni-flex-column uni-items-center uni-w-1-4">
							<view class="uni-text-bold uni-font-color-black">{{  orderData?.dataLabel ? orderData?.dataLabel.dyHomeVisited : 0}}</view>
							<view class="uni-font-color-gray">主页访问数</view>
						</view>
					</view>
				</view>
			</wd-card>
		</view>
		
		
		<wd-calendar
			ref="calendar" 
			type="daterange" 
			v-model="dateValue" 
			@confirm="handleConfirm" 
			:with-cell="false"
			:min-date="getMinDate()"
			:max-date="getMaxDate()"
			allow-same-day
			:z-index="9999"
		/>
		
	</view>
</template>

<script setup lang="ts">
	import type {
		SxtOrderVo,
	} from '@/api/index/types'
	import type{
		SxtDataLabelVo
	} from '@/sub_page/api/index/types'
	import {
		getOrderDetail,
		getOrderDataHour
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
		compute,
		getLabelByValue,
		formatAudience
	} from '@/utils/utils'
	import {
		getMaxDate,
		getMinDate,
		getTodayDate,
	} from '@/utils/date'
	import dayjs from 'dayjs'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	import orderEchart from './components/orderEchart.vue'

	const {
		leyitou_order_status,
		leyitou_live_status,
		leyitou_order_setting
	} = toRefs(useDict(['leyitou_order_status', 'leyitou_live_status', 'leyitou_order_setting']))

	//导航栏透明度
	const barOpacity = ref<number>(0)
	const orderId = ref()
	
	const dateValue = ref<number[]>([Date.now(),Date.now()])
	const orderTime = ref([getTodayDate(),getTodayDate()])
	// 详情数据源
	const orderData = ref<Partial<SxtOrderVo>>()
	// 图表数据源
	const orderEchartData = ref<SxtDataLabelVo[]>()
	
	const calendar = ref()
	// 根据页面滚动修改导航栏透明度
	const updateOpacity = (event:any) => {
		const scrollTop = event.scrollTop
		let height = getNavHeight()
		if(event.scrollTop <0){
			barOpacity.value = 0
		}else if(scrollTop <= height){
			barOpacity.value = Math.round(scrollTop/height*100)/100
		}else{
			barOpacity.value = 1
		}
	}
	
	
	// 获取订单详情数据
	const getOrderDetailApi = () => {
		if (!orderId.value) return
		getOrderDetail(orderId.value).then(res => {
			orderData.value = res.data
		})
	}
	// 获取echart数据
	const getOrderDataHourApi = () => {
		getOrderDataHour({
			orderId:orderId.value,
			timeStart:orderTime.value[0],
			timeEnd:orderTime.value[1]
		}).then(res => {
			orderEchartData.value = res.data
		})
	}

	const init = () => {
		if (orderId.value) {
			getOrderDetailApi()
			getOrderDataHourApi()
		}
	}

	const handleClickLeft = () => {
		uni.navigateBack()
	}
	
	const openCalender = () => {
		calendar.value?.open()
	}
	
	const handleConfirm = ({ value }:any) => {
		if(value.length===2){
			orderTime.value = [
				dayjs(value[0]).format("YYYY-MM-DD"),
				dayjs(value[1]).format("YYYY-MM-DD")
			]
			getOrderDataHourApi()
		}
	}
	

	onLoad((data : any) => {
		if (data.orderId) {
			orderId.value = data.orderId
			init()
		}
	})
</script>

<style scoped lang="scss">
	.body {
		background-color: #d8eaff;
	}

	.conent {
		background-color: #f6f7fb;
		padding-bottom: 20rpx;
	}

	.gradual-bg-color {
		background: linear-gradient(to bottom, #d8eaff 0%, #dff0ff 50%, #eaf4fd 75%, #edf4fa 100%);
		width: 100%;
	}

	.message-module {
		border: 1px solid white;
		background-color: #eef9ff;
	}

	.error-wrap {
		background-color: #f4f4f5;
	}

	.content {
		background-color: #f6f7fb;
		padding-bottom: 20rpx;
	}
</style>

<style lang="scss">
	page {
		background-color: #f6f7fb;
	}

	.card-custom-class {
		padding: 0rpx 20rpx 20rpx 20rpx !important;
	}
</style>