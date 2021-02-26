import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'About',
    component: () => import(`@/views/DashboardView.vue`),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import(`@/components/DashViews/Dashboard.vue`)
      },
      {
        path: "/students",
        name: "Estudantes",
        component: () => import(`@/components/DashViews/Student.vue`)
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: "/control",
  routes
})

export default router
