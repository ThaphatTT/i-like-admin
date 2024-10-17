import { createRouter, createWebHistory } from "vue-router";

import { auth } from "@/auth/auth";
import Login from "@/views/Auth/Login.vue";
import Register from "@/views/Auth/Register.vue";

// import Dashboard from "@/views/Dashboard.vue";

import BlogDashboard from "@/views/Blogs/BlogDashboard.vue";
// import BlogView from "@/views/components/Blogs/BlogView.vue";

import PromotionsDashboard from "@/views/Promotions/PromotionsDashboard.vue";
// import PromotionsView from "@/views/Promotions/PromotionsView.vue";
// import PromotionsCreate from "@/views/Promotions/PromotionsCreate.vue";
// import PromotionsEdit from "@/views/Promotions/PromotionsEdit.vue";

import ProductsDashboard from "@/views/Products/ProductsDashboard.vue";
// import ProductsCreate from "@/views/components/Products/ProductsCreate.vue";
// import ProductsEdit from "@/views/components/Products/ProductsEdit.vue";
// import ProductsView from "@/views/Products/ProductsView.vue";

import OrderDashboard from "@/views/Orders/OrderDashboard.vue";
// import OrderCreate from "@/views/Orders/OrderCreate.vue";
// import OrderEdit from "@/views/Orders/OrderEdit.vue";
// import OrderView from "@/views/Orders/OrderView.vue";

import PackageDashboard from "@/views/Packages/PackageDashboard.vue";

import TicketDashboard from "@/views/Tickets/TicketDashboard.vue";
// import ticketView from "@/views/components/Tickets/ticketView.vue";

import HistoryDashboard from "@/views/Histories/HistoryDashboard.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: OrderDashboard,
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
      path: "/blogs",
      name: "dashboard-blog",
      component: BlogDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/promotions",
      name: "dashboard-Promotion",
      component: PromotionsDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/products",
      name: "dashboard-products",
      component: ProductsDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/histories",
      name: "history",
      component: HistoryDashboard,
      meta: {
        middleware: auth,
      },
    },
    // {
    //   path: "/Promotions-Dashboard/edit/:id",
    //   name: "promotion-edit",
    //   component: PromotionsEdit,
    //   meta: {
    //     middleware: auth,
    //   },
    // },
    // {
    //   path: "/Promotions-Dashboard/create",
    //   name: "promotion-create",
    //   component: PromotionsCreate,
    //   meta: {
    //     middleware: auth,
    //   },
    // },
    // {
    //   path: "/Products-Dashboard/edit/:id",
    //   name: "product-edit",
    //   component: ProductsEdit,
    //   meta: {
    //     middleware: auth,
    //   },
    // },
    // {
    //   path: "/Products-Dashboard/create",
    //   name: "product-create",
    //   component: ProductsCreate,
    //   meta: {
    //     middleware: auth,
    //   },
    // },
    // {
    //   path: "/Promotions-Dashboard/view/:id",
    //   name: "promotions-view",
    //   component: PromotionsView,
    //   meta: {
    //     middleware: auth,
    //   },
    // },
    // {
    //   path: "/Products-Dashboard/view/:id",
    //   name: "product-view",
    //   component: ProductsView,
    //   meta: {
    //     middleware: auth,
    //   },
    // },
    {
      path: "/orders",
      name: "order-blog",
      component: OrderDashboard,
      meta: {
        middleware: auth,
      },
    },
    // {
    //   path: "/Orders-Dashboard/edit/:id",
    //   name: "order-edit",
    //   component: OrderEdit,
    //   meta: {
    //     middleware: auth,
    //   },
    // },
    // {
    //   path: "/Orders-Dashboard/create",
    //   name: "order-create",
    //   component: OrderCreate,
    //   meta: {
    //     middleware: auth,
    //   },
    // },
    // {
    //   path: "/Orders-Dashboard/view/:id",
    //   name: "order-view",
    //   component: OrderView,
    //   meta: {
    //     middleware: auth,
    //   },
    // },
    // {
    //   path: "/Dashboard",
    //   name: "main-dashboard",
    //   component: Dashboard,
    //   meta: {
    //     middleware: auth,
    //   },
    // },
    {
      path: "/packages",
      name: "package-dashboard",
      component: PackageDashboard,
      meta: {
        middleware: auth,
      },
    },
    // {
    //   path: "/Blog-Dashboard/view/:id",
    //   name: "blog-view",
    //   component: BlogView,
    //   meta: {
    //     middleware: auth,
    //   },
    // },
    {
      path: "/tickets",
      name: "ticket-dashboard",
      component: TicketDashboard,
      meta: {
        middleware: auth,
      },
    },
    // {
    //   path: "/Ticket-Dashboard/view/:id",
    //   name: "ticket-view",
    //   component: ticketView,
    //   meta: {
    //     middleware: auth,
    //   },
    // },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    return to.meta.middleware({ next, router });
  }

  return next();
});

export default router;
