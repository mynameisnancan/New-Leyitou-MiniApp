<template>
	<!-- 筛选条件弹出框 -->
	<wd-popup v-model="visible" position="bottom"
		custom-style="border-top-left-radius:20rpx;border-top-right-radius:20rpx;" lock-scroll close-on-click-modal
		closable>
		<view class="uni-p-lg uni-mt-lg">
			<wd-cell-group border>
				<wd-input type="number" label="广告账户ID" prop="advertiserId" clearable v-model="queryForm.advertiserId"
					placeholder="广告账户ID" :maxlength="19" label-width="180rpx" />
				<wd-input type="number" label="平台达人ID" prop="authorId" clearable v-model="queryForm.authorId"
					placeholder="平台达人ID" :maxlength="19" label-width="180rpx" />
				<wd-input type="number" label="订单ID" prop="orderId" clearable v-model="queryForm.orderId"
					placeholder="订单ID" :maxlength="19" label-width="180rpx" />
				<wd-picker :columns="sxt_order_from" label="推广订单来源" v-model="queryForm.orderFrom" clearable
					label-width="180rpx" />
				<wd-picker :columns="sxt_opt_type" label="操作类型" v-model="queryForm.optType" clearable
					label-width="180rpx" />
			</wd-cell-group>
			<view class="uni-flex uni-justify-around uni-mt-lg">
				<wd-button type="info" @click="reset">重置</wd-button>
				<wd-button @click="confirm">确定</wd-button>
			</view>
		</view>
	</wd-popup>
</template>

<script setup lang="ts">
	import type {
		SxtOrderAddRecordQuery,
	} from '@/sub_page/api/addRecord/types'
	import {
		useDict
	} from '@/utils/dict'
	import {
		defineModel,
		ref,
		toRefs,
		withDefaults,
		defineProps,
		defineEmits
	} from 'vue'

	const visible = defineModel("visible", {
		default: true
	})

	const queryForm = defineModel<SxtOrderAddRecordQuery>('queryForm', {
		default: {
			advertiserId: undefined,
			authorId: undefined,
			orderId: undefined,
			orderFrom: undefined,
			optType: undefined,
		}
	})

	const {
		sxt_order_from,
		sxt_opt_type
	} = toRefs(useDict(['sxt_order_from', 'sxt_opt_type'], true))
	const reqSuccessOptions = [
		{ label: '失败', value: 0 },
		{ label: '成功', value: 1 }
	]

	const reset = () => {
		queryForm.value = {
			advertiserId: undefined,
			authorId: undefined,
			orderId: undefined,
			orderFrom: undefined,
			optType: undefined,
		}
		visible.value = false
	}

	const confirm = () => {
		visible.value = false
	}
</script>

<style lang="scss">

</style>