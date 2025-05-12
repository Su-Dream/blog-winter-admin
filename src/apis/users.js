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
 * - 获取用户信息
 * @returns - 用户信息
 */
const getUserInfo = () => {
  return apiCilent.post("/user/profile");
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
 * - 获取全部用户
 *@returns - 所有用户信息
 */
const getAllUser = () => {
  return apiCilent.post("/user/all");
};
/**
 * - 重置密码接口
 * @param {Object} data - 传入对象
 * @param {String} data.username - 用户名
 * @param {String} data.email - 邮箱
 * @returns - 重置密码结果
 */
const resetPassword = data => {
  return apiCilent.post("/user/forget", data);
};

/**
 * - 获取邮箱验证码接口
 * @param {Object} email - 接收验证码的邮箱
 */
const getEmailCode = email => {
  return apiCilent.post("/user/sendCode", { email });
};

/**
 * - 更新用户信息接口
 * @param {Object} data - 传入对象
 * @param {String} data.avatar - 头像
 * @param {String} data.gender - 性别
 * @param {String} data.phone - 手机号
 * @param {String} data.bio - 个性签名
 */
const updateUser = data => {
  return apiCilent.patch("/profiles/updateProfile", data);
};
/**
 * - 封禁用户
 * @param {Object} data - 传入对象
 * @param {String} data.id - 用户id
 * @param {String} data.isFlag - 封禁状态
 */
const banUser = data => {
  return apiCilent.post("/user/ban", data);
};
/**
 * - 设置用户权限
 * @param {Object} data - 传入对象
 * @param {String} data.id - 用户id
 * @param {String} data.role - 用户权限
 */
const setUserRole = data => {
  return apiCilent.post("/user/setRole", data);
};

export default {
  getAllUser,
  register,
  login,
  getEmailCode,
  updateUser,
  getUserInfo,
  banUser,
  setUserRole,
  resetPassword,
};
