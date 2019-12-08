/*
 * @Author: saber2pr
 * @Date: 2019-12-07 15:25:38
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 11:01:04
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
        // `if render` get false or undefind, ignore it
        if (ch === false || ch === undefined) return acc

        // to text node
        if (typeof ch === "number") {
          return acc.concat(toTextFiber(ch))
        }
        if (typeof ch === "string") {
          return acc.concat(toTextFiber(ch))
        }

        // collect object
        return acc.concat(ch)
      },
      [] as Fiber[]
    )
  }
}

export { Children }
