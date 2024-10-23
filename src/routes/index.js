import {
  createMemoryHistory,
  createWebHistory,
  createRouter,
} from "vue-router";
import { routes } from "./routes";

import { useUserStore } from "../stores/user";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// 添加全局前置守卫，检查用户是否已登录
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const AuthList = ["user", "admin"];
  const ROLE = userStore.role;
  const isLoggedIn = AuthList.indexOf(ROLE) !== -1;

  // 如果用户未登录且尝试访问需要授权的页面，重定向到登录页面
  if (!isLoggedIn && to.meta.requiresAuth) {
    return next("/login");
  }

  // 如果用户已登录且尝试访问登录页面，重定向到首页
  if (isLoggedIn && to.path === "/login") {
    return next("/home");
  }
  // 检查用户是否有访问该页面的权限
  if (to.meta.role && !to.meta.role.includes(ROLE)) {
    return next("/401"); // 如果用户权限不足，重定向到401
  }

  next();
});

// 全局解析守卫，监控用户登录态
router.beforeResolve(async to => {
  // console.log(to);
});

export default router;
