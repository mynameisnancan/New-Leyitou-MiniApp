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
				<wd-radio :value="item.userId"  v-for="(item,index) in listData"  :key="index" shape="dot">
					<view class="uni-flex  uni-items-center underline uni-w-full">
						<view>
							<wd-img  v-if="item.avatar" width="120rpx" height="120rpx" round  :src="config.baseUrl+item.avatar" />
							<wd-img  v-else width="150rpx" height="150rpx" round  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
						</view>
						<view class="uni-ml-lg uni-text-left uni-w-4-5 uni-font-color-black">
							<view class="uni-flex uni-items-center">
								<view class="uni-text-lg">
									{{item?.nickName}}
								</view>
								<view class="uni-text-sm uni-ml-lg">
									<wd-tag v-if="item?.status == '0'" type="primary">启用</wd-tag>
									<wd-tag v-else  type="danger">禁用</wd-tag>
								</view>
							</view>
							<view class="uni-text-sm">
								所在部门：{{item?.deptName || '暂无'}}
							</view>
							<view class="uni-text-sm">
								手机号：{{item?.phonenumber || '暂无'}}
							</view>
						</view>
					</view>
				</wd-radio>
			</wd-radio-group> 
			<wd-loadmore v-show="loading" state="loading" :loading-props="{size:'40rpx'}" />
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
		SysUserVo
	}from '@/api/user/types'
	import config from '@/config'
	import {
		debounce
	}from '@/utils/utils'
	import {
		defineModel,
		ref,
		toRefs,
		withDefaults,
		defineProps,
		defineEmits,
		watch,
	}from 'vue'
	import {
		getUserList
	}from '@/api/user/index'

	
	const emits = defineEmits(['confirm'])
	
	const visible = defineModel<boolean>('visible',{
		default:true
	})
	// 筛选框值
	const searchValue = defineModel<any>('searchValue')
	const selectedValue = defineModel('selectedValue')
	// 已选择的数据
	const selectedData = ref<SysUserVo>()
	
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
	const listData = ref<SysUserVo[]>([])
	
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
		// selectedData.value.value = value;
		const item = listData.value.find(item => item.userId === value);
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
		const res = await getUserList({
			...pageParams.value,
			nickName: searchValue.value,
			noLoading: true,
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
</script>

<style>
	
</style>