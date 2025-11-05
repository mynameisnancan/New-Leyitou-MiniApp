<template>
	<wd-form ref="formRef" :model="formData">
		<wd-cell-group border>
			<wd-cell title="付款抖音号" title-width="180rpx" :value="radioDouYinValue?.dyAuthorInfo?.nickName"
				@click="openSelectDouYin" ellipsis is-link />
			<wd-cell title="添加方式" title-width="180rpx">
				<view class="custom-radio">
					<wd-radio-group v-model="awemeItemSource" shape="button" inline>
						<wd-radio value="NORMAL">正常添加</wd-radio>
						<wd-radio value="LINK">链接添加</wd-radio>
					</wd-radio-group>
				</view>
			</wd-cell>
			<wd-cell title="加热方式" title-width="180rpx">
				<view class="custom-radio">
					<wd-radio-group v-model="formData.delivery_setting.liveroom_heat_mode" shape="button" inline>
						<wd-radio value="BY_ROOM">直接加热</wd-radio>
						<wd-radio value="BY_VIDEO">视频加热</wd-radio>
					</wd-radio-group>
				</view>
			</wd-cell>
			
			<wd-cell v-if="videoSelectVisiable && awemeItemSource === 'NORMAL'" title="订单素材" title-width="180rpx"
				:value="`已选中${awemeItems.length}个`" @click="openSelectOrder" ellipsis is-link />
			<wd-input v-else-if="videoSelectVisiable && awemeItemSource === 'LINK'" type="text" label="选择视频" prop="orderId" clearable v-model="awemeItemLink"
				placeholder="请输入视频链接" label-width="180rpx">
				<template #suffix>
					<wd-button @click="handleAddItemLink" size="small">解析</wd-button>
				</template>
			</wd-input>
			<wd-cell v-else title="选择直播账号" title-width="180rpx"
				:value="`已选择${multipleDouYinValue.length}个`" @click="openMultipleSelectDouYin" ellipsis is-link />	
			
			<!-- 优化目标 -->
			<wd-cell>
				<template #title>
					<view class="uni-text-bold">优化目标</view>
				</template>
			</wd-cell>
			<wd-picker :columns="deliveryTimesLive" label="投放时长" v-model="formData.delivery_setting.delivery_time"
				clearable label-width="180rpx" />
			<wd-cell title="出价模式" label-width="180rpx">
				<view class="custom-radio">
					<wd-radio-group v-model="formData.delivery_setting.bid_mode" shape="button" inline>
						<wd-radio value="PRICING_ACTION">按优化目标</wd-radio>
					</wd-radio-group>
				</view>
			</wd-cell>
			<wd-cell title="出价类型" title-width="180rpx">
				<view class="custom-radio">
					<wd-radio-group v-model="formData.delivery_setting.bid_type" shape="button" inline>
						<wd-radio value="AUTO_BID">自动出价</wd-radio>
						<wd-radio value="MANUAL_BID">手动出价</wd-radio>
					</wd-radio-group>
				</view>
			</wd-cell>
			<wd-cell v-if="isROI && !manualBidDisiable" title="目标支付ROI" title-width="180rpx">
				<wd-input-number v-model="formData.delivery_setting.roi_goal" :min="0.01" :max="100" :step="0.1" />
			</wd-cell>
			<wd-cell title="单笔投放金额" title-width="180rpx">
				<wd-input-number v-model="formData.delivery_setting.amount" :min="100" :max="5000000" :step="100" />
			</wd-cell>
			<wd-cell title="创建方式" title-width="180rpx">
				<wd-radio-group v-model="func.createWay" shape="button">
					<wd-radio :value="0">立即创建</wd-radio>
					<wd-radio :value="1">定时创建</wd-radio>
					<wd-radio :value="2" :disabled="func.createCount<=1">分批创建</wd-radio>
				</wd-radio-group>
			</wd-cell>
			<wd-cell title="投放笔数" title-width="180rpx">
				<wd-input-number v-model="func.createCount" :min="1" :max="100" :step="1" />
			</wd-cell>
			<wd-transition :show="!createNow">
				<wd-datetime-picker type="datetime" v-model="func.createTime" label="创建时间" use-second />
			</wd-transition>

		</wd-cell-group>
		<view class="uni-flex uni-justify-center uni-mt-lg">
			<wd-button @click="createOrder" custom-class="uni-w-3-4">创建订单</wd-button>
		</view>
	</wd-form>




	<!-- 选择抖音号弹窗 -->
	<baseSelectDouYin v-model:visible="douYinVisible" v-model:selectedValue="douYinSelectedValue"
		@confirm="douYinConfirm" :multiple="douYinMultiple"></baseSelectDouYin>
	
	<!-- 选中素材 -->
	<!-- 选择订单素材弹窗 -->
	<baseSelectOrder
		v-model:visible="orderVisible"
		v-model:selectedValue="orderSelectedValue"
		@confirm="orderConfirm"
		multiple
	></baseSelectOrder>
	
	<wd-toast />
