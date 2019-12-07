/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:09:07
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 16:04:47
 */
import { Fiber, EffectType } from "../shared/ReactTypes"
import { HostConfig } from "./ReactFiberHostConfig"
import {
  getHostParentFiber,
  getHostChildFiber,
  getHostSiblingFiber
} from "./ReactFiberTraverse"
import { Reflection } from "./ReactFiberReflection"
import { isRootFiber, isHookFiber } from "../react-is/ReactIs"

function commitWork(fiber: Fiber) {
  const effectList = sortEffectList(fiber)
  effectList.forEach(commitUnitOfWork)
  fiber.effectList = null

  // set root alternate
  if (isRootFiber(fiber)) {
    Reflection.setContainerFiber(fiber)
  }

  // set hook alternate
  else if (isHookFiber(fiber)) {
    Reflection.setInternalFiber(fiber)
  }

  const callback = fiber.callback
  if (callback) callback(fiber)
}

function sortEffectList(fiber: Fiber) {
  const effectList = fiber.effectList || []
  fiber.effectList = effectList
    .map(effect => ({
      level: EffectType.getEffectLevel(effect.effectType),
      effect
    }))
    .sort((a, b) => b.level - a.level)
    .map(task => task.effect)
  return fiber.effectList
}

function commitUnitOfWork(fiber: Fiber) {
  const { effectType: effectTag } = fiber
  if (isHookFiber(fiber)) {
  } else {
    switch (effectTag) {
      case EffectType.Create:
        commitCreate(fiber)
        break
      case EffectType.Update:
        commitUpdate(fiber)
        break
      case EffectType.Place:
        commitPlace(fiber)
        break
      case EffectType.Delete:
        commitDelete(fiber)
        break
      default:
        break
    }
  }
}

function commitCreate(hostFiber: Fiber) {
  const HostParent = getHostParentFiber(hostFiber)
  const parent = HostParent.stateNode
  const node = hostFiber.stateNode
  HostConfig.appendChild(parent, node)
}

function commitPlace(hostFiber: Fiber) {
  const { alternate, stateNode: newChild } = hostFiber
  const oldChild = alternate.stateNode
  const HostParent = getHostParentFiber(alternate)
  const parent = HostParent.stateNode
  HostConfig.replaceChild(parent, newChild, oldChild)

  // replace child node
  const HostChild = getHostChildFiber(hostFiber)
  if (HostChild) {
    const HostChildNode = HostChild.stateNode
    const HostChildSibling = getHostSiblingFiber(HostChild)
    if (HostChildSibling) {
      const HostChildSiblingNode = HostChildSibling.stateNode
      HostConfig.insertBefore(newChild, HostChildNode, HostChildSiblingNode)
    } else {
      HostConfig.appendChild(newChild, HostChildNode)
    }
  }
}

function commitUpdate(hostFiber: Fiber) {
  const alternate = hostFiber.alternate
  const newProps = hostFiber.props
  const node = hostFiber.stateNode
  const oldProps = alternate ? alternate.props : {}

  const newPropsToUpdate = Object.fromEntries(
    Object.entries(newProps).filter(([k]) => !["ref", "children"].includes(k))
  )
  HostConfig.updateProps(node, newPropsToUpdate, oldProps)
}

function commitDelete(hostFiber: Fiber) {
  const { stateNode } = hostFiber
  HostConfig.removeSelf(stateNode)

  datchFiber(hostFiber)
}

function datchFiber(fiber: Fiber) {
  fiber.return = null
  fiber.child = null
  fiber.sibling = null
  const alternate = fiber.alternate
  if (alternate) {
    alternate.return = null
    alternate.child = null
    alternate.sibling = null
  }
}

export { commitWork, commitCreate, commitUpdate, commitPlace, commitDelete }
