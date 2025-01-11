import apiCilent from "./index";

/**
 * - 获取博客配置
 * @returns 获取结果
 */
const getBlogConfig = () => {
  return apiCilent.get("/setting");
};
/**
 * - 更新博客配置
 * @returns 更新结果
 */
const updateBlogConfig = data => {
  return apiCilent.put("/setting", data);
};

export default {
  getBlogConfig,
  updateBlogConfig,
};
