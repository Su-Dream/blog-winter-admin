import apiCilent from "./index";

/**
 * - 注册接口
 * @param {Object} data - 传入对象
 * @param {String} data.username - 用户名
 * @param {String} data.password - 密码
 * @param {String} data.email - 邮箱
 * @param {String} data.code - 邮箱验证码
 *
 */
const register = data => {
  return apiCilent.post("/user/register", data);
};

/**
 * - 登录接口
 * @param {Object} data - 传入对象
 * @param {String} data.username - 用户名
 * @param {String} data.password - 密码
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
