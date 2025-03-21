// src/stores/profile.js
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: {},
  }),
  actions: {
    setProfile(newProfile) {
      this.profile = newProfile;
      localStorage.setItem("profile", JSON.stringify(newProfile)); // 更新 localStorage 中的 token
    },
    removeProfile() {
      this.profile = {};
      localStorage.removeItem("profile"); // 移除 localStorage 中的 token
    },
  },
});
