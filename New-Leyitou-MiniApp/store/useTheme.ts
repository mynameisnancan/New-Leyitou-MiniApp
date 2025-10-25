import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
	state: () => {
		return {
		  theme:'light',
		  themeVars:{
			 colorTheme: '#4d80f0',
			 darkThemeColor:'#fff'
		  },
		  // 可设置的主题色
		  themeSetting:[
			  '#4d80f0',
			  '#34d19d',
			  '#f0883a',
			  '#fa4350',
			  '#00ced1',
			  '#c71585'
		  ]
		}
	},
    actions: {
		updateTheme(str:string) {
			if(str){
				this.theme= str 
			}else{
				this.theme=  this.theme == 'light' ? 'dark' : 'light'
			}
		},
		updateThemeVars(obj:any) {
			this.themeVars = obj
		},
		updateColorTheme(color:string) {
			this.themeVars.colorTheme = color
		},
    },
	getters:{
		getTheme(state){
			return {
				theme:state.theme,
				themeVars:state.themeVars
			}
		}
	}
})