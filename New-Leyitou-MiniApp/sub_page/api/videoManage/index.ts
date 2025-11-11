import request from '@/utils/request.ts';
import type {
	SxtVideoQuery,
	SxtVideoVo
}from './types'

// 查询素材管理列表
export const getVideoData = (params:SxtVideoQuery) :Promise<ResultType<SxtVideoVo>> => {
	return request({
		url:'/leyitou/sxt/video/data',
		method:'get',
		params
	})
}

// 删除随心推素材
export const deleteVideo = (id:string) => {
	return request({
		url: `/leyitou/system/item/${id}`,
		method:'delete'
	})
}