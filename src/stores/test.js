import { defineStore } from "pinia";
export const useProfileStore = defineStore("profile", () => {
  const profile = ref({});
  const setProfile = newProfile => {
    profile.value = newProfile;
  };
  const clearProfile = () => {
    profile.value = {};
  };

  return { profile, setProfile, clearProfile };
});
