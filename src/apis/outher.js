import apiClient from "./index";

/**
 * - 获取博客配置
 * @returns {Promise}  获取结果
 */
const getBlogConfig = () => {
  return apiClient.get("/setting");
};
/**
 * - 更新博客配置
 * @param {Object} data - 更新参数
 * @param {number} data.announcement - 公告信息
 * @param {number} data.logo_text - logo信息
 * @param {number} data.meta_description - meta信息
 * @param {number} data.footer_info - 备案信息
 * @returns {Promise}  更新结果
 */
const updateBlogConfig = data => {
  return apiClient.put("/setting", data);
};
/**
 * 获取图片列表
 * @param {Object} data - 查询参数
 * @param {number} data.page - 页码
 * @param {number} data.limit - 每页数量
 * @returns {Promise} 请求结果
 */
const getImages = data => {
  return apiClient.get("/images", { params: data });
};

/**
 * - 删除指定图片
 * @param {string} id - 删除图片的id
 * @returns {Promise}  更新结果
 */
const deleteImage = id => {
  return apiClient.delete(`/images/${id}`);
};

export default {
  getBlogConfig,
  updateBlogConfig,
  getImages,
  deleteImage,
};
