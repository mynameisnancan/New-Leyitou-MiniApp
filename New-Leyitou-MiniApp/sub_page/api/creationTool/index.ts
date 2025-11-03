import request from '@/utils/request.ts';
import type {
	CreateOrderQuery
}from './types'

// 创建随心推标准/全域推广订单
export const createUniOrder = (data:CreateOrderQuery) => {
	return request({
		url: '/leyitou/sxt/uni_order/create',
		method:'post',
		data
	})
}
