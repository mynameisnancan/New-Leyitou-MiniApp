<template>
	<!-- 筛选条件弹出框 -->
	<wd-popup 
		v-model="visible" 
		position="bottom" 
		custom-style="border-top-left-radius:20rpx;border-top-right-radius:20rpx;"
		@close="handleClose"
		lock-scroll
		close-on-click-modal
	>
		<view class="uni-p-lg">
			<wd-form ref="queryFormRef" :model="queryForm">
				<wd-cell-group border>
					<wd-input
						type="number"
						label="订单ID"
						prop="orderId"
						clearable
						v-model="queryForm.orderId"
						placeholder="请输入订单ID"
						:maxlength="19"
					/>
				</wd-cell-group>
				<wd-cell-group border>
						<wd-picker 
							:columns="leyitou_order_status" 
							label="订单状态" 
							v-model="queryForm.status" 
							@cancel="queryForm.status = undefined"
						/>
				</wd-cell-group>
				<wd-cell-group border>
						<wd-cell title="订单商品"  :value="selectedProductName" @click="openSelectCommodity" ellipsis is-link />
				</wd-cell-group>
			</wd-form>
		</view>
	</wd-popup>
	
	<basePopup 
		v-model:visible="popupVisible" 
		:apiUrl="getUniProductList" 
		:type="popupType"
		@confirm="popupConfirm"
	>
	</basePopup>
</template>

<script lang="ts" setup>
	
	import type {
		SxtUinOrderQuery
	}from '@/api/index/types'
	import {
		getUniProductList
	}from '@/api/index/index'
	import {
		useDict
	}from '@/utils/dict'
	import {
		defineModel,
		ref,
		toRefs
	}from 'vue'
	
	const visible = defineModel<boolean>('visible',{
		default:true
	})
	
	// 订单状态
	const {leyitou_order_status} = toRefs(useDict('leyitou_order_status'))
	
	const popupVisible = ref<boolean>(false)
	// 选择弹出框类型
	const popupType = ref<'commodity' | 'douYin'>()
	
	const queryFormRef = ref()
	const queryForm = ref<SxtUinOrderQuery>({
		orderId: undefined,
		status: undefined,
		productId: undefined,
		userId: undefined,
		authorId: undefined,
		timeStart: undefined,
		timeEnd: undefined
	})
	
	const selectedProductName = ref<string>('')
	
	// 筛选弹窗关闭事件
	const handleClose = () => {
	}
	
	// 打开选择订单商品页面
	const openSelectCommodity = () => {
		popupType.value = 'commodity'
		popupVisible.value = true
		
	}
	
	// 选择弹出框确认事件
	const popupConfirm = (selectedData:any) => {
		if(popupType.value === 'commodity'){
			selectedProductName.value = selectedData.label
			queryForm.value.productId = selectedData.value
		}
	}
</script>

<style>
</style>