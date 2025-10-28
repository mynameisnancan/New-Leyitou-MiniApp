import request from '@/utils/request.ts';
import type {
	SxtUinOrderQuery,
	UniProductQuery,
	SxtUniOrderMergeVo,
	QcUniProductVo,
	SxtUniOrderStatisticsVo
}from './types'

// 获取全域订单列表
export const getUniOrderlist = (data:SxtUinOrderQuery):Promise<ResultType<SxtUniOrderMergeVo>> => {
	return request({
		url: '/leyitou/uniOrder/list',
		method: 'post',
		data
	})
}
 
 // 查询全域投放商品列表
 export const getUniProductList = (data:UniProductQuery):Promise<ResultType<QcUniProductVo>> => {
	 return request({
	 	url: '/leyitou/uniProduct/list',
	 	method: 'get',
	 	data
	 })
 }

// 查询随心推全域订单汇总统计数据
export const getUniOrderStatistics = (data:SxtUinOrderQuery) :Promise<ResultType<SxtUniOrderStatisticsVo>> => {
	return request({
		url: '/leyitou/uniOrder/statistics',
		method: 'post',
		data
	})
}

