import Vue from 'vue'
import App from './App'
import router from './router'
import {
  store
} from './store/index'
import axios from '@/components/tooltip/Http.js'
import ElementUI from 'element-ui'
import './assets/less/reset.less'
import './assets/less/global.less'
import './assets/less/lib/index.less'
import filters from './components/util/filters'
// 语言设置
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}
const i18n = new VueI18n({
  locale: localStorage.getItem('language') || 'zh',
  messages
})

ElementLocale.i18n((key, value) => i18n.t(key, value))

Object.keys(filters).forEach(key => {
  console.log(filters, key, filters[key], '/././.....')
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.use(ElementUI)
axios.defaults.timeout = 100000
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
