import request from "@/utils/request";
import type { DictDataVO } from './types'
export function getDicts(dictType: string): Promise<ReturnType<DictDataVO[]>> {
  return request({
    url: '/base/sys/dict/data/type/' + dictType,
    method: 'get'
  });
}
