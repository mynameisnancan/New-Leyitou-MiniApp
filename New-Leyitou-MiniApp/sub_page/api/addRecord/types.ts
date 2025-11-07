
// 查询随心推订单追投记录列表
export interface SxtOrderAddRecordQuery extends Partial<PageQuery>{
    /**
     * 追加的预算，单位元
     */
    addAmount?: string;
    /**
     * 延长的投放时间
     */
    addDeliveryTime?: number;
    /**
     * 追投类型 0随心推 1随心推全域
     */
    addType?: number;
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
     * 随心推订单监控日志id (操作类型 手动操作时 无)
     */
    monitorLogId?: number;
    /**
     * 操作类型 0手动 1系统自动
     */
    optType?: number;
    orderByColumn?: string;
    /**
     * 订单id
     */
    orderId?: number;
    /**
     * 追投请求参数
     */
    reqParam?: string;
    /**
     * 追投响应结果
     */
    reqResult?: string;
    /**
     * 追投请求是否成功 0失败 1成功
     */
    reqSuccess?: number;
    /**
     * 租户id
     */
    tenantId?: string;
    /**
     * 时间结束
     */
    timeEnd?: string;
    /**
     * 时间开始
     */
    timeStart?: string;
    /**
     * 时间单位 0小时 1天
     */
    timeUnit?: number;
    /**
     * 追投人 (操作类型 系统自动时 无)
     */
    userId?: number;
}

/**
 * 随心推订单追投记录视图对象 sxt_order_add_record
 *
 * SxtOrderAddRecordVo
 */
export interface SxtOrderAddRecordVo {
    /**
     * 追加的预算，单位元
     */
    addAmount?: number;
    /**
     * 延长的投放时间
     */
    addDeliveryTime?: number;
    /**
     * 追投类型 0随心推 1随心推全域
     */
    addType?: number;
    /**
     * 广告账户id
     */
    advertiserId?: number;
    /**
     * 主键id
     */
    id?: number;
    /**
     * 随心推订单监控日志id (操作类型 手动操作时 无)
     */
    monitorLogId?: number;
    /**
     * 操作类型 0手动 1系统自动
     */
    optType?: number;
    /**
     * 订单id
     */
    orderId?: number;
    /**
     * 追投请求参数
     */
    reqParam?: string;
    /**
     * 追投响应结果
     */
    reqResult?: string;
    /**
     * 追投请求是否成功 0失败 1成功
     */
    reqSuccess?: number;
    /**
     * 时间单位 0小时 1天
     */
    timeUnit?: number;
    /**
     * 追投人 (操作类型 系统自动时 无)
     */
    userId?: number;
    /**
     * 追投用户信息
     */
    userInfo?: UserInfo;
}
