export interface DictDataVO extends BaseEntity {
  dictCode: string;
  dictLabel: string;
  dictValue: string;
  cssClass: string;
  listClass: TagType;
  dictSort: number;
  remark: string;
}
