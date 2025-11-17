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
 * 订单统计数据对象
 */
export interface SxtOrderStatisticsVO {
    /**
     * "累计投放金额")
     */
    allAmount?: number;
    /**
     * 投放订单号
     */
    allOrderNum?: number;
    /**
     * "成交订单金额")
     */
    allPayOrderAmount?: number;
    /**
     * "成交订单数")
     */
    allPayOrderCount?: number;
    /**
     * "累计消耗金额")
     */
    allStatCost?: number;
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
export interface UniProductQuery extends PageQuery{
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
    /**
     * 商品id
     */
    productId?: number;
    /**
     * 租户id
     */
    tenantId?: string;
	title?:string;
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
	dyShopInfo?: DyShopInfo
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


/**
 * 抖音达人授权信息列表查询参数
 */
export interface DyAuthorAuthListQuery extends PageQuery{
    /**
     * 部门id
     */
    deptId?: number;
    /**
     * 抖音授权状态 0未授权 1已授权 2即将到期 3授权过期 4 取消授权
     */
    dyAuthStatus?: number;
    /**
     * 抖音账号昵称
     */
    dyNickName?: string;
    isAsc?: string;
    orderByColumn?: string;
    /**
     * 千川随心推授权状态 0未授权 1已授权 2授权过期
     */
    qcPcAuthStatus?: number;
    /**
     * 千川随心推授权状态 0未授权 1已授权 2授权过期
     */
    qcSxtAuthStatus?: number;
    /**
     * 用户id
     */
    userId?: number;
}



/**
 * 抖音达人授权信息
 *
 * DyAuthorAuthVo
 */
export interface DyAuthorAuthVo {
    /**
     * 平台达人id
     */
    authorId?: number;
    /**
     * 运营人部门id
     */
    deptId?: number;
    /**
     * 抖音达人信息
     */
    dyAuthorInfo?: DyAuthorInfo;
    /**
     * 抖音授权状态 0授权成功 1授权异常 2即将到期
     */
    dyAuthStatus?: number;
    /**
     * 抖音授权时间
     */
    dyAuthTime?: string;
    /**
     * 抖音授权过期时间
     */
    dyExpireTime?: string;
    /**
     * 千川授权可投放抖音uid
     */
    qcAwemeId?: number;
    /**
     * 千川pc权抖音号关联的千川账户ID：唯一值、不可修改
     */
    qcPcAdvertiserId?: number;
    /**
     * 千川pc授权状态 0未授权 1已授权 2授权过期
     */
    qcPcAuthStatus?: number;
    /**
     * 千川pc授权时间
     */
    qcPcAuthTime?: string;
    /**
     * 千川随心推授权抖音号关联的千川账户ID：唯一值、不可修改
     */
    qcSxtAdvertiserId?: number;
    /**
     * 千川随心推授权状态 0未授权 1已授权 2授权过期
     */
    qcSxtAuthStatus?: number;
    /**
     * 千川随心推授权时间
     */
    qcSxtAuthTime?: string;
    /**
     * 租户id
     */
    tenantId?: string;
    /**
     * 运营人id
     */
    userId?: number;
}


/**
 *
 * 查询订单列表参数
 */
export interface SxtOrderQuery extends Partial<PageQuery>{
    /**
     * 抖音号id
     */
    advertiserId?: number;
    /**
     * "LIVE_PROM_GOODS 直播间带货 VIDEO_PROM_GOODS 短视屏带货")
     */
    marketingGoal?: string;
    /**
     * 排序字段
     */
    orderBy?: number;
    /**
     * "订单id")
     */
    orderId?: number;
    /**
     * "商品id")
     */
    productId?: number;
    /**
     * 排序方式 0 升序 1 降序
     */
    sort?: number;
    /**
     * "排序字段")
     */
    sortField?: string;
    /**
     * "排序方式 0 升序 1 降序")
     */
    sortType?: number;
    /**
     * 查询开始id,避免深度分页的问题
     */
    startId?: number;
    /**
     * 订单投放状态 可选值:
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
     * "时间类型 0创建时间 1数据时间")
     */
    timeType?: number;
    /**
     * 抖音号uid
     */
    uid?: number;
    /**
     * "运营人")
     */
    userId?: number;
    /**
     * "素材id")
     */
    videoId?: number;
}



/**
 * 随心推订单对象
 *
 * SxtOrderVo
 */
export interface SxtOrderVo {
    /**
     * 批量优惠券信息，在预算追加后，会出现多张券的使用情况
     */
    addAmountInfo: AddAmountInfoVo;
    /**
     * 付款千川id
     */
    advertiserId: number;
    /**
     * 出价总和
     */
    amount: number;
    /**
     * 人群定向
     */
    audience: AudienceVo;
    /**
     * 审核建议信息
     */
    auditRecord: AuditRecordVo;
    /**
     * 优惠券信息
     */
    couponInfo: CouponInfoVo;
    /**
     * 批量优惠券信息，在预算追加后，会出现多张券的使用情况
     */
    couponInfos: CouponInfoVo[];
    createTime: string;
    /**
     * 订单数据
     */
    dataLabel: SxtOrderDataVo;
    /**
     * 投放设置
     */
    deliverySetting: DeliverySettingVo;
    /**
     * 视频作者达人信息
     */
    dyAuthorInfo: DyAuthorInfo;
    /**
     * 抖音商品信息
     */
    dyProductInfo: DyProductInfo;
    /**
     * 抖音店铺信息
     */
    dyShopInfo: DyShopInfo;
    /**
     * 视频信息
     */
    dyVideoInfo: DyVideoInfo;
    /**
     * 主键id
     */
    id: number;
    /**
     * LIVE_PROM_GOODS 直播间带货 VIDEO_PROM_GOODS 短视频带货
     */
    marketingGoal: string;
    /**
     * 投放订单号
     */
    orderId: string;
    /**
     * 订单标签 0无标签 1白名单标签
     */
    orderLabel: number;
    /**
     * 订单类型 0外部订单 1内部订单
     */
    orderType: number;
    /**
     * 付款达人信息
     */
    payAuthorInfo: DyAuthorInfo;
    /**
     * 商品佣金信息
     */
    productRateInfo: ProductRateInfo;
    /**
     * 直播间信息
     */
    roomInfo: RoomInfoVo;
    /**
     * 订单投放状态 可选值:
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
    /**
     * 终止结果
     */
    terminateResult: string;
    /**
     * 终止状态 0无 1终止中 2终止成功 3终止失败
     */
    terminateStatus: number;
}


/**
 * 批量优惠券信息，在预算追加后，会出现多张券的使用情况
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
 * 人群定向
 *
 * AudienceVo
 */
export interface AudienceVo {
    /**
     * 年龄定向
     */
    age?: string[];
    /**
     * 想吸引的观众类型 可选值:ATUO 系统智能推荐 CUSTOM 自定义 FANS 达人相似粉丝 LIVEFANS 达人相似观众
     */
    audience_mode?: string;
    /**
     * 抖音达人ID列表
     */
    author_ids?: number[];
    /**
     * 抖音达人ID列表
     */
    aweme_fan_accounts?: number[];
    /**
     * 抖音用户行为类型
     */
    aweme_fan_behaviors?: string[];
    /**
     * 抖音用户行为类型 ，允许值：
     */
    behaviors?: string[];
    /**
     * 具体定向的城市列表
     */
    city?: number[];
    /**
     * 地域定向类型 可选值:  CITY 省市 COUNTY 区县
     */
    district?: string;
    /**
     * 排除限运地区 可选值: 0 不排除 1 排除
     */
    exclude_limited_region?: string;
    /**
     * 性别定向 可选值:  GENDER_FEMALE 女性 GENDER_MALE 男性
     */
    gender?: string;
    /**
     * 兴趣类目词
     */
    interest_categories?: number[];
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
 * 优惠券信息
 *
 * CouponInfoVo
 *
 * 优惠券信息对象
 */
export interface CouponInfoVo {
    /**
     * 建议内容列表
     */
    coupon_total_amount?: number;
    /**
     * 券类型。1表示满减券；4表示满赠券
     */
    coupon_type?: number;
}

/**
 * 订单数据
 *
 * SxtOrderDataVo
 */
export interface SxtOrderDataVo {
    /**
     * 总预算
     */
    amount?: number;
    /**
     * 点击数
     */
    clickCnt?: number;
    /**
     * 直播间商品点击次数
     */
    clickProduct?: number;
    /**
     * 出价
     */
    cpaBid?: number;
    /**
     * 评论次数
     */
    dyComment?: number;
    /**
     * 新增粉丝数
     */
    dyFollow?: number;
    /**
     * 主页访问量
     */
    dyHomeVisited?: number;
    /**
     * 点赞次数
     */
    dyLike?: number;
    /**
     * 分享次数
     */
    dyShare?: number;
    /**
     * 转化数
     */
    ecpConvertCnt?: number;
    /**
     * 直播间新加团人次
     */
    liveFansClubJoinCnt?: number;
    /**
     * 直播间查看购物车次数
     */
    liveSlidecartClickCnt?: number;
    /**
     * 商品点击次数
     */
    lubanLiveClickProductCnt?: number;
    /**
     * 直播间评论次数
     */
    lubanLiveCommentCnt?: number;
    /**
     * 直播间观看人次
     */
    lubanLiveEnterCnt?: number;
    /**
     * 直播间新增粉丝次数
     */
    lubanLiveFollowCnt?: number;
    /**
     * 直播间音浪收入
     */
    lubanLiveGiftAmount?: number;
    /**
     * 直播间打赏次数
     */
    lubanLiveGiftCnt?: number;
    /**
     * 直播间分享次数
     */
    lubanLiveShareCnt?: number;
    /**
     * 查看购物车次数
     */
    lubanLiveSlidecartClickCnt?: number;
    /**
     * 成交订单金额
     */
    payOrderAmount?: number;
    /**
     * 成交订单量
     */
    payOrderCount?: number;
    /**
     * 5s完播率，短视频内容分析指标
     */
    playDuration5sRate?: number;
    /**
     * 成交roi
     */
    prepayAndPayOrderRoi?: number;
    /**
     * 广告预售订单金额
     */
    prepayOrderAmount?: number;
    /**
     * 广告预售订单数
     */
    prepayOrderCount?: number;
    /**
     * 有效看播
     */
    qianchuanEffectiveViewConvertCount?: number;
    /**
     * 支付roi目标
     */
    roiGoal?: number;
    /**
     * 展显量
     */
    showCnt?: number;
    /**
     * 消耗金额
     */
    statCost?: number;
    /**
     * 播放次数
     */
    totalPlay?: number;
}


/**
 * 投放设置
 *
 * DeliverySettingVo
 */
export interface DeliverySettingVo {
    /**
     * "投放金额")
     */
    amount?: number;
    /**
     * "出价模式 可选值: " +
     * "PRICING_ACTION 按优化目标出价" +
     * "PRICING_PLAY 按播放量出价")
     */
    bid_mode?: string;
    bid_type?: string;
    /**
     * "手动出价金额")
     */
    cpa_bid?: number;
    /**
     * "期望曝光时长")
     */
    delivery_time?: number;
    /**
     * "AD_CONVERT_TYPE_LIVE_CLICK_PRODUCT_ACTION 直播间商品点击" +
     * "AD_CONVERT_TYPE_LIVE_COMMENT_ACTION 直播间评论" +
     * "AD_CONVERT_TYPE_LIVE_EFFECTIVE_EFFECTIVE_VIEW 有效看播(pc直播加热）" +
     * "AD_CONVERT_TYPE_LIVE_ENTER_ACTION 进入直播间" +
     * "AD_CONVERT_TYPE_LIVE_ROI 直播间/短视频支付ROI" +
     * "AD_CONVERT_TYPE_LIVE_SUCCESSORDER_ACTION 直播间下单" +
     * "AD_CONVERT_TYPE_LIVE_SUCCESSORDER_PAY 直播间成交" +
     * "AD_CONVERT_TYPE_NEW_FOLLOW_ACTION 直播间粉丝提升" +
     * "AD_CONVERT_TYPE_QC_FOLLOW_ACTION 粉丝提升" +
     * "AD_CONVERT_TYPE_QC_MUST_BUY 点赞评论" +
     * "AD_CONVERT_TYPE_SHOPPING 商品购买"
     */
    external_action?: string;
    liveroom_heat_mode?: string;
    /**
     * "实际支付金额")
     */
    payment_amount?: string;
    /**
     * "支付ROI目标")
     */
    roi_goal?: number;
}

