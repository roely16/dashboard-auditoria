import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Dashboard_Categorias from '../views/Dashboard_Categorias.vue'
import Graficas from '../views/Graficas.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: Dashboard_Categorias
  },
  {
    path: '/graficas',
    name: 'graficas',
    component: Graficas
  },
]

const router = new VueRouter({
  routes
})

export default router
