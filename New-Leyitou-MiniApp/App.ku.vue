<script setup lang="ts">
import {wdToast} from '@/utils/common'
import { useThemeStore } from '@/store/useTheme.ts'
import { useToast } from 'wot-design-uni'
const useTheme = useThemeStore()

wdToast.value = useToast("request");
</script>

<template>
	<wd-config-provider :theme="useTheme.theme" :theme-vars="useTheme.themeVars">
		<wd-toast selector="request" />
		<KuRootView  />
	</wd-config-provider>
</template>
<style  lang="scss">
	@import '@/static/scss/index.scss';
	@import '@/static/iconfont/iconfont.css';
	
</style>