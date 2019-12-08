/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:12:44
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 11:25:17
 */
import { Fiber } from "../shared/ReactTypes"
import { Reflection } from "./ReactFiberReflection"
import { reconcileChildren } from "./ReactChildFiber"
import {
  commitWork,
  commitUpdate,
  createStateNode
} from "./ReactFiberCommitWork"
import {
  isSameTag,
  isHookFiber,
  isRootFiber,
  isTextFiber,
  isHostFiber,
  isFragmentFiber
} from "../react-is/ReactIs"
import { resetIndex } from "./ReactFiberStack"
import { TestCallSize } from "../shared/testCallSize"

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
  if (isHookFiber(fiber)) {
    return updateHOOKComponent(fiber)
  }
  if (isRootFiber(fiber)) {
    return updateHostComponent(fiber)
  }
  if (isTextFiber(fiber)) {
    return updateHostComponent(fiber)
  }
  if (isHostFiber(fiber)) {
    return updateHostComponent(fiber)
  }
  if (isFragmentFiber(fiber)) {
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

  if (props.children && props.children.length === 1) {
    let singleChild = props.children[0]

    if (isTextFiber(singleChild)) {
      const { props } = singleChild
      singleChild = props.nodeValue
    }

    props.children = singleChild
  }

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
