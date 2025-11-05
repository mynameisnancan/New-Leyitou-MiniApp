import request from '@/utils/request.ts';
import type {
	CreateOrderQuery,
	AwemeItemParseType,
	DeliveryCheckType
}from './types'

// 创建随心推标准/全域推广订单
export const createUniOrder = (data:CreateOrderQuery) => {
	return request({
		url: '/leyitou/sxt/uni_order/create',
		method:'post',
		data
	})
}

// 解析添加素材信息
export const awemeItemParse = (params: AwemeItemParseType) => {
  return request({
	  url: '/leyitou/system/item/add_item',
	  method:'get',
	  params
  })
}

// 订单代投校验
export const deliveryCheck = (data:DeliveryCheckType) => {
	return request({
		url:'/leyitou/system/record/delivery_check',
		method:'post',
		data
	})
}