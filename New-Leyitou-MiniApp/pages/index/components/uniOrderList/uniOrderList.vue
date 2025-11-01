
<template>
		<view class="commoditys-item" v-for="(item,index) in list" :key="index"   >
			<view class="accout-img uni-flex uni-justify-between uni-items-center" >
				<view class="uni-flex  uni-items-center author-info">
					<image :src="hiddenAuthorImgComputed(item.dyAuthorInfo?.avatar)" class="image"/>
					<text class="user-name">{{hiddenAuthorComputed(item.dyAuthorInfo?.nickName)}}</text>
					<text class="user-name">运营人: {{hiddenAuthorComputed(item.dyAuthorInfo?.userInfo?.nickName)}}</text>
				</view>
				<view class="uni-flex  uni-items-center">
					<view class="look-msg">
						<wd-icon v-if="hiddenAuthor" name="view" color="#848794" size="32rpx" @click.stop="hiddenAuthorFun"  />
						<wd-icon v-else name="eye-close" color="#848794" size="32rpx" @click.stop="hiddenAuthorFun"  />
					</view>
				</view>
			</view>			
			<view class="data-top">
				<view  @click.stop="toMessage(item)" class="uni-flex  uni-justify-between uni-w-9-10" >
					 <image v-if="hiddenMessageImgComputed(item.dyProductInfo?.cover)" :src="item.dyProductInfo?.cover" class="image" ></image>
					 <view v-else class="hidden-message-img">图片已隐藏</view>
					 <view class="title-item">
						<view class="title">{{hiddenMessageComputed(item.dyProductInfo?.title)}}</view>
						<view class="remark">
							<view class="info ">
								订单创建时间：{{item.orderCreateTime}}
							</view>
							<view :class="orderStatusComputed(item.status)?.elTagType" class="uni-ml-sm uni-border-radius-sm uni-p-sm">
								{{orderStatusComputed(item.status)?.label}}
							</view>
						 </view>
						 <view class="order-code">
							订单号：{{item.orderId}}
						 </view>
						 <view class="uni-text-sm uni-ml-sm  ">
						 	已成交：{{item.orderDataInfo.totalPayOrderCountForRoi2 || 0}}单
						 </view>
					 </view>
				</view>
				 <view class="look-msg ">
					<wd-icon v-if="hiddenMessage" name="view" color="#848794" size="32rpx"   @click.stop="hiddenMessageFun"  />
					<wd-icon v-else name="eye-close" color="#848794" size="32rpx" @click.stop="hiddenMessageFun"  />
				 </view>
			</view>
			<view class="data-bottom">
					<view class="item">
						<view>投放金额</view>
						<view>{{item.amount || 0}}</view>
					</view>
					<view class="item">
						<view>整体消耗</view>
						<view>{{item.orderDataInfo.statCostForRoi2 || 0 }}</view>
					</view>
					<view class="item">
						<view>整体成交金额</view>
						<view>{{item.orderDataInfo.totalPayOrderGmvForRoi2 || 0}}</view>
					</view>
					<view class="item">
						<view>整体成交ROI</view>
						<view>{{sumRoiFun(
							item.orderDataInfo.totalPayOrderGmvForRoi2 || 0,
							item.orderDataInfo.statCostForRoi2 || 0)}}</view>
						</view>
			  </view>
			<!--<view class="shop uni-flex  uni-justify-between uni-items-center">
					 <view class="uni-flex uni-items-center uni-w-9-10 uni-justify-between">
						 <view class="uni-flex  uni-items-center">
							<image v-if="hiddenShopImgComputed(item.shopInfo?.shopImg)" :src="item.shopInfo?.shopImg" class="image" ></image>
							<image v-else src="https://image.doulaoban.com/xpin/no_shop.png" class="image" ></image>
							<text class="shop-name">{{hiddenShopComputed(item.shopInfo?.shopName)}}</text>
						</view>
					</view>
					
					<!-- <view class="uni-flex uni-items-center">
						<view class="look-msg">
							<wd-icon v-if="hiddenShop" name="view" color="#848794" size="32rpx" @click.stop="hiddenShopNameFun"  />
							<wd-icon v-else name="eye-close" color="#848794" size="32rpx" @click.stop="hiddenShopNameFun"  />
						</view>
					</view> 
				</view>-->
		</view>
		<baseLoading v-if="loading"></baseLoading>
		<template v-if="list.length==0 && !loading">
			<view class="uni-pt-xl uni-pb-xl">
				<wd-status-tip image="content" tip="暂无数据" />
			</view>
		</template>
</template>

