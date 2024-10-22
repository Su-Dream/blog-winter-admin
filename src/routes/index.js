import {
  createMemoryHistory,
  createWebHistory,
  createRouter,
} from "vue-router";
import BlogLogin from "@/views/login/blog-Login.vue";
import BlogHome from "@/views/Home/blog-Home.vue";
import { useUserStore } from "../stores/user";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/login", component: BlogLogin },
  { path: "/home", component: BlogHome },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 添加全局前置守卫，检查用户是否已登录
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.role === "admin"; // 检查用户角色
  // 如果用户未登录并试图访问非登录页面，重定向到登录页面
  if (!isLoggedIn && to.path !== "/login") {
    return next("/login");
  } else if (isLoggedIn && to.path === "/login") {
    // 如果用户已经登录，但试图访问登录页面，重定向到首页
    return next("/home");
  } else {
    next();
  }
});

export default router;
