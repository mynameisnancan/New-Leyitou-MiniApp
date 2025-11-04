import request from '@/utils/request.ts';
import type {
	CreateOrderQuery,
	AwemeItemParseType
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