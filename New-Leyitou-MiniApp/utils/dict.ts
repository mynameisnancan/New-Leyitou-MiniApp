import { getDicts } from '@/api/system/dict';
import { useDictStore } from '@/store/dict';
import {ref} from 'vue'


export const useDict = (args: string[],formatNumber:boolean = false): { [key: string]: DictDataOption[] } => {
  const res = ref<{
    [key: string]: DictDataOption[];
  }>({});
  return (() => {
    args.forEach(async (dictType) => {
      res.value[dictType] = [];
      const dicts = useDictStore().getDict(dictType);
      if (dicts) {
        res.value[dictType] = dicts;
      } else {
        await getDicts(dictType).then((resp) => {
          res.value[dictType] = resp.data.map(
            (p:any): DictDataOption => ({ label: p.dictLabel, value: formatNumber ? Number(p.dictValue) : p.dictValue, elTagType: p.listClass, elTagClass: p.cssClass })
          );
          useDictStore().setDict(dictType, res.value[dictType]);
        });
      }
    });
    return res.value;
  })();
};
