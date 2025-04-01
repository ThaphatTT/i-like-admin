import { createRouter, createWebHistory } from "vue-router";

import { auth } from "@/auth/auth";
import Login from "@/views/Auth/Login.vue";
import Register from "@/views/Auth/Register.vue";

import Dashboard from "@/views/Dashboard.vue";

import BlogDashboard from "@/views/Blogs/BlogDashboard.vue";

import PromotionsDashboard from "@/views/Promotions/PromotionsDashboard.vue";

import ProductsDashboard from "@/views/Products/ProductsDashboard.vue";

import OrderDashboard from "@/views/Orders/OrderDashboard.vue";

import PackageDashboard from "@/views/Packages/PackageDashboard.vue";

import TicketDashboard from "@/views/Tickets/TicketDashboard.vue";

import HistoryDashboard from "@/views/Histories/HistoryDashboard.vue";

import CouponDashboard from "@/views/Coupons/CouponDashboard.vue";

import EventDashboard from "@/views/Events/EventDashboard.vue";

import RewardDashboard from "@/views/Rewards/RewardDashboard.vue";

import TicketView from "@/components/Tickets/ticketView.vue";

import Farm from "@/views/Farm/farm.vue";

import Automate from "@/views/Automate/auto.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Dashboard,
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
    {
      path: "/coupons",
      name: "coupons",
      component: CouponDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/events",
      name: "events",
      component: EventDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/orders",
      name: "order-blog",
      component: OrderDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/packages",
      name: "package-dashboard",
      component: PackageDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/tickets",
      name: "ticket-dashboard",
      component: TicketDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/tickets/view/:id",
      name: "ticket-view",
      component: TicketView,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/rewards",
      name: "reward-dashboard",
      component: RewardDashboard,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/farm",
      name: "farm",
      component: Farm,
      meta: {
        middleware: auth,
      },
    },
    {
      path: "/automate",
      name: "automate",
      component: Automate,
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
