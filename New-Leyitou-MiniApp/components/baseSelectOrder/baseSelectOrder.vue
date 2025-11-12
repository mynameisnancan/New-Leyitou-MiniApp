<template>
	<wd-popup v-model="visible" position="bottom"
		custom-style="border-top-left-radius:20rpx;border-top-right-radius:20rpx;" lock-scroll @before-enter="init"
		close-on-click-modal>
		<view class="uni-p-lg">
			<view>
				<view class="uni-flex uni-justify-between uni-text-lg">
					<view @click="cancel" class="uni-font-color-gray">取消</view>
					<view @click="confirm" class="font-theme-color">确定</view>
				</view>
				<wd-search v-model="searchValue" :maxlength="20" hide-cancel />
			</view>
			<scroll-view scroll-y class="hide-scrollbar" style="height: 600rpx;" :lower-threshold="100"
				@scrolltolower="scrolltolower">
				<wd-checkbox-group v-if="multiple" v-model="selectedValue" @change="multipleChange">
					<wd-checkbox :modelValue="item?.dyVideoInfo?.videoId" v-for="(item,index) in listData" :key="index"
						shape="square">
						<view class="uni-flex underline uni-px-lg">
							<view>
								<wd-img width="150rpx" height="150rpx" :radius="10"
									:src="item?.dyVideoInfo?.videoCoverUrl" />
							</view>
							<view class="uni-ml-lg uni-text-left  ">
								<view class="title uni-font-color-black">
									{{item?.dyVideoInfo?.title}}
								</view>
								<view class="uni-flex uni-items-center uni-mt-lg">
									<wd-img width="50rpx" height="50rpx" :radius="50"
										:src="item?.dyAuthorInfo?.avatar" />
									<view class="uni-font-color-black uni-ml-sm">
										{{item?.dyAuthorInfo?.nickName}}
									</view>
								</view>
							</view>
						</view>
					</wd-checkbox>
				</wd-checkbox-group>
				<wd-radio-group v-else v-model="selectedValue" @change="radioChange">
					<wd-radio :value="item?.dyVideoInfo?.videoId" v-for="(item,index) in listData" :key="index"
						shape="dot">
						<view class="uni-flex  underline ">
							<view>
								<wd-img width="150rpx" height="150rpx" :radius="10"
									:src="item?.dyVideoInfo?.videoCoverUrl" />
							</view>
							<view class="uni-ml-lg uni-text-left ">
								<view class="title uni-font-color-black">
									{{item?.dyVideoInfo?.title}}
								</view>
								<view class="uni-flex uni-items-center uni-mt-lg">
									<wd-img width="50rpx" height="50rpx" :radius="50"
										:src="item?.dyAuthorInfo?.avatar" />
									<view class="uni-font-color-black uni-ml-sm">
										{{item?.dyAuthorInfo?.nickName}}
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
	} from './types'
	import type {
		SxtVideoVo
	} from '@/api/selectData/types'
	import {
		defineModel,
		ref,
		toRefs,
		withDefaults,
		defineProps,
		defineEmits,
		watch
	} from 'vue'
	import {
		debounce
	} from '@/utils/utils'
	import {
		getVideoList
	} from '@/api/selectData/index'

	const emits = defineEmits(['confirm'])

	const props = withDefaults(defineProps<PropTypes>(), {
		multiple: false,
	})

	const visible = defineModel<boolean>('visible', {
		default: true
	})
	// 筛选框值
	const searchValue = defineModel<any>('searchValue')
	// 默认选中的数据value
	const selectedValue = defineModel('selectedValue')

	// 单选已选中的数据
	const selectedData = ref<SxtVideoVo>()
	// 多选已选中的数据
	const multipleSelectedData = ref<SxtVideoVo[]>([])

	const noData = ref<boolean>(false)
	const loading = ref<boolean>(false)
	const pageParams = ref({
		pageNum: 1,
		pageSize: 10,
		total: 0
	})
	const listData = ref<SxtVideoVo[]>([])

	// 筛选文本框改变事件
	const searchChange = () => {
		listData.value = []
		pageParams.value = {
			pageNum: 1,
			pageSize: 10,
			total: 0
		}
		noData.value = false
		loadData()
	}

	const cancel = () => {
		visible.value = false
	}
	const confirm = () => {
		if (props.multiple) {
			emits('confirm', multipleSelectedData.value)
		} else {
			emits('confirm', selectedData.value)
		}
		visible.value = false
	}

	const radioChange = ({ value } : any) => {
		// selectedData.value.value = value;
		// selectedData.value.label = listData.value.find(item => item.dyVideoInfo?.videoId === value)?.dyVideoInfo?.title || '暂无'
		const item = listData.value.find(item => item.dyVideoInfo?.videoId === value)
		if (item) {
			selectedData.value = item
		}
	}

	const multipleChange = ({ value } : any) => {
		console.log(value)
		let arr = []
		for (const val of value) {
			const item = listData.value.find(item => item.dyVideoInfo?.videoId === val);
			if (item) {
				arr.push(item)
			}
		}
		console.log(arr)
		multipleSelectedData.value = arr
	}

	function scrolltolower() {
		if (!noData.value) {
			loadData();
		}
	}

	async function loadData() {
		if (loading.value) return;
		loading.value = true;
		try {
			await apiList();
			pageParams.value.pageNum++;
		} finally {
			loading.value = false;
		}
	}

	async function apiList() {
		const res = await getVideoList({
			...pageParams.value,
			title: searchValue.value,
			noLoading: true
		})
		if (res.rows) {
			listData.value = listData.value.concat(res.rows)
			pageParams.value.total = res.total
		}
		if (listData.value.length == res.total || res.rows.length == 0) {
			noData.value = true
		}
	}

	const init = () => {
		searchValue.value = ''
	}

	watch(() => searchValue.value, () => {
		debounce(searchChange, 300)()
	})

	// 允许当前文件样式穿透
	defineOptions({
		options: {
			styleIsolation: 'shared'
		}
	})
</script>

<style lang="scss" scoped>
	.title {
		font-weight: 500;
		font-size: 26rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width:400rpx
	}

	:deep(.wd-radio__label) {
		width: 80%;
	}
</style>