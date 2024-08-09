import { createRouter, createWebHistory } from "vue-router";

import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import BlogDashboard from '@/views/BlogDashboard.vue'
import PromotionsDashboard from '@/views/PromotionsDashboard.vue'
import ProductsDashboard from '@/views/ProductsDashboard.vue'
import auth from '@/auth/auth'

import EditBlog from "@/views/BlogEdit.vue";
import CreateBlog from "@/views/BlogCreate.vue";
import PromotionsEdit from "@/views/PromotionsEdit.vue";
import PromotionsCreate from "@/views/PromotionsCreate.vue";
import ProductsCreate from "@/views/ProductsCreate.vue";
import ProductsEdit from "@/views/ProductsEdit.vue";

const router = createRouter({
  history : createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path: '/',
      name: 'dashboard-home',
      component: BlogDashboard,
      meta:{
        middleware: auth
      }
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
      component: BlogDashboard,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Promotions-Dashboard',
      name: 'dashboard-Promotion',
      component: PromotionsDashboard,
      meta:{
        middleware:auth
      }
    },
    {
      path: '/Products-Dashboard',
      name: 'dashboard-products',
      component: ProductsDashboard,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Blog-Dashboard/edit/:id',
      name: 'blog-edit',
      component: EditBlog,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Blog-Dashboard/create',
      name: 'blog-create',
      component: CreateBlog,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Promotions-Dashboard/edit/:id',
      name: 'promotion-edit',
      component: PromotionsEdit,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Promotions-Dashboard/create',
      name: 'promotion-create',
      component: PromotionsCreate,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Products-Dashboard/edit/:id',
      name: 'product-edit',
      component: ProductsEdit,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Products-Dashboard/create',
      name: 'product-create',
      component: ProductsCreate,
      meta:{
        middleware: auth
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    return to.meta.middleware({ next, router });
  }

  return next();
});

export default router;