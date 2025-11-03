<template>
	<wd-navbar title="投放信息确认" left-arrow @click-left="handleClickLeft" placeholder fixed safeAreaInsetTop></wd-navbar>
	<wd-card title="投放设置" custom-class="card-custom-class">
		<view class="uni-flex uni-justify-between">
			<view>出价类型</view>
			<view>
				<baseTag :options="sxt_order_bid_type" :value="createData.delivery_setting?.bid_type"></baseTag>
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>支付ROI</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{ createData.delivery_setting?.roi_goal || '--' }}
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>投放时长</view>
			<view>
				<baseTag :options="sxt_order_delivery_time" :value="createData.delivery_setting?.delivery_time">
				</baseTag>
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>投放金额</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{ createData.delivery_setting?.amount || '--' }}
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>是否开启智能优惠券</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{createData.delivery_setting?.qcpx_mode === 'QCPX_MODE_ON'? '开启': '关闭'}}
			</view>
		</view>
	</wd-card>
	<wd-card title="投放设置" custom-class="card-custom-class">
		<view class="uni-flex uni-justify-between">
			<view>营销目标</view>
			<view class="uni-font-color-theme uni-text-bold">
				<wd-tag custom-class="space" type="primary">商品全域</wd-tag>
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>抖音号信息</view>
			<view class="uni-font-color-theme uni-text-bold">
				 0
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>商品信息</view>
			<view class="uni-font-color-theme uni-text-bold">
			 0
			</view>
		</view>
	</wd-card>
	
	<view class="uni-flex uni-justify-around uni-mt-lg">
		<wd-button @click="goBack" custom-class="uni-w-1-4" type="info">取消</wd-button>
		<wd-button @click="submit" custom-class="uni-w-1-4">确定</wd-button>
	</view>
</template>

<script setup lang="ts">
	import type {
		CreateOrderQuery,
		CreateSxtUniOrderInfoVo
	} from '@/sub_page/api/creationTool/types'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		toRefs
	} from 'vue'
	import {
		useDict
	} from '@/utils/dict'
	import {
		goBack
	}from '@/utils/utils'

	const createData = ref<CreateSxtUniOrderInfoVo>({
		marketing_goal: 'VIDEO_PROM_GOODS',
		advertiser_id: undefined,
		aweme_id: undefined,
		product_id: undefined,
		delivery_setting: {
			bid_type: 'AUTO_BID',
			roi_goal: 1,
			delivery_time: 2,
			amount: 0,
			qcpx_mode: 'QCPX_MODE_ON',
		},
	});

	const { sxt_order_bid_type } = toRefs(useDict(['sxt_order_bid_type']))
	const { sxt_order_delivery_time } = toRefs(useDict(['sxt_order_delivery_time'], true))
	
	const handleClickLeft = () => {
		uni.navigateBack()
	}
	
	const submit = () => {
		
	}

	onLoad(() => {
		createData.value = uni.getStorageSync('affirm')
		console.log(createData.value)
	})
</script>
<style scoped lang="scss">
	
</style>
<style lang="scss">
	page{
		background-color: #f6f7fb;
	}
	.card-custom-class{
		padding-bottom: 20rpx !important;
	}
</style>