<script setup lang="ts">
	import type {
		SxtUinOrderQuery,
		SxtUniOrderMergeVo
	}from '@/api/index/types'
	import {onReachBottom} from '@dcloudio/uni-app'
	import {getUniOrderlist} from '@/api/index/index'
	import {ref,defineModel,computed,defineExpose,watch,toRefs} from 'vue'
	import {
		useDict
	}from '@/utils/dict'
	import {
		sumRoiFun
	}from '@/utils/utils'
	
	const orderQuery =defineModel<SxtUinOrderQuery>("orderQuery",{
		type:Object,
		default:{}
	})
	const tabIndex =defineModel("tabIndex",{
		type: Number,
		default: 0
	})
	const timeQuery = defineModel("timeQuery",{
		type:Object,
		default:{}
	})
	
	
	const hiddenMessage = ref<boolean>(true)
	const hiddenShop = ref<boolean>(true)
	const hiddenAuthor = ref<boolean>(true)
	const {leyitou_order_status} = toRefs(useDict(['leyitou_order_status']))
	
	const pageParams= ref({
		pageNum:1,
		pageSize:10,
		total: 0
	})
	const loading = ref<boolean>(false)
	const noData = ref<boolean>(false)
	const list = ref<SxtUniOrderMergeVo[]>([])
	
	defineExpose({
		refreshList,
		loadData
	});
	
	loadData()
	
	// 获取订单列表
	async function getUniOrderlistApi(){
		const res = await getUniOrderlist({
			...pageParams.value,
			...orderQuery.value,
			...timeQuery.value,
			noLoading:true
		}).finally(() => {
			uni.stopPullDownRefresh()
		})
		if(res.rows){
			list.value = list.value.concat(res.rows) 
			console.log(list.value)
			pageParams.value.total = res.total
		}
		if(list.value.length == res.total || res.rows.length == 0){
			noData.value = true
		}
	}
	
	async function loadData() {
		if (loading.value) return;
		if (noData.value) return;
			loading.value = true;
			try {
				await getUniOrderlistApi();
				pageParams.value.pageNum++;
			} finally {
				loading.value = false;
			}
	}
	
	function refreshList(){
		pageParams.value = {
			pageNum:1,
			pageSize:10,
			total: 0
		}
		list.value = []
		noData.value=false
		loadData()
	}
	 
	 

	const orderStatusComputed = computed(() => {
		return (status:string) => {
			return leyitou_order_status.value.find(item => item.value === status)
		}
	})
	const hiddenMessageComputed = computed(() => {
		return (data:any) => hiddenMessage.value ? data : '内容已隐藏'
	})
	const hiddenShopComputed = computed(() => {
		return (data:any) => hiddenShop.value ? data : '***'
	})
	const hiddenMessageImgComputed = computed(() => {
		return (data:any) => hiddenMessage.value ? data : ''
	})
	const hiddenShopImgComputed = computed(() => {
		return (data:any) =>  hiddenShop.value ? data : ''
	})
	const hiddenAuthorImgComputed = computed(() => {
		return (data:any) => hiddenAuthor.value ? data : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
	})
	const hiddenAuthorComputed = computed(() => {
		return (data:any) =>  hiddenAuthor.value ? data : '***'
	})
	
	function hiddenMessageFun(){
		hiddenMessage.value = !hiddenMessage.value
	}
	
	function hiddenShopNameFun(){
		hiddenShop.value = !hiddenShop.value
	}
	
	function hiddenAuthorFun(){
		hiddenAuthor.value = !hiddenAuthor.value
	}
	
	
	function toMessage(item:SxtUniOrderMergeVo) {
		uni.navigateTo({
			url: `/sub_page/pages/index/uniOrderDetail/index?orderId=${item.orderId}`,
			animationType: 'slide-in-right'
		})
	}
	
	watch(() => orderQuery.value,() => {
		refreshList()
	},{deep:true})
	
	watch(() => timeQuery.value, () => {
		refreshList()
	},{deep:true})
	
</script>

<style lang="scss">
	.commoditys-item{
		width: 100%;
		background-color: white;
		border-radius: 10rpx;
		padding: 10rpx ;
		margin-top: 20rpx;
		.accout-img{
			padding-bottom: 10rpx;
		}
		.author-info{
			color:rgb(126, 125, 130);
			font-size: 26rpx;
			.user-name{
				margin-left: 20rpx;
			}
			.image{
				 width: 50rpx;
				 height: 50rpx;
				 border-radius: 50rpx;
			}
		}
		.data-top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-top: 1px solid #f0f0f0;
			padding-top: 5px;
			.image{
				width: 100rpx;
				height: 100rpx;
				border-radius: 5px;
			}
			.hidden-message-img{
				width: 100rpx;
				height: 100rpx;
				border-radius: 5px;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #dee3ef;
				font-size:15rpx;
				color: #7e7d82;
			}
			.title-item{
				display: flex;
				flex-wrap: wrap;
				width: calc(100% - 100rpx);
				height: 80rpx;
				padding-left: 5px;
				 .title{
					 font-weight: 500;
					 font-size: 26rpx;
					 white-space: nowrap;
					 overflow: hidden;
					 text-overflow: ellipsis;
				 }
				 .remark{
					 display: flex;
					 align-items: center;
					 font-size: 20rpx;
					 width: 100%;
					 position: relative;
					 .look-msg{
						 position: absolute;
						 right:3%;
					 }
					 .success{
						background-color: #79c25c;
						color: white;
						padding: 5rpx;
					 }
					 .danger{
						background-color: #f56c6c;
						color: white;
						padding: 5rpx;
					 }
					 .warning{
						background-color:#e6a23c;
						color: white;
						padding: 5rpx;
					 }
					 .primary{
						background-color: #409eff;
						color: white;
						padding: 5rpx;
					 }
				 }
				 .order-code{
					 font-size: 20rpx;
				 }
			}
		}
		.data-bottom{
			padding: 10rpx 0rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
			.item{
				width:33%;
				text-align: center;
				:first-child{
					color:rgb(126, 125, 130)
				}
				:last-child{
					font-weight: 600;
				}
			}
		}
		.shop{
			position: relative;
			border-top: 1px solid #f0f0f0;
			padding: 10rpx 0rpx 0rpx 0rpx;
			.shop-name{
				color:rgb(126, 125, 130);
				font-size: 26rpx;
				margin-left: 10rpx;
			}
			.user-name{
				color:rgb(126, 125, 130);
				// margin-right: 20px;
				font-size: 26rpx;
			}
			.image{
				 width: 50rpx;				 height: 50rpx;				 border-radius: 50rpx;			}
		}
	
	}
</style>