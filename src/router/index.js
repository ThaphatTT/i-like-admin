import {createRouter, createWebHistory} from 'vue-router'

import Signin from '@/views/Signin.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path: '/signup',
      name: 'sign-in',
      component:Signin
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component:NotFoundView
    },
]
})
export default router