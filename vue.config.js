module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/apps/auditoria-buses/dashboard_auditoria/' : '/',
	pwa: {
		workboxOptions: {
			skipWaiting: true
		}
	},
	devServer: {

		host: 'localhost'
	}
	
	
}