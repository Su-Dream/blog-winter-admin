import apiCilent from "../apiClient";

/**
 * - 注册接口
 * @param {Object} data - 传入对象{username,password,email,code}
 */
const register = data => {
  return apiCilent.post("/user/register", data);
};

/**
 * - 登录接口
 * @param {Object} data - 传入对象{username,password}
 */
const login = data => {
  return apiCilent.post("/user/login", data);
};

/**
 * - 获取邮箱验证码接口
 * @param {Object} email - 接收验证码的邮箱
 */
const getEmailCode = email => {
  return apiCilent.post("/user/sendCode", { email });
};

export default {
  register,
  login,
  getEmailCode,
};
