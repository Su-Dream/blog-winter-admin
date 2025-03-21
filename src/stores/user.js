// src/stores/auth.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref("");
    const setToken = newToken => {
      token.value = newToken;
    };
    const clearToken = () => {
      token.value = "";
    };
    return { token, setToken, clearToken };
  },
  {
    persist: true,
  }
);
