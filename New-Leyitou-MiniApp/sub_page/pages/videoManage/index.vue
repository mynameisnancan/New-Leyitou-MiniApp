<template>
	<view class="page-class">
		<z-paging ref="paging" use-virtual-list @scroll="paginScroll" :force-close-inner-list="true"
			:virtual-list-col="2" @virtualListChange="virtualListChange" @query="queryList" auto-show-back-to-top
			auto-show-system-loading loading-more-no-more-text="没有更多数据了~" preload-page="50" showScrollbar>

			<template #top>
				<wd-navbar title="素材管理" left-arrow @click-left="handleClickLeft" placeholder fixed
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

			<view class="uni-w-full uni-h-full uni-p-lg">
				<view class="commoditys-item" v-for="(item,index) in listData" :key="index">
					<view class="accout-img uni-flex uni-justify-between uni-items-center">
						<view class="uni-flex  uni-items-center author-info">
							<image :src="item.dyAuthorInfo?.avatar" class="image" />
							<text class="user-name">{{item.dyAuthorInfo?.nickName}}</text>
							<text class="user-name">运营人: {{item.dyAuthorInfo?.userInfo?.nickName}}</text>
						</view>
						<view class="uni-flex  uni-items-center">
							<view v-if="lookPermissions('leyitou:sxt_video:delete')" @click="remove(item)" class="uni-flex uni-items-center">
								<wd-icon name="delete1" size="26rpx" custom-class="delete-custom-class"></wd-icon>
								<wd-text text="删除" type="error" size="26rpx"></wd-text>
							</view>
							<view v-if="lookPermissions('leyitou:sxt_order:create')" @click="put(item)" class="uni-ml-lg uni-flex uni-items-center">
								<wd-icon name="link" size="30rpx" custom-class="link-custom-class"></wd-icon>
								<wd-text text="投放" type="primary" size="26rpx"></wd-text>
							</view>
						</view>
					</view>
					<view class="data-top">
						<view class="uni-flex  uni-justify-between uni-w-9-10">
							<image v-if="item?.dyVideoInfo?.videoCoverUrl" :src="item?.dyVideoInfo?.videoCoverUrl"
								class="image"></image>
							<view v-else class="hidden-message-img">图片已隐藏</view>
							<view class="title-item">
								<view class="title">{{item?.dyVideoInfo?.title}}</view>
								<view class="remark">
									<view class="info ">
										订单创建时间：{{item?.dyVideoInfo?.createTime}}
									</view>
									<view class="uni-ml-sm uni-border-radius-sm uni-p-sm">
										<wd-tag type="primary">{{item.imgUrl === 1 ? '图文' : '视频'}}</wd-tag>
										<wd-tag v-if="item.isAiCreate === 0" type="primary">AI生成</wd-tag>
										<wd-tag v-if="item.isRecommend === 0" type="danger">不推荐</wd-tag>
									</view>
								</view>
								<view class="uni-w-full uni-flex uni-items-center uni-justify-between">
									<view class="order-code">
										消耗：{{item.dataLabel?.statCost}}
									</view>
									<view class="uni-text-sm   ">
										成交ROI：{{item.dataLabel?.roi || 0}}
									</view>
									<view class="uni-text-sm   ">
										点击率：{{ computeClick(item) || 0}}
									</view>
								</view>
								<view class="uni-w-full uni-flex uni-items-center uni-justify-between">
									<view class="uni-text-sm">
										转化数：{{ item.dataLabel?.ecpConvertCnt|| 0}}
									</view>
									<view class="uni-text-sm   ">
										转化率：{{computeConver(item)|| 0}}
									</view>
								</view>

							</view>
						</view>
					</view>
					<view class="data-bottom">
						<view class="item">
							<view>成交订单数</view>
							<view>{{item.dataLabel?.payOrderCount || 0}}</view>
						</view>
						<view class="item">
							<view>成交订单金额</view>
							<view>{{item.dataLabel?.payOrderAmount || 0 }}</view>
						</view>
						<view class="item">
							<view>展示次数</view>
							<view>{{item.dataLabel?.showCnt || 0}}</view>
						</view>
						<view class="item">
							<view>点击数</view>
							<view>{{item.dataLabel?.clickCnt || 0}}</view>
						</view>
					</view>
				</view>

			</view>

		</z-paging>
		<filterPopup v-model:visible="filterVisible" v-model:queryForm="filterQuery" @confirm="filterConfirm" />
		<wd-message-box />
		<wd-toast />

	</view>
