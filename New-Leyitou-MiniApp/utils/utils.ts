import {getToken} from './auth'
import {
	computed
}from 'vue'

// 计算ROI
export const sumRoiFun = (amount: number, cost: number) => {
  return amount > 0 && cost > 0
    ? Number.parseFloat((amount / cost).toFixed(2))
    : 0;
};

//根据value获取枚举的type值
export const getEnumValue = (enums: any[], value: any) => {
	const type :string= enums.find((item) => item.value == value)?.elTagType
	if(type == 'info') return 'default'
	return type;
};
//根据value获取枚举的label值
export const getEnumLabel = (enums: any[], value: any) => {
  return enums.find((item) => item.value == value)?.label || '--';
};
	
	
/**
* 页面跳转
* @param pageUrl 页面路径
*/
export  function navigateTo(pageUrl:string,animationType="slide-in-right") {
	  const pageSize = getCurrentPages().length
	  if (pageSize < 10) { // 如果页面栈数量大于10，则每次跳转页面改为重定向
	    uni.navigateTo({url: pageUrl,animationType: animationType})
	  } else {
	    uni.redirectTo({url: pageUrl,animationType: animationType})
	  }
}

// 关闭当前页面 返回指定层级的页面 默认1级
export const goBack  = (num:number = 1) => {
	uni.navigateBack({
		delta:num,//返回层数，2则上上页
	})
}

// 应用版本的颜色
export const versionBgColors = [
	 {
	    cardBgColor: '#dcf8ce',
	    btnColor: '#52c41a'
	  },
	  {
	    cardBgColor: '#feedc3',
	    btnColor: '#ffba34'
	  },
	  {
	    cardBgColor: '#ffe7e1',
	    btnColor: '#e92e2e'
	  },
	  {
	    cardBgColor: '#e9e3ff',
	    btnColor: '#7947e4'
	  },
	  {
	    cardBgColor: '#f2f2f2',
	    btnColor: '#443922'
	  }
]


// 数字转千分位
export const setMillesimal = (data: number) => {
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
export const toFixedNoRound = (num: number, decimals: number = 2) => {
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
	return (permission:any) => {
		const permissions = uni.getStorageSync('permissions');
		if(permissions == '*:*:*') return true;
		if(permissions && permission){
			let str =`system:${permission}`
			if(permissions.indexOf(str) != -1) {
				return true
			}else{
				return false
			}
		}else{
			return true
		}
	}
})