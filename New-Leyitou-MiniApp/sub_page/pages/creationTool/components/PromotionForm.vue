<template>
	<wd-form ref="formRef" :model="formData">
		<wd-cell-group border>
			<wd-cell title="付款抖音号" title-width="180rpx" :value="selectedDouYin?.dyAuthorInfo?.nickName" @click="openSelectDouYin" ellipsis
				is-link />
			<wd-cell title="目标商品" title-width="180rpx" :value="selectedProduct?.dyProductInfo?.title" @click="openSelectCommodity"
				ellipsis is-link />
			<wd-cell title="出价类型" title-width="180rpx">
				<view class="custom-radio">
					<wd-radio-group v-model="formData.delivery_setting.bid_type" inline shape="dot">
						<wd-radio :value="item.value" v-for="(item,index) in sxt_order_bid_type" :key="index">
							{{item.label}}
						</wd-radio>
					</wd-radio-group>
				</view>
			</wd-cell>
			<wd-cell title="支付ROI" title-width="180rpx">
				<wd-input-number v-model="formData.delivery_setting.roi_goal" :min="0.01" :max="10000" :step="0.01"
					:precision="2" />
			</wd-cell>
			<wd-picker :columns="sxt_order_delivery_time" label="投放时间" v-model="formData.delivery_setting.delivery_time"
				label-key="label" value-key="value" />
			<wd-cell title="投放金额" title-width="180rpx">
				<wd-input-number v-model="formData.delivery_setting.amount" :min="100" :max="100000" :step="10" />
			</wd-cell>
			<wd-cell title="智能优惠劵" title-width="180rpx">
				<wd-switch v-model="formData.delivery_setting.qcpx_mode" active-value="QCPX_MODE_ON"
					inactive-value="QCPX_MODE_OFF" size="40rpx" />
			</wd-cell>
			<wd-cell title="创建方式" title-width="150rpx">
				<view class="custom-radio">
					<wd-radio-group v-model="createOrderQuery.createWay" inline shape="dot">
						<wd-radio :value="item.value" v-for="(item,index) in leyitou_sxt_create_way" :key="index" :disabled="Number(item.value) === 2">
							{{item.label}}
						</wd-radio>
					</wd-radio-group>
				</view>
			</wd-cell>
			
			<wd-transition :show="createOrderQuery.createWay === 1" name="fade">
				<wd-datetime-picker type="date" v-model="createTime" label="创建时间"
					@change="createOrderQuery.createTime = [createOrderQuery.createTime]" />
			</wd-transition>
			
		</wd-cell-group>
		<view class="uni-flex uni-justify-center uni-mt-lg">
			<wd-button @click="createOrder" custom-class="uni-w-3-4">创建订单</wd-button>
		</view>
	</wd-form>

	<!-- 选择抖音号弹窗 -->
	<baseSelectDouYin v-model:visible="douYinVisible" v-model:selectedValue="douYinSelectedValue"
		@confirm="douYinConfirm"></baseSelectDouYin>

	<!-- 选择商品弹窗 -->
	<baseSelectCommodity v-model:visible="commodityVisible" @confirm="commodityConfirm"></baseSelectCommodity>
	
	<wd-toast />
	
</template>

