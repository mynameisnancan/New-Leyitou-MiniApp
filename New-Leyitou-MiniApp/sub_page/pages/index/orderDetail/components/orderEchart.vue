<template>
	<view>
		<baseEcharts :options="options"></baseEcharts>
	</view>
</template>

<script setup lang="ts">
	import type {
		SxtDataLabelVo,
	} from '@/sub_page/api/index/types'
	import {
		defineProps,
		withDefaults,
		ref,
		watch,
		computed
	} from 'vue'
	import {
		formatNumber,
		compute
	} from '@/utils/utils'
	import dayjs from 'dayjs'
	import {
		generateXData,
		generateYData,
		getEchartColors,
		convertRgbToRgba
	} from '@/utils/echart'
	import { useThemeStore } from '@/store/useTheme'
	const useTheme = useThemeStore()

	type PropTypes = {
		orderData : SxtDataLabelVo[]
		dateRange : any
	}

	const props = withDefaults(defineProps<PropTypes>(), {
		orderData: () => [],
		dateRange: () => []
	})
	const defaultColor = useTheme.themeVars.colorTheme;

	const options = ref<any>({});

	const setEchartOption = (data : SxtDataLabelVo[]) => {
		const xAxisData : any[] = [];
		const seriesData : any = {
			statCost: [],
			prepayAndPayOrderRoi: [],
			payOrderCount: [],
			payOrderAmount: [],
		};
		data.forEach((item : SxtDataLabelVo) => {
			if (item.labelName.length === 8) {
				xAxisData.push(dayjs(item.labelName, 'YYYYMMDD').format('YYYY-MM-DD'));
			} else {
				xAxisData.push(dayjs(item.labelName, 'YYYYMMDDHH').format('HH:mm'));
			}

			seriesData.statCost.push(item.dataLabel.statCost);
			seriesData.prepayAndPayOrderRoi.push(
				item.dataLabel ? compute(item, 'ROI') : 0,
			);
			seriesData.payOrderCount.push(item.dataLabel.payOrderCount);
			seriesData.payOrderAmount.push(item.dataLabel.payOrderAmount);
		});
		const option : any = {
			tooltip: { trigger: 'axis' },
			color: getEchartColors(defaultColor),
			grid: {
				left: '0',
				right: '0',
				bottom: '0',
				top: '10%',
				containLabel: true,
			},
			legend: {
				type: 'scroll',
				selected: {
					消耗: true,
					支付ROI: true,
					成交订单数: false,
					成交订单金额: false,
				},
				data: ['消耗', '支付ROI', '成交订单数', '成交订单金额'],
			},
			xAxis: {
				nameLocation: 'middle',
				data: xAxisData,
			},
			yAxis: [
				{ type: 'value', position: 'left', alignTicks: true },
				{ type: 'value', position: 'right', alignTicks: true },
			],
			series: [
				{
					name: '消耗',
					type: 'line',
					smooth: true,
					stack: 'Total',
					showSymbol: false,
					yAxisIndex: 0,
					data: seriesData.statCost,
				},
				{
					name: '支付ROI',
					type: 'line',
					smooth: true,
					showSymbol: false,
					yAxisIndex: 1,
					data: seriesData.prepayAndPayOrderRoi,
				},
				{
					name: '成交订单数',
					type: 'line',
					smooth: true,
					showSymbol: false,
					data: seriesData.payOrderCount,
				},
				{
					name: '成交订单金额',
					type: 'line',
					smooth: true,
					showSymbol: false,
					data: seriesData.payOrderAmount,
				},
			],
		};

		options.value = option
	}

	watch(() => props.orderData, (val) => {
		if (val.length) {
			setEchartOption(val)
		}
	})
</script>
