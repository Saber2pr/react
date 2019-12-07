/*
 * @Author: saber2pr
 * @Date: 2019-12-07 15:21:04
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-12-07 15:21:04
 */
export const is = (x: any, y: any) =>
  (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y)
