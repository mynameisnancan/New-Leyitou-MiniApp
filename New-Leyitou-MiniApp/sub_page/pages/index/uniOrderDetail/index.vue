<template>
	<wd-navbar 
		fixed 
		placeholder 
		title="全域订单详情" 
		left-arrow 
		safeAreaInsetTop
		:custom-style="`background-color: rgba(216, 234, 255,${barOpacity}) !important;`"
	/>
	<view class="body">
		<view class="gradual-bg-color uni-p-lg">
			<!-- 抖音号模板 -->
			<view class="message-module uni-flex uni-items-center uni-justify-around uni-p-sm uni-border-radius-xl uni-text-bold">
				<view class="uni-flex uni-flex-wrap uni-items-center uni-flex-column">
					<view>
						<wd-img 
							width="100rpx" 
							height="100rpx" 
							round 
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
					<wd-img
						width="100rpx" 
						height="100rpx" 
						round 
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
					<wd-img width="200rpx" height="200rpx" :src="orderData?.dyProductInfo?.cover" radius="20rpx"/>
				</view>
				<view class="uni-ml-lg uni-text-26 ">
					<view class="uni-text-bold uni-text-warp-2">{{orderData?.dyProductInfo?.title || '暂无商品名称'}}</view>
					<view @click="copyStr(orderData?.dyProductInfo?.productId || '')" class="uni-mt-sm uni-font-color-gray uni-flex uni-items-center">
						商品ID:{{orderData?.dyProductInfo?.productId}}
						<wd-icon name="file-copy" size="30rpx"></wd-icon>
					</view>
					<view class="uni-flex uni-items-center uni-mt-sm">
						<view>
							￥<text class="uni-font-color-red">{{orderData?.dyProductInfo?.price}}</text>
						</view>
						<view class="uni-ml-lg">库存：{{orderData?.dyProductInfo?.productStock}}</view>
						<view class="uni-ml-lg">
							总销量：
							<text class="uni-font-color-red">{{orderData?.dyProductInfo?.sales}}</text>
						</view>
					</view>
			
					<view class="uni-flex uni-mt-sm">
						<view class="uni-text-warp-1">
							{{orderData?.dyShopInfo?.shopName}}
						</view>
						<view  @click="copyStr(orderData?.dyShopInfo?.shopId || '')" class="uni-ml-sm uni-font-color-gray uni-flex uni-items-center">
							ID:{{orderData?.dyShopInfo?.shopId}}
							<wd-icon name="file-copy" size="30rpx"></wd-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
		<wd-card>
			<template #title>
				<view class="uni-flex uni-justify-between uni-items-center">
					<view class="uni-text-bold uni-text-26">订单详情</view>
					<view @click="openCalender" class="uni-text-xl icon">
						<text class="t-icon icon-riqi  "></text>
					</view>
				</view>
				<orderEchart :dateRange="orderTime" :orderData="uniOrderData" />
			</template>
			<view>
			</view>
		</wd-card>
		
		
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
		SxtUniOrderDetailMergeVo,
		SxtUniOrderDataMergeVo
	}from '@/sub_page/api/index/types'
	import type {
		SxtUniOrderDataInfo
	}from '@/api/index/types'
	import {
		getUniOrderDetail,
		getUniOrderData
	}from '@/sub_page/api/index/index'
	import {
		useDict
	}from '@/utils/dict'
	import {
		ref,
		toRefs
	}from 'vue'
	import {
		getNavHeight,
		copyStr
	}from '@/utils/utils'
	import {
		getTodayDate
	}from '@/utils/date'
	import dayjs from 'dayjs'
	import {onLoad,onPageScroll} from '@dcloudio/uni-app'
	import orderEchart from './components/orderEchart'
	import {
		getMaxDate,
		getMinDate
	}from '@/utils/date'
	
	const orderId = ref<number>()
	const dateValue = ref<number|number[]>(Date.now())
	const orderTime = ref([getTodayDate(),getTodayDate()])
	const orderData = ref<SxtUniOrderDetailMergeVo>({
		status:undefined
	})
	//导航栏透明度
	const barOpacity = ref<number>(1)
	// ehcart数据源
	const uniOrderData = ref<SxtUniOrderDataMergeVo[]>([])
	const calendar = ref()
	// 根据页面滚动修改导航栏透明度
	const updateOpacity = (event:any) => {
		const scrollTop = event.scrollTop
		let height = getNavHeight()
		barOpacity.value = Math.round(scrollTop/height*100)/100
	}
	
	const {leyitou_order_status} = toRefs(useDict('leyitou_order_status'))
	
	// 获取echart图表数据
	const getUniOrderDataApi = () => {
		if(!orderId.value)return
		getUniOrderData({
			orderId:orderId.value,
			timeStart:orderTime.value[0],
			timeEnd:orderTime.value[1]
		}).then(res => {
			uniOrderData.value = res.data
		})
	}
	
	// 获取订单详情数据
	const getUniOrderDetailApi = () => {
		if(!orderId.value)return
		getUniOrderDetail(orderId.value).then(res => {
			orderData.value = res.data
		})
	}
	const init = () => {
		if(orderId.value){
			getUniOrderDetailApi()
			getUniOrderDataApi()
		}
	}
	
	const openCalender = () => {
		calendar.value?.open()
	}
	
	const handleConfirm = ({ value }:any) => {
		console.log(value)
		if(value.length===2){
			orderTime.value = [
				dayjs(value[0]).format("YYYY-MM-DD"),
				dayjs(value[1]).format("YYYY-MM-DD")
			]
			getUniOrderDataApi()
		}
	}
	
	
	
	onLoad((data:any) => {
		if(data.orderId){
			orderId.value = data.orderId
			init()
		}
	})
	
	onPageScroll((event:any) => {
		updateOpacity(event)
	})
	
	// // 允许当前文件样式穿透
	// defineOptions({
	// 	options: {
	// 		styleIsolation: 'shared'
	// 	}
	// })
	
</script>

<style lang="scss" scoped>
	.body{
		background-color: #f6f7fb;
	}
	.gradual-bg-color{
		 background: linear-gradient(to bottom, #d8eaff 0%,#dff0ff 50%, #eaf4fd 75%,#edf4fa 100%);
		 width: 100%;
	}
	.message-module{
		border: 1px solid white;
		background-color: #eef9ff;
	}
</style>
<style lang="scss">
	page{
		background-color: #f6f7fb;
	}
</style>