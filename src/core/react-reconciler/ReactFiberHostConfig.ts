/*
 * @Author: saber2pr
 * @Date: 2019-12-06 16:44:01
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 12:31:08
 */
import { Instance, FragmentInstance, TextInstance } from "../shared/ReactTypes"
const HostConfig = {} as HostConfigType

type HostConfigType = {
  createElement(tag: string): Instance
  createDocumentFragment(): FragmentInstance
  createTextNode(data: string | number): TextInstance
  insertBefore(parent: Instance, newChild: Instance, refChild: Instance): void
  appendChild(parent: Instance, ...nodes: (string | Instance)[]): void
  replaceChild(parent: Instance, newChild: Instance, oldChild: Instance): void
  removeSelf(node: Instance): void
  removeAllChild(node: Instance): void
  updateProps(node: Instance, newProps: object, oldProps: object): void
}

function setHostConfig(config: HostConfigType) {
  Object.assign(HostConfig, config)
}

export { HostConfig, setHostConfig, HostConfigType }
