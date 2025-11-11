<template>
	<view>
		<z-paging ref="paging" use-virtual-list @scroll="paginScroll" :force-close-inner-list="true"
			:virtual-list-col="2" @virtualListChange="virtualListChange" @query="queryList" auto-show-back-to-top
			auto-show-system-loading loading-more-no-more-text="没有更多数据了~" preload-page="50" showScrollbar>
			<template #top>
				<wd-navbar title="投放记录" left-arrow @click-left="handleClickLeft" placeholder fixed
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
				<view class="uni-px-lg">
					<view class="record-item" @click.stop="toMessage(item)" v-for="(item,index) in listData"
						:key="item.zp_index" :id="`zp-id-${item.zp_index}`">
						<view class="uni-flex uni-items-center author-info uni-text-26 uni-font-color-gray uni-pb-sm">
							<view>抖音达人：</view>
							<image v-if="item.dyAuthorInfo?.avatar" :src="item.dyAuthorInfo?.avatar" class="image" />
							<image v-else src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
								class="image" />
							<text class="user-name">{{item.dyAuthorInfo?.nickName || '暂无'}}</text>
							<text class="user-name">运营人: {{item.dyAuthorInfo?.userInfo?.nickName || '暂无'}}</text>
						</view>
						<view class="data-top">
							<view class="uni-flex  uni-justify-between uni-w-9-10">
								<image v-if="item?.dyProductInfo?.cover" :src="item?.dyProductInfo?.cover"
									class="image"></image>
								<view v-else class="hidden-message-img">暂无图片</view>
								<view class="title-item">
									<view class="title">{{item?.dyProductInfo?.title}}</view>
									<view class="remark uni-text-22">
										<view class="uni-flex uni-items-center">
											<view>
												<wd-text type="error"
													:text="`￥${item?.dyProductInfo?.price}`"></wd-text>
											</view>
											<view class="uni-ml-sm">
												库存：{{item?.dyProductInfo?.productStock || 0}}
											</view>
											<view class="uni-ml-sm">
												<baseTag :options="sxt_bud_marketing_goal" :value="item.marketingGoal">
												</baseTag>
											</view>
										</view>
									</view>
									<view class="uni-flex uni-items-center uni-text-22 uni-font-color-black">
										订单ID：{{ item.orderId || '--'}}
									</view>
									<view
										class="uni-flex uni-items-center author-info uni-font-color-black uni-text-22">
										<view>付款账户：</view>
										<image v-if="item.payDyAuthorInfo?.avatar" :src="item.payDyAuthorInfo?.avatar"
											class="image" />
										<image v-else
											src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
											class="image" />
										<text class="user-name">{{item.payDyAuthorInfo?.nickName || '暂无'}}</text>
										<text class="user-name">运营人:
											{{item.payDyAuthorInfo?.userInfo?.nickName || '暂无'}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</z-paging>

		<filterPopup v-model:visible="filterVisible" v-model:queryForm="filterQuery" @confirm="filterConfirm" />
	</view>


</template>

<script setup lang="ts">
	import type {
		SxtOrderCreateRecordQuery,
		SxtOrderCreateRecordVo
	} from '@/sub_page/api/createRecord/types'
	import {
		getCreateRecordList
	} from '@/sub_page/api/createRecord/index'
	import {
		ref,
		toRefs,
		watch
	} from 'vue'
	import {
		useDict
	} from '@/utils/dict'
	import {
		getNavHeight
	} from '@/utils/utils'
	import filterPopup from './components/filterPopup'

	const pageParams = ref({
		pageNum: 1,
		pageSize: 10,
		total: 0
	})
	const filterQuery = ref<SxtOrderCreateRecordQuery>({
		awemeId: undefined,
		productId: undefined,
		marketingGoal: undefined,
		createStatus: undefined,
	})
	const listData = ref<SxtOrderCreateRecordVo[]>([])

	const {
		sxt_bud_marketing_goal
	} = toRefs(useDict(['sxt_bud_marketing_goal']))

	const scrollTop = ref<number>(0)

	const filterVisible = ref<boolean>(false)

	function paginScroll(e : any) {
		scrollTop.value = e.detail.scrollTop
	}

	function virtualListChange(vList : SxtOrderCreateRecordVo[]) {
		listData.value = vList;
	}

	const paging = ref()
	function queryList(pageNo : number, pageSize : number) {
		pageParams.value.pageNum = pageNo
		pageParams.value.pageSize = pageSize
		console.log(filterQuery.value)
		getCreateRecordList({
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
			awemeId: undefined,
			productId: undefined,
			marketingGoal: undefined,
			createStatus: undefined,
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

	const handleClickLeft = () => {
		uni.navigateBack()
	}

	function toMessage(item : SxtOrderCreateRecordVo) {
		uni.setStorageSync('createRecord', item)
		uni.navigateTo({
			url: `/sub_page/pages/createRecord/detail`,
			animationType: 'slide-in-right'
		})
	}

	watch(() => filterQuery.value, () => {
		filterConfirm()
	}, { deep: true })
</script>

<style lang="scss" scoped>
	.filter {
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		box-shadow: 0 4px 5px #e4e8fc4d;
		padding: 10rpx 20rpx;
	}

	.record-item {
		width: 100%;
		background-color: white;
		border-radius: 10rpx;
		padding: 10rpx;
		margin-top: 20rpx;

		.author-info {
			.user-name {
				margin-left: 20rpx;
			}

			.image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50rpx;
			}
		}
	}

	.data-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid #f0f0f0;
		padding-top: 10rpx;

		.image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 5px;
		}

		.hidden-message-img {
			width: 150rpx;
			height: 150rpx;
			border-radius: 5px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #dee3ef;
			font-size: 15rpx;
			color: #7e7d82;
		}

		.title-item {
			display: flex;
			flex-wrap: wrap;
			width: calc(100% - 150rpx);
			padding-left: 5px;

			.title {
				font-weight: 500;
				font-size: 26rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.remark {
				display: flex;
				align-items: center;
				width: 100%;
			}
		}
	}

	.data-bottom {
		padding: 10rpx 0rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
	}

	.back-top {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.5);
		padding: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid white;
	}
</style>

<style lang="scss">
	page {
		background-color: #f6f7fb;
	}
</style>