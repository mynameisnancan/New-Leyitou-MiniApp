import request from '@/utils/request.ts';
import type {
	SxtOrderTerminationRecordQuery,
	SxtOrderTerminationRecordVo
}from './types'

// 查询随心推订单终止记录列表
export const getTerminationRecordList = (params:SxtOrderTerminationRecordQuery):Promise<ResultType<SxtOrderTerminationRecordVo>> => {
	return request({
		url:'/leyitou/sxt/order/termination_record/list',
		method:'get',
		params
	})
}
