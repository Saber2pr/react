/*
 * @Author: saber2pr
 * @Date: 2019-12-06 19:07:32
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 12:31:52
 */
import { renderRoot } from "./ReactFiberWorkLoop"
import { Fiber, NodeType, Instance } from "../shared/ReactTypes"
import { setHostConfig, HostConfigType } from "./ReactFiberHostConfig"
import { Reflection } from "./ReactFiberReflection"
import { TestStackSize } from "../shared/testStackSize"

declare interface IdleDeadline {
  readonly didTimeout: boolean
  timeRemaining(): number
}

declare type IdleOptions = {
  timeout: number
}

declare type IdleCallback = (deadline: IdleDeadline) => void

declare function requestIdleCallback(callback: IdleCallback): number
declare function requestIdleCallback(
  callback: IdleCallback,
  options: IdleOptions
): number

const updateQueue: Fiber[] = []
let lastTime = 0

function pushEffect(callback: VoidFunction) {
  if (requestIdleCallback) {
    requestIdleCallback(callback)
  } else {
    setTimeout(callback)
  }
}

function pushLayoutEffect(callback: (...args: any) => void) {
  if (requestAnimationFrame) {
    requestAnimationFrame(callback)
  } else {
    const now = Date.now()
    const nextTime = Math.max(lastTime + 16, now)

    return setTimeout(() => callback((lastTime = nextTime)), nextTime - now)
  }
}

type ScheduleWorkMode = "normal" | "layout"

function scheduleWork(fiber: Fiber, mode: ScheduleWorkMode = "normal") {
  updateQueue.push(fiber)
  switch (mode) {
    case "normal":
      pushEffect(scheduleUnitOfWorkNormalMode)
      break
    case "layout":
      pushLayoutEffect(scheduleUnitOfWorkLayoutMode)
      break
    default:
      pushEffect(scheduleUnitOfWorkNormalMode)
  }
}

function scheduleUnitOfWorkNormalMode() {
  TestStackSize("scheduleUnitOfWorkNormalMode")
  const update = updateQueue.pop()
  if (update) renderRoot(update)

  if (updateQueue.length) {
    pushEffect(scheduleUnitOfWorkNormalMode)
  }
}

function scheduleUnitOfWorkLayoutMode() {
  TestStackSize("scheduleUnitOfWorkLayoutMode")
  const update = updateQueue.pop()
  if (update) renderRoot(update)

  if (updateQueue.length) {
    pushLayoutEffect(scheduleUnitOfWorkLayoutMode)
  }
}

function createRenderer(HostConfig: HostConfigType) {
  setHostConfig(HostConfig)

  const createContainer = (
    component: Fiber,
    container: Instance,
    callback?: Function
  ) => {
    const rootFiber: Fiber = {
      $$typeof: NodeType.Root,
      props: { children: [component] },
      stateNode: container,
      callback
    }
    HostConfig.removeAllChild(container)
    scheduleWork(rootFiber)
  }

  const updateContainer = (
    component: Fiber,
    container: Instance,
    callback?: Function
  ) => {
    const rootFiber: Fiber = {
      $$typeof: NodeType.Root,
      props: { children: [component] },
      stateNode: container,
      callback
    }
    rootFiber.alternate = Reflection.getContainerFiber(rootFiber)
    scheduleWork(rootFiber)
  }

  const isContainer = (container: Instance) =>
    Reflection.hasContainerFiber(container)

  return {
    createContainer,
    updateContainer,
    isContainer
  }
}

export { scheduleWork, createRenderer }
