// store/user.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    role: "", // 可以是 'admin' 或 'user'
  }),
  // 持久化管理
  persist: true,
  actions: {
    setRole(newRole) {
      this.role = newRole;
    },
  },
});
