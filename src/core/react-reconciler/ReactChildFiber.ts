/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:08:56
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-11 20:43:59
 */
import { Fiber, EffectType } from "../shared/ReactTypes"
import { Children } from "../react/ReactChildren"
import { isSameTag, isHookFiber } from "../react-is/ReactIs"
import { TestStackSize } from "../shared/testStackSize"

function reconcileChildren(fiber: Fiber, children: Fiber[]) {
  if (isHookFiber(fiber)) {
    reconcileHookRetFiber(fiber)
  }

  children = Children.toArray(children)

  const alternate = fiber.alternate
  let nextOldFiber = alternate ? alternate.child : null

  let newFiber: Fiber = null
  let index = 0

  while (index < children.length || nextOldFiber) {
    TestStackSize("reconcileChildren")

    const prevChild = newFiber
    let oldFiber = nextOldFiber

    if (oldFiber) {
      if (oldFiber.effectType === EffectType.Delete) {
        oldFiber = null
      }
    }

    const element = index < children.length && children[index]

    // update
    if (oldFiber && element && isSameTag(element, oldFiber)) {
      newFiber = updateSlot(element, oldFiber, fiber)
    }

    // place
    else if (oldFiber && element && !isSameTag(element, oldFiber)) {
      newFiber = placeChild(element, oldFiber, fiber)
    }

    // create
    else if (!oldFiber && element) {
      newFiber = createChild(element, fiber)
    }

    // delete
    else if (oldFiber && !element) {
      deleteChild(fiber, oldFiber)
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
  }

  return fiber.child
}

function reconcileHookRetFiber(hookFiber: Fiber) {
  const alternate = hookFiber.alternate
  //update hook effect
  if (alternate) {
    if (isSameTag(alternate, hookFiber)) {
      // update
      hookFiber.effectType = EffectType.Update
    } else {
      // place
      hookFiber.effectType = EffectType.Place
      alternate.effectType = EffectType.Delete
    }
  } else {
    // create
    hookFiber.effectType = EffectType.Create
  }
}

function createChild(element: Fiber, returnFiber: Fiber) {
  const newFiber: Fiber = {
    ...element,
    return: returnFiber,
    effectType: EffectType.Create
  }
  return newFiber
}

function updateSlot(element: Fiber, oldFiber: Fiber, returnFiber: Fiber) {
  const newFiber: Fiber = {
    ...oldFiber,
    ...element,
    return: returnFiber,
    effectType: EffectType.Update,
    alternate: oldFiber
  }
  return newFiber
}

function placeChild(element: Fiber, childToPlace: Fiber, returnFiber: Fiber) {
  const newFiber: Fiber = {
    ...element,
    return: returnFiber,
    effectType: EffectType.Place,
    alternate: childToPlace
  }

  deleteChild(returnFiber, childToPlace)
  return newFiber
}

function deleteChild(returnFiber: Fiber, childToDelete: Fiber) {
  childToDelete.effectType = EffectType.Delete
  const effectList = returnFiber.effectList || []
  effectList.push(childToDelete)
  returnFiber.effectList = effectList

  // delete child
  const child = childToDelete.child
  if (child) {
    child.effectType = EffectType.Delete
  }
}

export { reconcileChildren }
