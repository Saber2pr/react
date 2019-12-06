/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:09:48
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 17:10:12
 */
import { Fiber, NodeType } from "./ReactTypes"
import { HostConfig } from "./ReactHostConfig"

function createStateNode(hostFiber: Fiber) {
  const { $$typeof: type, tag, props } = hostFiber
  let stateNode = null

  if (type === NodeType.Text) {
    stateNode = HostConfig.createTextNode(props.nodeValue)
  }

  if (type === NodeType.Root) {
    stateNode = hostFiber.stateNode
  }

  if (type === NodeType.Host) {
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

namespace Children {
  export const toArray = (...children: any[]): Fiber[] => {
    return children.flat(2).reduce<Fiber[]>(
      (acc, ch) => {
        if (ch === undefined) return acc
        if (typeof ch === "number") {
          return acc.concat(createTextElement(ch))
        }
        if (typeof ch === "string") {
          if (!ch.replace(/ |\r?\n|\r/g, "")) return acc
          return acc.concat(createTextElement(ch))
        }
        return acc.concat(ch)
      },
      [] as Fiber[]
    )
  }
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

export { Children, createStateNode, createTextElement, createElement }
