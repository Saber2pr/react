/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:11:47
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 21:36:06
 */
import { Fiber } from "./ReactTypes"

export namespace Reflection {
  const combiner = new WeakMap()

  export function setInternalFiber(hookFiber: Fiber) {
    const { tag: constructor } = hookFiber
    constructor["_internalFiber"] = hookFiber
  }
  export function getInternalFiber(hookFiber: Fiber) {
    const { tag: constructor } = hookFiber
    return constructor["_internalFiber"]
  }

  export function setContainerFiber(rootFiber: Fiber) {
    const { stateNode: container } = rootFiber
    container["_rootContainer"] = rootFiber
  }

  export function getContainerFiber(rootFiber: Fiber) {
    const { stateNode: container } = rootFiber
    if (container) {
      return container["_rootContainer"]
    } else {
      return null
    }
  }

  export function hasContainerFiber(container: any) {
    return container["_rootContainer"]
  }
}
