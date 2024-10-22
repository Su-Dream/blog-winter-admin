import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

// 盐
const secretKey = "U2FsdGVkX1+QNr8owmsDBCzoq/B39wqUBm9AdOLbRoM="; // 替换为你的密钥

/**
 * AES 加密
 * @param {string} text
 * @returns {string}
 */
function encrypt(text) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

/**
 * AES 解密
 * @param {string} cipherText
 * @returns {string}
 */
function decrypt(cipherText) {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

/**
 * 设置 Cookie
 * @param {string} username -用户名
 * @param {string} password -密码
 * @param {number} expiresDays -过期时间
 */
export function setUserCookie(username, password, expiresDays = 7) {
  const encryptedPassword = encrypt(password);
  Cookies.set("username", username, { expires: expiresDays });
  Cookies.set("password", encryptedPassword, { expires: expiresDays });
}

/**
 * 获取 Cookie
 * @returns {Object} 包含 username 和解密后的 password 的对象
 */
export function getUserCookie() {
  const username = Cookies.get("username");
  const encryptedPassword = Cookies.get("password");
  const password = decrypt(encryptedPassword);
  return { username, password };
}

// 清除 Cookie
export function clearUserCookie() {
  Cookies.remove("username");
  Cookies.remove("password");
}
