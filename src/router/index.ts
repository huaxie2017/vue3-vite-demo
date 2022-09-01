import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import componentList from "@/views";
// 静态路由 没权限控制
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
];

componentList.forEach((item) => {
  if (item.children) {
    constantRoutes.push({
      path: item.path,
      redirect: item.children[0].path,
      component: item.sfc,
      children: item.children,
    });
  } else {
    constantRoutes.push({ path: item.path, component: item.sfc });
  }
});
// 异步路由根据权限加载
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/skeleton",
    component: () => import("../views/skeleton.vue"),
  },
  {
    path: "/detail",
    component: () => import("../views/detail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({
    top: 0,
  }),
  routes: constantRoutes,
});

// 路由拦截
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem("userInfo")) {
    next();
  } else if (to.path === "/login") {
    console.log("/login");
    next();
  } else {
    console.log("unauthed into login");
    next({
      path: "/login",
    });
  }
});

router.afterEach((to, from, next) => {
  console.log(to);
});

export default router;
