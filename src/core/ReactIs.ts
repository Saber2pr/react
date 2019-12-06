/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:13:21
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 17:14:54
 */
import { Fiber, NodeType } from "./ReactTypes"

export const isHostParent = (fiber: Fiber): boolean =>
  fiber.$$typeof === NodeType.Host || fiber.$$typeof === NodeType.Root

export const isHost = (fiber: Fiber): boolean =>
  fiber.$$typeof === NodeType.Host || fiber.$$typeof === NodeType.Text

export const isSameTag = (element: Fiber, oldFiber: Fiber) =>
  element.tag === oldFiber.tag
