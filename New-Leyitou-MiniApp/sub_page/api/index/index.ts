import request from '@/utils/request.ts';
import type {
	SxtUniOrderDetailMergeVo,
	SxtUniOrderDataMergeQuery,
	SxtUniOrderDataMergeVo,
	SxtDataLabelVo,
	OrderAddUnigetQuery,
	OrderAddBudgetQuery
}from './types'
import type {
	SxtOrderVo,
}from '@/api/index/types'

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
export const getUniOrderData = (params:SxtUniOrderDataMergeQuery) :Promise<ResultType<SxtUniOrderDataMergeVo[]>> => {
	return request({
		url:'/leyitou/sxt/uni_order/data',
		method:'get',
		params
	})
}

// 查询订单详情信息
export const getOrderDetail = (orderId:number) :Promise<ResultType<SxtOrderVo>> => {
	return request({
		url:'/leyitou/sxt/order/detail',
		method:'get',
		params:{
			orderId
		}
	})
}
// 查询某个订单的分时数据
export const getOrderDataHour = (params: SxtUniOrderDataMergeQuery):Promise<ResultType<SxtDataLabelVo[]>> => {
	return request({
		url:'/leyitou/sxt/order/data/hour',
		method:'get',
		params
	})
}

// 随心推全域订单追投
export const orderAddUniBudget = (params:OrderAddUnigetQuery) => {
	return request({
		url:'/leyitou/sxt/uni_order/add_budget',
		method:'get',
		params
	})
}

// 随心推订单追投
export const orderAddBudget = (params:OrderAddBudgetQuery) => {
	return request({
		url:'/leyitou/sxt/order/add_budget',
		method:'get',
		params
	})
}


