/*
 * @Author: saber2pr
 * @Date: 2019-12-07 22:09:45
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 23:08:10
 */
import { isTextFiber, isHookFiber, isHostFiber } from "../../react-is/ReactIs"

const toLowerCase = (value: string) =>
  value.replace(/\B([A-Z])/g, "-$1").toLowerCase()

const toArray = (element: any) => Array.prototype.concat(element)

function createNode(element: JSX.Element): JSX.Element {
  const { props } = element

  const style = props.style
  if (style) {
    props.style = Object.entries(style).reduce(
      (receiver, [k, v]) => receiver.concat(`${toLowerCase(k)}:${v};`),
      ""
    )
  }

  return { ...element, props }
}

function renderToString(element: JSX.Element): string {
  if (isTextFiber(element)) {
    const { nodeValue } = element.props
    return nodeValue
  }

  if (isHostFiber(element)) {
    const { tag, props } = createNode(element)
    const attr = Object.entries(props).reduce((receiver, [k, v]) => {
      if (typeof v !== "string") {
        return receiver
      }

      if (k === "className") {
        k = "class"
      }

      return receiver.concat(` ${k}="${v}"`)
    }, "")

    const children = toArray(props.children)
    return `<${tag}${attr}>${children.map(renderToString).join("")}</${tag}>`
  }

  if (isHookFiber(element)) {
    const { tag: constructor, props } = element
    const children = toArray(constructor(props))
    return children.map(renderToString).join("")
  }
}

export { renderToString }
