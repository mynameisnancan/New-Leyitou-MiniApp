import type {
	AddAmountInfoVo,
	AuditRecordVo,
	CouponInfoVo,
	SxtUniOrderDataInfo
}from '@/api/index/types'
/**
 * SxtUniOrderDetailMergeVo
 */
export interface SxtUniOrderDetailMergeVo {
    /**
     * 续费信息
     */
    addAmountInfo?: AddAmountInfoVo;
    /**
     * 付款千川账户id
     */
    advertiserId?: string;
    /**
     * 审核建议信息
     */
    auditRecordInfo?: AuditRecordVo;
    /**
     * 订单优惠券信息
     */
    couponInfos?: CouponInfoVo[];
    /**
     * 订单投放设置信息
     */
    deliverySetting?: SxtUniDeliverySettingVo;
    /**
     * 推广抖音号信息
     */
    dyAuthorInfo?: DyAuthorInfo;
    /**
     * 推广商品信息
     */
    dyProductInfo?: DyProductInfo;
    /**
     * 商品店铺信息
     */
    dyShopInfo?: DyShopInfo;
    /**
     * 订单创建时间
     */
    orderCreateTime?: string;
    /**
     * 订单号
     */
    orderId?: string;
    /**
     * 平台商家信息
     */
    platMerchantInfo?: PlatMerchantInfo;
    /**
     * 商品id
     */
    productId?: string;
    /**
     * 商品佣金信息
     */
    productRateInfo?: ProductRateInfo;
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
}

/**
 * 订单投放设置信息
 *
 * SxtUniDeliverySettingVo
 */
export interface SxtUniDeliverySettingVo {
    /**
     * 投放金额，单位元，取值范围[100-5000000]
     *
     * 数值需为10的倍数
     */
    amount?: number;
    /**
     * 出价类型，允许值：
     * 系统智能出价：AUTO_BID
     * 手动出价：MANUAL_BID
     * 当marketing_goal=VIDEO_PROM_GOODS时必填
     */
    bid_type?: string;
    /**
     * 预期投放时长，单位小时，允许值：
     *
     * 2、6、12、24、48、72、96、120、144、168
     */
    delivery_time?: number;
    /**
     * 是否开启智能优惠券，允许值：
     * QCPX_MODE_OFF 关闭
     * QCPX_MODE_ON 开启 （默认）
     */
    qcpx_mode?: string;
    /**
     * 支付ROI，最多支持两位小数，取值范围[0.01 - 10000]
     *
     * 当marketing_goal=VIDEO_PROM_GOODS且bid_type=MANUAL_BID时必填
     */
    roi_goal?: number;
}

/**
 * 平台商家信息
 *
 * PlatMerchantInfo
 */
export interface PlatMerchantInfo {
    createUserId?: number;
    merchantId?: number;
    merchantName?: string;
    merchantType?: number;
    [property: string]: any;
}


export interface SxtUniOrderDataMergeQuery {
    /**
     * 订单id
     */
    orderId: number;
    /**
     * 结束时间
     */
    timeEnd: string;
    /**
     * 开始时间
     */
    timeStart: string;
}

/**
 * 随心推全域分日分时数据组合对象
 *
 * SxtUniOrderDataMergeVo
 */
export interface SxtUniOrderDataMergeVo {
    /**
     * 随心推全域订单数据信息
     */
    dataInfo: SxtUniOrderDataInfo;
    /**
     * 经过处理数据key
     */
    dataKey: string;
    /**
     * 数据类型 0 分时 1分日
     */
    dataType: number;
    /**
     * 分日key
     */
    dayKey: number;
    /**
     * 分时key
     */
    hourKey: number;
}