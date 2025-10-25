import { defineStore } from 'pinia';

export const useLoading = defineStore('loading', {
	state: () => {
		return {
			loading: false,
		}
	},
	
	actions:{
		showLoading(){
			this.loading = true
		},
		closeLoading(){
			this.loading = false
		}
	}
})