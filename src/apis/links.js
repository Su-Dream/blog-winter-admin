import apiCilent from "./index";

/**
 * - 查询全部友链
 * @returns 查询结果
 */
const getLinks = () => {
  return apiCilent.get("/link");
};

/**
 * - 新增友链
 * @param {String} data - 友链对象
 * @param {String} data.username - 友链名
 * @param {String} data.url - 友链地址
 * @param {String} data.description - 友链描述
 * @param {Boolean} data.isDisabled - 是否启用
 * @returns 添加结果
 */
const addlink = data => {
  return apiCilent.post("/link/add", data);
};

/**
 * - 删除友链
 * @param {String} id - 友链id
 * @returns 删除结果
 */
const delLink = id => {
  console.log("id", id);
  return apiCilent.delete("/link/del", { data: { id } });
};

/**
 * - 修改友链
 * @param {String} data - 友链对象
 * @param {String} data.id - 友链id
 * @param {String} data.username - 友链名
 * @param {String} data.url - 友链地址
 * @param {String} data.description - 友链描述
 * @param {Boolean} data.isDisabled - 是否启用
 * @returns 修改结果
 */
const updateLink = data => {
  return apiCilent.put("/link/update", data);
};

export default {
  getLinks,
  addlink,
  delLink,
  updateLink,
};
