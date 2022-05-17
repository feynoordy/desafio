import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/alunos',
    name: 'Students',
    component: () => import('../views/Students.vue')
  },
  {
    path: '/alunos/cadastrar',
    name: 'RegisterStudents',
    component: () => import('../views/RegisterStudents.vue')
  },
  {
    path: '/alunos/editar',
    name: 'EditStudents',
    component: () => import('../views/EditStudents.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
