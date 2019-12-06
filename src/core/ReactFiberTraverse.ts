/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:11:57
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-12-06 17:11:57
 */
import { Fiber, EffectType } from "./ReactTypes"
import { TestCallSize } from "./ReactShared"
import { isHostParent, isHost } from "./ReactIs"

function getHostSiblingFiber(fiber: Fiber): Fiber {
  let node: Fiber = fiber
  siblings: while (true) {
    TestCallSize("getHostSiblingFiber")
    while (!node.sibling) {
      if (!node.return || isHostParent(node.return)) {
        return null
      }
      node = node.return
    }
    node.sibling.return = node.return
    node = node.sibling
    while (!isHost(node)) {
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
    TestCallSize("getHostParentFiber")
    if (isHostParent(parent)) {
      return parent
    }
    parent = parent.return
  }
}

function getHostChildFiber(fiber: Fiber): Fiber {
  let child = fiber.child
  while (child) {
    TestCallSize("getHostChildFiber")
    if (isHost(child)) {
      return child
    }
    child = child.child
  }
}

export { getHostChildFiber, getHostParentFiber, getHostSiblingFiber }
