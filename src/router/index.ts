import Vue from 'vue'
import VueRouter from 'vue-router'
import Repository from '../views/Repository/index.vue'
import NotFound from '../views/NotFound/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Repository },
  { path: '*', component: NotFound },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
