import { useProfileStore } from "@/stores/profile";
import { useAuthStore } from "@/stores/user";
// 校验字符串是否为链接
export const isUrl = url => {
  const regex =
    /^(https?:\/\/)?((localhost|\d{1,3}(\.\d{1,3}){3}|[\w-]+(\.[\w-]+)+))(:\d+)?(\/[^\s]*)?$/;
  return regex.test(url);
};
// 获取用户个人资料
export const getProfile = () => {
  const profileStore = useProfileStore();
  return profileStore.profile;
};
// 获取用户登录token
export const getUserToken = () => {
  const userStore = useAuthStore();
  return userStore.token;
};
