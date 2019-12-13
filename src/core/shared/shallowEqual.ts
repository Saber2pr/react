/*
 * @Author: saber2pr
 * @Date: 2019-12-13 16:26:00
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-12-13 16:26:00
 */
import { is } from "./objectIs"

const hasOwnProperty = Object.prototype.hasOwnProperty

function shallowEqual(objA: object, objB: object): boolean {
  if (is(objA, objB)) {
    return true
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false
    }
  }

  return true
}

export { shallowEqual }
