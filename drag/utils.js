/**
 *@模块名称：utils
 *
 *@创建人：ligaoming
 *
 *@作用：工具函数
 *
 *@date 2020/4/28
 *
 *@版权所有：长杨科技
 */

export const DragUtils = (function () {
  return {
    /**
     * 是否是字符串
     * @param val
     * @returns {boolean}
     */
    isString(val) {
      return typeof val === 'string';
    },
    /**
     * 是否是函数
     * @param val
     * @returns {boolean}
     */
    isFunction (val) {
      return typeof document !== 'undefined' &&
      typeof document.getElementsByTagName('body') === 'function'
        ? !!val && toString.call(val) === '[object Function]'
        : !!val && typeof val === 'function';
    }
  }
})();
