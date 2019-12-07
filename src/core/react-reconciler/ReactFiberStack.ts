/*
 * @Author: saber2pr
 * @Date: 2019-12-07 15:15:13
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-12-07 15:15:13
 */
let index = 0

const getIndex = () => {
  const currentIndex = index
  index++
  return currentIndex
}

const resetIndex = () => {
  index = 0
}

export { getIndex, resetIndex }
