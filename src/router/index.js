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

import BlogList from "@/views/BlogList.vue";
import BlogView from "@/views/BlogView.vue";
import PromotionsList from "@/views/PromotionsList.vue";
import PromotionsView from "@/views/PromotionsView.vue";
import ProductsList from "@/views/ProductsList.vue";
import ProductsView from "@/views/ProductsView.vue";
import OrderDashboard from "@/views/OrderDashboard.vue";
import OrderCreate from "@/views/OrderCreate.vue";
import OrderEdit from "@/views/OrderEdit.vue";
import OrderList from "@/views/OrderList.vue";
import OrderView from "@/views/OrderView.vue";

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
    {
      path: '/Blog-Dashboard/list',
      name: 'blog-list',
      component: BlogList,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Blog-Dashboard/view/:id',
      name: 'blog-view',
      component: BlogView,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Promotions-Dashboard/list',
      name: 'promotions-list',
      component: PromotionsList,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Promotions-Dashboard/view/:id',
      name: 'promotions-view',
      component: PromotionsView,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Product-Dashboard/list',
      name: 'product-list',
      component: ProductsList,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Products-Dashboard/view/:id',
      name: 'product-view',
      component: ProductsView,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Orders-Dashboard',
      name: 'order-blog',
      component: OrderDashboard,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Orders-Dashboard/edit/:id',
      name: 'order-edit',
      component: OrderEdit,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Orders-Dashboard/create',
      name: 'order-create',
      component: OrderCreate,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Orders-Dashboard/list',
      name: 'order-list',
      component: OrderList,
      meta:{
        middleware: auth
      }
    },
    {
      path: '/Orders-Dashboard/view/:id',
      name: 'order-view',
      component: OrderView,
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