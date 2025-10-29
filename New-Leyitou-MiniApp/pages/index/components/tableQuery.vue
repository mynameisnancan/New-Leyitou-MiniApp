<template>
	<!-- 筛选条件弹出框 -->
	<wd-popup 
		v-model="visible" 
		position="bottom" 
		custom-style="border-top-left-radius:20rpx;border-top-right-radius:20rpx;"
		@close="handleClose"
		lock-scroll
		close-on-click-modal
		closable 
	>
		<view class="uni-p-lg uni-mt-lg">
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
					<wd-picker
						:columns="leyitou_order_status" 
						label="订单状态" 
						v-model="queryForm.status" 
						@cancel="queryForm.status = undefined"
					/>
					<wd-cell title="订单商品" title-width="180rpx" :value="selectedProduct.label" @click="openSelectCommodity" ellipsis is-link />
					<wd-cell title="运营人" title-width="180rpx" :value="selectedUser.label" @click="openSelectUser" ellipsis is-link />
					<wd-cell title="付款抖音号" title-width="180rpx" :value="selectedDouYin.label" @click="openSelectDouYin" ellipsis is-link />
				</wd-cell-group>
			</wd-form>
			<view class="uni-flex uni-justify-around uni-mt-lg">
				<wd-button type="info" @click="reset">重置</wd-button>
				<wd-button @click="confirm">确定</wd-button>
			</view>
		</view>
	</wd-popup>
	
	<!-- 选择商品弹窗 -->
	<baseSelectCommodity 
		v-model:visible="commodityVisible" 
		@confirm="commodityConfirm"
	></baseSelectCommodity>
	<!-- 选择用户弹窗 -->
	<baseSelectUser
		v-model:visible="userVisible"
		@confirm="userConfirm"
	></baseSelectUser>
	<!-- 选择抖音号弹窗 -->
	<baseSelectDouYin
		v-model:visible="douYinVisible"
		@confirm="douYinConfirm"
	></baseSelectDouYin>
</template>

<script lang="ts" setup>
	
	import type {
		SxtUinOrderQuery
	}from '@/api/index/types'
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
	
	const commodityVisible = ref<boolean>(false)
	const userVisible = ref<boolean>(false)
	const douYinVisible = ref<boolean>(false)
	// 选择弹出框类型
	const popupType = ref<'commodity' | 'douYin' |'user'>()
	
	const queryFormRef = ref()
	const queryForm = defineModel<SxtUinOrderQuery>('queryForm',{
		default:{
			orderId: undefined,
			status: undefined,
			productId: undefined,
			userId: undefined,
			authorId: undefined,
			timeStart: undefined,
			timeEnd: undefined
		}
	})
	const apiUrl = ref()
	// 订单商品
	const selectedProduct = ref<any>({
		label:'',
		value:''
	})
	// 运营人
	const selectedUser = ref<any>({
		label:'',
		value:''
	})
	// 抖音账号
	const selectedDouYin = ref<any>({
		label:'',
		value:''
	})
	
	// 筛选弹窗关闭事件
	const handleClose = () => {
	}
	
	// 打开选择订单商品弹窗
	const openSelectCommodity = () => {
		commodityVisible.value = true
	}
	// 打开选择运营人弹窗
	const openSelectUser = () => {
		userVisible.value = true
	}
	// 打开选择抖音账号弹窗
	const openSelectDouYin = () => {
		douYinVisible.value = true
	}
	
	// 商品选择弹出框确认事件
	const commodityConfirm = (selectedData:any) => {
		selectedProduct.value = selectedData
		queryForm.value.productId = selectedData.value
	}
	// 用户选择弹出框确认事件
	const userConfirm = (selectedData:any) => {
		selectedUser.value = selectedData
		queryForm.value.userId = selectedData.value
	}
	// 抖音账号选择弹出框确认事件
	const douYinConfirm = (selectedData:any) => {
		selectedDouYin.value = selectedData
		queryForm.value.authorId = selectedData.value
	}
	
	// 重置筛选条件
	const reset = () => {
		queryForm.value = {
			orderId: undefined,
			status: undefined,
			productId: undefined,
			userId: undefined,
			authorId: undefined,
			timeStart: undefined,
			timeEnd: undefined
		}
		selectedProduct.value = {
			label:'',
			value:''
		}
		selectedUser.value = {
			label:'',
			value:''
		}
		selectedDouYin.value = {
			label:'',
			value:''
		}
		visible.value = false
	}
	
	const confirm = () => {
		visible.value = false
	}
</script>

<style>
</style>