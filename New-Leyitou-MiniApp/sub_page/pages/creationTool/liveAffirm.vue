<template>
	<wd-navbar title="投放信息确认" left-arrow @click-left="handleClickLeft" placeholder fixed safeAreaInsetTop></wd-navbar>
	<wd-card title="投放设置" custom-class="card-custom-class uni-mt-lg">
		<view class="uni-flex uni-justify-between">
			<view>营销目标</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{getLabelByValue(leyitou_order_setting,formData.marketing_goal)}}
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>优化目标</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{getLabelByValue(leyitou_order_setting,formData.delivery_setting?.external_action)}}
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>投放时长</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{formData.delivery_setting?.delivery_time || 0}}小时
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>出价模式</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{getLabelByValue(leyitou_order_setting,formData.delivery_setting?.bid_mode)}}
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>出价类型</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{getLabelByValue(leyitou_order_setting,formData.delivery_setting?.bid_type)}}
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>优化目标出价</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{formData.delivery_setting?.cpa_bid}}
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>目标支付ROI</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{formData.delivery_setting?.roi_goal || 0}}
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>单笔投放金额</view>
			<view class="uni-font-color-theme uni-text-bold">
				￥{{formData.delivery_setting?.amount}}
			</view>
		</view>
	</wd-card>
	<wd-card title="投放信息" custom-class="card-custom-class">
		<view class="uni-flex uni-justify-between">
			<view>付款抖音号</view>
			<view class="uni-flex uni-items-center uni-font-color-theme uni-text-bold">
				<wd-img v-if="douYin?.dyAuthorInfo?.avatar" width="50rpx" height="50rpx" round
					:src="douYin?.dyAuthorInfo?.avatar" />
				<wd-img v-else width="150rpx" height="150rpx" round
					src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
				<view class="uni-ml-lg">
					{{ douYin?.dyAuthorInfo?.nickName }}
				</view>
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>已选视频</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{vedio.length}}个
			</view>
		</view>
	</wd-card>
	<wd-card title="投放规则" custom-class="card-custom-class">
		<view class="uni-flex uni-justify-between">
			<view>投放笔数</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{func.createCount}} 笔
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>创建方式</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{ func.createWay === 0 ? '立即创建' : func.createWay === 1 ? '定时创建' : '分批创建'}}
			</view>
		</view>
		<view class="uni-flex uni-justify-between">
			<view>创建时间</view>
			<view class="uni-font-color-theme uni-text-bold">
				{{func.createTime}}
			</view>
		</view>
		<view class="uni-mt-lg uni-font-color-theme uni-text-bold">
			预计投放订单
			<wd-text type="error" :text="`${func.createCount * vedio.length}笔`"></wd-text>
			，预计投放金额
			<wd-text type="error"
				:text="`￥${ func.createCount * vedio.length * formData.delivery_setting.amount}笔`"></wd-text>
		</view>
	</wd-card>

	<view class="buttom-btn">
		<view class="uni-flex uni-justify-around uni-mt-lg">
			<wd-button @click="goBack" custom-class="uni-w-1-4" type="info">取消</wd-button>
			<wd-button @click="submit" :loading="submitLoading" custom-class="uni-w-1-4">确定</wd-button>
		</view>
	</view>

	<wd-toast />

</template>

