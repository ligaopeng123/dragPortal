/**
 *@模块名称：event.js
 *
 *@创建人：ligaoming
 *
 *@作用：dom相关操作
 *
 *@date 2020/4/28
 *
 *@版权所有：长杨科技
 */

export const elUtils = (function () {
  return {
    /**
     * id 获取dom元素
     * @param id
     * @returns {*|Element}
     */
    getElementById(id) {
      return document.getElementById(id);
    },
    /**
     * 创建dom
     * @param tag
     */
    createElement(tag) {
      return document.createElement(tag);
    },
    /**
     * 获取srcElement元素
     * @param event
     * @returns {Object|event.target|{get}|any}
     */
    getSrcElement(event) {
      return event.srcElement || event.target;
    }
  };
})();
