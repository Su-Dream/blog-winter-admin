import apiCilent from "./index";

/**
 * - 查询全部标签
 * @param {Number} page - 当前页
 * @param {Number} pageSize - 每页条数
 * @returns 查询结果
 */
const getTags = (page, pageSize) => {
  return apiCilent.get("/tag", { params: { page, pageSize } });
};

/**
 * - 新增标签名
 * @param {String} name - 标签名
 * @returns 添加结果
 */
const addTag = name => {
  return apiCilent.post("/tag/add", { name });
};

/**
 * - 删除标签名
 * @param {String} id - 标签id
 * @returns 删除结果
 */
const delTag = id => {
  console.log("id", id);

  return apiCilent.delete("/tag/del", { data: { id } });
};

/**
 * - 修改标签名
 * @param {String} id - 标签id
 * @param {String} name - 标签名
 * @returns 修改结果
 */
const updateTag = (id, data) => {
  return apiCilent.put("/tag/update", { id, data });
};

export default {
  getTags,
  addTag,
  delTag,
  updateTag,
};
