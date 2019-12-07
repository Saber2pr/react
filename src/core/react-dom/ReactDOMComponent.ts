/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:09:48
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 16:06:09
 */
import { Fiber, NodeType } from "../shared/ReactTypes"
import { HostConfig } from "./ReactDOMHostConfig"
import { Children } from "../react/ReactChildren"
import { isTextFiber, isRootFiber, isHostFiber } from "../react-is/ReactIs"

function createStateNode(hostFiber: Fiber) {
  const { tag, props } = hostFiber
  let stateNode = null

  if (isTextFiber(hostFiber)) {
    stateNode = HostConfig.createTextNode(props.nodeValue)
  }

  if (isRootFiber(hostFiber)) {
    stateNode = hostFiber.stateNode
  }

  if (isHostFiber(hostFiber)) {
    stateNode = HostConfig.createElement(tag)
  }

  if (props.ref) {
    const ref = props.ref
    if (typeof ref === "function") {
      ref(stateNode)
    } else {
      ref.current = stateNode
    }
  }

  return stateNode
}

const createTextElement = (nodeValue: string | number): Fiber => ({
  tag: "#text",
  $$typeof: NodeType.Text,
  props: { nodeValue }
})

const createElement = (tag: any, props: object, ...children: any[]): Fiber => {
  props = { ...props, children: Children.toArray(...children) }

  if (typeof tag === "string") {
    return { $$typeof: NodeType.Host, tag, props }
  }
  if (typeof tag === "function") {
    return { $$typeof: NodeType.Hook, tag, props }
  }

  return { $$typeof: NodeType.Unknown, tag, props }
}

export { createStateNode, createTextElement, createElement }
