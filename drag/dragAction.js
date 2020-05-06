/**
 *@模块名称：DRAG
 *
 *@创建人：ligaoming
 *
 *@作用：拖拽插件过程中的逻辑计算操作
 *
 *@date 2020/4/28
 *
 *@版权所有：长杨科技
 */

import {DragEvent} from './event.js'
export const DragAction = function (config) {
  const _config = Object.assign({
    itemPortal: ''
  }, config);
  const itemPortal = _config.itemPortal;
  return {
    /**
     * 拖拽开始 用户开始拖动元素时触发
     * @param e
     * @param v
     */
    ondragstart(fn = null) {
      DragEvent.addEventListener(itemPortal, 'dragstart', (e)=> {
        // 自己的逻辑处理
        fn ? fn(e) : '';
      });
      return this;
    },
    /**
     * 元素正在拖动时触发
     * @param fn
     * @returns {DragAction}
     */
    ondrag(fn = null) {
      DragEvent.addEventListener(itemPortal, 'drag', (e)=> {
        // 自己的逻辑处理
        fn ? fn(e) : '';
      });
      return this;
    },
    /**
     * 用户完成元素拖动后触发
     */
    ondragend(fn = null) {
      DragEvent.addEventListener(itemPortal, 'dragend', (e)=> {
        // 自己的逻辑处理
        fn ? fn(e) : '';
      });
      return this;
    },
    /**
     * 当被鼠标拖动的对象进入其容器范围内时触发此事件
     * @param fn
     */
    ondragenter(fn = null) {
      DragEvent.addEventListener(itemPortal, 'dragenter', (e)=> {
        // 自己的逻辑处理
        fn ? fn(e) : '';
      });
      return this;
    },
    /**
     * 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
     * @param fn
     */
    ondragover(fn = null) {
      DragEvent.addEventListener(itemPortal, 'dragover', (e)=> {
        e.preventDefault();
        // 自己的逻辑处理
        fn ? fn(e) : '';
      });
      return this;
    },
    /**
     * 当被鼠标拖动的对象离开其容器范围内时触发此事件
     * @param fn
     * @returns {DragAction}
     */
    ondragleave(fn = null) {
      DragEvent.addEventListener(itemPortal, 'dragleave', (e)=> {
        // 自己的逻辑处理
        fn ? fn(e) : '';
      });
      return this;
    },
    /**
     * 在一个拖动过程中，释放鼠标键时触发此事件
     * @param fn
     */
    ondrop(fn = null) {
      itemPortal.addEventListener('drop', (event)=> {
        // 自己的逻辑处理
        fn ? fn(event) : '';
      });
    }
  }
};
