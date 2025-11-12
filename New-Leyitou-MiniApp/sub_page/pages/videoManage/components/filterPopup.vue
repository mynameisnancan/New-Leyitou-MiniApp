<template>
	<!-- 筛选条件弹出框 -->
	<wd-popup v-model="visible" position="bottom"
		custom-style="border-top-left-radius:20rpx;border-top-right-radius:20rpx;" lock-scroll close-on-click-modal
		closable>
		<view class="uni-p-lg uni-mt-lg">
			<wd-cell-group border>
				<wd-cell title="数据时间" title-width="180rpx" :value="queryForm.timeStart ? `${queryForm.timeStart} 至 ${queryForm.timeEnd}` :'数据时间'" @click="openSelectDate" ellipsis is-link />
				<wd-cell title="运营人" title-width="180rpx" :value="selectedUser?.nickName" @click="openSelectUser" ellipsis is-link />	
				<wd-cell title="抖音号" title-width="180rpx" :value="selectedDouYin?.dyAuthorInfo?.nickName"
					@click="openSelectDouYin" ellipsis is-link />
				<wd-input
					type="number"
					label="视频ID"
					prop="videoId"
					clearable
					v-model="queryForm.videoId"
					placeholder="请输入视频ID"
					:maxlength="19"
					label-width="180rpx"
				/>	
				<wd-input
					type="number"
					label="素材标题"
					prop="title"
					clearable
					v-model="queryForm.title"
					placeholder="请输入素材标题"
					:maxlength="19"
					label-width="180rpx"
				/>	
			</wd-cell-group>
			<view class="uni-flex uni-justify-around uni-mt-lg">
				<wd-button type="info" @click="reset">重置</wd-button>
				<wd-button @click="confirm">确定</wd-button>
			</view>
		</view>
	</wd-popup>
	
	
	<wd-calendar
		ref="calendar" 
		type="daterange" 
		v-model="dateValue" 
		@confirm="handleConfirm" 
		:with-cell="false"
		:min-date="getMinDate()"
		:max-date="getMaxDate()"
		allow-same-day
	/>
	
	<!-- 选择运营人 -->
	<baseSelectUser
		v-model:visible="userVisible"
		@confirm="userConfirm"
	></baseSelectUser>
	
	<!-- 选择抖音号弹窗 -->
	<baseSelectDouYin v-model:visible="douYinVisible" v-model:selectedValue="douYinSelectedValue"
		@confirm="douYinConfirm"></baseSelectDouYin>
		
</template>

<script setup lang="ts">
	import type {
		DyAuthorAuthVo,
	} from '@/api/index/types'
	import type {
		SysUserVo
	}from '@/api/user/types'
	import type {
		SxtVideoQuery,
	} from '@/sub_page/api/videoManage/types'
	import {
		useDict
	} from '@/utils/dict'
	import {
		defineModel,
		ref,
		toRefs,
		withDefaults,
		defineProps,
		defineEmits
	} from 'vue'
	import {
		getMaxDate,
		getMinDate
	} from '@/utils/date.ts'
	import dayjs from 'dayjs'

	// 已选择日期value值
	const dateValue = ref<number|number[]>(Date.now())
	const calendar = ref()
	
	const visible = defineModel("visible", {
		default: true
	})

	const queryForm = defineModel<SxtVideoQuery>('queryForm', {
		default: {
			deptId: undefined,
			userId: undefined,
			videoId: undefined,
			videoIds: [],
			sortField: undefined,
			sortType: undefined,
			uid: undefined,
			timeStart: undefined,
			timeEnd: undefined
		}
	})
	
	// 运营人
	const selectedUser = ref<SysUserVo>()
	// 选择用户弹窗
	const userVisible = ref<boolean>(false)
	
	// 抖音账号
	const selectedDouYin = ref<DyAuthorAuthVo>()
	// 选择抖音弹窗默认选中
	const douYinSelectedValue = ref()
	const douYinVisible = ref<boolean>(false)
	
	// 打开选择抖音账号弹窗
	const openSelectDouYin = () => {
		douYinSelectedValue.value = selectedDouYin.value?.qcAwemeId || null
		douYinVisible.value = true
	}
	// 抖音账号选择弹出框确认事件
	const douYinConfirm = (selectedData : any) => {
		selectedDouYin.value = selectedData
		queryForm.value.uid = selectedData.qcAwemeId
	}
	
	// 打开选择运营人弹窗
	const openSelectUser = () => {
		userVisible.value = true
	}
	
	// 用户选择弹出框确认事件
	const userConfirm = (selectedData:any) => {
		selectedUser.value = selectedData
		queryForm.value.userId = selectedData.userId
	}
	

	const reset = () => {
		queryForm.value = {
			deptId: undefined,
			userId: undefined,
			videoId: undefined,
			videoIds: [],
			sortField: undefined,
			sortType: undefined,
			uid: undefined,
			timeStart: undefined,
			timeEnd: undefined
		}
		selectedUser.value = {}
		visible.value = false
	}

	const confirm = () => {
		visible.value = false
	}

	const openSelectDate = () => {
		 calendar.value?.open()
	}
	
	const handleConfirm = ({ value }:any) => {
		if(value.length===2){
			queryForm.value.timeStart = dayjs(value[0]).format("YYYY-MM-DD")
			queryForm.value.timeEnd = dayjs(value[1]).format("YYYY-MM-DD")
		}
	}
</script>

<style scoped lang="scss">

</style>