import { ElNotification } from "element-plus";

//? 二次封装消息提示方便复用
/**
 * @param {string} title -消息提示的标题
 * @param {string} message -消息提示内容
 * @param {string}type -消息提示内容success|warning|info|error,默认为success
 */
const blogNotification = (title, message, type = "success") => {
  ElNotification({
    title,
    message,
    type,
  });
};
