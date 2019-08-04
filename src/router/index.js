import Vue from 'vue'
import Router from 'vue-router'
import app from '@/App.vue'
import rankPage from '@/components/rankPage.vue'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // name: 'app',
      // component: app,
      children:[
        {
          path: 'rank',
          name: 'rank',
          component: rankPage,
        }
      ]
    },
   
  ]
})
