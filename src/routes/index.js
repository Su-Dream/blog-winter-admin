import { createWebHistory, createRouter } from "vue-router";
import { routes } from "./routes";
import { decodeToken, validataToken } from "../utils/jwt";
import { useAuthStore } from "@/stores/user";
import { useProfileStore } from "@/stores/profile";
import { ElMessage } from "element-plus";

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// 添加全局前置守卫，检查用户是否已登录
router.beforeEach((to, from, next) => {
  const userStore = useAuthStore();
  const profileStore = useProfileStore();
  const isToken = validataToken();
  console.log("isToken", isToken);
  if (!isToken && to.path !== "/login") {
    ElMessage.error("Token已过期，请重新登录");
    userStore.clearToken();
    profileStore.clearProfile();
    return next("/login"); // 重定向到登录页
  }
  const result = decodeToken();
  let ROLE;
  if (result && result.role == 1) {
    ROLE = "admin";
  }
  if (result && result.role == 0) {
    ROLE = "user";
  }
  const AuthList = ["user", "admin"];

  const isLoggedIn = AuthList.indexOf(ROLE) !== -1;
  console.log(ROLE);

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
    return next("/login"); // 如果用户权限不足，重定向到401
  }

  next();
});

export default router;
