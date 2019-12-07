/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:12:44
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 21:53:51
 */
import { Fiber, NodeType } from "./ReactTypes"
import { TestCallSize, resetIndex } from "./ReactShared"
import { Reflection } from "./ReactFiberReflection"
import { createStateNode } from "./ReactFiberElement"
import { reconcileChildren } from "./ReactFiberChildren"
import { commitWork, commitUpdate } from "./ReactFiberCommitWork"
import { isSameTag } from "./ReactIs"

let workInProgress: Fiber = null
let pendingCommit: Fiber = null

const getCurrentWorkInProgress = () => workInProgress

function renderRoot(root: Fiber) {
  if (!workInProgress) workInProgress = createWorkInProgress(root)

  while (workInProgress) {
    workInProgress = performUnitOfWork(workInProgress, root)
    if (workInProgress === root) break
    TestCallSize("renderRoot")
  }

  if (pendingCommit) {
    commitWork(pendingCommit)
    workInProgress = null
    pendingCommit = null
  }
}

function createWorkInProgress(fiber: Fiber) {
  workInProgress = fiber
  workInProgress.effectList = null
  return workInProgress
}

function performUnitOfWork(fiber: Fiber, top: Fiber) {
  const next = beginWork(fiber)
  if (next) return next
  let current = fiber
  while (current) {
    if (current === top) return current
    completeWork(current, top)
    if (current.sibling) return current.sibling
    current = current.return
    TestCallSize("performUnitOfWork")
  }
}

function completeWork(fiber: Fiber, top: Fiber) {
  const parent = fiber.return
  if (parent) {
    const parentEffectList = parent.effectList || []
    const fiberEffectList = fiber.effectList || []
    parent.effectList = parentEffectList.concat(...fiberEffectList, fiber)
    fiber.effectList = []
    delete fiber.effectList

    if (parent === top) pendingCommit = parent
  }
}

function beginWork(fiber: Fiber) {
  if (fiber.$$typeof === NodeType.Hook) {
    return updateHOOKComponent(fiber)
  }
  if (fiber.$$typeof === NodeType.Root) {
    return updateHostComponent(fiber)
  }
  if (fiber.$$typeof === NodeType.Text) {
    return updateHostComponent(fiber)
  }
  if (fiber.$$typeof === NodeType.Host) {
    return updateHostComponent(fiber)
  }
}

function updateHOOKComponent(hookFiber: Fiber) {
  const { tag: constructor, props } = hookFiber
  const alternate = Reflection.getInternalFiber(hookFiber)
  if (alternate) {
    hookFiber.alternate = alternate
  } else {
    Reflection.setInternalFiber(hookFiber)
  }
  resetIndex()
  const children = constructor(props)
  return reconcileChildren(hookFiber, children)
}

function updateHostComponent(hostFiber: Fiber) {
  const {
    props: { children },
    stateNode,
    alternate
  } = hostFiber
  if (!stateNode || (alternate && !isSameTag(hostFiber, alternate))) {
    hostFiber.stateNode = createStateNode(hostFiber)
    commitUpdate(hostFiber)
  }

  return reconcileChildren(hostFiber, children)
}

export { getCurrentWorkInProgress, renderRoot }
