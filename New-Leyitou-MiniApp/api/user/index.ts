import request from '@/utils/request.ts';

import type {
	UserQuery,
	SysUserVo
}from './types'

// 获取用户列表
export const getUserList = (data:UserQuery):Promise<ResultType<SysUserVo>> => {
	return request({
		url: '/core/sys/user/list',
		method:'get',
		data
	})
}

