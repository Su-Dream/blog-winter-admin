// 导入 jwt-decode 库
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/stores/user";

/**
 * 获取解码的token
 * @returns {Object} 解码后的token内容
 */
function decodeToken() {
  const userStore = useAuthStore();
  const token = userStore.token;
  if (token) {
    try {
      // 解码 token
      const decoded = jwtDecode(token);
      // 打印解码后的数据
      console.log(decoded);
      return decoded;
    } catch (error) {
      console.error("Token 解码失败", error);
      return;
    }
  }
}
export { decodeToken };
