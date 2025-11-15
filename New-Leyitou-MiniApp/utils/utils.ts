import { getToken } from './auth'
import {
	computed,
	ref
} from 'vue'
import {
	useThemeStore
} from '@/store/useTheme'
const themeStore = useThemeStore();
const themes = themeStore.themeSetting;

// 从缓存中获取主题色并应用
export const setThemeColor = () => {
	const theme = uni.getStorageSync('theme')
	if (theme) {
		uni.setTabBarStyle({
			selectedColor:theme.themeVars.colorTheme,
			backgroundColor:  theme.theme == 'light' ? '#ffffff' : '#1b1b1b'
		})
		
		themeStore.updateTheme(theme.theme)
		themeStore.updateColorTheme(theme.themeVars.colorTheme)
		uni.setTabBarItem({
			index:0,
			selectedIconPath:`static/img/selectDingdan${theme.themeVars.colorTheme}.png`,
		})
		uni.setTabBarItem({
			index:1,
			selectedIconPath:`static/img/personalCenter${theme.themeVars.colorTheme}.png`,
		})
	
	}
}
export const setThemePageBgColor = () => {
	uni.setBackgroundColor({
		backgroundColorTop: themeStore.theme == 'light' ? '#144fe9' : '#1b1b1b',
		backgroundColor: themeStore.theme == 'light' ? '#f6f7fb' : '#1b1b1b',
	});
}

// 根据value获取label
export const getLabelByValue = (data : any, value : any) => {
	if (!value) return ''
	const strs = []
	for (const key of Object.keys(data)) {
		if (data[key].value === `${value}`) {
			strs.push(data[key].label)
		}
	}
	return strs.join('')
}

// 复制
export const copyStr = (url : string) => {
	uni.setClipboardData({
		data: url + '',
		success: function () {
		}
	});
}

// 获取导航栏高度, wot导航栏默认44高度
export const getNavHeight = () => {
	const { statusBarHeight } = uni.getSystemInfoSync()
	return 44 + (statusBarHeight || 0)
}

let timer = ref()
// 防抖函数
export function debounce(fn : Function, delay : number) {
	return function () {
		if (timer.value) {
			clearTimeout(timer.value)
		}
		timer.value = setTimeout(fn, delay)
	}
}

// 计算ROI
export const sumRoiFun = (amount : number, cost : number) => {
	return amount > 0 && cost > 0
		? Number.parseFloat((amount / cost).toFixed(2))
		: 0;
};

//根据value获取枚举的type值
export const getEnumValue = (enums : any[], value : any) => {
	const type : string = enums.find((item) => item.value == value)?.elTagType
	if (type == 'info') return 'default'
	return type;
};
//根据value获取枚举的label值
export const getEnumLabel = (enums : any[], value : any) => {
	return enums.find((item) => item.value == value)?.label || '--';
};


/**
* 页面跳转
* @param pageUrl 页面路径
*/
export function navigateTo(pageUrl : string, animationType = "slide-in-right") {
	const pageSize = getCurrentPages().length
	if (pageSize < 10) { // 如果页面栈数量大于10，则每次跳转页面改为重定向
		uni.navigateTo({ url: pageUrl, animationType: animationType })
	} else {
		uni.redirectTo({ url: pageUrl, animationType: animationType })
	}
}

// 关闭当前页面 返回指定层级的页面 默认1级
export const goBack = (num : number = 1) => {
	uni.navigateBack({
		delta: num,//返回层数，2则上上页
	})
}


