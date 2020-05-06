/**
 *@模块名称：Portal
 *
 *@创建人：ligaoming
 *
 *@作用：封装Portal组件 并对外暴露
 *
 *@date 2020/4/28
 *
 *@版权所有：长杨科技
 */

import {DragUtils} from './utils.js'
import {elUtils} from './elUtils.js'
import {DragEvent} from './event.js'
import {DragAction} from './dragAction.js'


export const Portal = (function (dom) {
  /**
   * id允许传入字符串 或者dom类型
   * 如果是dom类型 则直接使用
   * 如果是字符串类型 则去查询下是否有该节点 如果有则使用 没有则创建
   * @type {*|Element}
   * @private
   */
  const _portal = DragUtils.isString(dom) ? (elUtils.getElementById(dom) ? elUtils.getElementById(dom) : elUtils.createElement('div')) : dom;
  /**
   * 添加className
   * @type {string}
   */
  DragEvent.addClass(_portal, 'portal');
  /**
   * 拖拽过程中的样式
   * @type {string}
   */
  const selectClass = 'portal-item-dragSelectd';
  /**
   * 根拖拽元素样式
   * @type {string}
   */
  const itemClass = 'portal-item-size';
  const Portal = {
    /**
     * 保存portal对象 后期放一些属性 获取方便对外暴露一些函数
     */
    _portal: _portal,
    /**
     * 拖拽的具体位置 到了谁的位置
     */
    __nextPortal: null,
    /**
     * 初始化容器 根据数据拼接相对应的dom
     * @param data
     */
    /**
     * 初始拖拽元素
     */
    _startItem: null,
    init: function (data) {
      /**
       * 创建虚拟dom节点
       * @type {DocumentFragment}
       */
      const innerHTML = document.createDocumentFragment();
      data.forEach(item => {
        innerHTML.appendChild(this.createItem(item));
      });
      /**
       * 添加到文档中
       */
      this._portal.appendChild(innerHTML);
    },
    /**
     * 开始拖拽
     * @param e
     */
    ondragstart(e) {
      DragEvent.addClass(this.getSrcElement(e), selectClass);
    },
    /**
     * 执行item回调函数
     * @param item
     */
    executeItemFn(item, key) {
      DragUtils.isFunction(item[key]) ? item[key](e, item) : '';
    },
    /**
     * 创建每一个拖拽组件容器
     * @param item
     * @returns {string}
     */
    createItem(item) {
      const itemPortal = this.getItemPortal(item);
      itemPortal.innerHTML = `
        <div class="portal-item">
          <div class="portal-item-top"></div>
          <div class="portal-item-title">${item.title}</div>
          <div class="portal-item-content">${item.template}</div>
          <div class="portal-item-bottom"></div>
          <div class="portal-item-left"></div>
          <div class="portal-item-right"></div>
        </div>
      `;
      return itemPortal;
    },
    /**
     * 获取ItemPortal 容器
     * @returns {*}
     */
    getItemPortal(item) {
      // 创建一个拖拽容器
      const itemPortal = elUtils.createElement('div');
      /**
       * 给容器添加样式
       */
      DragEvent.addClass(itemPortal, itemClass);
      /**
       * 给容器设置属性draggable
       */
      DragEvent.setAttribute(itemPortal, 'draggable', true);
      /**
       * 设置拖拽事件
       */
      this.setItemPortalEvent(itemPortal, item);
      return itemPortal;
    },
    /**
     * 设置拖拽事件
     * @param item
     */
    setItemPortalEvent(itemPortal, item) {
      DragAction({itemPortal})
        .ondragstart((e) => {
          this.ondragstart(e, item);
          this.executeItemFn(item, ondragstart);
          /**
           * 记录拖拽元素
           */
          this._startItem = this.getItemBySrcElement(this.getSrcElement(e));
        })
        .ondrag((e) => {
          this.executeItemFn(item, ondrag);
        })
        .ondragend((e) => {
          DragEvent.removeClass(this.getSrcElement(e), selectClass);
          this.executeItemFn(item, ondragend);
        })
        // .ondragenter((e) => {
        //   this.executeItemFn(item, ondragenter);
        // })
        .ondragover((e) => {
          this.executeItemFn(item, ondragover);
        })
        // .ondragleave((e) => {
        //   this.executeItemFn(item, ondragleave);
        // })
        .ondrop((e) => {
          /**
           * 获取拖拽放下元素
           */
          const last = this.getItemBySrcElement(this.getSrcElement(e));
          /**
           * 仅当 拖拽元素和放下元素不一致 并且 拖拽距离足够时 才触发拖拽响应
           */
          if (this._startItem !== last) {
            DragEvent.removeChild(this._portal, this._startItem);
            DragEvent.insertBefore(this._portal, this._startItem, last);
          }
          this._startItem = null;
          this.executeItemFn(item, ondrop);
        });
    },
    /**
     * 根据srcElement 或者相对应的根元素
     * @param srcElement
     * @returns {*}
     */
    getItemBySrcElement(srcElement) {
      const className = srcElement.className;
      if (className.includes(itemClass)) return srcElement;
      return this.getItemBySrcElement(srcElement.parentNode)
    },
    /**
     * 获取srcElement元素
     * @param event
     * @returns {Object|event.target|{get}|any}
     */
    getSrcElement(event) {
      return elUtils.getSrcElement(event);
    }
  };
  return Portal;
});
