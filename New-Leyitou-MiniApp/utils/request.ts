import config from '@/config.ts'
import {
	getToken
} from '@/utils/auth'
import { errorCode } from '@/utils/errorCode.ts'
import {
	toast,
	showConfirm,
	tansParams,
	wdToast
} from '@/utils/common.ts'
import {useUserStore} from '@/store/user.ts'
import {generateAesKey,encryptBase64,encryptWithAes}  from '@/utils/crypto.ts'
import { encrypt} from '@/utils/jsencrypt.ts';

let timeout = 10000
const baseUrl = config.baseUrl
const clientId = config.clientId
const appKey= config.appKey
const request = (config:any):Promise<any> => {
	const userStore = useUserStore()
	// 是否需要设置 token
	const isToken = (config.header || {}).isToken === 'false'
	config.header = config.header || {}
	if (getToken() && !isToken) {
		config.header['Authorization'] = 'Bearer ' + getToken()
	}
	config.header['Clientid'] =clientId
	config.header['idou-cloud-appkey'] = appKey
	// config.header['cookie'] = 'username=admin; rememberMe=true; password=PHNygPb0/68Q+EFXlZlMVZW8wiPnf5VdFGNxJrRFx6P6S6ugyYoTe/HOTXPBYxQjdmF3UdlMcbqNK4uNgL/DzQ=='
	 // 是否需要加密
	const isEncrypt = config.header?.isEncrypt;
	if(isEncrypt){
		const aesKey = generateAesKey();
		config.header['encrypt-key'] = encrypt(encryptBase64(aesKey));
		config.data = typeof config.data === 'object' ? encryptWithAes(JSON.stringify(config.data), aesKey) : encryptWithAes(config.data, aesKey);
	}
	
	
	// get请求映射params参数
	if (config.params) {
		let url = config.url + '?' + tansParams(config.params)
		url = url.slice(0, -1)
		config.url = url
	}
	if (!config.data?.noLoading) {
		uni.showLoading({
			title: '加载中',
			mask: true,
		})
		// wdToast.value.loading({
		//   loadingType: 'ring',
		//    position: 'middle',
		//    cover:true,
		//    zIndex:9999,
		//    msg: '加载中...'
		// })
	}

	return new Promise((resolve, reject) => {
		uni.request({
				method: config.method || 'get',
				timeout: config.timeout || timeout,
				url: config.baseUrl || baseUrl + config.url,
				data: config.data,
				header: config.header,
				dataType: 'json'
			}).then((response:any) => {
				/* let [error, res] = response
				 if (error) {
				   toast('后端接口连接异常')
				   reject('后端接口连接异常')
				   return
				 } */
				uni.hideLoading()
				const res = response
				const code = res.data.code || 200
				const msg = errorCode[code] || res.data.msg || errorCode['default']
				if (code === 401) {
					showConfirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then((res:any) => {
						console.log(userStore)
						if (res.confirm) {
							userStore.logOut().then(res => {
								uni.navigateTo({
									url: '/sub_page/pages/loginModePage/index'
								})
							})
						}
					})
					reject('无效的会话，或者会话已过期，请重新登录。')
				} else if (code === 500) {
					toast(msg, 3000)
					reject('500')
				} else if (code !== 200) {
					toast(msg, 3000)
					reject(code)
				}
				resolve(res.data)
			})
			.catch(error => {
				uni.hideLoading();
				let {
					errMsg
				} = error
				console.log(error)
				if (errMsg === 'Network Error') {
					errMsg = '后端接口连接异常'
				} else if (errMsg.includes('timeout')) {
					errMsg = '系统接口请求超时'
				} else if (errMsg.includes('Request failed with status code')) {
					errMsg = '系统接口' + errMsg.substr(errMsg.length - 3) + '异常'
				} else if (errMsg.includes('request fail url not in domain list')) {
					errMsg = '系统接口' + errMsg.substr(errMsg.length - 3) + '异常'
				}
				// toast(errMsg, 3000)
				reject(error)
			}).finally(() => {})
	})
}

export default request