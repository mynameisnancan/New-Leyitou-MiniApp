<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')


			let updateManager = uni.getUpdateManager();
			console.log(updateManager)
			//新版本更新
			if (!updateManager) {
				return
			} else {

				if (uni.canIUse('getUpdateManager')) {
					updateManager.onCheckForUpdate(function(res) {
						if (res.hasUpdate) {
							updateManager.onUpdateReady(function() {
								uni.showModal({
									title: "更新提示",
									content: "新版本已经准备好，是否重启应用？",
									success: function(res) {
										if (res.confirm) {
											updateManager.applyUpdate()
										}
									}
								})
							});

							updateManager.onUpdateFailed(function() {
								uni.showModal({
									title: "更新提示",
									content: "新版本已上线，但更新异常，请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开！"
								});
							});
						}
					})
				} else {
					uni.showModal({
						title: "更新提示",
						content: "当前微信版本过低，部分功能无法使用，请升级到最新微信版本后重试。"
					})
				}
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/index.scss';
	@import '@/static/iconfont/iconfont.css';

	button,
	cover-view,
	image,
	input,
	label,
	navigator,
	scroll-view,
	swiper,
	textarea,
	view {
		box-sizing: border-box;
	}
</style>