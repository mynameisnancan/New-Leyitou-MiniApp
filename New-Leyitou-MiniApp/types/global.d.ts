declare global {
	interface BaseEntity {
		createBy ?: any;
		createDept ?: any;
		createTime ?: string;
		updateBy ?: any;
		updateTime ?: any;
	}
	/**
	 * 获取字典数据
	 */
	interface DictDataOption {
		label : string;
		value : string;
		elTagType ?: TagType;
	}

	interface LabelValue {
		label ?: string;
		value ?: string | number;
	}

	type TagType = 'primary' | 'danger' | 'warning' | 'success';

	/**
	 * 返回值
	 */
	interface ResultType<T> {
		msg : string;
		data : T;
		rows : T[];
		code : number;
		err : string;
		total : number;
	}

	// 分页
	interface PageQuery {
		pageNum : number;
		pageSize : number;
		noLoading ?: boolean;
	}

	/**
	 * 付款抖音号信息
	 *
	 * DyAuthorInfo
	 */
	interface DyAuthorInfo {
		/**
		 * 平台达人id
		 */
		authorId ?: number;
		/**
		 * 头像
		 */
		avatar ?: string;
		/**
		 * 粉丝数量
		 */
		fansNum ?: string;
		/**
		 * 达人近30天销量
		 */
		lastMonthSales ?: string;
		/**
		 * 卖货分数等级 1：高，2：中，3：低
		 */
		level ?: number;
		/**
		 * 昵称
		 */
		nickName ?: string;
		/**
		 * 达人累计销量
		 */
		sales ?: string;
		/**
		 * 卖货分分数
		 */
		score ?: number;
		/**
		 * 抖音号
		 */
		shortId ?: string;
		/**
		 * 抖音用户唯一id
		 */
		uid ?: number;
		/**
		 * 运营人信息
		 */
		userInfo ?: UserInfo;
	}

	/**
	 * 抖音商品信息
	 *
	 * DyProductInfo
	 */
	interface DyProductInfo {
		/**
		 * 商品主图
		 */
		cover ?: string;
		/**
		 * 抖音标签查询标识 000000 无标签
		 */
		dyLabelKey ?: string;
		/**
		 * 商品价格
		 */
		price ?: number;
		/**
		 * 商品id
		 */
		productId ?: string;
		/**
		 * 库存
		 */
		productStock ?: string;
		/**
		 * 商品总销量
		 */
		sales ?: number;
		/**
		 * 店铺id
		 */
		shopId ?: number;
		/**
		 * 商品名称
		 */
		title ?: string;
	}

	/**
	 * 店铺信息
	 *
	 * DyShopInfo
	 */
	interface DyShopInfo {
		/**
		 * 店铺评分信息
		 */
		dyShopScoreInfo ?: DyShopScoreInfo;
		dyShopInfo ?: DyShopInfo;
		/**
		 * 标签名称集合
		 */
		labelNames ?: string[];
		/**
		 * 商家名称
		 */
		merchantName ?: string;
		/**
		 * 商家id
		 */
		merchantId ?: number;
		/**
		 * 店铺id
		 */
		shopId ?: number;
		/**
		 * 店铺名称
		 */
		shopName ?: string;
		/**
		 * 店铺类型
		 */
		shopType ?: number;
	}

	/**
	 * 视频信息
	 *
	 * DyVideoInfo
	 */
	interface DyVideoInfo {
		/**
		 * 平台达人id
		 */
		authorId ?: number;
		createTime ?: string;
		/**
		 * 视频时长
		 */
		duration ?: number;
		/**
		 * 抖音评论数
		 */
		dyComment ?: number;
		/**
		 * 抖音点赞数
		 */
		dyLike ?: number;
		/**
		 * 抖音分享数
		 */
		dyShare ?: number;
		/**
		 * 抖音播放数
		 */
		dyTotalPlay ?: number;
		/**
		 * 视频标题
		 */
		title ?: string;
		/**
		 * 抖音作者uid
		 */
		uid ?: number;
		/**
		 * 视频封面图片
		 */
		videoCoverUrl ?: string;
		/**
		 * 抖音短视频 ID
		 */
		videoId ?: string;
	}

	/**
	 * 商品佣金信息
	 *
	 * ProductRateInfo
	 */
	interface ProductRateInfo {
		activityCosRatio ?: number;
		cosRatio ?: number;
		platCosRatio ?: number;
		productId ?: string;
		serviceRatio ?: number;
		tenantCosRatio ?: number;
		[property : string] : any;
	}

	/**
	 * 直播间信息
	 *
	 * RoomInfoVo
	 */
	interface RoomInfoVo {
		/**
		 * 直播间封面
		 */
		room_cover ?: string;
		/**
		 * 直播间id
		 */
		room_id ?: string;
		/**
		 * 直播间状态 可选值: FINISH 结束 LIVING 直播中 PAUSE 暂停 PREPARE 未开播 UNKNOW 未知
		 */
		room_status ?: string;
		/**
		 * 直播间标题
		 */
		room_title ?: string;
	}
	/**
	 * 用户信息
	 */
	interface UserInfo {
	   /**
	      * 部门id
	      */
	     deptId?: number;
	     /**
	      * 部门信息
	      */
	     deptInfo?: DeptInfo;
	     /**
	      * 昵称
	      */
	     nickName?: string;
	     /**
	      * 用户id
	      */
	     userId?: number;
	     /**
	      * 用户名
	      */
	     userName?: string;
	}
	/**
	 * 部门信息
	 *
	 * DeptInfo
	 */
	interface DeptInfo {
	    /**
	     * 部门id
	     */
	    deptId?: number;
	    /**
	     * 部门名称
	     */
	    deptName?: string;
	}
}
export const a = 1;