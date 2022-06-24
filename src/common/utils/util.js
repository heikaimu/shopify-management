/*
 * @Date: 2022-06-24 10:41:28
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-06-24 13:51:50
 * @FilePath: /shopify-management/src/common/utils/util.js
 */
export function getRandomID (length = 8) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
