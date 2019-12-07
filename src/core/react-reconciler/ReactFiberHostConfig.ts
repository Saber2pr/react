/*
 * @Author: saber2pr
 * @Date: 2019-12-06 16:44:01
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 19:45:55
 */
const HostConfig = {} as HostConfigType

type HostConfigType = {
  createElement(tag: string): HTMLElement
  createDocumentFragment(): DocumentFragment
  createTextNode(data: string | number): Text
  insertBefore(parent: HTMLElement, newChild: HTMLElement, refChild: Node): void
  appendChild(parent: HTMLElement, ...nodes: (string | Node)[]): void
  replaceChild(
    parent: HTMLElement,
    newChild: HTMLElement,
    oldChild: HTMLElement
  ): void
  removeSelf(node: HTMLElement): void
  removeAllChild(node: HTMLElement): void
  updateProps(node: HTMLElement, newProps: object, oldProps: object): void
}

function setHostConfig(config: HostConfigType) {
  Object.assign(HostConfig, config)
}

export { HostConfig, setHostConfig, HostConfigType }
