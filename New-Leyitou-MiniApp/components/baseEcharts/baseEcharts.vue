<template>
	<view class="tn-h-full tn-w-full">
		<l-echart ref="chartRef"></l-echart>
	</view>
</template>

 <!--
 	列表页组件
  * @param {Object} options -   echeart 配置项
 -->  
<script setup lang="ts">
	const echarts = require('../../uni_modules/lime-echart/static/echarts.min')
	import {ref,defineProps,onMounted,watch} from 'vue'
	const chartRef = ref()
	const  props = defineProps({
		options:Object,
		default: {}
	})
	onMounted(() => {
		setTimeout(async()=>{
		    if(!chartRef.value) return
			const myChart = await chartRef.value.init(echarts)
			myChart.setOption(props.options)
		},300)
	})
	
	watch(() => props.options,(newOptions) => {
		if(chartRef.value){
			chartRef.value.setOption(newOptions)
		}
	},{deep:true})
</script>

<style lang="scss">
	canvas{
		z-index: 200;
		position: relative;
	}
	.lime-echart{
		z-index: 200;
	}
</style>