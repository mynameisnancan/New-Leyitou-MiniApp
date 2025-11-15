import request from '@/utils/request.ts';
import type {
	SxtOrderCreateRecordQuery,
	SxtOrderCreateRecordVo
} from './types'

// 查询随心推订单创建记录列表
export const getCreateRecordList = (params : SxtOrderCreateRecordQuery) : Promise<ResultType<SxtOrderCreateRecordVo>> => {
	return request({
		method: 'get',
		url: '/leyitou/sxt/order/create_record/list',
		params
	})
}

// 随心推订单创建重试
export const retryCreate = (id : number) => {
	return request({
		method: 'get',
		url: '/leyitou/sxt/order/create_record/retry',
		params: { id }
	})
}