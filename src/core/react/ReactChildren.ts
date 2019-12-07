/*
 * @Author: saber2pr
 * @Date: 2019-12-07 15:25:38
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-12-07 15:25:38
 */
import { Fiber, NodeType } from "../shared/ReactTypes"

const createTextElement = (nodeValue: string | number): Fiber => ({
  tag: "#text",
  $$typeof: NodeType.Text,
  props: { nodeValue }
})

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

export { Children }
