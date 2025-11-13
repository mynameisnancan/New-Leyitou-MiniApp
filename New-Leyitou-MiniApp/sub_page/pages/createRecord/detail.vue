<template>
	<view class="page-class">
		<wd-navbar title="投放记录详情" left-arrow @click-left="handleClickLeft" placeholder fixed
			safeAreaInsetTop></wd-navbar>
		<wd-card title="" custom-class="card-cutom-class">
			<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view>付款抖音号</view>
				<view class="uni-flex uni-items-center uni-font-color-theme uni-text-bold">
					<wd-img v-if="detailData?.dyAuthorInfo?.avatar" width="50rpx" height="50rpx" round
						:src="detailData?.dyAuthorInfo?.avatar" />
					<wd-img v-else width="50rpx" height="50rpx" round
						src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
					<view class="uni-ml-lg">
						{{ detailData?.dyAuthorInfo?.nickName }}
					</view>
				</view>
			</view>
			<view v-if="detailData?.marketingGoal === 'LIVE_PROM_GOODS'"
				class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view>视频标题</view>
				<view>{{detailData?.dyVideoInfo?.title}}</view>
			</view>
			<view v-if="detailData?.marketingGoal === 'LIVE_PROM_GOODS'"
				class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view>视频作者</view>
				<view> {{ detailData.dyAuthorInfo?.nickName || '--' }}</view>
			</view>
			<view v-if="detailData?.marketingGoal === 'VIDEO_PROM_GOODS'"
				class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view class="uni-w-200">商品名称</view>
				<view>{{detailData?.dyProductInfo?.title || '--' }}</view>
			</view>
			<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view>营销目标</view>
				<view>{{getLabelByValue(sxt_bud_marketing_goal,detailSetting?.marketing_goal) || '--'}}</view>
			</view>
			<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view>投放时长</view>
				<view>{{detailSetting?.delivery_setting?.delivery_time || '--'}}小时</view>
			</view>
			<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view>出价方式</view>
				<view>
					<text> {{getLabelByValue(leyitou_order_setting,detailSetting?.delivery_setting?.bid_mode)}}</text>
					<text v-if="detailSetting?.delivery_setting?.bid_mode">-</text>
					<text>{{getLabelByValue(leyitou_order_setting,detailSetting?.delivery_setting?.bid_type)}}</text>
				</view>
			</view>
			<view v-if="detailSetting?.delivery_setting?.cpa_bid"
				class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view>优化目标出价</view>
				<view>{{ detailSetting?.delivery_setting.cpa_bid || '--' }}</view>
			</view>
			<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view>目标支付ROI</view>
				<view>{{detailSetting?.delivery_setting?.roi_goal || '--'}}</view>
			</view>
			<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view>订单创建结果</view>
				<view>{{detailData.reqResult || '--'}}</view>
			</view>
			<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view>订单创建状态</view>
				<view>{{getCreateStatus(detailData.createStatus) || '--'}}</view>
			</view>
			<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view>订单创建人</view>
				<view>{{ detailData?.userInfo?.userName || '--' }}</view>
			</view>
			<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
				<view>操作时间</view>
				<view>{{detailData?.operationTime || '--'}}</view>
			</view>
		</wd-card>
	</view>
</template>

<script setup lang="ts">
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import type {
		SxtOrderCreateRecordVo
	} from '@/sub_page/api/createRecord/types'
	import {
		ref,
		toRefs
	} from 'vue'
	import {
		useDict
	} from '@/utils/dict'
	import {
		getLabelByValue
	} from '@/utils/utils'

	const {
		sxt_bud_marketing_goal,
		leyitou_order_setting
	} = toRefs(useDict(['sxt_bud_marketing_goal', 'leyitou_order_setting']))
	const {
		leyitou_sxt_create_status
	} = toRefs(useDict(['leyitou_sxt_create_status'], true))
	const detailData = ref<SxtOrderCreateRecordVo>({})
	const detailSetting = ref()

	const handleClickLeft = () => {
		uni.navigateBack()
	}

	const getCreateStatus = (status : number) => {
		return leyitou_sxt_create_status.value.find(
			(item) => Number(item.value) === status,
		)?.label;
	};

	onLoad(() => {
		const storeageData = uni.getStorageSync('createRecord')
		if (storeageData) {
			detailData.value = storeageData
			detailSetting.value = JSON.parse(storeageData.reqParam);
			console.log(detailData.value)
			console.log(detailSetting.value)
		}
	})
</script>

<style scoped lang="scss">
</style>

<style lang="scss">
	.card-cutom-class {
		margin-top: 10rpx !important;
		padding: 10rpx 20rpx !important;
	}

	.page-class {
		background-color: #f6f7fb;
		min-height: 100vh;
	}
</style>