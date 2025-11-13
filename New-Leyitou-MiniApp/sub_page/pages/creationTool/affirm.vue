<template>
	<view class="page-class">
		<wd-navbar title="投放信息确认" left-arrow @click-left="handleClickLeft" placeholder fixed
			safeAreaInsetTop></wd-navbar>
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
				<view class="uni-flex uni-items-center uni-font-color-theme uni-text-bold">
					<wd-img v-if="douYinData?.dyAuthorInfo?.avatar" width="50rpx" height="50rpx" round
						:src="douYinData?.dyAuthorInfo?.avatar" />
					<wd-img v-else width="50rpx" height="50rpx" round
						src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
					<view class="uni-ml-lg">
						{{ douYinData?.dyAuthorInfo?.nickName }}
					</view>
				</view>
			</view>
			<view class="uni-flex uni-justify-between">
				<view class="uni-w-1-5">商品信息</view>
				<view class="uni-flex uni-items-center uni-font-color-theme uni-text-bold">
					<view>
						{{ productData.length }}个商品
					</view>
				</view>
			</view>
		</wd-card>

		<view class="buttom-btn">
			<view class="uni-flex uni-justify-around uni-mt-lg">
				<wd-button @click="goBack" custom-class="uni-w-1-4" type="info">取消</wd-button>
				<wd-button @click="submit" custom-class="uni-w-1-4">确定</wd-button>
			</view>
		</view>

		<wd-toast />
	</view>
</template>

<script setup lang="ts">
	import type {
		QcUniProductVo,
		DyAuthorAuthVo
	} from '@/api/index/types'
	import type {
		CreateOrderQuery,
		CreateSxtUniOrderInfoVo
	} from '@/sub_page/api/creationTool/types'
	import {
		createUniOrder
	} from '@/sub_page/api/creationTool/index'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import { useToast } from 'wot-design-uni'
	import {
		ref,
		toRefs
	} from 'vue'
	import {
		useDict
	} from '@/utils/dict'
	import {
		goBack
	} from '@/utils/utils'
	import dayjs from 'dayjs'

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
	const createOrderQuery = ref<CreateOrderQuery>({
		createWay: 0,
		createTime: [dayjs().format('YYYY-MM-DD HH:mm:ss')],
		list: [],
	})
	const toast = useToast()
	const douYinData = ref<DyAuthorAuthVo>()
	const productData = ref<QcUniProductVo[]>([])

	const { sxt_order_bid_type } = toRefs(useDict(['sxt_order_bid_type']))
	const { sxt_order_delivery_time } = toRefs(useDict(['sxt_order_delivery_time'], true))

	const handleClickLeft = () => {
		uni.navigateBack()
	}

	const submit = async () => {
		createOrderQuery.value.uniList = [createData.value];
		try {
			const res = await createUniOrder(createOrderQuery.value)
			toast.success(res.msg || '操作成功');
			setTimeout(() => {
				goBack()
			}, 500)
		} catch { }
	}

	onLoad(() => {
		const storageData = uni.getStorageSync('affirm-data')
		if (storageData) {
			createData.value = storageData.formData
			createOrderQuery.value = storageData.createOrderQuery
			douYinData.value = storageData?.douYinData
			productData.value = [storageData?.productData]
		}

	})
</script>
<style scoped lang="scss">
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
		min-height: 100vh;
	}

	.card-custom-class {
		padding-bottom: 20rpx !important;
		margin-top: 20rpx !important;
	}
	// 设置黑夜模式下的样式
	.wot-theme-dark{
		.buttom-btn{
			background: #1d1e1f !important;
		}
	}
</style>