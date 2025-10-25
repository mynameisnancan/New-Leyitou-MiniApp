// 参考官网参数 https://wot-ui.cn/component/tabs.html#tabs-attributes
export interface BaseTabsType {
	tabs:TabType[]; // 页签数据
	sticky?:boolean; // 粘性布局
	offsetTop?:number; // 粘性布局时距离窗口顶部距离	
	swipeable?:boolean; // 开启手势滑动
	autoLineWidth?:boolean; // 底部条宽度跟随文字，指定lineWidth时此选项不生效
	lineWidth?:number; // 底部条宽度，单位像素
	lineHeight?:number;// 底部条高度，单位像素
	color?:string; // 文字颜色
	inactiveColor?:string;// 非活动标签文字颜色
	animated?:boolean; // 是否开启切换标签内容时的转场动画
	duration?:number; // 切换动画过渡时间，单位毫秒
	slidable?:boolean; // 是否开启滚动导航
	badgeProps?:any; // 自定义徽标的属性
}

interface TabType {
	title:string; // 标题
	name:string;// 标签页名称
	disabled?:boolean; // 是否禁用
	lazy?:boolean; // 延迟渲染，默认开启，开启animated后此选项始终为false
	date?:boolean;// 是否显示时间选择
}