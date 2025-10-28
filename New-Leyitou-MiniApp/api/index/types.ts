/**
 * 查询随心推全域订单列表筛选参数
 */
export interface SxtUinOrderQuery extends Partial<PageQuery>{
    /**
     * 付款平台达人id
     */
    authorId?: number;
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
	/**
	 * 订单id
	 */
	orderId?: number;
	sort?:number
}

/**
 * 随心推全域订单组合对象
 *
 * SxtUniOrderMergeVo
 */
export interface SxtUniOrderMergeVo {
    /**
     * 续费信息
     */
    addAmountInfo: AddAmountInfoVo;
    /**
     * 投放金额
     */
    amount: number;
    /**
     * 审核建议信息
     */
    auditRecordInfo: AuditRecordVo;
    /**
     * 付款抖音号信息
     */
    dyAuthorInfo: DyAuthorInfo;
    /**
     * 抖音商品信息
     */
    dyProductInfo: DyProductInfo;
    /**
     * 订单创建时间
     */
    orderCreateTime: string;
    /**
     * 订单数据信息
     */
    orderDataInfo: SxtUniOrderDataInfo;
    /**
     * 订单号
     */
    orderId: string;
    /**
     * 订单状态，枚举值：
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
    status: string;
}

/**
 * 续费信息
 *
 * AddAmountInfoVo
 */
export interface AddAmountInfoVo {
    /**
     * 续费订单金额之和
     */
    add_amount: number;
    /**
     * 续费次数
     */
    add_amount_cnt: number;
    /**
     * 续费订单时长之和 短视频：xx天 直播：xx小时
     */
    add_delivery_time: number;
}

/**
 * 审核建议信息
 *
 * AuditRecordVo
 */
export interface AuditRecordVo {
    /**
     * 建议内容列表
     */
    detail_desc_list: string[];
    /**
     * 订单状态附加描述
     */
    status_attach_desp: string;
}


/**
 * 订单数据信息
 *
 * SxtUniOrderDataInfo
 */
export interface SxtUniOrderDataInfo {
    /**
     * 整体消耗，单位元
     */
    statCostForRoi2?: number;
    /**
     * 整体成交订单数
     */
    totalPayOrderCountForRoi2?: number;
    /**
     * 整体成交金额，单位元
     */
    totalPayOrderGmvForRoi2?: number;
    /**
     * 整体支付ROI
     */
    totalPrepayAndPayOrderRoi2?: number;
}


/**
 * 查询全域投放商品列表
 *
 * SxtUniOrderDataInfo
 */
export interface UniProductQuery {
    /**
     * 账户id
     */
    advertiserId?: number;
    /**
     * 平台达人id
     */
    authorId?: number;
    /**
     * 抖音号id
     */
    awemeId?: number;
    /**
     * 渠道ID，如果渠道品生效，价格、销量等信息需要返回渠道品信息
     * 渠道品相关介绍见
     */
    channelId?: number;
    /**
     * 渠道类型，可选值:
     * SHOP_SELL 商家自卖
     * STAR_SELL 达人自播
     */
    channelType?: string;
    /**
     * 不可投广的原因
     */
    grayReason?: string;
    /**
     * 主键id
     */
    id?: number;
    isAsc?: string;
    orderByColumn?: string;
    pageNum?: number;
    pageSize?: number;
    /**
     * 商品id
     */
    productId?: number;
    /**
     * 租户id
     */
    tenantId?: string;
}


/**
 * 全域投放商品视图对象 qc_uni_product
 *
 * QcUniProductVo
 */
export interface QcUniProductVo {
    /**
     * 账户id
     */
    advertiserId?: number;
    /**
     * 平台达人id
     */
    authorId?: number;
    /**
     * 抖音号id
     */
    awemeId?: number;
    /**
     * 渠道ID，如果渠道品生效，价格、销量等信息需要返回渠道品信息
     * 渠道品相关介绍见
     */
    channelId?: number;
    /**
     * 渠道类型，可选值:
     * SHOP_SELL 商家自卖
     * STAR_SELL 达人自播
     */
    channelType?: string;
    /**
     * 抖音达人信息
     */
    dyAuthorInfo?: DyAuthorInfo;
    /**
     * 抖音商品信息
     */
    dyProductInfo?: DyProductInfo;
    /**
     * 不可投广的原因
     */
    grayReason?: string;
    /**
     * 主键id
     */
    id?: number;
    /**
     * 商品id
     */
    productId?: number;
	/**
	 * 店铺信息
	 */
	dyShopInfo: DyShopInfo
}


/**
 * 查询随心推全域订单汇总统计数据返回值
 */
export interface SxtUniOrderStatisticsVo {
    /**
     * 累计投放金额
     */
    allAmount?: number;
    /**
     * 投放中订单数
     */
    allOrderNum?: number;
    /**
     * 成交订单金额
     */
    allPayOrderAmount?: number;
    /**
     * 成交订单数
     */
    allPayOrderCount?: number;
    /**
     * 累计消耗金额
     */
    allStatCost?: number;
}