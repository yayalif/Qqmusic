// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import store from './store'
import router from './router'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueResource)

Vue.use(VueLazyload, {
  error: require('./assets/loading.svg'),
  loading: require('./assets/loading.svg'),
  attempt: 1
}
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
