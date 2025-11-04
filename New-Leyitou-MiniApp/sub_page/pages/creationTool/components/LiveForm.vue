<template>
	<wd-form ref="formRef" :model="formData">
		<wd-cell-group border>
			<wd-cell title="付款抖音号" title-width="180rpx" :value="selectedDouYin?.dyAuthorInfo?.nickName"
				@click="openSelectDouYin" ellipsis is-link />
			<wd-cell title="出价类型" title-width="180rpx">
				<wd-radio-group v-model="awemeItemSource" shape="button" inline>
					<wd-radio value="NORMAL">正常添加</wd-radio>
					<wd-radio value="LINK">链接添加</wd-radio>
				</wd-radio-group>
			</wd-cell>
			<wd-cell title="加热方式" title-width="180rpx">
				<wd-radio-group v-model="formData.delivery_setting.liveroom_heat_mode" shape="button" inline>
					<wd-radio value="BY_ROOM">直接加热直播间</wd-radio>
					<wd-radio value="BY_VIDEO">视频加热直播间</wd-radio>
				</wd-radio-group>
			</wd-cell>
			<wd-transition :show="videoSelectVisiable" name="slide">
				<wd-cell title="选择直播账号" title-width="180rpx" :value="1" @click="openMultipleSelectDouYin" ellipsis
					is-link />
			</wd-transition>
			<wd-transition :show="!videoSelectVisiable" name="slide">
				<wd-input type="text" label="选择视频" prop="orderId" clearable v-model="awemeItemLink" placeholder="请输入视频链接"
					label-width="180rpx">
					<template #suffix>
						<wd-button @click="handleAddItemLink" size="small">解析</wd-button>
					</template>
				</wd-input>
			</wd-transition>
		</wd-cell-group>
		
		<!-- 优化目标 -->
		<wd-card title="优化目标">
			<wd-cell-group border>
				<wd-picker
					:columns="deliveryTimesLive" 
					label="订单状态" 
					v-model="formData.delivery_setting.delivery_time" 
					clearable
					label-width="180rpx"
				/>
				<wd-cell title="出价模式" label-width="180rpx">
					 <wd-radio-group v-model="formData.delivery_setting.bid_mode">
					    <wd-radio value="PRICING_ACTION">按优化目标</wd-radio>
					  </wd-radio-group>
				</wd-cell>
				<wd-cell title="出价类型" label-width="180rpx">
					 <wd-radio-group v-model="formData.delivery_setting.bid_type">
					    <wd-radio value="AUTO_BID">自动出价</wd-radio>
						<wd-radio value="MANUAL_BID">手动出价</wd-radio>
					  </wd-radio-group>
				</wd-cell>
				<wd-cell  v-if="isROI && !manualBidDisiable" title="目标支付ROI" title-width="180rpx">
					<wd-input-number v-model="formData.delivery_setting.roi_goal" :min="0.01" :max="100" :step="0.1" />
				</wd-cell>
				<wd-cell title="单笔投放金额" title-width="180rpx">
					<wd-input-number v-model="formData.delivery_setting.amount" :min="100" :max="5000000" :step="100" />
				</wd-cell>
				
			</wd-cell-group>
		</wd-card>
	</wd-form>


	<!-- 选择抖音号弹窗 -->
	<baseSelectDouYin v-model:visible="douYinVisible" v-model:selectedValue="douYinSelectedValue"
		@confirm="douYinConfirm" :multiple="douYinMultiple"></baseSelectDouYin>
		
	<wd-toast />
</template>

<script setup lang="ts">
	import type {
		CreateOrderInfoVo
	} from '@/sub_page/api/creationTool/types'
	import type {
		DyAuthorAuthVo
	} from '@/api/index/types'
	import { useToast } from 'wot-design-uni'
	import {
		awemeItemParse
	}from '@/sub_page/api/creationTool/index'
	import {
		ref,
		computed
	} from 'vue'
	import type {
		SxtVideoVo
	}from '@/api/selectData/types'
	
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

	const awemeItemSource = ref<string>('NORMAL');

	// 选择抖音弹窗默认选中
	const douYinSelectedValue = ref()
	const douYinType = ref<'selectedDouYin' | 'multipleDouYin'>()
	// 抖音账号
	const selectedDouYin = ref<DyAuthorAuthVo>()
	// 选择抖音账号弹窗
	const douYinVisible = ref<boolean>(false)

	// 抖音账号选择是否多选
	const douYinMultiple = ref<boolean>(false);

	const awemeItemLink = ref<string>('')
	// 选中的素材列表
	const awemeItems = ref<SxtVideoVo[]>([]);
	
	
	// 直播投放时长
	const deliveryTimesLive = [
	  0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 12, 24,
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

	// 打开选择抖音账号弹窗
	const openSelectDouYin = () => {
		douYinSelectedValue.value = selectedDouYin.value?.authorId || null
		douYinType.value = 'selectedDouYin'
		douYinMultiple.value = false
		douYinVisible.value = true
	}

	// 抖音账号选择弹出框确认事件
	const douYinConfirm = (selectedData : any) => {
		console.log(selectedData)
		if (douYinType.value === 'selectedDouYin') {
			selectedDouYin.value = selectedData
		}
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

	const openMultipleSelectDouYin = () => {
		douYinSelectedValue.value = [];
		douYinType.value = 'selectedDouYin'
		douYinMultiple.value = true
		douYinVisible.value = true
	}
</script>

<style lang="scss">

</style>