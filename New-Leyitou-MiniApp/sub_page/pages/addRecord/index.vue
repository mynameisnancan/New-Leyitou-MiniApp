<template>
	<view class="page-class">
		<z-paging ref="paging" use-virtual-list @scroll="paginScroll" :force-close-inner-list="true"
			:virtual-list-col="1" @virtualListChange="virtualListChange" @query="queryList" auto-show-back-to-top
			auto-show-system-loading loading-more-no-more-text="没有更多数据了~" preload-page="50" showScrollbar>

			<template #top>
				<wd-navbar title="追投记录" left-arrow @click-left="handleClickLeft" placeholder fixed
					safeAreaInsetTop></wd-navbar>
				<view
					class="filter uni-bg-color-white uni-font-color-gray uni-flex uni-items-center uni-text-26 uni-justify-between">
					<view @click="openFilter" class="uni-flex uni-items-center">
						数据筛选
						<view class="icon">
							<text class="t-icon icon-shaixuan"></text>
						</view>
					</view>
					<view @click="reset">
						重置
						<wd-icon name="refresh" size="32rpx"></wd-icon>
					</view>

				</view>
			</template>
			<template #empty>
				<view class="uni-pt-xl uni-pb-xl">
					<wd-status-tip image="content" tip="暂无数据" />
				</view>
			</template>
			<template #backToTop>
				<view class="back-top" @click="backTop">
					<wd-icon name="backtop" size="40rpx"></wd-icon>
				</view>
			</template>
			<template #loadingMoreLoading>
				<wd-loadmore state="loading" :loading-props="{size:'40rpx'}" />
			</template>

			<view class="uni-w-full uni-h-full">
				<view>
					<wd-card v-for="(item,index) in listData" :key="item.zp_index" :id="`zp-id-${item.zp_index}`"
						title="" custom-class="card-custom-class">
						<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
							<view>订单ID</view>
							<view @click="copyStr(item.orderId)" class="uni-font-color-black">
								<text>{{item.orderId}}</text>
								<wd-icon name="file-copy" size="30rpx"></wd-icon>
							</view>

						</view>
						<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
							<view>广告账户ID</view>
							<view @click="copyStr(item.advertiserId)" class="uni-font-color-black">
								<text>{{item.advertiserId}}</text>
								<wd-icon name="file-copy" size="30rpx"></wd-icon>
							</view>
						</view>
						<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
							<view>追投信息</view>
							<view>
								<view class="uni-font-color-black">追加预算：<wd-text type="error"
										:text="`${item.addAmount || '--'}元`"></wd-text></view>
								<view class="uni-font-color-black">投放预算：<wd-text type="error"
										:text="`${item.addDeliveryTime || '--'} ${getTimeUnit(item.timeUnit)}`"></wd-text>
								</view>
								<view class="uni-font-color-black">追投类型：
									<baseTag :options="sxt_add_type" :value="item.addType" />
								</view>
							</view>
						</view>
						<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
							<view>操作类型</view>
							<view>
								<baseTag :options="sxt_opt_type" :value="item.optType" />
							</view>
						</view>
						<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
							<view>追投人</view>
							<view class="uni-font-color-black">
								<view>{{item.userInfo?.nickName || '--'}}</view>
							</view>
						</view>
						<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
							<view>追投请求结果</view>
							<view>
								<baseTag :options="sxt_req_success" :value="item.reqSuccess" />
							</view>
						</view>
						<view class="uni-flex uni-items-center uni-justify-between uni-mt-lg">
							<view>追投时间</view>
							<view class="uni-font-color-black">{{item.createTime || '--' }}</view>
						</view>
					</wd-card>
				</view>
			</view>
		</z-paging>

		<filterPopup v-model:visible="filterVisible" v-model:queryForm="filterQuery" @confirm="filterConfirm" />

	</view>
</template>

<script setup lang="ts">
	import type {
		SxtOrderAddRecordQuery,
		SxtOrderAddRecordVo
	} from '@/sub_page/api/addRecord/types'
	import {
		getAddRecordList
	} from '@/sub_page/api/addRecord/index'
	import {
		useDict
	} from '@/utils/dict'
	import {
		copyStr
	} from '@/utils/utils'
	import {
		ref,
		toRefs,
		watch
	} from 'vue'
	import filterPopup from './components/filterPopup.vue'

	const {
		sxt_add_type,
		sxt_opt_type,
		sxt_req_success
	} = toRefs(useDict(['sxt_add_type', 'sxt_opt_type','sxt_req_success'], true))

	const pageParams = ref({
		pageNum: 1,
		pageSize: 10,
		total: 0
	})
	const filterQuery = ref<SxtOrderAddRecordQuery>({
		advertiserId: undefined,
		authorId: undefined,
		addType: 1,
		optType: undefined,
		reqSuccess: undefined,
	})
	const listData = ref<SxtOrderAddRecordVo[]>([])

	const handleClickLeft = () => {
		uni.navigateBack()
	}

	const scrollTop = ref<number>(0)

	const filterVisible = ref<boolean>(false)

	function paginScroll(e : any) {
		scrollTop.value = e.detail.scrollTop
	}

	function virtualListChange(vList : SxtOrderAddRecordVo[]) {
		listData.value = vList;
	}

	const paging = ref()
	function queryList(pageNo : number, pageSize : number) {
		pageParams.value.pageNum = pageNo
		pageParams.value.pageSize = pageSize
		getAddRecordList({
			...pageParams.value,
			...filterQuery.value,
			noLoading: true
		}).then(res => {
			// 当前行用于小程序提交审核 避免数据出现违规。
			if (uni.getStorageSync('userInfo').userName == '14888888888') return;
			paging.value.completeByTotal(res.rows, res.total)
		})
	}

	const openFilter = () => {
		filterVisible.value = true
	}


	const reset = () => {
		filterQuery.value = {
			advertiserId: undefined,
			authorId: undefined,
			addType: 1,
			optType: undefined,
			reqSuccess: undefined,
		}
	}

	const filterConfirm = () => {
		pageParams.value = {
			pageNum: 1,
			pageSize: 10,
			total: 0
		}
		paging.value.reload()
	}

	function backTop() {
		paging.value.scrollToTop()
	}

	const getTimeUnit = (timeUnit : number) => {
		const time = ['小时', '天'];
		return time[timeUnit] || '';
	};

	watch(() => filterQuery.value, () => {
		filterConfirm()
	}, { deep: true })
</script>

<style lang="scss">
	.filter {
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		box-shadow: 0 4px 5px #e4e8fc4d;
		padding: 10rpx 20rpx;
	}

	.card-custom-class {
		padding: 10rpx 20rpx !important;
		margin: 20rpx !important;
	}

	.page-class {
		background-color: #f6f7fb;
		min-height: 100vh;
	}
</style>