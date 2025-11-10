import request from '@/utils/request.ts';
import type {
	SxtUinOrderQuery,
	UniProductQuery,
	SxtUniOrderMergeVo,
	QcUniProductVo,
	SxtUniOrderStatisticsVo,
	DyAuthorAuthListQuery,
	DyAuthorAuthVo,
	SxtOrderQuery,
	SxtOrderVo
}from './types'

// 获取全域订单列表
export const getUniOrderlist = (data:SxtUinOrderQuery):Promise<ResultType<SxtUniOrderMergeVo>> => {
	return request({
		url: '/leyitou/sxt/uni_order/list',
		method: 'post',
		data
	})
}
 
 // 查询全域投放商品列表
 export const getUniProductList = (params:UniProductQuery):Promise<ResultType<QcUniProductVo>> => {
	 return request({
	 	url: '/leyitou/qc/uni_product/list',
	 	method: 'get',
	 	params
	 })
 }

// 查询随心推全域订单汇总统计数据
export const getUniOrderStatistics = (data:SxtUinOrderQuery) :Promise<ResultType<SxtUniOrderStatisticsVo>> => {
	return request({
		url: '/leyitou/sxt/uni_order/statistics',
		method: 'post',
		data
	})
}

// 抖音达人授权信息列表
export const getDyAuthorList = (data:DyAuthorAuthListQuery) :Promise<ResultType<DyAuthorAuthVo>> => {
	return request({
		url: '/data/dy/author_auth/list',
		method:'post',
		data
	})
}

// 查询订单列表
export const getOrderList = (data:SxtOrderQuery):Promise<ResultType<SxtOrderVo>> => {
	return request({
		url: '/leyitou/sxt/order/list',
		method:'post',
		data
	})
}
