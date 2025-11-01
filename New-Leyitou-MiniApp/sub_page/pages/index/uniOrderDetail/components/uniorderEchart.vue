<template>
	<view>
		<baseEcharts :options="option"></baseEcharts>
	</view>
</template>

<script setup lang="ts">
	import type {
		SxtUniOrderDataMergeVo
	} from '@/sub_page/api/index/types'
	import {
		defineProps,
		withDefaults,
		ref,
		watch,
		computed
	} from 'vue'
	import {
		formatNumber
	} from '@/utils/utils'
	import dayjs from 'dayjs'
	import {
		generateXData,
		generateYData,
		getEchartColors,
		convertRgbToRgba
	} from '@/utils/echart'
	import {useThemeStore} from '@/store/useTheme'

	type PropTypes = {
		orderData : SxtUniOrderDataMergeVo[]
		dateRange : any
	}
	
	const useTheme = useThemeStore()
	
	const props = withDefaults(defineProps<PropTypes>(), {
		orderData: () => [],
		dateRange: () => []
	})
	
	const defaultColor = useTheme.themeVars.colorTheme

	const option = ref<any>({
		tooltip: { trigger: 'axis' },
		color: getEchartColors(defaultColor),
		grid: {
			left: '3%',
			right: '3%',
			bottom: '3%',
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
			type: 'category',
			nameLocation: 'middle',
			data: [],
			nameGap: 30,
			axisTick: {
				alignWithLabel: true,
			},
			axisLine: {
				show: true,
				lineStyle: {
				},
			},
			boundaryGap: true,
		},
		yAxis: [
			{
				type: 'value',
				position: 'left',
				alignTicks: true,
				axisLabel: {
					formatNumber: (value : number) => {
						return formatNumber(value, 1000, ' k', 1).toString();
					},
				},
				axisLine: {
					show: true,
					lineStyle: {},
				},
				splitLine: {
					show: true,
					lineStyle: {},
				},
			},
			{
				type: 'value',
				position: 'right',
				alignTicks: true,
				axisLabel: {
					formatNumber: (value : number) => {
						return formatNumber(value, 1000, ' k', 1).toString();
					},
				},
				axisLine: {
					show: true,
					lineStyle: {},
				},
				splitLine: {
					show: true,
					lineStyle: {},
				},
			},
		],
		series: [
			{
				id: 'statCostForRoi2',
				name: '消耗',
				type: 'line',
				smooth: 0.6,
				stack: 'Total',
				showSymbol: false,
				yAxisIndex: 0,
				data: [],
				labelLine: {
					show: true,
				},
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [],
						global: false, // 缺省为 false
					},
				},
			},
			{
				id: 'totalPrepayAndPayOrderRoi2',
				name: '支付ROI',
				type: 'line',
				smooth: 0.6,
				showSymbol: false,
				yAxisIndex: 1,
				data: [],
				labelLine: {
					show: true,
				},
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [],
						global: false, // 缺省为 false
					},
				},
			},
			{
				id: 'totalPayOrderCountForRoi2',
				name: '成交订单数',
				type: 'line',
				smooth: 0.6,
				showSymbol: false,
				yAxisIndex: 0,
				data: [],
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [],
						global: false, // 缺省为 false
					},
				},
			},
			{
				id: 'totalPayOrderGmvForRoi2',
				name: '成交订单金额',
				type: 'line',
				smooth: 0.6,
				showSymbol: false,
				yAxisIndex: 0,
				data: [],
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [],
						global: false, // 缺省为 false
					},
				},
			},
		],
	});

	const isOneDay = computed(() => {
		const [start, end] = props.dateRange;
		return dayjs(start).isSame(dayjs(end), 'day');
	});

	const setEchartOption = () => {
		let xAxisData : string[] = [];
		// 时间间隔查询是一天的数据 小于一天 x轴单位是 h小时 否则以天日期为单位
		const startTime = new Date(props.dateRange[0]).getTime();
		const endTime = new Date(props.dateRange[1]).getTime();
		// const isSameDay = endTime - startTime < 86_400_000;

		const xDataLength = isOneDay.value
			? 0
			: Math.ceil((endTime - startTime) / 86_400_000);

		xAxisData = isOneDay.value
			? generateXData(xDataLength, 'hour', props.dateRange[1])
			: generateXData(xDataLength, 'day', props.dateRange[1]);

		// 初始化x轴数据
		if (option.value.xAxis && 'data' in option.value.xAxis) {
			option.value.xAxis.data = xAxisData;
		}

		// 初始化y轴数据
		if (option.value.series && Array.isArray(option.value.series)) {
			option.value.series.forEach((seriesItem:any, _seriesIndex:number) => {
				seriesItem.data = isOneDay.value
					? generateYData(xDataLength, 'hour')
					: generateYData(xDataLength, 'day');
			});
		}
		
		// TODO(perf): 业务参数的取值修改和赋值处理的优化
		if (props.orderData.length > 0) {
			// 创建完整的数据映射表，key 为 dataKey/hourKey/dayKey，value 为对应数据项
			const fullDataMap = new Map<string, null | SxtUniOrderDataMergeVo>();

			// 初始化所有 xAxis 上的时间点为空数据占位
			xAxisData.forEach((key) => {
				fullDataMap.set(key, null); // 初始设为 null 表示无数据
			});

			// dataKey: "2025-9-27"
			// 填充真实数据
			props.orderData.forEach((item) => {
				let key = '';
				if (item.dataKey) {
					// key = item.dataKey;
					key = item.dataKey;
					// 标准化日期格式，将 "YYYY-M-D" 转换为 "MM-DD" 格式进行匹配
					if (!isOneDay.value) {
						const dateParts = key.split('-');
						if (dateParts.length === 3) {
							// 转换为 MM-DD 格式
							const month = dateParts[1]?.padStart(2, '0');
							const day = dateParts[2]?.padStart(2, '0');
							key = `${month}-${day}`;
						}
					}
				} else if (isOneDay.value && item.hourKey !== undefined) {
					key = `h${item.hourKey}`;
				} else if (!isOneDay.value && item.dayKey !== undefined) {
					key = `${item.dayKey}`;
				}

				// 若 key 存在于 xAxis 中才设置进去
				if (fullDataMap.has(key)) {
					fullDataMap.set(key, item);
				}
			});

			// 然后按照 xAxisData 的顺序来更新 series 数据
			if (Array.isArray(option.value.series)) {
				option.value.series.forEach((seriesItem:any, seriesIndex:number) => {
					const newData : number[] = [];
					xAxisData.forEach((_xAxisItem, index) => {
						const dataItem = fullDataMap.get(_xAxisItem);
						if (dataItem?.dataInfo) {
							const info = dataItem.dataInfo;
							switch (seriesItem.id) {
								case 'statCostForRoi2': {
									newData[index] = info.statCostForRoi2 ?? 0;
									break;
								}
								case 'totalPayOrderCountForRoi2': {
									newData[index] = info.totalPayOrderCountForRoi2 ?? 0;
									break;
								}
								case 'totalPayOrderGmvForRoi2': {
									newData[index] = info.totalPayOrderGmvForRoi2 ?? 0;
									break;
								}
								case 'totalPrepayAndPayOrderRoi2': {
									newData[index] = info.totalPrepayAndPayOrderRoi2 ?? 0;
									break;
								}
								default: {
									newData[index] = 0;
								}
							}
						} else {
							newData[index] = 0; // 缺失数据默认补零
						}
					});
					seriesItem.data = newData;
					if (
						seriesItem.type === 'line' &&
						seriesItem.areaStyle &&
						seriesItem.areaStyle.color
					) {
						const color = getEchartColors(defaultColor)[seriesIndex] || defaultColor;
						const rgbaStart = convertRgbToRgba(color, 0.7);
						const rgbaEnd = convertRgbToRgba(color, 0.1);

						// 确保 areaStyle.color 是一个渐变对象而不是字符串,并且是属于color对象中的属性
						if (
							typeof seriesItem.areaStyle.color === 'object' &&
							seriesItem.areaStyle.color &&
							'colorStops' in seriesItem.areaStyle.color
						) {
							seriesItem.areaStyle.color.colorStops = [
								{ offset: 0, color: rgbaStart },
								{ offset: 1, color: rgbaEnd },
							];
						} else {
							// 如果原本是字符串或其他非法结构，则重新构造整个 color 对象
							seriesItem.areaStyle.color = {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [
									{ offset: 0, color: rgbaStart },
									{ offset: 1, color: rgbaEnd },
								],
								global: false,
							};
						}
					}
				});
			}
		}
	}

	watch(() => props.orderData, (val) => {
		if (val.length) {
			setEchartOption()
		}
	})
</script>

<style>
</style>