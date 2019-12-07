/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:08:56
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 15:39:23
 */
import { Fiber, EffectType } from "../shared/ReactTypes"
import { Children } from "../react/ReactChildren"
import { isSameTag } from "../react-is/ReactIs"
import { TestCallSize } from "../shared/testCallSize"

function reconcileChildren(fiber: Fiber, children: Fiber[]) {
  children = Children.toArray(children)

  const alternate = fiber.alternate
  let nextOldFiber = alternate ? alternate.child : null

  let newFiber: Fiber = null
  let index = 0

  while (index < children.length || nextOldFiber) {
    const prevChild = newFiber
    let oldFiber = nextOldFiber

    const element = index < children.length && children[index]

    // update
    if (oldFiber && element && isSameTag(element, oldFiber)) {
      newFiber = {
        ...oldFiber,
        ...element,
        return: fiber,
        effectType: EffectType.Update,
        alternate: oldFiber
      }
    }

    // place
    else if (oldFiber && element && !isSameTag(element, oldFiber)) {
      newFiber = {
        ...oldFiber,
        ...element,
        return: fiber,
        effectType: EffectType.Place,
        alternate: oldFiber
      }
    }

    // create
    else if (!oldFiber && element) {
      newFiber = {
        ...element,
        return: fiber,
        effectType: EffectType.Create
      }
    }

    // delete
    else if (oldFiber && !element) {
      oldFiber.effectType = EffectType.Delete
      const effectList = fiber.effectList || []
      effectList.push(oldFiber)
      fiber.effectList = effectList
    }

    // next alternate
    if (nextOldFiber) nextOldFiber = nextOldFiber.sibling

    if (index === 0 || !fiber.child) {
      fiber.child = newFiber // link: fiber->child
    } else if (prevChild) {
      if (element) {
        prevChild.sibling = newFiber // link: fiber.sibling->fiber
      } else {
        prevChild.sibling = null // unlink: fiber.sibling
        delete prevChild.sibling
      }
    }
    index++

    TestCallSize("reconcileChildren")
  }

  return fiber.child
}

export { reconcileChildren }
