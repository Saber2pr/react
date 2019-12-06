/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:09:07
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 21:50:17
 */
import { Fiber, EffectType, NodeType } from "./ReactTypes"
import { HostConfig } from "./ReactHostConfig"
import { Reflection } from "./ReactFiberReflection"
import {
  getHostParentFiber,
  getHostChildFiber,
  getHostSiblingFiber
} from "./ReactFiberTraverse"

function commitWork(fiber: Fiber) {
  const effectList = sortEffectList(fiber)
  effectList.forEach(commitUnitOfWork)

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
  const { $$typeof: type, effectType: effectTag } = fiber
  if (type === NodeType.Hook) {
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
  Reflection.unlinkAlternate(hostFiber)
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
  const alternate = Reflection.getAlternate(hostFiber)
  const newProps = hostFiber.props
  const node = hostFiber.stateNode
  const oldProps = alternate ? alternate.props : {}

  const newPropsToUpdate = Object.fromEntries(
    Object.entries(newProps).filter(([k]) => !["ref", "children"].includes(k))
  )
  HostConfig.updateProps(node, newPropsToUpdate, oldProps)
}

function commitDelete(fiber: Fiber) {
  const { stateNode } = fiber
  HostConfig.removeSelf(stateNode)
}

export { commitWork, commitCreate, commitUpdate, commitPlace, commitDelete }
