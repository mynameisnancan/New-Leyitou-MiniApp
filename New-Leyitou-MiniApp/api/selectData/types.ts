// 查询素材参数
export interface SxtVideoQuery extends PageQuery {
    /**
     * 部门id
     */
    deptId?: number;
    /**
     * 主键id
     */
    id?: number;
    isAsc?: string;
    /**
     * 视频类型 0内部 1外部
     */
    itemType?: number;
    /**
     * 排序字段
     */
    orderBy?: number;
    orderByColumn?: string;
    /**
     * 发布时间 例如 2024-05-16
     */
    publishTime?: string;
    /**
     * 排序方式 0 升序 1 降序
     */
    sort?: number;
    /**
     * 查询开始id,避免深度分页的问题
     */
    startId?: number;
    /**
     * 时间结束
     */
    timeEnd?: string;
    /**
     * 时间开始
     */
    timeStart?: string;
    /**
     * 时间类型 0创建时间 1数据时间
     */
    timeType?: number;
    /**
     * 视频标题
     */
    title?: string;
    /**
     * 抖音账号id
     */
    uid?: number;
    /**
     * 运营人id
     */
    userId?: number;
    /**
     * 抖音短视频 ID
     */
    videoId?: number;
    /**
     * 批量查询素材id参数
     */
    videoIds?: string[];
}

/**
 * 素材列表对象
 *
 * SxtVideoVo
 */
export interface SxtVideoVo {
    /**
     * 随心推视频数据
     */
    dataLabel: SxtVideoData;
    /**
     * 抖音达人信息
     */
    dyAuthorInfo: DyAuthorInfo;
    /**
     * 抖音视频信息
     */
    dyVideoInfo: DyVideoInfo;
    /**
     * 是否选中
     */
    isSelect?: boolean;
}

/**
 * 随心推视频数据
 *
 * SxtVideoData
 */
export interface SxtVideoData {
    clickCnt?: number;
    ctr?: number;
    ecpConvertCnt?: number;
    id?: number;
    payOrderAmount?: number;
    payOrderCount?: number;
    roi?: number;
    showCnt?: number;
    statCost?: number;
    totalPlay?: number;
}