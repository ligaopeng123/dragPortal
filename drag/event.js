/**
 *@模块名称：event.js
 *
 *@创建人：ligaoming
 *
 *@作用：提供事件绑定以及操作等相关函数
 *
 *@date 2020/4/28
 *
 *@版权所有：长杨科技
 */

export const DragEvent = (function () {
  return {
    /**
     * 事件绑定 有一些兼容性处理
     * @param dom
     * @param event
     * @param fn
     * @param useCapture
     */
    addEventListener: (dom, event, fn, useCapture = false) => {
      if (dom.addEventListener) {
        dom.addEventListener(event, fn, useCapture);
      } else if (dom.attachEvent) {
        dom.attachEvent(`on${event}`, fn);
      } else {
        dom[`on${event}`] = fn;
      }
    },
    /**
     * 添加class样式
     * @param el
     * @param className
     */
    addClass(el, className) {
      el.className = el.className + ' ' + className;
    },
    /**
     * 移除样式
     * @param el
     * @param className
     */
    removeClass(el, className) {
      el.className = (el.className || '').replace(className, '');
    },
    /**
     * 设置attr属性
     * @param el
     * @param attr
     * @param attrVal
     */
    setAttribute(el, attr, attrVal) {
      el.setAttribute(attr, attrVal);
    },
    /**
     * 再之后插入
     * @param newElement
     * @param targetElement
     */
    insertAfter(newElement, targetElement) {
      const parent = targetElement.parentNode;
      //如果要插入的目标元素是其父元素的最后一个元素节点，直接插入该元素
      //否则，在目标元素的下一个兄弟元素之前插入
      if (parent.lastChild == targetElement) {
        parent.appendChild(targetElement);
      } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
      }
    },
    /**
     *
     * @param node 父元素
     * @param newnode  要插入的节点对象
     * @param existingnode  要添加新的节点前的子节点。
     */
    insertBefore(node, newnode, existingnode) {
      node.insertBefore(newnode,existingnode);
    },
    /**
     * 移除元素
     * @param node  父元素
     * @param childNode  子元素
     */
    removeChild(node, childNode) {
      node.removeChild(childNode);
    }
  }
})();
