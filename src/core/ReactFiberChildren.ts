/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:08:56
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 21:54:36
 */
import { Fiber, EffectType } from "./ReactTypes"
import { Reflection } from "./ReactFiberReflection"
import { TestCallSize } from "./ReactShared"
import { Children } from "./ReactFiberElement"
import { isSameTag } from "./ReactIs"

function reconcileChildren(fiber: Fiber, children: Fiber[]) {
  children = Children.toArray(children)

  // get hookFiber's alternate
  const alternate = Reflection.getAlternate(fiber)
  let nextOldFiber = alternate ? alternate.child : null

  let newFiber: Fiber = null
  let i = 0

  while (i < children.length || nextOldFiber) {
    const prevChild = newFiber
    const oldFiber = nextOldFiber

    const element = i < children.length && children[i]

    // update
    if (oldFiber && element && isSameTag(element, oldFiber)) {
      newFiber = {
        ...oldFiber,
        tag: element.tag,
        props: element.props,
        $$typeof: element.$$typeof,
        effectType: EffectType.Update,
        return: fiber
      }
      Reflection.setAlternate(newFiber, oldFiber)
    }

    // place
    else if (oldFiber && element && !isSameTag(element, oldFiber)) {
      newFiber = {
        ...oldFiber,
        tag: element.tag,
        props: element.props,
        $$typeof: element.$$typeof,
        return: fiber,
        effectType: EffectType.Place
      }
      Reflection.setAlternate(newFiber, oldFiber)
    }

    // create
    else if (!oldFiber && element) {
      newFiber = {
        ...oldFiber,
        tag: element.tag,
        props: element.props,
        $$typeof: element.$$typeof,
        return: fiber,
        effectType: EffectType.Create
      }
      Reflection.setAlternate(newFiber, oldFiber)
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

    if (i === 0 || !fiber.child) {
      fiber.child = newFiber // link: fiber->child
    } else if (prevChild) {
      if (element) {
        prevChild.sibling = newFiber // link: fiber.sibling->fiber
      } else {
        prevChild.sibling = null // unlink: fiber.sibling
        delete prevChild.sibling
      }
    }
    i++

    TestCallSize("reconcileChildren")
  }

  return fiber.child
}

export { reconcileChildren }
