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
						clearable
					/>
					<wd-cell title="订单商品" title-width="180rpx" :value="selectedProduct.label" @click="openSelectCommodity" ellipsis is-link />
					<wd-cell title="运营人" title-width="180rpx" :value="selectedUser.label" @click="openSelectUser" ellipsis is-link />
					<wd-cell title="付款抖音号" title-width="180rpx" :value="selectedDouYin.label" @click="openSelectDouYin" ellipsis is-link />
					<wd-cell v-if="queryType === 'order'" title="被投抖音号" title-width="180rpx" :value="selectedByDouYin.label" @click="openSelectByDouYin" ellipsis is-link />
					<wd-cell v-if="queryType === 'order'" title="订单素材" title-width="180rpx" :value="selectedOrder.label" @click="openSelectOrder" ellipsis is-link />
					<wd-picker
						v-if="queryType === 'order'"
						:columns="dateTypes" 
						label="时间类型" 
						v-model="queryForm.timeType" 
					/>
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
		v-model:selectedValue="douYinSelectedValue"
		@confirm="douYinConfirm"
	></baseSelectDouYin>
	<!-- 选择订单素材弹窗 -->
	<baseSelectOrder
		v-model:visible="orderVisible"
		@confirm="orderConfirm"
	></baseSelectOrder>
</template>

<script lang="ts" setup>
	
	import type {
		SxtUinOrderQuery,
		SxtOrderQuery
	}from '@/api/index/types'
	import {
		useDict
	}from '@/utils/dict'
	import {
		defineModel,
		ref,
		toRefs,
		withDefaults,
		defineProps,
		defineEmits
	}from 'vue'
	
	type PropTypes = {
		queryType:'uniOrder' | 'order',
		queryForm: SxtUinOrderQuery|SxtOrderQuery
	}
	
	const emits = defineEmits(['confirm'])
	
	const visible = defineModel<boolean>('visible',{
		default:true
	})
	
	const props = withDefaults(defineProps<PropTypes>(),{
		queryType: 'uniOrder',
		queryForm: () => ({
			orderId: undefined,
			status: undefined,
			productId: undefined,
			userId: undefined,
			authorId: undefined,
			timeStart: undefined,
			timeEnd: undefined
		})
	})
	
	// 订单状态
	const {leyitou_order_status} = toRefs(useDict('leyitou_order_status'))
	// 时间类型
	const dateTypes:LabelValue[] = [
		{
			label:'数据时间',
			value:0
		},
		{
			label:'创建时间',
			value:1
		},
	]
	
	// 选择商品弹窗
	const commodityVisible = ref<boolean>(false)
	// 选择用户弹窗
	const userVisible = ref<boolean>(false)
	// 选择抖音账号弹窗
	const douYinVisible = ref<boolean>(false)
	// 选择订单素材弹窗
	const orderVisible = ref<boolean>(false)
	// 选择弹出框类型
	const popupType = ref<'commodity' | 'douYin' |'user'>()
	
	const queryFormRef = ref()
	const apiUrl = ref()
	// 选择抖音弹窗默认选中
	const douYinSelectedValue = ref()
	const douYinType = ref<'selectedDouYin'|'selectedByDouYin'>()
	// 订单商品
	const selectedProduct = ref<LabelValue>({
		label:'',
		value:''
	})
	// 运营人
	const selectedUser = ref<LabelValue>({
		label:'',
		value:''
	})
	// 抖音账号
	const selectedDouYin = ref<LabelValue>({
		label:'',
		value:''
	})
	// 被投抖音号
	const selectedByDouYin = ref<LabelValue>({
		label:'',
		value:''
	})
	// 订单素材
	const selectedOrder = ref<LabelValue>({
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
		douYinSelectedValue.value = selectedDouYin.value.value
		douYinType.value = 'selectedDouYin'
		douYinVisible.value = true
	}
	// 打开被抖音账号弹窗
	const openSelectByDouYin = () => {
		douYinSelectedValue.value = selectedByDouYin.value.value
		douYinType.value = 'selectedByDouYin'
		douYinVisible.value = true
	}
	// 打开选中订单素材弹窗
	const openSelectOrder = () => {
		orderVisible.value = true
	}
	
	// 商品选择弹出框确认事件
	const commodityConfirm = (selectedData:any) => {
		selectedProduct.value = selectedData
		// queryForm.value.productId = selectedData.value
		emits('confirm',props.queryForm)
	}
	// 用户选择弹出框确认事件
	const userConfirm = (selectedData:any) => {
		selectedUser.value = selectedData
		// queryForm.value.userId = selectedData.value
		emits('confirm',props.queryForm)
	}
	// 抖音账号选择弹出框确认事件
	const douYinConfirm = (selectedData:any) => {
		console.log(selectedData)
		console.log(props.queryForm)
		console.log(douYinType.value)
		if(douYinType.value === 'selectedDouYin' && 'authorId' in props.queryForm){
			selectedDouYin.value = selectedData
			// queryForm.value.authorId = selectedData.value
		}else if(douYinType.value === 'selectedByDouYin' && 'uid' in props.queryForm){
			selectedByDouYin.value = selectedData
			// queryForm.value.uid = selectedData.value
		}
		emits('confirm',props.queryForm)
	}
	// 选择订单素材弹窗确认事件
	const orderConfirm = (selectedData:any) => {
		selectedOrder.value = selectedData
		emits('confirm',props.queryForm)
	}
	
	// 重置筛选条件
	const reset = () => {
		emits('confirm',null)
		// queryForm.value = {
		// 	orderId: undefined,
		// 	status: undefined,
		// 	productId: undefined,
		// 	userId: undefined,
		// 	authorId: undefined,
		// 	timeStart: undefined,
		// 	timeEnd: undefined
		// }
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