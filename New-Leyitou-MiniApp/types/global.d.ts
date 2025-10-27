declare global {
  interface BaseEntity {
    createBy?: any;
    createDept?: any;
    createTime?: string;
    updateBy?: any;
    updateTime?: any;
  }
  /**
   * 获取字典数据
   */
  interface DictDataOption {
    label: string;
    value: string;
    elTagType?: TagType;
  }

  type TagType = 'primary' | 'danger' | 'warning' | 'success';

  /**
   * 返回值
   */
   interface ResultType<T> {
    msg: string;
    data: T;
    rows: T[];
    code: number;
    err: string;
    total: number;
  }
  
  // 分页
   interface PageQuery {
    pageNum: number;
    pageSize: number;
  }
  
}
export const a = 1;
