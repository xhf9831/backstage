import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import api from './http/api'
import dayjs from 'dayjs'
import 'element-ui/lib/theme-chalk/index.css';
import i18n from './i18n/i18n'
import './bus'
import VCharts from 'v-charts'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(VCharts)
Vue.use(ElementUI)
Vue.prototype.$api = api
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')