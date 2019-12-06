/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:13:32
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 17:16:43
 */
let MAX_CALL_SIZE = 10000

const setMaxCallSize = (size: number) => {
  MAX_CALL_SIZE = size
}

const TestCallSize = (id = "default") => {
  if (!TestCallSize["size"]) {
    TestCallSize["size"] = {}
  }
  const size = TestCallSize["size"]

  if (id in size) {
    size[id]++
  } else {
    size[id] = 1
  }

  if (size[id] > MAX_CALL_SIZE) {
    throw new Error(
      `CALL SIZE OVERFLOW: ${id}, try to reset the MAX_CALL_SIZE(${MAX_CALL_SIZE})`
    )
  }
}

const is = (x: any, y: any) =>
  (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y)

function areHookInputsEqual(
  nextDeps: readonly any[],
  prevDeps: readonly any[] | null
) {
  if (prevDeps === null) {
    return false
  }
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (is(nextDeps[i], prevDeps[i])) {
      continue
    }
    return false
  }
  return true
}

let index = 0

const getIndex = () => {
  const currentIndex = index
  index++
  return currentIndex
}

const resetIndex = () => {
  index = 0
}

export {
  setMaxCallSize,
  TestCallSize,
  is,
  areHookInputsEqual,
  getIndex,
  resetIndex
}
