import {
  createMemoryHistory,
  createWebHistory,
  createRouter,
} from "vue-router";
import BlogLogin from "@/views/login/blog-Login.vue";
import BlogHome from "@/views/Home/blog-Home.vue";
import accUser from "@/views/account/account_user.vue";
import accAdmin from "@/views/account/account_admin.vue";

import { useUserStore } from "../stores/user";
const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/login",
    component: BlogLogin,
    meta: { title: "登录", requiresAuth: false },
  },
  {
    path: "/home",
    component: BlogHome,
    meta: { title: "首页", requiresAuth: false },
  },
  {
    path: "/account",
    component: accUser,
    meta: { title: "账号管理", requiresAuth: true, role: ["user", "admin"] },

    children: [
      {
        path: "user",
        component: accUser,
        meta: { title: "用户", requiresAuth: true, role: ["user", "admin"] },
      },
      {
        path: "admin",
        component: accAdmin,
        meta: { title: "管理员", requiresAuth: true, role: ["admin"] },
      },
    ],
  },
];

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

// // 添加全局前置守卫，检查用户是否已登录
// router.beforeEach((to, from, next) => {
//   console.log(`前置守卫`, to);
//   const userStore = useUserStore();
//   const isLoggedIn = userStore.role === "admin"; // 检查用户角色
//   // 如果用户未登录并试图访问非登录页面，重定向到登录页面
//   if (!isLoggedIn && to.path !== "/login") {
//     next("/login");
//   } else if (isLoggedIn && to.path === "/login") {
//     // 如果用户已经登录，但试图访问登录页面，重定向到首页
//     next("/home");
//   } else {
//     next();
//   }
// });
// 全局解析守卫，监控用户登录态
router.beforeResolve(async to => {
  // console.log(to);
});

export default router;
