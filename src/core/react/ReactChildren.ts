/*
 * @Author: saber2pr
 * @Date: 2019-12-07 15:25:38
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 22:55:20
 */
import { Fiber, NodeType } from "../shared/ReactTypes"

const toTextFiber = (nodeValue: string | number): Fiber => ({
  tag: "#text",
  $$typeof: NodeType.Text,
  props: { nodeValue }
})

// flat polyfill
const flat = <T>(arr: T[]) => Array.prototype.concat(...arr)
const flat2 = <T>(arr: T[]) => flat(flat(arr))

namespace Children {
  export const toArray = (...children: any[]): Fiber[] => {
    return flat2(children).reduce<Fiber[]>(
      (acc, ch) => {
        if (ch === undefined) return acc
        if (typeof ch === "number") {
          return acc.concat(toTextFiber(ch))
        }
        if (typeof ch === "string") {
          if (!ch.replace(/ |\r?\n|\r/g, "")) return acc
          return acc.concat(toTextFiber(ch))
        }
        return acc.concat(ch)
      },
      [] as Fiber[]
    )
  }
}

export { Children }
