import apiCilent from "./index";

/**
 * - 查询全部分类
 * @returns 查询结果
 */
const getTypes = () => {
  return apiCilent.get("/category");
};

/**
 * - 新增分类名
 * @param {String} name - 分类名
 * @returns 添加结果
 */
const addType = name => {
  return apiCilent.post("/category/add", { name });
};

/**
 * - 删除分类名
 * @param {String} id - 分类id
 * @returns 删除结果
 */
const delType = id => {
  console.log("id", id);

  return apiCilent.delete("/category/del", { data: { id } });
};

/**
 * - 更新分类名
 * @param {Object} data - 更新的数据，包含name字段
 * @param {String} data.id - 分类id
 * @param {String} data.name - 分类名
 * @returns 更新结果
 */
const updateType = data => {
  return apiCilent.put("/category/update", data);
};

export default {
  getTypes,
  addType,
  delType,
  updateType,
};
