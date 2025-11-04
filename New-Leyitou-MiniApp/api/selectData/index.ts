import request from '@/utils/request.ts';
import type {
	SxtVideoVo,
	SxtVideoQuery
} from './types'

// 查询素材管理列表 (未带素材数据)
export const getVideoList = (data:SxtVideoQuery) :Promise<ResultType<SxtVideoVo[]>> => {
	return request({
		url: '/leyitou/sxt/video/list',
		method: 'get',
		data
	})
}