// 数字转千分位
export const setMillesimal = (data : number) => {
	if (!data) {
		return '0';
	} else if ((data + '').indexOf('.') != -1) {
		return toFixedNoRound(Number(data))
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	} else {
		return Number(data)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
};

/**
 * 保留小数点几位数, 自动补零, 四舍五入
 * @param num: 数值
 * @param digit: 小数点后位数
 * @returns number
 */
export const toFixedNoRound = (num : number, decimals : number = 2) => {
	if (num) {
		const multiplier = Math.pow(10, decimals);
		const truncatedNum = Math.trunc(num * multiplier) / multiplier;
		return truncatedNum.toFixed(decimals);
	} else {
		return 0;
	}
};

/**
* 权限判断
* @param moduleName 模块名称
* @param operationName 操作名称， 如 lsit(查看) update(修改) add(新增) delete(删除)
*/
export const lookPermissions = computed(() => {
	return (permission : any) => {
		const permissions = uni.getStorageSync('permissions');
		if (permissions == '*:*:*') return true;
		if (permissions && permission) {
			let str = permission
			if (permissions.indexOf(str) != -1) {
				return true
			} else {
				return false
			}
		} else {
			return true
		}
	}
})


export function formatNumber(
	num : number = 0,
	precision : number = 2,
	prefix ?: string,
	suffix ?: string,
	thousandSeparator : string = ',',
) {
	return num > 999
		? `${prefix || ''}${num.toFixed(precision).replaceAll(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)}${suffix || ''}`
		: `${prefix || ''}${num.toFixed(precision)}${suffix || ''}`;
}

// 乐意投计算ROI值
export const compute = (row : any, prop : any) => {
	const data = row.dataLabel || {};
	const product = row.productInfo || {};
	let realROI : any = 0;

	switch (prop) {
		case 'AOP': {
			return data.payOrderCount === 0
				? '0.00'
				: formatNumber(data.payOrderAmount / data.payOrderCount);
		}
		case 'CAC': {
			return data.payOrderCount === 0
				? '0.00'
				: (data.statCost / data.payOrderCount).toFixed(2);
		}
		case 'COMMISSION': {
			return formatNumber(
				((data.payOrderAmount * product.commissionRate) / 100) *
				(1 - product.afterSalesRate / 100),
			);
		}
		case 'cpaBid': {
			if (!row.deliverySetting) return '---';
			return row.deliverySetting.cpa_bid === null
				? '---'
				: row.deliverySetting.cpa_bid;
		}
		case 'CTR': {
			return data.showCnt === 0
				? '0.00'
				: formatNumber((data.clickCnt / data.showCnt) * 100);
		}
		case 'CVR': {
			if (data.ecpConvertCnt) {
				return data.clickCnt === 0
					? '0.00'
					: formatNumber((data.ecpConvertCnt / data.clickCnt) * 100);
			}
			return data.payOrderCount === 0
				? '0.00'
				: formatNumber((data.payOrderCount / data.clickCnt) * 100);
		}
		case 'payOrderAmount': {
			return formatNumber(Number(data.payOrderAmount));
		}
		case 'playDuration5sRate': {
			return formatNumber(data.playDuration5sRate * 100);
		}
		case 'prepayAndPayOrderRoi': {
			if (data.statCost === 0) {
				return '---';
			}
			return Number(data.payOrderAmount) === 0
				? '0.00'
				: formatNumber(
					Number(data.payOrderAmount) / Number(data.statCost),
				);
		}
		case 'realROI': {
			if (!product || !product.commissionRate || data.statCost === 0) {
				return '0.00';
			}
			realROI = formatNumber(
				(((data.payOrderAmount * product.commissionRate) / 100) *
					(1 - product.afterSalesRate / 100)) /
				data.statCost,
			);
			return realROI;
		}
		case 'realROIOnline': {
			if (product.userConfigProduct) {
				if (
					product.userConfigProduct.afterSalesRate === 100 ||
					product.userConfigProduct.commissionRate === 0
				) {
					return '0.00';
				}
				if (product.userConfigProduct.commissionType === 0) {
					realROI = formatNumber(
						(((data.payOrderAmount *
							product.userConfigProduct.commissionRate *
							0.9) /
							100) *
							(1 - product.userConfigProduct.afterSalesRate / 100)) /
						data.statCost,
					);
					return realROI;
				} else {
					realROI = formatNumber(
						(((data.payOrderAmount * product.userConfigProduct.commissionRate) /
							100) *
							(1 - product.userConfigProduct.afterSalesRate / 100)) /
						data.statCost,
					);
					return realROI;
				}
			} else {
				if (!product.commissionRate || data.statCost === 0) {
					return '0.00';
				}
				realROI = formatNumber(
					(((data.payOrderAmount * product.commissionRate * 0.9) / 100) *
						(1 - product.afterSalesRate / 100)) /
					data.statCost,
				);
				return realROI;
			}
		}
		case 'CPM': {
			return data.showCnt === 0
				? '0.00'
				: formatNumber((data.statCost / data.showCnt) * 1000);
		}
		case 'redLineBid': {
			let charge : any = 0.9;
			if (product.userConfigProduct) {
				charge = product.userConfigProduct.commissionType === 1 ? 1 : 0.9;
				return formatNumber(
					(((1 / product.userConfigProduct.commissionRate) * 100) /
						charge /
						(100 - product.afterSalesRate)) *
					100,
				);
			}
			return formatNumber(
				((((1 / product.commissionRate) * 100) /
					charge /
					(100 - product.afterSalesRate)) *
					100) /
				0.9,
			);
		}
		case 'redLineRoi': {
			let charge = 0.9;
			const cac : any = compute(row, 'CAC');
			if (product.userConfigProduct) {
				charge = product.userConfigProduct.commissionType === 1 ? 1 : 0.9;
				return formatNumber(
					((cac * product.userConfigProduct.commissionRate) / 100) *
					charge *
					(1 - product.afterSalesRate / 100),
				);
			}
			return formatNumber(
				((cac * product.commissionRate) / 100) *
				charge *
				(1 - product.afterSalesRate / 100) *
				0.9,
			);
		}
		case 'ROI': {
			// console.log(
			//   'ROI',
			//   data,
			//   data.statCost === 0 || data.statCost === '0'
			//     ? '0.00'
			//     : formatNumber(data.payOrderAmount / data.statCost),
			// );
			return data.statCost === 0 || data.statCost === '0'
				? '0.00'
				: formatNumber(data.payOrderAmount / data.statCost);
		}
		case 'roiGoal': {
			if (!row.deliverySetting) return '--';
			return row.deliverySetting.roi_goal === null
				? '--'
				: row.deliverySetting.roi_goal;
		}
		case 'statCost': {
			return formatNumber(Number(data.statCost));
		}

		default: {
			return data[prop];
		}
	}
};

// 格式化定向设置
export const formatAudience = (audience : any) => {
	const age_list : any = {
		BETWEEN_18_23: '18-23岁',
		BETWEEN_24_30: '24-30岁',
		BETWEEN_31_40: '31-40岁',
		BETWEEN_41_50: '41-50岁',
	};
	if (typeof audience !== 'object') {
		return '未知定向！';
	}

	if (audience.audience_mode === 'ATUO') {
		return '系统智能推荐';
	}

	let audience_string = '自定义：';

	if (audience.age === null || (audience.age && audience.age.length === 0)) {
		audience_string += '年龄：不限，';
	} else {
		audience_string += '年龄：';
		if (audience.age) {
			audience.age.forEach((age : any) => {
				audience_string += `${age_list[age]}，`;
			});
		}
	}

	if (audience.gender === null) {
		audience_string += '性别：不限，';
	} else {
		audience_string +=
			audience.gender === 'FEMALE' ? '性别：女性，' : '性别：男性，';
	}

	audience_string +=
		audience.exclude_limited_region === null ||
			audience.exclude_limited_region !== 'NUMBER_1'
			? '排除限运地区：不排除'
			: '排除限运地区：排除';

	return audience_string;
};