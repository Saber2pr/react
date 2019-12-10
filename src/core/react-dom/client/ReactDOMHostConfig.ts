/*
 * @Author: saber2pr
 * @Date: 2019-12-06 19:30:24
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-10 17:10:12
 */
namespace HostConfig {
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
    parent.insertBefore(newChild, refChild)
  }

  export function appendChild(
    parent: HTMLElement,
    ...nodes: (string | Node)[]
  ) {
    parent.append(...nodes)
  }

  export function removeSelf(node: HTMLElement) {
    node.remove()
  }

  export function removeAllChild(node: HTMLElement) {
    node.innerHTML = ""
  }

  export function updateProps(
    node: HTMLElement,
    newProps: object,
    oldProps: object
  ) {
    Object.entries(newProps).forEach(([k, v]) => {
      if (k === "style") return
      if (oldProps[k] === v) return

      if (k === "dangerouslySetInnerHTML") {
        k = "innerHTML"
        v = v.__html
      }

      node[k] = v
    })

    if (newProps["style"]) {
      const newStyle = newProps["style"]
      const oldStyle = oldProps["style"] || {}
      Object.entries(newStyle).forEach(([k, v]) => {
        if (oldStyle[k] === v) return
        node.style[k] = v
      })
    }
  }
}

export { HostConfig }
