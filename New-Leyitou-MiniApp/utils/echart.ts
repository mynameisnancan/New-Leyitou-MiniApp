/**
 * echarts 图表相关工具
 */

import dayjs from 'dayjs';

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
