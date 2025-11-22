import request from '@/utils/request.ts';
import type {
	ProfileVo,
	SysUserPasswordQuery,
	SysUserProfileQuery
}from './types'

// 获取个人信息
export const getUserProfile = ():Promise<ResultType<ProfileVo>> => {
	return request({
		url: `/core/sys/user/profile`,
		method:'get'
	})
}

//重置密码
export const updatePassWord = (data:SysUserPasswordQuery) => {
	return request({
		url:'/core/sys/user/profile/update_pwd',
		method:'post',
		data
	})
}

// 修改用户信息
export const updateUserProfile = (data:SysUserProfileQuery) => {
	return request({
		url: '/core/sys/user/profile',
		method:'post',
		data
	})
}


