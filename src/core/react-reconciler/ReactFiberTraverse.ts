/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:11:57
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 16:09:22
 */
import { Fiber, EffectType } from "../shared/ReactTypes"
import { isHostParentFiber, isHostChildFiber } from "../react-is/ReactIs"
import { TestStackSize } from "../shared/testStackSize"

function getHostSiblingFiber(fiber: Fiber): Fiber {
  let node: Fiber = fiber
  siblings: while (true) {
    TestStackSize("getHostSiblingFiber")
    while (!node.sibling) {
      if (!node.return || isHostParentFiber(node.return)) {
        return null
      }
      node = node.return
    }
    node.sibling.return = node.return
    node = node.sibling
    while (!isHostChildFiber(node)) {
      if (node.effectType === EffectType.Place) {
        continue siblings
      }
      if (!node.child) {
        continue siblings
      } else {
        node.child.return = node
        node = node.child
      }
    }
    if (!(node.effectType === EffectType.Place)) {
      return node
    }
  }
}

function getHostParentFiber(fiber: Fiber): Fiber {
  let parent = fiber.return
  while (parent) {
    TestStackSize("getHostParentFiber")
    if (isHostParentFiber(parent)) {
      return parent
    }
    parent = parent.return
  }
}

function getHostChildFiber(fiber: Fiber): Fiber {
  let child = fiber.child
  while (child) {
    TestStackSize("getHostChildFiber")
    if (isHostChildFiber(child)) {
      return child
    }
    child = child.child
  }
}

export { getHostChildFiber, getHostParentFiber, getHostSiblingFiber }
