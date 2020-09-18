module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production' ? '/apps/auditoria-aeropuerto/dashboard_aeropuerto/' : '/',
	pwa: {
		workboxOptions: {
			skipWaiting: true
		}
	},
	devServer: {

		host: 'localhost'
	}
	
	
}