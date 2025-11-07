import request from '@/utils/request.ts';
import type {
	SxtOrderAddRecordQuery,
	SxtOrderAddRecordVo
}from './types'

// 查询随心推订单追投记录列表
export const getAddRecordList = (params:SxtOrderAddRecordQuery) :Promise<ResultType<SxtOrderAddRecordVo>> => {
	return request({
		method:'get',
		url:'/leyitou/sxt/order/add_record/list',
		params
	})
}

