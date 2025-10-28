export interface BasePopupTypes {
	apiUrl: (query:any) => Promise<any>;
	type: 'commodity' | 'douYin';
	multiple?:boolean;
}