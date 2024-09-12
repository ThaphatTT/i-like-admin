import { createRouter, createWebHistory } from "vue-router";

import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import BlogDashboard from "@/views/BlogDashboard.vue";
import PromotionsDashboard from "@/views/PromotionsDashboard.vue";
import ProductsDashboard from "@/views/ProductsDashboard.vue";
import { auth } from "@/auth/auth";

import PromotionsEdit from "@/views/PromotionsEdit.vue";
import PromotionsCreate from "@/views/PromotionsCreate.vue";
import ProductsCreate from "@/views/components/ProductsCreate.vue";
import ProductsEdit from "@/views/components/ProductsEdit.vue";

import PromotionsView from "@/views/PromotionsView.vue";
import ProductsView from "@/views/ProductsView.vue";
import OrderDashboard from "@/views/OrderDashboard.vue";
import OrderCreate from "@/views/OrderCreate.vue";
import OrderEdit from "@/views/OrderEdit.vue";
import OrderView from "@/views/OrderView.vue";

import Dashboard from "@/views/Dashboard.vue";

import PackageDashboard from "@/views/PackageDashboard.vue";

import BlogView from "@/views/BlogView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard-home",
      component: BlogDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/signin",
      name: "sign-in",
      component: Login,
    },
    {
      path: "/signup",
      name: "sign-up",
      component: Register,
    },
    {
      path: "/Blog-Dashboard",
      name: "dashboard-blog",
      component: BlogDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Promotions-Dashboard",
      name: "dashboard-Promotion",
      component: PromotionsDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Products-Dashboard",
      name: "dashboard-products",
      component: ProductsDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Promotions-Dashboard/edit/:id",
      name: "promotion-edit",
      component: PromotionsEdit,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Promotions-Dashboard/create",
      name: "promotion-create",
      component: PromotionsCreate,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Products-Dashboard/edit/:id",
      name: "product-edit",
      component: ProductsEdit,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Products-Dashboard/create",
      name: "product-create",
      component: ProductsCreate,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Promotions-Dashboard/view/:id",
      name: "promotions-view",
      component: PromotionsView,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Products-Dashboard/view/:id",
      name: "product-view",
      component: ProductsView,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Orders-Dashboard",
      name: "order-blog",
      component: OrderDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Orders-Dashboard/edit/:id",
      name: "order-edit",
      component: OrderEdit,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Orders-Dashboard/create",
      name: "order-create",
      component: OrderCreate,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Orders-Dashboard/view/:id",
      name: "order-view",
      component: OrderView,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Dashboard",
      name: "main-dashboard",
      component: Dashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Packages-Dashboard",
      name: "package-dashboard",
      component: PackageDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/Blog-Dashboard/view/:id",
      name: "blog-view",
      component: BlogView,
      meta: {
        middleware: auth,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    return to.meta.middleware({ next, router });
  }

  return next();
});

export default router;
