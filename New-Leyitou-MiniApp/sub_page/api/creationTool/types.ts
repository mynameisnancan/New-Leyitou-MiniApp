/**
 * 创建订单参数
 *
 * CreateOrderQuery
 */
export interface CreateOrderQuery {
    /**
     * 定时创建时间
     */
    createTime?: string[];
    /**
     * 创建方式 0立即创建 1定时创建 2分批创建
     */
    createWay?: number;
    /**
     * 创建随心推标准推广订单参数集合信息
     */
    list?: CreateOrderInfoVo[];
    /**
     * 创建随心推全域推广订单参数集合信息
     */
    uniList?: CreateSxtUniOrderInfoVo[];
}

/**
 * 创建随心推标准推广订单参数对象
 *
 * CreateOrderInfoVo
 */
export interface CreateOrderInfoVo {
    /**
     * 付款平台达人id
     */
    advertiser_id?: number;
    /**
     * 定向设置
     */
    audience?: AudienceVo;
    /**
     * 作者抖音号uid
     */
    aweme_id?: number;
    /**
     * 视频素材id
     */
    aweme_item_id?: number;
    /**
     * 随心推标准推广投放设置
     */
    delivery_setting?: DeliverySettingVo;
    /**
     * 营销目标，可选值: LIVE_PROM_GOODS 直播间带货 VIDEO_PROM_GOODS 商品全域
     */
    marketing_goal?: string;
}

/**
 * 定向设置
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
 * 随心推标准推广投放设置
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

/**
 * 创建随心推全域推广订单参数对象
 *
 * CreateSxtUniOrderInfoVo
 */
export interface CreateSxtUniOrderInfoVo {
    /**
     * 付款广告账户id
     */
    advertiser_id?: number;
    /**
     * 推广抖音号id
     */
    aweme_id?: number;
    /**
     * 随心推标全域推广放设置
     */
    delivery_setting?: SxtUniDeliverySettingVo;
    /**
     * 营销目标，可选值: VIDEO_PROM_GOODS 商品全域
     */
    marketing_goal?: string;
    /**
     * 商品ID
     * 当marketing_goal=VIDEO_PROM_GOODS时必填
     * 如果广告主是商家类型，通过「全域商家可选商品列表」获取；
     * 如果广告主是达人/机构类型，通过「全域达人获取可选商品列表」获取
     */
    product_id?: number;
}

/**
 * 随心推标全域推广放设置
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

// 解析添加素材信息
export interface AwemeItemParseType {
  awemeId?: string;
  awemeItemId?: number;
}

// 订单代投校验
export interface DeliveryCheckType {
  advertiserId?: number;
  uids?: number[];
}
