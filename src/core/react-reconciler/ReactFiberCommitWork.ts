/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:09:07
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-10 21:57:45
 */
import { Fiber, EffectType, NodeType, Effect } from "../shared/ReactTypes"
import { HostConfig } from "./ReactFiberHostConfig"
import {
  getHostParentFiber,
  getHostSiblingFiber,
  getHostChildFiber
} from "./ReactFiberTraverse"
import { Reflection } from "./ReactFiberReflection"
import {
  isRootFiber,
  isHookFiber,
  isTextFiber,
  isHostFiber,
  isFragmentFiber
} from "../react-is/ReactIs"
import { TestCallSize } from "../shared/testCallSize"

function createStateNode(hostFiber: Fiber) {
  const { tag, props } = hostFiber
  let stateNode = null

  if (isTextFiber(hostFiber)) {
    stateNode = HostConfig.createTextNode(props.nodeValue)
  }

  if (isRootFiber(hostFiber)) {
    stateNode = hostFiber.stateNode
  }

  if (isHostFiber(hostFiber)) {
    stateNode = HostConfig.createElement(tag)
  }

  if (isFragmentFiber(hostFiber)) {
    stateNode = HostConfig.createDocumentFragment()
  }

  if (props.ref) {
    const ref = props.ref
    if (typeof ref === "function") {
      ref(stateNode)
    } else {
      ref.current = stateNode
    }
  }

  return stateNode
}

function commitWork(fiber: Fiber) {
  const effectList = sortEffectList(fiber)
  effectList.forEach(commitUnitOfWork)

  // set root alternate
  if (isRootFiber(fiber)) {
    Reflection.setContainerFiber(fiber)
  }

  // set hook alternate
  if (isHookFiber(fiber)) {
    Reflection.setInternalFiber(fiber)
  }

  const callback = fiber.callback
  if (callback) callback(fiber)
}

function sortEffectList(fiber: Fiber) {
  const effectList = fiber.effectList || []

  type NextEffect = { level: number; effect: Fiber }
  const nextEffects: Array<NextEffect> = []
  for (const effect of effectList) {
    if (nextEffects.find(nextEffect => nextEffect.effect === effect)) {
      continue
    }
    const nextEffect = {
      level: EffectType.getEffectLevel(effect.effectType),
      effect
    }
    nextEffects.push(nextEffect)
  }

  fiber.effectList = nextEffects
    .sort((a, b) => b.level - a.level)
    .map(({ effect }) => effect)

  return fiber.effectList
}

function commitUnitOfWork(fiber: Fiber) {
  const { effectType } = fiber
  if (isHookFiber(fiber)) {
    switch (effectType) {
      case EffectType.Create:
        commitHookMount(fiber)
        break
      case EffectType.Update:
        commitHookUpdate(fiber)
        break
      case EffectType.Place:
        commitHookMount(fiber)
        commitPlace(fiber)
        break
      case EffectType.Delete:
        commitHookUnMount(fiber)
        commitDelete(fiber)
        break
      default:
        break
    }
    Reflection.setInternalFiber(fiber)
  } else {
    switch (effectType) {
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

function commitHookMount(hookFiber: Fiber) {
  const effect = hookFiber.memoizedState
  if (!effect) {
    return
  }
  const creators = effect.in
  if (creators) {
    const nextEffects: Effect[] = []
    while (creators.length) {
      TestCallSize("commitHookEffectList")
      const current = creators.pop()
      const nextEffect = current()
      if (nextEffect) {
        nextEffects.push(nextEffect)
      }
    }
    effect.out = nextEffects
  }
}

function commitHookUnMount(hookFiber: Fiber) {
  const effect = hookFiber.memoizedState
  if (!effect) {
    return
  }
  const destroys = effect.out
  if (destroys) {
    while (destroys.length) {
      TestCallSize("commitHookEffectList:1")
      const current = destroys.pop()
      current()
    }
  }
}

// update = unmount -> mount
function commitHookUpdate(hookFiber: Fiber) {
  commitHookUnMount(hookFiber)
  commitHookMount(hookFiber)
}

function commitCreate(hostFiber: Fiber) {
  const HostParent = getHostParentFiber(hostFiber)
  const parent = HostParent.stateNode
  const node = hostFiber.stateNode
  HostConfig.appendChild(parent, node)
}

function commitPlace(finishedWork: Fiber): void {
  const parentFiber = getHostParentFiber(finishedWork)
  if (!parentFiber) {
    // when parent had been removed, ignore this effect.
    return
  }

  const parent = parentFiber.stateNode

  const before = getHostSiblingFiber(finishedWork)
  let node = finishedWork
  while (true) {
    TestCallSize("commitPlace")
    const isHost =
      node.$$typeof === NodeType.Host || node.$$typeof === NodeType.Text
    if (isHost) {
      const stateNode = node.stateNode
      if (before) {
        HostConfig.insertBefore(parent, stateNode, before.stateNode)
      } else {
        HostConfig.appendChild(parent, stateNode)
      }
    } else if (node.child) {
      node.child.return = node
      node = node.child
      continue
    }
    if (node === finishedWork) {
      return
    }
    while (!node.sibling) {
      TestCallSize("commitPlace:1")
      if (!node.return || node.return === finishedWork) {
        return
      }
      node = node.return
    }
    node.sibling.return = node.return
    node = node.sibling
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

function commitDelete(finishedWork: Fiber) {
  const current = finishedWork

  if (isHookFiber(current)) {
    const HostChildFiber = getHostChildFiber(current)
    if (HostChildFiber) {
      const stateNode = HostChildFiber.stateNode
      HostConfig.removeSelf(stateNode)
      datchFiber(HostChildFiber)
    }
  } else {
    const stateNode = current.stateNode
    HostConfig.removeSelf(stateNode)
  }

  datchFiber(current)
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

export {
  commitWork,
  commitCreate,
  commitUpdate,
  commitPlace,
  commitDelete,
  createStateNode
}