</template>

<script setup lang="ts">
	import type {
		CreateOrderInfoVo
	} from '@/sub_page/api/creationTool/types'
	import type {
		DyAuthorAuthVo
	} from '@/api/index/types'
	import type {
		SxtVideoVo
	} from '@/api/selectData/types'
	import { useToast } from 'wot-design-uni'
	import {
		getDyAuthorList
	} from '@/api/index/index'
	import {
		awemeItemParse,
		deliveryCheck
	} from '@/sub_page/api/creationTool/index'
	import {
		ref,
		computed
	} from 'vue'
	import dayjs from 'dayjs'

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

	// 创建方式表单
	const func = ref({
		createCount: 1,
		createWay: 0,
		batchCount: 1,
		batchInterval: 5,
		createTime: Date.now(),
	});

	const awemeItemSource = ref<string>('NORMAL');

	// 选择抖音弹窗默认选中数据
	const douYinSelectedValue = ref()
	// 单选抖音账号默认选中数据
	const radioDouYinValue = ref();
	// 多选抖音账号默认选中数据
	const multipleDouYinValue = ref([])

	const douYinType = ref<'selectedDouYin' | 'multipleDouYin'>()
	// 抖音账号
	const selectedDouYin = ref<DyAuthorAuthVo>()
	// 选择抖音账号弹窗
	const douYinVisible = ref<boolean>(false)

	// 抖音账号选择是否多选
	const douYinMultiple = ref<boolean>(false);

	const awemeItemLink = ref<string>('')


	const awemeList = ref<DyAuthorAuthVo[]>([])

	const orderVisible = ref<boolean>(false)
	// 选中的素材列表
	const awemeItems = ref<SxtVideoVo[]>([]);
	// 默认选中的素材value
	const orderSelectedValue = ref<any>([])

	// 直播投放时长
	const deliveryTimesLive = [
		{
			label: '0.5小时',
			value: 0.5
		},
		{
			label: '1小时',
			value: 1
		},
		{
			label: '1.5小时',
			value: 1.5
		},
		{
			label: '2小时',
			value: 2
		},
		{
			label: '2.5小时',
			value: 2.5
		},
		{
			label: '3小时',
			value: 3
		},
		{
			label: '3.5小时',
			value: 3.5
		},
		{
			label: '4小时',
			value: 4
		},
		{
			label: '4.5小时',
			value: 4.5
		},
		{
			label: '5小时',
			value: 5
		},
		{
			label: '5.5小时',
			value: 5.5
		},
		{
			label: '6小时',
			value: 6
		},
		{
			label: '12小时',
			value: 12
		},
		{
			label: '24小时',
			value: 24
		},
	];

	// 素材选择表单是否可见, 取反为选择直播间是否可见
	const videoSelectVisiable = computed(() => {
		return !(
			formData.value.marketing_goal === 'LIVE_PROM_GOODS' &&
			formData.value.delivery_setting?.liveroom_heat_mode === 'BY_ROOM'
		);
	});
	// 计算属性
	const isLive = computed(() => formData.value.marketing_goal === 'LIVE_PROM_GOODS');
	const isROI = computed(
		() => formData.value?.delivery_setting?.external_action === 'AD_CONVERT_TYPE_LIVE_ROI',
	);
	const bidShow = computed(() => formData.value?.delivery_setting?.bid_mode === 'PRICING_ACTION');
	const isManualBid = computed(() => formData.value?.delivery_setting?.bid_type === 'MANUAL_BID');
	// const playDisiable = computed(() => props.marketingGoal === 'LIVE_PROM_GOODS');
	const manualBidDisiable = computed(() => !!(isLive.value && !isROI.value));
	const autoBidDisiable = computed(() => !!(!isLive.value && isROI.value));
	const createNow = computed(() => func.value.createWay === 0);

	// 打开选择抖音账号弹窗
	const openSelectDouYin = () => {
		douYinSelectedValue.value = radioDouYinValue.value?.authorId || null
		douYinType.value = 'selectedDouYin'
		douYinMultiple.value = false
		douYinVisible.value = true
	}

	// 抖音账号选择弹出框确认事件
	const douYinConfirm = (selectedData : any) => {
		if(!selectedData) return ;
		if (douYinType.value === 'selectedDouYin') {
			radioDouYinValue.value = selectedData
			formData.value.aweme_id = selectedData.dyAuthorInfo?.authorId
			formData.value.advertiser_id = selectedData.qcSxtAdvertiserId
		} else if (douYinType.value === 'multipleDouYin') {
			multipleDouYinValue.value = selectedData
		}
	}
	
	// 打开选中素材弹出框
	const openSelectOrder = () => {
		orderSelectedValue.value = awemeItems.value.map((item:any) => item?.dyVideoInfo?.videoId)
		orderVisible.value = true
	}
	
	// 素材选中弹窗确认事件
	const orderConfirm = (selectedData:any) => {
		if(selectedData)awemeItems.value = selectedData
	}

	const createOrder = async () => {
		const valid = validateForm()
		if (!valid) return;
		try {
			await hasDeliveryPermission()
			uni.setStorageSync('liveAffirm-data',{
				formData:formData.value,
				douYin:radioDouYinValue.value,
				douYinList: multipleDouYinValue.value,
				vedio:awemeItems.value,
				func:func.value
			})
			uni.navigateTo({
				url: '/sub_page/pages/creationTool/liveAffirm',
				animationType: 'slide-in-right'
			})
		} catch (error : any) {
			toast.error(error[key][0].message);
		}
	}

	// 提交任务时校验表单
	const validateForm = () => {
		if (!formData.value.aweme_id) {
			return toast.warning('请选择付款抖音号!')
		}
		if(formData.value?.delivery_setting?.liveroom_heat_mode === 'BY_ROOM' && multipleDouYinValue.value.length === 0){
			return toast.warning('请选择直播账号!')
		}
		if(formData.value?.delivery_setting?.liveroom_heat_mode === 'BY_VIDEO' ){
			if(awemeItems.value.length === 0 && awemeItemSource.value === 'NORMAL'){
				return toast.warning('请选择订单素材!')
			}
			if(awemeItemSource.value === 'LINK' && !awemeItemLink.value){
				return toast.warning('请输入视频链接!')
			}
		}
		return true
	}

	// 解析视频
	const handleAddItemLink = () => {
		if (!formData.value.advertiser_id) {
			toast.error('请先选择付款抖音号！')
			return;
		}
		const itemId = awemeItemLink.value.match(/\d{19}/g);
		if (!itemId) {
			toast.error('链接不合法，请检查后重新输入！')
			return;
		}

		if (awemeItems.value.some((obj) => obj.dyVideoInfo.videoId === itemId[0])) {
			toast.warning('素材已存在！');
			return;
		}

		awemeItemParse({
			awemeId: `${formData.value.aweme_id}`,
			awemeItemId: Number(itemId[0]),
		}).then((res) => {
			if (res.data) {
				toast.success('解析成功！')
				awemeItemLink.value = '';
				awemeItems.value.push(res.data);
				return;
			}
			toast.error('解析失败！');
		});
	}

	// 打开多选抖音号弹窗
	const openMultipleSelectDouYin = () => {
		douYinSelectedValue.value = multipleDouYinValue.value.map((item : DyAuthorAuthVo) => item?.authorId);
		douYinType.value = 'multipleDouYin'
		douYinMultiple.value = true
		douYinVisible.value = true
	}

	// 获取账号列表
	const getAwemeList = async () => {
		const res = await getDyAuthorList({ pageSize: 1000, pageNum: 1 });
		awemeList.value = res?.rows || [];
	};

	// 检查代投权限
	const hasDeliveryPermission = async () => {
		let awemeId : any = null;
		const selectedAweme = awemeList.value.find(
			(aweme : DyAuthorAuthVo) => aweme.qcSxtAdvertiserId === formData.value.advertiser_id,
		);
		if (selectedAweme) {
			awemeId = selectedAweme.authorId;
		}
		const checkList : any[] = [];
		awemeItems.value.forEach((video) => {
			if (
				`${awemeId}` !== video.dyVideoInfo.videoId &&
				!checkList.includes(video.dyVideoInfo.videoId)
			) {
				checkList.push(video.dyVideoInfo.videoId);
			}
		});
		if (checkList.length > 0) {
			try {
				await deliveryCheck({
					advertiserId: formData.value.advertiser_id,
					uids: checkList,
				});
			} catch {
				return false;
			}
		}
		return true;
	};


	getAwemeList()


	// 允许当前文件样式穿透
	defineOptions({
		options: {
			styleIsolation: 'shared'
		}
	})
</script>

<style lang="scss">
	page {
		padding-bottom: 100rpx;
	}

	.custom-radio {
		.wd-radio {
			line-height: unset;
		}
	}
</style>