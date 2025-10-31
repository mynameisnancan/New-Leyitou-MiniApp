<template>
	<view>
		<wd-tabs 
			v-model="tabName" 
			@change="change"
			@click="tabClick"
			:sticky="sticky"
			:offsetTop="offsetTop"
			:swipeable="swipeable"
			:autoLineWidth="autoLineWidth"
			:lineWidth="lineWidth"
			:lineHeight="lineHeight"
			:color="color"
			:inactiveColor="inactiveColor"
			:animated="animated"
			:duration="duration"
			:slidable="slidable"
			:badgeProps="badgeProps"
			custom-class="base-wd-tabs"
		>
		  <block v-for="(item,index) in tabs" :key="index">
			<wd-tab :title="item.title" :name="item.name">
			</wd-tab>
		  </block>
		</wd-tabs>
		
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
		
	</view>
</template>

<script setup lang="ts">
	import type {
		BaseTabsType
	}from './types'
	import dayjs from 'dayjs'
	import { ref,defineProps,defineEmits,withDefaults } from 'vue';
	import {
		getTodayDate,
		getYesterdayDate,
		getSevenDaysDate,
		getNearMonthDate,
		getCurrentMonth,
		getLastMonthDate,
		getMaxDate,
		getMinDate
	} from '@/utils/date.ts'
	
	const props = withDefaults(defineProps<BaseTabsType>(), {
	  tabs: () => [
	  	{
	  		title: '今天',
	  		name:'今天'
	  	},
	  	{
	  		title: '昨天',
	  		name:'昨天'
	  	},
	  	{
	  		title: '近7天',
	  		name:'近7天'
	  	},
	  	{
	  		title: '本月',
	  		name:'本月'
	  	},
	  	{
	  		title: '上月',
	  		name:'上月'
	  	},
	  	{
	  		title: '指定',
	  		name:'指定'
	  	},
	  ]
	});
	
	
	const emits = defineEmits(["change"])

	const tabName = ref<string>()

	// 已选择日期value值
	const dateValue = ref<number|number[]>(Date.now())
	const calendar = ref()
	
	const change = (event:any) => {
		let date ;
		if(event.index == 0){
			date = [getTodayDate()]
		}else if(event.index == 1){
			date =  [getYesterdayDate()]
		}else if(event.index == 2){
			date = getSevenDaysDate()
		}else if(event.index == 3){
			date = getCurrentMonth()
		}else if(event.index == 4) {
			date = getLastMonthDate()
		}else if(event.index == 5) {
			 calendar.value?.open()
			 return ;
		}
		// 给时间选择弹出框赋值
		if(date && date.length === 2){
			dateValue.value = [dayjs(date[0]).valueOf(),dayjs(date[1]).valueOf()]
		}
		
		if(date){
			emits("change",date)
			return;
		}
		
		
		
		// 打开日期选择弹出框
		// const item = props.tabs.find((item,index) => index === event.index && item.date);
		// if(item){
		// 	showDate.value = true
		// }
	}
	
	const tabClick = (event:any) => {
		if(event.index == 5) {
			 calendar.value?.open()
			 return ;
		}
	}
	
	const handleConfirm = ({ value }:any) => {
		if(value.length===2){
			const dateArr = [
				dayjs(value[0]).format("YYYY-MM-DD"),
				dayjs(value[1]).format("YYYY-MM-DD")
			]
			emits("change",dateArr)
		}else{
			const dateArr = [
				dayjs(value[0]).format("YYYY-MM-DD"),
				dayjs(value[0]).format("YYYY-MM-DD")
			]
			emits("change",dateArr)
		}
	}
	
</script>


<style lang="scss" >

</style>