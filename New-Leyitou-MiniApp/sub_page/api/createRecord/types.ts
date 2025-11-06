import { UserInfo } from "@/api/user/types";

// 查询随心推订单创建记录列表
export interface SxtOrderCreateRecordQuery extends Partial<PageQuery>{
    /**
     * 千川id
     */
    advertiserId?: number;
    /**
     * 投放金额
     */
    amount?: string;
    /**
     * 平台达人id
     */
    authorId?: number;
    /**
     * 推广对象的抖音id
     * 视频加热和视频加热直播间：传递视频作者的抖音uid
     * 直接加热直播间：传递主播的抖音uid
     */
    awemeId?: number;
    /**
     * 创建状态 0未处理 1创建成功 2已取消 3创建失败
     */
    createStatus?: number;
    /**
     * 创建方式 0立即创建 1定时创建 2分批创建
     */
    createType?: number;
    /**
     * 投放类型 0自投 1代投
     */
    dropType?: number;
    /**
     * 结束时间
     */
    endTime?: string;
    /**
     * 定时任务执行时间
     */
    executeTime?: string;
    /**
     * 主键id
     */
    id?: number;
    isAsc?: string;
    /**
     * LIVE_PROM_GOODS 直播间带货
     * VIDEO_PROM_GOODS 商品全域
     */
    marketingGoal?: string;
    /**
     * 队列消息id
     */
    msgId?: number;
    /**
     * 操作时间
     */
    operationTime?: string;
    orderByColumn?: string;
    /**
     * 订单id
     */
    orderId?: number;
    /**
     * 被投商品id
     */
    productId?: number;
    /**
     * 创建请求参数
     */
    reqParam?: string;
    /**
     * 创建响应结果
     */
    reqResult?: string;
    /**
     * 开始时间
     */
    startTime?: string;
    /**
     * 创建人
     */
    userId?: number;
    /**
     * 被投素材id
     */
    videoId?: number;
}

/**
 * 随心推订单创建记录视图对象 sxt_order_create_record
 *
 * SxtOrderCreateRecordVo
 */
export interface SxtOrderCreateRecordVo {
    /**
     * 付款账户id
     */
    advertiserId?: string;
    /**
     * 投放金额
     */
    amount?: number;
    /**
     * 付款平台达人id
     */
    authorId?: number;
    /**
     * 创建状态 0未处理 1创建成功 2已取消 3创建失败
     */
    createStatus?: number;
    /**
     * 创建方式 0立即创建 1定时创建 2分批创建
     */
    createType?: number;
    /**
     * 被推广的抖音达人信息
     */
    dyAuthorInfo?: DyAuthorInfo;
    /**
     * 被投商品信息
     */
    dyProductInfo?: DyProductInfo;
    /**
     * 直播加热视频信息
     */
    dyVideoInfo?: DyVideoInfo;
    /**
     * 定时任务执行时间
     */
    executeTime?: string;
    /**
     * 主键id
     */
    id?: number;
    /**
     * LIVE_PROM_GOODS 直播间带货 VIDEO_PROM_GOODS 商品全域
     */
    marketingGoal?: string;
    /**
     * 队列消息id
     */
    msgId?: number;
    /**
     * 操作时间
     */
    operationTime?: string;
    /**
     * 订单id
     */
    orderId?: string;
    /**
     * 付款账户关联的抖音信息
     */
    payDyAuthorInfo?: DyAuthorInfo;
    /**
     * 被投商品id
     */
    productId?: string;
    /**
     * 创建请求参数
     */
    reqParam?: string;
    /**
     * 创建响应结果
     */
    reqResult?: string;
    /**
     * 创建人
     */
    userId?: number;
    /**
     * 创建人信息
     */
    userInfo?: UserInfo;
    /**
     * 视频加入直播间素材id
     */
    videoId?: string;
}