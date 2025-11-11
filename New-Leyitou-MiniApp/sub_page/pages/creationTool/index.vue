<template>
	<wd-navbar title="投放工具" left-arrow @click-left="handleClickLeft" placeholder fixed safeAreaInsetTop></wd-navbar>
	<view>
		<wd-tabs v-model="tabValue">
			<wd-tab title="全域推广">
				<view class="content">
					<PromotionForm />
				</view>
			</wd-tab>
			<wd-tab title="直播推广">
				<view class="content">
					<LiveForm />
				</view>
			</wd-tab>
		</wd-tabs>
	</view>
</template>

<script setup lang="ts">
	import LiveForm from './components/LiveForm.vue';
	import PromotionForm from './components/PromotionForm.vue'
	import {
		ref,
		onMounted
	} from 'vue'
	import {onLoad} from '@dcloudio/uni-app'
	
	const tabValue = ref<number>(0)
	const routeData = ref<any>()

	const handleClickLeft = () => {
		uni.navigateBack()
	}
	
	onLoad((data) => {
		routeData.value = data
	})
	
	onMounted(() => {
		if(routeData.value.tab){
			tabValue.value = 1
		}else{
			tabValue.value = 0
		}
	})
</script>

<style lang="scss">

</style>