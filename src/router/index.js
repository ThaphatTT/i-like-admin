import {createRouter, createWebHistory} from 'vue-router'

import Signin from '@/views/Signin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path: '/',
      name: 'sign-in',
      component:Signin
    },
]
})
export default router