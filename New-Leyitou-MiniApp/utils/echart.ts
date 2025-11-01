/**
 * echarts 图表相关工具
 */
import dayjs from 'dayjs';
import { TinyColor } from '@ctrl/tinycolor';
import { useThemeStore } from '@/store/useTheme'
const useTheme = useThemeStore()
// 根据当前主题色 获取echart颜色数组
export const getEchartColors = (color:string) => {
	let rgbColors = []
	rgbColors = useTheme.themeSetting.map(item => {
		return convertToRgb(item)
	})
	
	const colorIndex = rgbColors.findIndex(item => item === convertToRgb(color))
	if(colorIndex !== -1){
		rgbColors.splice(colorIndex, 1);
	}
	return [
		convertToRgb(color),
		...rgbColors
	];
}

/**
 * 将颜色转换为RGB颜色字符串
 * TinyColor无法处理hsl内包含'deg'、'grad'、'rad'或'turn'的字符串
 * 比如 hsl(231deg 98% 65%)将被解析为rgb(0, 0, 0)
 * 这里在转换之前先将这些单位去掉
 * @param str 表示HLS颜色值的字符串
 * @returns 如果颜色值有效，则返回对应的RGB颜色字符串；如果无效，则返回rgb(0, 0, 0)
 */
export const convertToRgb = (str: string): string =>{
  return new TinyColor(str.replaceAll(/deg|grad|rad|turn/g, '')).toRgbString();
}

// 设置rgb格式颜色透明度
export  const convertRgbToRgba = (rgbStr: string, alpha: number = 1): string => {
  if (!rgbStr.startsWith('rgb(')) return rgbStr;
  const values = rgbStr.match(/\d+/g);
  return values && values.length === 3
    ? `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${alpha})`
    : rgbStr;
};

/**
 * x 轴数据填充
 * @param {number} dataLength
 * @param {string} type 'day' | 'hour'
 * @param {string} timeEnd 截止时间
 * @param {string} formatString 时间格式化字符串
 * @returns {Array} x 轴数据
 */
export const generateXData = (
  dataLength: number,
  type: 'day' | 'hour',
  timeEnd = '',
  formatString = 'MM-DD',
) => {
  const mockXData = [];
  if (type === 'day') {
    // 特殊情况 如果选择上个月作为参数 比如 10-01 10-31 所以传入截止时间作为参数 overviewParams.value.timeEnd
    for (let i = dataLength; i > -1; i--) {
      const time = dayjs(timeEnd).subtract(i, 'days').format(formatString);

      // console.log('time', time);
      mockXData.push(time);
    }
  } else {
    // console.log('hour', dataLength);
    for (let i = dataLength; i < 24; i++) {
      if (i < 10) {
        mockXData.push(`0${i}:00`);
      } else {
        mockXData.push(`${i}:00`);
      }
    }
  }
  return mockXData;
};

/**
 * y 轴数据填充
 * @param {number} dataLength
 * @param {string} type 'day' | 'hour'
 * @returns {Array} y 轴数据
 */

export const generateYData = (dataLength: number, type: 'day' | 'hour') => {
  const mockYData = [];
  if (type === 'day') {
    for (let i = dataLength; i > -1; i--) {
      mockYData.push(0);
    }
  } else {
    for (let i = dataLength; i < 24; i++) {
      mockYData.push(0);
    }
  }
  return mockYData;
};
