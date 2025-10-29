<template>
	<wd-popup
		v-model="visible" 
		position="bottom" 
		custom-style="border-top-left-radius:20rpx;border-top-right-radius:20rpx;"
		lock-scroll
		@before-enter="init"
		close-on-click-modal
	>
	<view class="uni-p-lg">
		<view>
			<view class="uni-flex uni-justify-between uni-text-lg">
				<view @click="cancel" class="uni-font-color-gray">取消</view>
				<view @click="confirm" class="uni-font-color-blue">确定</view>
			</view>
			<wd-search 
				v-model="searchValue" 
				@change="searchChange" 
				:maxlength="20" 
				hide-cancel
			/>
		</view>
		<scroll-view 
			scroll-y 
			class="hide-scrollbar" 
			style="height: 600rpx;" 
			:lower-threshold="100" 
			@scrolltolower="scrolltolower"
		>
			<wd-radio-group v-model="selectedValue" @change="change">
				<wd-radio :value="item.productId"  v-for="(item,index) in listData"  :key="index" shape="dot">
					<view class="uni-flex  underline ">
						<view>
							<wd-img width="150rpx" height="150rpx" :radius="10" :src="item?.dyProductInfo?.cover" />
						</view>
						<view class="uni-ml-lg uni-text-left  uni-w-3-5">
							<view class="uni-text-warp-2 uni-font-color-black">
								{{item?.dyProductInfo?.title}}
							</view>
							<view class="uni-font-color-gray">
								{{item?.dyShopInfo?.shopName}}
							</view>
							<view class="uni-flex uni-justify-between">
								<view class="uni-font-color-red">
									￥{{item?.dyProductInfo?.price}}
								</view>
								<view class="uni-font-color-black">
									库存：{{item?.dyProductInfo?.productStock}}
								</view>
							</view>
						</view>
					</view>
				</wd-radio>
			</wd-radio-group> 
		</scroll-view>
		<baseNoData v-if="noData && listData.length>0"/>
		<baseLoading v-show="loading"></baseLoading>
	</view>
	
	</wd-popup>
</template>

<script setup lang="ts">
	import type {
		PropTypes
	}from './types'
	import type {
		QcUniProductVo
	}from '@/api/index/types'
	import {
		defineModel,
		ref,
		toRefs,
		withDefaults,
		defineProps,
		defineEmits
	}from 'vue'
	import {
		getUniProductList
	}from '@/api/index/index'
	
	const emits = defineEmits(['confirm'])
	
	const visible = defineModel<boolean>('visible',{
		default:true
	})
	// 筛选框值
	const searchValue = defineModel<any>('searchValue')
	const selectedValue = defineModel('selectedValue')
	// 已选择的数据
	const selectedData = ref({
		label:'',
		value:''
	})
	
	const props = withDefaults(defineProps<PropTypes>(),{
		multiple:false,
	})
	
	const noData = ref<boolean>(false)
	const loading = ref<boolean>(false)
	const pageParams= ref({
		pageNum:1,
		pageSize:10,
		total: 0
	})
	const listData = ref<QcUniProductVo[]>([])
	
	// 筛选文本框改变事件
	const searchChange = () => {
		listData.value = []
		pageParams.value = {
			pageNum:1,
			pageSize:10,
			total: 0
		}
		noData.value=false
		loadData() 
	}
	
	const cancel = () => {
		visible.value = false
	}
	const confirm = () => {
		emits('confirm',selectedData.value)
		visible.value = false
	}
	
	const change = ({ value }:any) => {
		selectedData.value.value = value;
		selectedData.value.label = listData.value.find(item => item.productId === value)?.dyProductInfo?.title || '暂无'
	}
	
	function scrolltolower(){
		if (!noData.value) {
			loadData();
		}
	}
	
	async function loadData() {
		if (loading.value ) return;
			loading.value = true;
			try {
				await apiList();
				pageParams.value.pageNum++;
			} finally {
				loading.value = false;
			}
	}
	
	async function 	apiList(){
		const res = await getUniProductList({
			...pageParams.value,
			title: searchValue.value,
			noLoading:true
		})
		if(res.rows){
			listData.value = listData.value.concat(res.rows) 
			pageParams.value.total = res.total
		}
		if(listData.value.length == res.total || res.rows.length == 0){
			noData.value = true
		}
	}
	
	const init = () => {
		searchValue.value = ''
		searchChange()
	}
</script>

<style>
	
</style>