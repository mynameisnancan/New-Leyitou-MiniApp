<template>
	<view class="uni-flex uni-items-center uni-justify-center">
		<wd-loading :type="type" :size="size" />
		<view>{{title}}</view>
	</view>
</template>

<script setup lang="ts">
	import type {
		BaseLoadingTypes
	}from './types'
	import {
		defineProps,
		withDefaults
	}from 'vue'
	
	const props = withDefaults(defineProps<BaseLoadingTypes>(),{
		type:'outline',
		title:'正在加载中...',
		size:'30rpx'
	})
</script>

<style>
</style>