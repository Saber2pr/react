/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:11:47
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 15:56:01
 */
import { Fiber } from "../shared/ReactTypes"

export namespace Reflection {
  const combiner = new WeakMap()

  export function setInternalFiber(hookFiber: Fiber) {
    const { tag: constructor } = hookFiber
    combiner.set(constructor, hookFiber)
  }

  export function getInternalFiber(hookFiber: Fiber) {
    const { tag: constructor } = hookFiber
    return combiner.get(constructor)
  }

  export function setContainerFiber(rootFiber: Fiber) {
    const { stateNode: container } = rootFiber
    combiner.set(container, rootFiber)
  }

  export function getContainerFiber(rootFiber: Fiber) {
    const { stateNode: container } = rootFiber
    return combiner.get(container)
  }

  export function hasContainerFiber(container: HTMLElement) {
    const containerFiber = combiner.get(container)
    return !!containerFiber
  }
}
