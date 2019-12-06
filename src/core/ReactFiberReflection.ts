/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:11:47
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 21:36:06
 */
import { Fiber, NodeType } from "./ReactTypes"

export namespace Reflection {
  const combiner = new WeakMap()

  export function getRefObj(fiber: Fiber): object {
    let reference: object = null
    const { $$typeof, tag } = fiber
    if ($$typeof === NodeType.Hook) {
      reference = tag
    } else {
      throw new Error("Reflection Error: reference not found.")
    }
    return reference
  }

  export function get(hookFiber: Fiber, key: string) {
    if (hookFiber[key]) return hookFiber[key]
    const ref = getRefObj(hookFiber)
    const meta = combiner.get(ref) || {}
    hookFiber[key] = meta[key]
    return hookFiber[key]
  }

  export function set(hookFiber: Fiber, key: string, value: any) {
    const ref = getRefObj(hookFiber)
    const meta = combiner.get(ref) || {}
    meta[key] = value
    combiner.set(ref, meta)
  }

  export function delet(hookFiber: Fiber, key: string) {
    const ref = getRefObj(hookFiber)
    delete hookFiber[key]
    combiner.delete(ref)
  }

  export function setAlternate(fiber: Fiber, alternate: Fiber) {
    if (fiber.$$typeof === NodeType.Hook) {
      Reflection.set(fiber, "alternate", alternate)
    } else {
      fiber.alternate = alternate
    }
  }

  export function getAlternate(fiber: Fiber): Fiber {
    if (fiber.$$typeof === NodeType.Hook) {
      return Reflection.get(fiber, "alternate")
    } else {
      return fiber.alternate
    }
  }

  export function unlinkAlternate(fiber: Fiber) {
    if (fiber.$$typeof === NodeType.Hook) {
      return Reflection.delet(fiber, "alternate")
    } else {
      delete fiber.alternate
    }
  }

  export function setContainerFiber(container: HTMLElement, fiber: Fiber) {
    container["_rootContainer"] = fiber
  }

  export function getContainerFiber(container: HTMLElement) {
    return container["_rootContainer"]
  }
}
