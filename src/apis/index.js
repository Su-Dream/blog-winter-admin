// src/apis/index.js
import axios from "axios";
import { useAuthStore } from "@/stores/user"; // 引入 Pinia 的 store
import { useProfileStore } from "@/stores/profile";
import router from "@/routes";

// 创建一个 axios 实例
const apiClient = axios.create({
  baseURL: "/api", // 你的 API 基础路径
  timeout: 10000, // 请求超时
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  config => {
    const authStore = useAuthStore(); // 获取 Pinia 中的 auth store
    const token = authStore.token; // 从 Pinia 中获取 token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // 在 headers 中添加 Authorization
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // 错误处理，例如 token 失效
    if (error.response && error.response.status === 401) {
      console.log("Token 无效或已过期");
      const authStore = useAuthStore(); // 获取 Pinia 中的 auth store
      authStore.clearToken(); // 清除 Pinia 中的 token
      const profileStore = useProfileStore(); // 获取 Pinia 中的 profile store
      profileStore.clearProfile(); // 清除 Pinia 中的 profile
      // 在这里跳转到登录页
      router.push("/login");
    }
    return Promise.reject(error.response.data);
  }
);

export default apiClient;
