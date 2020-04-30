import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "login",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/dishManagement",
        meta: {
          title: "菜品管理"
        },
        component: () => import("@/views/dishManagement")
      },
      {
        path: "/ingredientsManagement",
        meta: {
          title: "食材管理"
        },
        component: () => import("@/views/ingredientsManagement")
      },
      {
        path: "/nutritionDemand",
        meta: {
          title: "营养需求表"
        },
        component: () => import("@/views/nutritionDemand")
      },
      {
        path: "/nutritionReference",
        meta: {
          title: "营养参考"
        },
        component: () => import("@/views/nutritionReference")
      },
      {
        path: "/nutritionKnowledge",
        meta: {
          title: "营养小知识"
        },
        component: () => import("@/views/nutritionKnowledge")
      },
      {
        path: "/foodConflict",
        meta: {
          title: "食物冲突"
        },
        component: () => import("@/views/foodConflict")
      }
    ]
  },
  {
    path: "/login",
    meta: {
      title: "登录"
    },
    component: () => import("@/views/login")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
