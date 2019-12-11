/*
 * @Author: saber2pr
 * @Date: 2019-12-07 15:20:04
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-11 20:51:02
 */
let MAX_STACK_SIZE = 10000
const MAX_STACK_ID = Symbol("MAX_STACK_ID")

const setMaxStackSize = (size: number) => {
  MAX_STACK_SIZE = size
}

const resetStackSize = (id = "default") => {
  const size = TestStackSize[MAX_STACK_ID]
  if (size) {
    size[id] = 0
  }
}

const resetStack = () => {
  TestStackSize[MAX_STACK_ID] = {}
}

type StackSizeMap = { [id: string]: number }
type StackListener = (
  stackSize: { id: string; size: number },
  stackSizeMap: StackSizeMap
) => void
let listeners: StackListener[]

const watchStackSize = (callback: StackListener) => {
  if (!listeners) {
    listeners = []
  }

  listeners.push(callback)
  return () => {
    listeners.splice(listeners.indexOf(callback), 1)
  }
}

const TestStackSize = (id = "default") => {
  if (!TestStackSize[MAX_STACK_ID]) {
    resetStack()
  }
  const size = TestStackSize[MAX_STACK_ID]

  if (id in size) {
    size[id]++
  } else {
    size[id] = 1
  }

  if (size[id] > MAX_STACK_SIZE) {
    throw new Error(
      `STACK SIZE OVERFLOW: ${id}, try to reset the MAX_STACK_SIZE(${MAX_STACK_SIZE});
      method: React.setMaxCallSize()`
    )
  }

  if (listeners) {
    listeners.forEach(listener => listener({ id, size: size[id] }, size))
  }
}

export {
  setMaxStackSize,
  TestStackSize,
  resetStackSize,
  watchStackSize,
  resetStack
}
