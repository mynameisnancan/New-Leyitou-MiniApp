<template>
	<view>
		<wd-tabs v-model="tabName">
		  <block v-for="item in tabs" :key="item">
			<template v-if="item.date">
				<text class="wd-icon-date t-icon"></text> 
			</template>
			<template v-else>
				<wd-tab :title="item.title" :name="item.name">
				  <view class="content">{{ item.name }}</view>
				</wd-tab>
			</template>
		    
		  </block>
		</wd-tabs>
	</view>
</template>

<script setup lang="ts">
	import type {
		BaseTabsType
	}from './types'
	import { ref,defineProps } from 'vue';
	
	const props = defineProps<BaseTabsType>()

	const tabName = ref<string>()
</script>

<style lang="scss">
</style>