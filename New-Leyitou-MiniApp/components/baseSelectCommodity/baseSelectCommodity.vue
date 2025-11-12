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
				<view @click="confirm" class="font-theme-color">确定</view>
			</view>
			<wd-search 
				v-model="searchValue" 
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
						<view class="uni-ml-lg uni-text-left  ">
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
			<wd-loadmore v-if="loading" state="loading" :loading-props="{size:'40rpx'}" />
			<wd-loadmore v-if="noData && listData.length>0" state="finished" :loading-props="{size:'40rpx'}" finished-text="没有更多数据了~"/>
			<template v-if="listData.length==0 && !loading">
				<view class="uni-pt-xl uni-pb-xl">
					<wd-status-tip image="content" tip="暂无数据" />
				</view>
			</template>
		</scroll-view>
		
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
		defineEmits,
		watch
	}from 'vue'
	import {
		debounce
	}from '@/utils/utils'
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
	const selectedData = ref<QcUniProductVo>()
	
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
		const item = listData.value.find(item => item.productId === value)
		if(item){
			selectedData.value = item
		}
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
		
	}
	
	watch(() => searchValue.value, () => {
		debounce(searchChange,300)()
	})
	
	// 允许当前文件样式穿透
	defineOptions({
		options: {
			styleIsolation: 'shared'
		}
	})
</script>

<style lang="scss" scoped>
	:deep(.wd-radio__label){
		width: 80%;
	}
</style>