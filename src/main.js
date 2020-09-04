import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// Highcharts
import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue)


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
