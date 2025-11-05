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
			<wd-checkbox-group v-model="selectedValue" v-if="multiple" @change="multipleChange">
				 <wd-checkbox :modelValue="item.authorId"  v-for="(item,index) in listData"  :key="index" shape="square">
					<view class="uni-flex uni-px-lg uni-items-center underline uni-w-full">
						<view>
							<wd-img  v-if="item?.dyAuthorInfo?.avatar" width="120rpx" height="120rpx" round  :src="item?.dyAuthorInfo?.avatar" />
							<wd-img  v-else width="150rpx" height="150rpx" round  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
						</view>
						<view class="uni-ml-lg uni-text-left uni-w-4-5 uni-font-color-black">
							<view class="uni-flex uni-items-center">
								<view class="uni-text-lg">
									{{item?.dyAuthorInfo?.nickName}}
								</view>
							</view>
							<view class="uni-text-sm">
								UID：{{item?.dyAuthorInfo?.uid}}
							</view>
							<view class="uni-flex uni-items-center uni-justify-between uni-text-sm">
								<view>
									粉丝数：{{item?.dyAuthorInfo?.fansNum || '0'}}
								</view>
								<view class="uni-ml-lg">
									运营人：{{item?.dyAuthorInfo?.userInfo?.nickName || '暂无'}}
								</view>
							</view>
						</view>
					</view> 
				 </wd-checkbox>
			</wd-checkbox-group>
			<wd-radio-group v-else v-model="selectedValue" @change="radioChange">
				<wd-radio :value="item.authorId"  v-for="(item,index) in listData"  :key="index" shape="dot">
					<view class="uni-flex uni-px-lg uni-items-center underline uni-w-full">
						<view>
							<wd-img  v-if="item?.dyAuthorInfo?.avatar" width="120rpx" height="120rpx" round  :src="item?.dyAuthorInfo?.avatar" />
							<wd-img  v-else width="150rpx" height="150rpx" round  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
						</view>
						<view class="uni-ml-lg uni-text-left uni-w-4-5 uni-font-color-black">
							<view class="uni-flex uni-items-center">
								<view class="uni-text-lg">
									{{item?.dyAuthorInfo?.nickName}}
								</view>
							</view>
							<view class="uni-text-sm">
								UID：{{item?.dyAuthorInfo?.uid}}
							</view>
							<view class="uni-flex uni-items-center uni-justify-between uni-text-sm">
								<view>
									粉丝数：{{item?.dyAuthorInfo?.fansNum || '0'}}
								</view>
								<view class="uni-ml-lg">
									运营人：{{item?.dyAuthorInfo?.userInfo?.nickName || '暂无'}}
								</view>
							</view>
						</view>
					</view>
				</wd-radio>
			</wd-radio-group> 
			
			<baseLoading v-show="loading"></baseLoading>
			
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
		DyAuthorAuthVo
	}from '@/api/index/types'
	import config from '@/config'
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
		getDyAuthorList
	}from '@/api/index/index'
	import {
		debounce
	}from '@/utils/utils'

	
	const emits = defineEmits(['confirm'])
	
	const visible = defineModel<boolean>('visible',{
		default:true
	})
	// 筛选框值
	const searchValue = ref<any>()
	// 默认选中的值value
	const selectedValue = defineModel('selectedValue')
	
	// 单选已选择的数据
	const selectedData = ref<DyAuthorAuthVo>()
	// 多选已选择的数据value
	const multipleSelectedData = ref<DyAuthorAuthVo[]>([])
	
	
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
	const listData = ref<DyAuthorAuthVo[]>([])
	
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
		if(props.multiple){
			emits('confirm',multipleSelectedData.value)
		}else{
			emits('confirm',selectedData.value)
		}
		visible.value = false
	}
	
	const radioChange = ({ value }:any) => {
		const item = listData.value.find(item => item.authorId === value);
		if(item){
			selectedData.value = item
		}
	}
	
	const multipleChange = ({ value }:any) => {
		let arr = []
		for(const val of value){
			const item = listData.value.find(item => item.authorId === val);
			if(item){
				arr.push(item)
			}
		}
		multipleSelectedData.value = arr
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
		const res = await getDyAuthorList({
			...pageParams.value,
			dyNickName: searchValue.value,
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
	
	// 允许当前文件样式穿透
	defineOptions({
		options: {
			styleIsolation: 'shared'
		}
	})
</script>


<style lang="scss" scoped>
	:deep(.wd-radio){
		border-bottom: 1px solid  #eff0f3;
	}
</style>