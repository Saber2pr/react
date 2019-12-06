/*
 * @Author: saber2pr
 * @Date: 2019-12-06 16:44:01
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 17:13:05
 */
export namespace HostConfig {
  export function createElement(tag: string) {
    return document.createElement(tag)
  }

  export function createDocumentFragment() {
    return document.createDocumentFragment()
  }

  export function createTextNode(data: string | number) {
    return document.createTextNode(String(data))
  }

  export function insertBefore(
    parent: HTMLElement,
    newChild: HTMLElement,
    refChild: Node
  ) {
    return parent.insertBefore(newChild, refChild)
  }

  export function appendChild(
    parent: HTMLElement,
    ...nodes: (string | Node)[]
  ) {
    return parent.append(...nodes)
  }

  export function replaceChild(
    parent: HTMLElement,
    newChild: HTMLElement,
    oldChild: HTMLElement
  ) {
    return parent.replaceChild(newChild, oldChild)
  }

  export function removeSelf(node: HTMLElement) {
    node.remove()
  }

  export function removeAllChild(node: HTMLElement) {
    node.innerHTML = ""
  }
}
