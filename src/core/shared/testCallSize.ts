/*
 * @Author: saber2pr
 * @Date: 2019-12-07 15:20:04
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-12-07 15:20:04
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

export { setMaxCallSize, TestCallSize }
