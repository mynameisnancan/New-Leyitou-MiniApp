<template>
	<wd-tag :type="getType()?.elTagType" mark>{{getType()?.label || '--'}}</wd-tag>
</template>

<script setup lang="ts">
	import {
		withDefaults,
		defineProps,
		computed
	}from 'vue'
	
	type PropTypes ={
		options: any[],
		value:number | string
	}
	
	const props = withDefaults(defineProps<PropTypes>(),{
		options:() => []
	})
	
	const getType = computed(() => {
		return () => props.options.find(item => item.value === props.value)
	})
</script>

<style>
</style>