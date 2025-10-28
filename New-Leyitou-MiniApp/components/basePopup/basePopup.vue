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
			<commodity 
				v-if="type === 'commodity'" 
				v-model:selectedData="selectedData"
				:list="listData"
			/>
		</scroll-view>
		<baseLoading v-if="loading"></baseLoading>
	</view>
	
	</wd-popup>
</template>

<script setup lang="ts">
	import type {
		BasePopupTypes
	}from './types'
	import {
		defineModel,
		ref,
		toRefs,
		withDefaults,
		defineProps,
		defineEmits
	}from 'vue'
	import commodity from './components/commodity.vue'
	
	const emits = defineEmits(['confirm'])
	
	const visible = defineModel<boolean>('visible',{
		default:true
	})
	// 筛选框值
	const searchValue = defineModel<any>('searchValue')
	// 已选择的数据
	const selectedData = ref<any>({
		label:'',
		value:''
	})
	// 列表查询参数
	const queryData = ref<any>()
	
	const props = withDefaults(defineProps<BasePopupTypes>(),{
		apiUrl: () => Promise.resolve([]),
		multiple:false,
	})
	
	const noData = ref<boolean>(false)
	const loading = ref<boolean>(false)
	const pageParams= ref({
		pageNum:1,
		pageSize:10,
		total: 0
	})
	const listData = ref([])
	
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
		console.log(selectedData.value)
		emits('confirm',selectedData.value)
		visible.value = false
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
		// 根据弹窗类型 切换查询参数
		if(props.type === 'commodity'){
			queryData.value = {
				title: searchValue.value
			}
		}else if(props.type === 'douYin'){
			queryData.value = {
				dyNickName: searchValue.value
			}
		}
		const res = await props.apiUrl({
			...pageParams.value,
			...queryData.value,
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