<script setup lang="ts">
	import type {
		QcUniProductVo,
		DyAuthorAuthVo
	}from '@/api/index/types'
	import type {
		CreateOrderQuery,
		CreateSxtUniOrderInfoVo
	} from '@/sub_page/api/creationTool/types'
	import { useToast } from 'wot-design-uni'
	import {
		useDict
	} from '@/utils/dict'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import dayjs from 'dayjs'
	import {
		ref,
		toRefs,
		onBeforeUnmount,
		onMounted
	} from 'vue'
	
	const formRef = ref()
	const formData = ref<CreateSxtUniOrderInfoVo>({
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
	})
	const createTime = ref<number>(Date.now())
	
	const toast = useToast()

	// 订单创建表单
	const createOrderQuery = ref<CreateOrderQuery>({
		createWay: 0,
		createTime: [dayjs().format('YYYY-MM-DD HH:mm:ss')],
		list: [],
	});

	const { sxt_order_bid_type } = toRefs(useDict(['sxt_order_bid_type']))
	const {
		sxt_order_delivery_time,
		leyitou_sxt_create_way
	} = toRefs(useDict(['sxt_order_delivery_time', 'leyitou_sxt_create_way'], true))
	// 选择商品弹窗
	const commodityVisible = ref<boolean>(false)

	// 选择抖音弹窗默认选中
	const douYinSelectedValue = ref()
	const douYinType = ref<'selectedDouYin' | 'selectedByDouYin'>()
	// 选择抖音账号弹窗
	const douYinVisible = ref<boolean>(false)

	// 订单商品
	const selectedProduct = ref<QcUniProductVo>()

	// 抖音账号
	const selectedDouYin = ref<DyAuthorAuthVo>()


	// 打开选择订单商品弹窗
	const openSelectCommodity = () => {
		commodityVisible.value = true
	}

	// 打开选择抖音账号弹窗
	const openSelectDouYin = () => {
		douYinSelectedValue.value = selectedDouYin.value?.authorId || null
		douYinType.value = 'selectedDouYin'
		douYinVisible.value = true
	}


	// 抖音账号选择弹出框确认事件
	const douYinConfirm = (selectedData : any) => {
		if (douYinType.value === 'selectedDouYin') {
			selectedDouYin.value = selectedData
			formData.value.aweme_id = selectedData?.authorId
			formData.value.advertiser_id = selectedData?.qcSxtAdvertiserId
		}
	}

	// 商品选择弹出框确认事件
	const commodityConfirm = (selectedData : any) => {
		selectedProduct.value = selectedData
		formData.value.product_id = selectedData.productId
	}

	const createOrder = () => {
		if(!formData.value.aweme_id){
			return toast.warning('请选择付款抖音号!')
		}
		if(!formData.value.product_id){
			return toast.warning('请选择目标商品!')
		}
		uni.setStorageSync('affirm-data',{
			douYinData:selectedDouYin.value,
			productData:selectedProduct.value,
			formData:formData.value,
			createOrderQuery:createOrderQuery
		})
		uni.navigateTo({
			url: '/sub_page/pages/creationTool/affirm',
			animationType: 'slide-in-right'
		})
	}
	
	const initData = () => {
		formData.value = {
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
		}
		createTime.value = Date.now()
		createOrderQuery.value = {
			createWay: 0,
			createTime: [dayjs().format('YYYY-MM-DD HH:mm:ss')],
			list: [],
		}
		selectedProduct.value = {};
		selectedDouYin.value = {};
	}
	
	onMounted(() => {
		const toolsData = uni.getStorageSync('tools-data')
		if (toolsData) {
			if (toolsData.productId) {
				formData.value.product_id = String(toolsData.productId);
				selectedProduct.value =
					toolsData.dyProductInfo?.title || '暂无商品名称';
			}
	
			// 确保存在抖音号信息,再赋值表单
			if (toolsData.awemeId && toolsData.advertiserId) {
				formData.value.aweme_id = toolsData.awemeId;
				formData.value.advertiser_id = String(toolsData.advertiserId);
				selectedDouYin.value =
					toolsData.dyAuthorInfo;
				selectedProduct.value = toolsData;
				selectedDouYin.value = toolsData;
			}
		}
	})
	
	// 允许当前文件样式穿透
	defineOptions({
		options: {
			styleIsolation: 'shared'
		}
	})
	
	onBeforeUnmount(() => {
		uni.removeStorageSync("affirm-data")
		uni.removeStorageSync("tools-data")
	})
</script>

<style lang="scss">
	.custom-radio  {
		.wd-radio{
			line-height: unset;
		}
	}
</style>