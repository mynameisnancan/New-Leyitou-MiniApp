<template>
	<view class="commodity">
		<wd-radio-group v-model="selectedValue" @change="change">
			<wd-radio :value="item.productId"  v-for="(item,index) in list"  :key="index" shape="dot">
				<view class="uni-flex  underline ">
					<view>
						<wd-img width="150rpx" height="150rpx" :radius="10" :src="item?.dyProductInfo?.cover" />
					</view>
					<view class="uni-ml-lg uni-text-left  uni-w-3-5">
						<view class="uni-text-warp-2 uni-font-color-black">
							{{item?.dyProductInfo?.title}}
						</view>
						<view class="uni-font-color-gray">
							{{item?.dyShopInfo?.shopName}}
						</view>
						<view class="uni-flex uni-justify-between">
							<view class="uni-font-color-red">
								￥{{item?.dyProductInfo?.price}}
							</view>
							<view class="uni-font-color-black">
								库存：{{item?.dyProductInfo?.productStock}}
							</view>
						</view>
					</view>
				</view>
			</wd-radio>
		</wd-radio-group> 
	</view>
</template>

<script setup lang="ts">
	import type {
		QcUniProductVo
	}from '@/api/index/types'
	import {
		defineModel,
		defineProps,
		withDefaults,
		ref
	}from 'vue'
	
	type PropTypes = {
		list: QcUniProductVo[]
	}
	
	const selectedValue = ref()
	const selectedData = defineModel<any>('selectedData',{
		default:{
			label:'',
			value:''
		}
	});
	const props = withDefaults(defineProps<PropTypes>(),{
		list: () => []
	})
	
	const change = ({ value }:any) => { 
		console.log(value)
		selectedData.value.value = value;
		selectedData.value.label = props.list.find(item => item.productId === value)?.dyProductInfo?.title
	}
</script>

<style scoped lang="scss">
	.underline{
		border-bottom: 1px solid  #eff0f3;
	}
</style>
<style lang="scss">
	.wd-radio{
		.wd-radio__label{
			width: 80% !important;
		}
	}	
</style>