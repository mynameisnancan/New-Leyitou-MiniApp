<template>
	<!-- 筛选条件弹出框 -->
	<wd-popup v-model="visible" position="bottom"
		custom-style="border-top-left-radius:20rpx;border-top-right-radius:20rpx;" lock-scroll close-on-click-modal
		closable>
		<view class="uni-p-lg uni-mt-lg">
			<wd-cell-group border>
				<wd-input type="number" label="商品ID" prop="productId" clearable v-model="queryForm.productId"
					placeholder="请输入商品ID" :maxlength="19" label-width="180rpx" />
				<wd-cell title="抖音号" title-width="180rpx" :value="selectedDouYin?.dyAuthorInfo?.nickName"
					@click="openSelectDouYin" ellipsis is-link />
				<wd-picker :columns="sxt_channel_type" label="订单类型" v-model="queryForm.channelType" clearable
					label-width="180rpx" />
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
		
</template>

<script setup lang="ts">
	import type {
		UniProductQuery,
	} from '@/api/index/type'
	import type {
		DyAuthorAuthVo,
	} from '@/api/index/types'
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

	const queryForm = defineModel<UniProductQuery>('queryForm', {
		default: {
			productId: undefined,
			awemeId: undefined,
			channelType:undefined
		}
	})
	
	const {
		sxt_channel_type
	} = toRefs(useDict(['sxt_channel_type']))
	
	// 抖音账号
	const selectedDouYin = ref<DyAuthorAuthVo>()
	// 选择抖音弹窗默认选中
	const douYinSelectedValue = ref()
	const douYinVisible = ref<boolean>(false)
	
	
	
	// 打开选择抖音账号弹窗
	const openSelectDouYin = () => {
		douYinSelectedValue.value = selectedDouYin.value?.authorId || null
		douYinVisible.value = true
	}
	// 抖音账号选择弹出框确认事件
	const douYinConfirm = (selectedData : DyAuthorAuthVO) => {
		selectedDouYin.value = selectedData
		queryForm.value.awemeId = selectedData?.dyAuthorInfo?.uid
	}
	
	const reset = () => {
		queryForm.value = {
			productId: undefined,
			awemeId: undefined,
			channelType:undefined
		}
		visible.value = false
	}
	
	const confirm = () => {
		visible.value = false
	}
	
</script>

<style lang="scss">

</style>