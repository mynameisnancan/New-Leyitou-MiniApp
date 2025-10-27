/**
 * 查询随心推全域订单列表筛选参数
 */
export interface SxtUinOrderQuery extends PageQuery{
    /**
     * 付款平台达人id
     */
    authorId?: number;
    pageNum?: number;
    pageSize?: number;
    /**
     * 商品id
     */
    productId?: number;
    /**
     * 排序字段
     */
    sortField?: string;
    /**
     * 排序方式 0 升序 1 降序
     */
    sortType?: number;
    /**
     * 查询开始id,避免深度分页的问题
     */
    startId?: number;
    /**
     * 状态，枚举值：
     * AUDIT 审核中
     * BOOK 未开播
     * CREATING 已支付，计划创建中
     * DELIVERY_OK 投放中
     * FAILED 计划创建失败
     * FINISHED 投放完成
     * FROZEN 投放终止
     * OFFLINE_AUDIT 审核不通过
     * OVER 投放结束
     * TIMEOUT 未支付超过15分钟，订单关闭
     * UNPAID 未支付
     * UNPAIDCANCEL 未支付取消订单
     */
    status?: string;
    /**
     * 时间结束
     */
    timeEnd?: string;
    /**
     * 时间开始
     */
    timeStart?: string;
    /**
     * 时间类型 0数据时间 1创建时间
     */
    timeType?: number;
    /**
     * 运营人id
     */
    userId?: number;
}
