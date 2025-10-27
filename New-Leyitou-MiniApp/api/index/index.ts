import request from '@/utils/request.ts';
import type {
	SxtUinOrderQuery
}from './types'

export const getUniOrderlist = (data:SxtUinOrderQuery) => {
	return request({
		url: '/leyitou/uniOrder/list',
		method: 'post',
		data
	})
}
 
