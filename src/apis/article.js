import apiCilent from "./index";

/**
 * - 查询当前登录用户的文章列表
 * @returns 查询结果
 */
const getUserArtList = () => {
  return apiCilent.get("/");
};
/**
 * - 查询指定文章详情
 * @param {String} id - 文章id
 * @returns - 查询结果
 */
const getTargetArt = id => {
  return apiCilent.get(`/${id}`);
};
/**
 * 新增文章
 *
 * @param {Object} data - 包含文章信息的对象
 * @param {string} data.title - 文章标题
 * @param {string} data.content - 文章内容
 * @param {Array<string>} data.types - 文章类别
 * @param {Array<string>} data.tags - 文章标签数组
 * @returns {Promise<Object>} 返回包含查询结果的Promise对象
 */
const addArt = data => {
  return apiClient.post("/", data);
};

/**
 * - 修改文章
 * @param {Object} data - 包含文章信息的对象
 * @param {String} data.postID - 文章id
 * @param {string} data.title - 文章标题
 * @param {string} data.content - 文章内容
 */
const updateArt = data => {
  return apiClient.put(`/update`, data);
};

/**
 * - 删除文章
 * @param {String} id - 文章id
 * @returns - 查询结果
 */
const deleteArt = id => {
  return apiCilent.delete(`/${id}`);
};

export default {
  getUserArtList,
  getTargetArt,
  addArt,
  updateArt,
  deleteArt,
};
