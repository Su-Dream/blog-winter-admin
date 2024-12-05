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
 * - 修改分类名
 * @param {String} id - 分类id
 * @param {String} name - 分类名
 * @returns 修改结果
 */
const updateType = (id, data) => {
  return apiCilent.put("/category/update", { id, data });
};

export default {
  getTypes,
  addType,
  delType,
  updateType,
};