<script setup lang="ts">
	import type {
		CreateOrderInfoVo, CreateOrderQuery
	} from '@/sub_page/api/creationTool/types'
	import type {
		DyAuthorAuthVo
	} from '@/api/index/types'
	import type {
		SxtVideoVo
	} from '@/api/selectData/types'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getLabelByValue,
		goBack
	} from '@/utils/utils'
	import {
		useDict
	} from '@/utils/dict'
	import {
		ref,
		toRefs
	} from 'vue'
	import {
		createUniOrder
	} from '@/sub_page/api/creationTool/index'
	import dayjs from 'dayjs'
	import { useToast } from 'wot-design-uni'

	const {
		leyitou_order_setting
	} = toRefs(useDict(['leyitou_order_setting']))
	console.log(leyitou_order_setting)
	const toast = useToast()

	const formData = ref<CreateOrderInfoVo>({
		advertiser_id: undefined,
		aweme_id: undefined,
		aweme_item_id: undefined,
		marketing_goal: 'LIVE_PROM_GOODS',

		delivery_setting: {
			external_action: 'AD_CONVERT_TYPE_LIVE_ROI',
			delivery_time: 6,
			bid_mode: 'PRICING_ACTION',
			bid_type: 'MANUAL_BID',
			amount: 100,
			cpa_bid: 10,
			roi_goal: 3,
			liveroom_heat_mode: 'BY_ROOM',
		},

		audience: {
			audience_mode: 'ATUO',
			exclude_limited_region: '1',
			age: [],
			author_ids: [],
			aweme_fan_accounts: [],
			aweme_fan_behaviors: [],
			behaviors: [],
			city: [],
			district: '',
			gender: '',
			interest_categories: [],
		},
	})
	const douYin = ref<DyAuthorAuthVo>()
	const douYinList = ref<DyAuthorAuthVo[]>([])
	const vedio = ref<SxtVideoVo[]>([])
	// 创建方式表单
	const func = ref({
		createCount: 1,
		createWay: 0,
		batchCount: 1,
		batchInterval: 5,
		createTime: Date.now(),
	});
	const submitLoading = ref<boolean>(false)

	const handleClickLeft = () => {
		uni.navigateBack()
	}

	// 检查设置
	const checkSetting = (orderSetting : any) => {
		if (formData.value.marketing_goal === 'VIDEO_PROM_GOODS') {
			delete orderSetting.delivery_setting.liveroom_heat_mode;
		}

		if (formData.value.delivery_setting?.bid_type === 'AUTO_BID') {
			delete orderSetting.delivery_setting.roi_goal;
			delete orderSetting.delivery_setting.cpa_bid;
		}

		if (formData.value.delivery_setting?.bid_mode === 'PRICING_PLAY') {
			delete orderSetting.delivery_setting.bid_type;
		}

		formData.value.delivery_setting?.external_action === 'AD_CONVERT_TYPE_LIVE_ROI'
			? delete orderSetting.delivery_setting.cpa_bid
			: delete orderSetting.delivery_setting.roi_goal;
	};

	const submit = () => {

		submitLoading.value = true;

		const orderSetting = JSON.parse(JSON.stringify(formData.value));

		checkSetting(orderSetting);

		const task : CreateOrderQuery = {
			uniList: [],
			list: [],
			createWay: func.value.createWay,
			createTime: [],
		};

		// console.log(awemeItems.value);
		if (formData.value.delivery_setting?.liveroom_heat_mode === 'BY_ROOM') {
			for (let count = 0; count < func.value.createCount; count++) {
				vedio.value.forEach((video) => {
					orderSetting.aweme_id = video.dyAuthorInfo.uid;
					orderSetting.aweme_item_id = video.dyVideoInfo.videoId;
					if (task.list) {
						task.list.push(JSON.parse(JSON.stringify(orderSetting)));
					}
				});
			}
		} else if (formData.value.delivery_setting?.liveroom_heat_mode === 'LIVE_PROM_GOODS') {
			for (let count = 0; count < func.value.createCount; count++) {
				douYinList.value.forEach((aweme) => {
					orderSetting.aweme_id = aweme.dyAuthorInfo?.uid;
					orderSetting.advertiser_id = aweme.qcSxtAdvertiserId;
					if (task.list) {
						task.list.push(JSON.parse(JSON.stringify(orderSetting)));
					}
				});
			}
		}

		// 立即创建
		if (func.value.createWay === 0) {
			task.createTime = [];
		}

		// 定时创建
		if (func.value.createWay === 1) {
			task.createTime = [func.value.createTime];
		}

		// 分批创建
		if (func.value.createWay === 2) {
			const time = dayjs(func.value.createTime);
			const batch = Math.ceil(func.value.createCount / func.value.batchCount);
			for (let i = 0; i < batch; i++) {
				for (let j = 0; j < func.value.batchCount; j++) {
					if (task.createTime && task.createTime.length >= func.value.createCount) {
						break;
					}
					if (task.createTime)
						task.createTime.push(time.format('YYYY-MM-DD HH:mm:ss'));
				}
				time.add(func.value.batchInterval, 'minutes');
			}
		}

		switch (task.createWay) {
			case 0: {
				task.createWay = 0;
				break;
			}
			case 1: {
				task.createWay = 1;

				break;
			}
			case 2: {
				task.createWay = 2;
				break;
			}
			default: {
				toast.error('创建方式错误');
				submitLoading.value = false;
				return;
			}
		}
		createUniOrder(task).then(res => {
			toast.success('任务提交成功');
		}).catch(() => {
			toast.error('任务提交失败');
		}).finally(() => {
			submitLoading.value = false;
		});
	}

	onLoad(() => {
		const data = uni.getStorageSync('liveAffirm-data');
		console.log(data)
		if (data) {
			formData.value = data.formData;
			douYin.value = data.douYin;
			vedio.value = data.vedio;
			func.value = data.func;
			douYinList.value = data.douYinList
		}
	})
</script>

<style scoped lang="scss">
	.buttom-btn {
		width: 100%;
		position: fixed;
		left: 0px;
		bottom: 0%;
		background-color: white;
		padding: 20rpx;
		z-index: 99;
	}
</style>

<style lang="scss">
	page {
		background-color: #f6f7fb;
	}

	.card-custom-class {
		padding-bottom: 20rpx !important;
		margin-top: 20rpx !important;
	}
</style>