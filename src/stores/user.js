// src/stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "", // 默认从 localStorage 获取 token
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken;
      localStorage.setItem("token", newToken); // 更新 localStorage 中的 token
    },
    removeToken() {
      this.token = "";
      localStorage.removeItem("token"); // 移除 localStorage 中的 token
    },
  },
});
