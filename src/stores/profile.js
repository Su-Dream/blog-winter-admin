import { defineStore } from "pinia";
import { ref } from "vue";
export const useProfileStore = defineStore(
  "profile",
  () => {
    const profile = ref({});
    const setProfile = newProfile => {
      console.log("newProfile", newProfile);
      profile.value = newProfile;
    };
    const clearProfile = () => {
      profile.value = {};
    };

    return { profile, setProfile, clearProfile };
  },
  {
    persist: true,
  }
);
