import type {
	SysUserVo
}from '@/api/user/types'
import { defineStore } from 'pinia';
import { setToken ,removeToken} from '@/utils/auth';
import {LoginData, LoginResult} from '@/api/types';
import {login as loginApi,getInfo as getUserInfo,logout as logoutApi , wxLogin} from '@/api/login.ts'
import { useThemeStore } from './useTheme';

const themeStore = useThemeStore()
interface State {
	user:SysUserVo;
	roles:string[];
	permissions:string[];
	token:string;
	appKeys:string
}
export const useUserStore = defineStore('user', {
	state: ():State => {
		return {  
			user:{},
			roles: [],
			permissions:[],
			token: '',
			appKeys:''
		};
	},

	actions: {
		logOut(): Promise<ResultType<LoginResult>>{
			return new Promise((resolve) => {
				logoutApi().then(res => {
					this.user = {}
					this.roles = []
					this.permissions =[]
					this.token=''
					uni.removeStorageSync("userInfo")
					uni.removeStorageSync("permissions")
					removeToken()
					resolve(res)
				})
			})
		},
		async login(userInfo: LoginData): Promise<any> {
		    const res = await loginApi(userInfo);
		    if (res) {
		      const data = res.data;
		      setToken(data.access_token);
		      this.token = data.access_token;
		      return Promise.resolve(data);
		    }
		    return Promise.reject(false);
		},
		wxLogin(data:any){
			return new Promise((resolve) => {
				wxLogin(data).then(res => {
					if(res.data.token){
						this.token =  res.data.token;
						setToken(res.data.token)
					}
					resolve(res)
				})
			})
		},
		getInfo(){
			return new Promise((resolve) => {
				getUserInfo().then(res => {
					this.user = res.data.user || {}
					this.roles = res.data.roles || []
					this.permissions = res.data.permissions || []
					uni.setStorageSync('userInfo',res.data.user)
					uni.setStorageSync('permissions',res.data.permissions)
					const theme = uni.getStorageSync('theme')
					if(theme){
						themeStore.updateTheme(theme.theme)
						themeStore.updateColorTheme(theme.themeVars.colorTheme)
					}
					resolve(res)
				})
			})
		},
	},
});

