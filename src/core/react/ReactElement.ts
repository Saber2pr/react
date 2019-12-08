/*
 * @Author: saber2pr
 * @Date: 2019-12-07 22:30:12
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 11:18:18
 */
import { Fiber, NodeType } from "../shared/ReactTypes"
import { Children } from "./ReactChildren"

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
  if (tag === NodeType.Fragment) {
    return { $$typeof: NodeType.Fragment, tag: "#fragment", props }
  }

  return { $$typeof: NodeType.Unknown, tag, props }
}

export { createElement, createTextElement }
