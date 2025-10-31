import dayjs from 'dayjs'

// 获取当天日期
export function getTodayDate(){
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = (currentDate.getMonth() + 1) < 10 ? '0'+(currentDate.getMonth() + 1) : (currentDate.getMonth() + 1); // 月份从0开始，需要加1
	const day = currentDate.getDate() < 10 ? '0'+currentDate.getDate() : currentDate.getDate()

	const str = `${year}-${month}-${day}`
	return str
}
// 获取昨天日期
export function getYesterdayDate(){
	var today = new Date(); // 获取当前日期
	var yesterday = new Date(today); // 复制当前日期
	yesterday.setDate(today.getDate() - 1); // 设置为昨天日期
	var yesterdayDate =dayjs(yesterday).format("YYYY-MM-DD"); // 转换为本地日期字符串（格式：YYYY-MM-DD）
	return yesterdayDate
}
// 获取近7填日期
export function getSevenDaysDate() {
	var today = new Date(); // 获取当前日期
	var dates = []; // 存储近7天日期
	for (var i = 6; i >= 0; i--) {
	  var temp = new Date(today);
	  temp.setDate(temp.getDate() - i); // 设置日期为当前日期的前i天
	  dates.push(dayjs(temp).format("YYYY-MM-DD")); // 将日期转化为字符串并存入数组
	}
    return [
		dates[0],
		dates[6]
	]
}

// 获取近一个月日期
export function getNearMonthDate(){
	const currentDate = new Date(); // 获取当前日期
	currentDate.setDate(currentDate.getDate() - 29); // 将日期减去30天
	const oneMonthAgo = dayjs(currentDate).format("YYYY-MM-DD"); // 获取近一个月的时间
	
	return [oneMonthAgo,getTodayDate()]
}
// 获取本月日期
export function getCurrentMonth(){
	// 创建一个新的Date对象，默认为当前日期
	const date = new Date();
	// 设置当前月的第一天
	date.setDate(1);
	const startDate = dayjs(date).format("YYYY-MM-DD"); 
	return [startDate,getTodayDate()]
}
// 获取上个月的日期
export function getLastMonthDate(){
	const today = new Date();
	
	let year = today.getFullYear();
	let month = today.getMonth(); // 从0开始的月份
	month--; // 减去1得到上个月
	if (month < 0) { // 如果是0则表示上一年的12月
		month = 11; // 11表示下一年的1月
		year--;
	}
	const startDate =  new Date(year, month, 1);
	
	const firstDayOfCurrentMonth:Date = new Date(today.getFullYear(), today.getMonth(),1);
	const endDate = new Date(firstDayOfCurrentMonth - 1);
 
	const startDateStr = dayjs(startDate).format("YYYY-MM-DD");
	const endDateStr =  dayjs(endDate).format("YYYY-MM-DD");
	return [startDateStr,endDateStr]
}

// 获取当前年份最后一天的时间戳
export const getMaxDate = () => {
	// 获取当前年份
	const currentYear = new Date().getFullYear();
	
	// 创建一个表示当前年份最后一天的日期对象
	// 月份是从0开始的，所以12表示12月
	const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999); // 12月31日，23:59:59.999
	
	// 将日期对象转换为时间戳（毫秒）
	const timestamp = endOfYear.getTime();
	
	return timestamp;
}

// 获取当前2025年1月1日时间戳
export const getMinDate = () => {
	
	const endOfYear = new Date(2025, 0, 1); 
	
	const timestamp = endOfYear.getTime();
	
	return timestamp;
}