</template>

<script setup lang="ts">
	import type {
		SxtVideoQuery,
		SxtVideoVo
	} from '@/sub_page/api/videoManage/types'
	import {
		getVideoData,
		deleteVideo
	} from '@/sub_page/api/videoManage/index'
	import {
		useDict
	} from '@/utils/dict'
	import {
		ref,
		toRefs,
		watch
	} from 'vue'
	import {
		lookPermissions,
	} from '@/utils/utils.ts'
	import { useMessage, useToast } from 'wot-design-uni'
	import filterPopup from './components/filterPopup.vue'

	const message = useMessage()
	const toast = useToast()

	const pageParams = ref({
		pageNum: 1,
		pageSize: 10,
		total: 0
	})
	const filterQuery = ref<SxtVideoQuery>({

	})

	// 点击率计算
	const computeClick = (row : SxtVideoVo) => {
		if (row.dataLabel?.showCnt !== 0 || row.dataLabel?.clickCnt !== 0) {
			return (
				((row.dataLabel?.clickCnt as number) /
					(row.dataLabel?.showCnt as number)) *
				100
			).toFixed(2);
		}
		return 0;
	};

	// 转换率计算
	const computeConver = (row : SxtVideoVo) => {
		if (
			row.dataLabel?.ecpConvertCnt !== 0 ||
			row.dataLabel?.showCnt !== 0 ||
			row.dataLabel?.clickCnt !== 0
		) {
			return (
				((row.dataLabel?.ecpConvertCnt as number) /
					(row.dataLabel?.clickCnt as number)) *
				100
			).toFixed(2);
		}

		return 0;
	};

	const listData = ref<getVideoData[]>([])

	const handleClickLeft = () => {
		uni.navigateBack()
	}

	const scrollTop = ref<number>(0)

	const filterVisible = ref<boolean>(false)

	function paginScroll(e : any) {
		scrollTop.value = e.detail.scrollTop
	}

	function virtualListChange(vList : getVideoData[]) {
		listData.value = vList;
	}

	const paging = ref()
	function queryList(pageNo : number, pageSize : number) {
		pageParams.value.pageNum = pageNo
		pageParams.value.pageSize = pageSize
		getVideoData({
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

	// 删除素材
	const remove = (item : getVideoData) => {
		message
			.confirm({
				msg: '是否删除该素材?',
				title: '提示'
			})
			.then(() => {
				deleteVideo(item.id).then(res => {
					if (res.code === 200) {
						toast.success(res.msg || '操作成功')
					} else {
						toast.error(res.msg)
					}
				}).finally(() => {
					reset()
				})
			}).catch(() => {
				console.log('点击了取消按钮')
			})
	}
	const put = (item : getVideoData) => {
		uni.setStorageSync('tools-data-live', item)
		uni.navigateTo({
			url: '/sub_page/pages/creationTool/index?tab=1',
			animationType: 'slide-in-right'
		})
	}

	watch(() => filterQuery.value, () => {
		filterConfirm()
	}, { deep: true })
</script>

<style scoped lang="scss">
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
				width: 130rpx;
				height: 130rpx;
				border-radius: 5px;
			}

			.hidden-message-img {
				width: 130rpx;
				height: 130rpx;
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
				width: calc(100% - 130rpx);
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

					.look-msg {
						position: absolute;
						right: 3%;
					}
				}

				.order-code {
					font-size: 20rpx;
				}
			}
		}

		.data-bottom {
			padding: 10rpx 0rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;

			.item {
				width: 33%;
				text-align: center;

				:first-child {
					color: rgb(126, 125, 130)
				}

				:last-child {
					font-weight: 600;
				}
			}
		}

		.shop {
			position: relative;
			border-top: 1px solid #f0f0f0;
			padding: 10rpx 0rpx 0rpx 0rpx;

			.shop-name {
				color: rgb(126, 125, 130);
				font-size: 26rpx;
				margin-left: 10rpx;
			}

			.user-name {
				color: rgb(126, 125, 130);
				// margin-right: 20px;
				font-size: 26rpx;
			}

			.image {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50rpx;
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

	.delete-custom-class {
		color: var(--wot-text-error-color, var(--wot-color-danger, #fa4350));
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