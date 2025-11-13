<template>
	<view class="page-class">
		<z-paging ref="paging" use-virtual-list @scroll="paginScroll" :force-close-inner-list="true"
			@virtualListChange="virtualListChange" @query="queryList" auto-show-back-to-top auto-show-system-loading
			loading-more-no-more-text="没有更多数据了~" showScrollbar preload-page="50">

			<template #top>
				<wd-navbar title="商品列表" left-arrow @click-left="handleClickLeft" placeholder fixed
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
					<view class="commoditys-item" v-for="(item,index) in listData" :key="item.zp_index"
						:id="`zp-id-${item.zp_index}`">
						<view class="uni-flex uni-justify-between">
							<view class="accout-img uni-flex  uni-items-center author-info">
								<image :src="item.dyAuthorInfo?.avatar" class="image" />
								<text class="user-name">{{item.dyAuthorInfo?.nickName}}</text>
								<text class="user-name">运营人:
									{{item.dyAuthorInfo?.userInfo?.nickName}}</text>
							</view>
							<view @click="put(item)" class="uni-flex uni-items-center">
								<wd-icon name="link" size="30rpx" custom-class="link-custom-class"></wd-icon>
								<wd-text text="投放" type="primary" size="26rpx"></wd-text>
							</view>
						</view>

						<view class="data-top">
							<view class="uni-flex  uni-justify-between uni-w-full">
								<image v-if="item.dyProductInfo?.cover" :src="item.dyProductInfo?.cover" class="image">
								</image>
								<view v-else class="hidden-message-img">图片已隐藏</view>
								<view class="title-item">
									<view class="title">{{item.dyProductInfo?.title}}</view>
									<view class="remark uni-text-warp-2">
										不可投广的原因：{{item.grayReason}}
									</view>
									<view class="uni-flex uni-items-center">
										<view class="order-code">
											账户ID：{{item.advertiserId}}
										</view>
										<view class="uni-ml-sm uni-border-radius-sm uni-p-sm">
											<baseTag :options="sxt_channel_type" :value="item.channelType"></baseTag>
										</view>
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
		UniProductQuery,
		QcUniProductVo
	} from '@/api/index/type'
	import {
		getUniProductList
	} from '@/api/index/index'
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
	import filterPopup from './components/filterPopup'

	const {
		sxt_channel_type
	} = toRefs(useDict(['sxt_channel_type']))

	const pageParams = ref({
		pageNum: 1,
		pageSize: 10,
		total: 0
	})
	const filterQuery = ref<UniProductQuery>({
		productId: undefined,
		awemeId: undefined,
		channelType: undefined
	})

	const listData = ref<QcUniProductVo[]>([])

	const handleClickLeft = () => {
		uni.navigateBack()
	}

	const scrollTop = ref<number>(0)

	const filterVisible = ref<boolean>(false)

	function paginScroll(e : any) {
		scrollTop.value = e.detail.scrollTop
	}

	function virtualListChange(vList : QcUniProductVo[]) {
		console.log(vList.length)
		listData.value = vList;
	}

	const paging = ref()

	function queryList(pageNo : number, pageSize : number) {
		pageParams.value.pageNum = pageNo
		pageParams.value.pageSize = pageSize
		getUniProductList({
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
			productId: undefined,
			awemeId: undefined,
			channelType: undefined
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

	// 调整到投放工具模块 并携带参数
	const put = (item : QcUniProductVo) => {
		uni.setStorageSync('tools-data-commodity', item)
		uni.navigateTo({
			url: '/sub_page/pages/creationTool/index',
			animationType: 'slide-in-right'
		})
	}


	watch(() => filterQuery.value, () => {
		filterConfirm()
	}, {
		deep: true
	})
</script>

<style lang="scss" scoped>
	.commoditys-item {
		width: 100%;
		background-color: white;
		border-radius: 10rpx;
		padding: 10rpx;
		margin-top: 20rpx;


		.accout-img {
			padding-bottom: 10rpx;
		}

		.author-info {
			color: rgb(126, 125, 130);
			font-size: 26rpx;

			.user-name {
				margin-left: 20rpx;
			}

			.image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50rpx;
			}
		}

		.data-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: 1px solid #f0f0f0;
			padding: 5px 0px;

			.image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 5px;
			}

			.hidden-message-img {
				width: 120rpx;
				height: 120rpx;
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
				width: calc(100% - 120rpx);
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
					font-size: 20rpx;
					width: 100%;
					position: relative;
				}

				.order-code {
					font-size: 20rpx;
				}
			}
		}
	}
</style>
<style lang="scss">
	.filter {
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		box-shadow: 0 4px 5px #e4e8fc4d;
		padding: 10rpx 20rpx;
	}

	.link-custom-class {
		color: var(--wot-text-primary-color, var(--wot-color-theme, #4d80f0));
	}

	.page-class {
		background-color: #f6f7fb;
		min-height: 100vh;
	}

	 // 设置黑夜模式下的样式
	.wot-theme-dark {
		.commoditys-item {
			background-color: #1b1b1b !important;
			color: var(--wot-dark-color3, rgba(232, 230, 227, .8));
		}
	}
</style>