// 查询随心推订单终止记录列表表单参数

export interface SxtOrderTerminationRecordQuery {
  /**
   * 广告账户id
   */
  advertiserId?: number;
  /**
   * 平台达人id
   */
  authorId?: number;
  /**
   * 主键id
   */
  id?: number;
  isAsc?: string;
  /**
   * 操作类型 0手动 1系统自动
   */
  optType?: number;
  orderByColumn?: string;
  /**
   * 推广订单来源 SXT: 随心推 SXT_UNI: 随心推全域
   */
  orderFrom?: string;
  /**
   * 订单id
   */
  orderId?: number;
  pageNum?: number;
  pageSize?: number;
  /**
   * 终止请求参数
   */
  reqParam?: string;
  /**
   * 终止响应结果
   */
  reqResult?: string;
  /**
   * 终止请求是否成功 0失败 1成功
   */
  reqSuccess?: number;
  /**
   * 随心推订单监控日志id (操作类型为 手动时 无)
   */
  sxtMonitorLogId?: number;
  /**
   * 终止订单配额
   */
  terminateQuotaSum?: number;
  /**
   * 已终止订单数
   */
  terminateQuotaUsed?: number;
  /**
   * 时间结束
   */
  timeEnd?: string;
  /**
   * 时间开始
   */
  timeStart?: string;
  /**
   * 终止人 （操作类型为 系统自动时 无）
   */
  userId?: number;
}

/**
 * 随心推订单终止记录视图对象 sxt_order_termination_record
 *
 * SxtOrderTerminationRecordVo
 */
export interface SxtOrderTerminationRecordVo {
    /**
     * 广告账户id
     */
    advertiserId?: number;
    /**
     * 平台达人id
     */
    authorId?: number;
    /**
     * 主键id
     */
    id?: number;
    /**
     * 操作类型 0手动 1系统自动
     */
    optType?: number;
    /**
     * 推广订单来源 SXT: 随心推 SXT_UNI: 随心推全域
     */
    orderFrom?: string;
    /**
     * 订单id
     */
    orderId?: number;
    /**
     * 终止请求参数
     */
    reqParam?: string;
    /**
     * 终止响应结果
     */
    reqResult?: string;
    /**
     * 终止请求是否成功 0失败 1成功
     */
    reqSuccess?: number;
    /**
     * 随心推订单监控日志id (操作类型为 手动时 无)
     */
    sxtMonitorLogId?: number;
    /**
     * 终止订单配额
     */
    terminateQuotaSum?: number;
    /**
     * 已终止订单数
     */
    terminateQuotaUsed?: number;
    /**
     * 终止人 （操作类型为 系统自动时 无）
     */
    userId?: number;
    /**
     * 终止人用户信息
     */
    userInfo?: UserInfo;
}