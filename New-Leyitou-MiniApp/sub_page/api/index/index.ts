import request from '@/utils/request.ts';
import type {
	SxtUniOrderDetailMergeVo,
	SxtUniOrderDataMergeQuery,
	SxtUniOrderDataMergeVo
}from './types'
// 查询随心推全域订单详情
export const getUniOrderDetail = (orderId:number): Promise<ResultType<SxtUniOrderDetailMergeVo>> => {
	return request({
		url:'/leyitou/sxt/uni_order/detail',
		method:'get',
		params:{
			orderId
		}
	})
} 

// 查询随心推全域订单分时分日数据
export const getUniOrderData = (params:SxtUniOrderDataMergeQuery) : Promise<ResultType<SxtUniOrderDataMergeVo[]>> => {
	return request({
		url:'/leyitou/sxt/uni_order/data',
		method:'get',
		params
	})
}
