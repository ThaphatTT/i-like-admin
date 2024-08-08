import { createRouter, createWebHistory } from "vue-router";

import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import BlogDashboard from '@/views/BlogDashboard.vue'
import PromotionsDashboard from '@/views/PromotionsDashboard.vue'
import ProductsDashboard from '@/views/ProductsDashboard.vue'

const router = createRouter({
  history : createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path: '/',
      name: 'dashboard-home',
      component: BlogDashboard
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: Login
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: Register
    },
    {
      path: '/Blog-Dashboard',
      name: 'dashboard-blog',
      component: BlogDashboard
    },
    {
      path: '/Promotions-Dashboard',
      name: 'dashboard-Promotion',
      component: PromotionsDashboard
    },
    {
      path: '/Products-Dashboard',
      name: 'dashboard-products',
      component: ProductsDashboard
    },
  ]
})

export default router;