<template>
	<!-- 筛选条件弹出框 -->
	<wd-popup v-model="visible" position="bottom"
		custom-style="border-top-left-radius:20rpx;border-top-right-radius:20rpx;" lock-scroll close-on-click-modal
		closable>
		<view class="uni-p-lg uni-mt-lg">
			<wd-cell-group border>
				<wd-picker :columns="sxt_bud_marketing_goal" label="订单类型" v-model="queryForm.marketingGoal" clearable
					label-width="180rpx" />
				<wd-picker :columns="createStatusOptions" label="创建状态" v-model="queryForm.createStatus" clearable
					label-width="180rpx" />
				<wd-cell title="付款抖音号" title-width="180rpx" :value="selectedDouYin?.dyAuthorInfo?.nickName"
					@click="openSelectDouYin" ellipsis is-link />
				<wd-cell title="订单商品" title-width="180rpx" :value="selectedProduct?.dyProductInfo?.title"
					@click="openSelectCommodity" ellipsis is-link />
			</wd-cell-group>
			<view class="uni-flex uni-justify-around uni-mt-lg">
				<wd-button type="info" @click="reset">重置</wd-button>
				<wd-button @click="confirm">确定</wd-button>
			</view>
		</view>

	</wd-popup>


	<!-- 选择抖音号弹窗 -->
	<baseSelectDouYin v-model:visible="douYinVisible" v-model:selectedValue="douYinSelectedValue"
		@confirm="douYinConfirm"></baseSelectDouYin>

	<!-- 选择商品弹窗 -->
	<baseSelectCommodity v-model:visible="commodityVisible" @confirm="commodityConfirm"></baseSelectCommodity>
</template>

<script setup lang="ts">
	import type {
		DyAuthorAuthVo,
		QcUniProductVo
	} from '@/api/index/types'
	import type {
		SxtOrderCreateRecordQuery,
	} from '@/sub_page/api/createRecord/types'
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

	const queryForm = defineModel<SxtOrderCreateRecordQuery>('queryForm', {
		default: {
			awemeId: undefined,
			productId: undefined,
			marketingGoal: undefined,
			createStatus: undefined,
		}
	})

	// 抖音账号
	const selectedDouYin = ref<DyAuthorAuthVo>()
	// 选择抖音弹窗默认选中
	const douYinSelectedValue = ref()
	const douYinVisible = ref<boolean>(false)

	// 订单商品
	const selectedProduct = ref<QcUniProductVo>()
	// 选择商品弹窗
	const commodityVisible = ref<boolean>(false)

	const createStatusOptions = [
		{ label: '未处理', value: 0 },
		{ label: '已取消', value: 2 },
		{ label: '创建成功', value: 1 },
		{ label: '创建失败', value: 3 },
	]

	const {
		sxt_bud_marketing_goal
	} = toRefs(useDict(['sxt_bud_marketing_goal']))

	// 打开选择抖音账号弹窗
	const openSelectDouYin = () => {
		douYinSelectedValue.value = selectedDouYin.value?.authorId || null
		douYinVisible.value = true
	}
	// 抖音账号选择弹出框确认事件
	const douYinConfirm = (selectedData : any) => {
		selectedDouYin.value = selectedData
		queryForm.value.awemeId = selectedData.qcAwemeId
	}


	// 打开选择订单商品弹窗
	const openSelectCommodity = () => {
		commodityVisible.value = true
	}
	// 商品选择弹出框确认事件
	const commodityConfirm = (selectedData : any) => {
		selectedProduct.value = selectedData
		queryForm.value.productId = selectedData.productId
	}

	const reset = () => {
		queryForm.value = {
			awemeId: undefined,
			productId: undefined,
			marketingGoal: undefined,
			createStatus: undefined,
		}
		visible.value = false
	}

	const confirm = () => {
		visible.value = false
	}
</script>

<style scoped lang="scss">

</style>