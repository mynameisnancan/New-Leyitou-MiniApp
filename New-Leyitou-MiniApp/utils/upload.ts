import {
	useUserStore
} from "@/store/user.ts";
import config from '@/config'
import { getToken } from '@/utils/auth'
import { errorCode } from '@/utils/errorCode'
import { toast, showConfirm, tansParams } from '@/utils/common'

let timeout = 10000
const baseUrl = config.baseUrl

const upload = (config : any) => {
	const userStore = useUserStore()
	// 是否需要设置 token
	const isToken = (config.headers || {}).isToken === false
	config.header = config.header || {}
	if (getToken() && !isToken) {
		config.header['Authorization'] = 'Bearer ' + getToken()
	}
	config.header['clientid'] = config.clientid
	config.header['IDou-Cloud-AppKey'] = config.appKey
	// get请求映射params参数
	if (config.params) {
		let url = config.url + '?' + tansParams(config.params)
		url = url.slice(0, -1)
		config.url = url
	}
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			timeout: config.timeout || timeout,
			url: baseUrl + config.url,
			filePath: config.filePath,
			name: config.name || 'file',
			header: config.header,
			formData: config.formData,
			success: (res:any) => {
				let result = JSON.parse(res.data)
				const code = result.code || 200
				const msg = errorCode[code] || result.msg || errorCode['default']
				if (code === 200) {
					resolve(result)
				} else if (code == 401) {
					showConfirm("登录状态已过期，您可以继续留在该页面，或者重新登录?").then((res:any) => {
						if (res.confirm) {
							userStore.logOut().then(res => {
								uni.navigateTo({ url: '/pages/login/index' })
							})
						}
					})
					reject('无效的会话，或者会话已过期，请重新登录。')
				} else if (code === 500) {
					toast(msg)
					reject('500')
				} else if (code !== 200) {
					toast(msg)
					reject(code)
				}
			},
			fail: (error) => {
				console.log(error)
				let { errMsg } = error
				if (errMsg == 'Network Error') {
					errMsg = '后端接口连接异常'
				} else if (errMsg.includes('timeout')) {
					errMsg = '系统接口请求超时'
				} else if (errMsg.includes('Request failed with status code')) {
					errMsg = '系统接口' + errMsg.substr(errMsg.length - 3) + '异常'
				}
				toast(errMsg)
				reject(error)
			}
		})
	})
}

export default upload