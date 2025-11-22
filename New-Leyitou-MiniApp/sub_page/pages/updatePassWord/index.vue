<template>
	<wd-navbar @click-left="goBack" title="修改密码" :bordered="false" left-arrow fixed placeholder
		safeAreaInsetTop></wd-navbar>
	<view class="content uni-p-30">
		<wd-form ref="formRef" :model="formData">
			<wd-cell-group border>
				<wd-input label="旧密码" label-width="100px" prop="oldPassword" show-password clearable
					v-model="formData.oldPassword" placeholder="请输入旧密码"
					:rules="[{ required: true, message: '请填写旧密码' }]" />
				<wd-input label="新密码" label-width="100px" prop="newPassword" show-password clearable
					v-model="formData.newPassword" placeholder="请输入密码"
					:rules="[{ required: true, validator: validatorNewPassword, message: '请填写密码' }]" />
				<wd-input label="确认新密码" label-width="100px" prop="rawPassword" show-password clearable
					v-model="formData.rawPassword" placeholder="请输入密码"
					:rules="[{ required: true, validator: validatorRawPassword,message: '请填写密码' }]" />
			</wd-cell-group>
			<view class="footer uni-w-full uni-mt-20">
				<wd-button :loading="loading" type="primary"@click="handleSubmit" block>提交</wd-button>
			</view>
		</wd-form>
	</view>
	<wd-toast />
</template>

<script setup lang="ts">
	import type {
		SysUserPasswordQuery
	} from '@/sub_page/api/centerSetting/types'
	import {
		updatePassWord
	} from '@/sub_page/api/centerSetting/index'
	import { goBack } from '@/utils/utils.ts'
	import { useToast } from 'wot-design-uni'
	import {
		ref
	} from 'vue'

	const formRef = ref()
	const loading = ref<boolean>(false)
	const toast = useToast();

	const formData = ref<SysUserPasswordQuery>({
		oldPassword: undefined,
		newPassword: undefined,
		rawPassword: undefined,
	})

	const handleSubmit = () => {
		formRef.value.validate().then(({ valid }) => {
			if (valid) {
				submitPassWordForm()
			}
		})
	}

	// 校验新密码是否和旧密码重复
	const validatorNewPassword = (val : any) => {
		console.log(val)
		if (val === formData.value.oldPassword) return Promise.reject('新密码不能和旧密码一致');
		return Promise.resolve()
	}
	// 校验二次输入密码是否一致
	const validatorRawPassword = (val : any) => {
		if (val !== formData.value.newPassword) return Promise.reject('两次输入新密码不一致');
		return Promise.resolve()
	}
	// 修改密码
	const submitPassWordForm = () => {
		loading.value = true
		updatePassWord({
			oldPassword: formData.value.oldPassword,
			newPassword: formData.value.newPassword
		}).then(res => {
			if (res.code == 200) {
				toast.success(res.msg)
				setTimeout(() => {
					goBack()
				}, 1000)
			} else {
				toast.error(res.msg || '修改失败')
			}
		}).finally(() => {
			loading.value = false
		})
	}
</script>

<style>
</style>