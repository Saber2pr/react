/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:13:21
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 16:10:55
 */
import { Fiber, NodeType } from "../shared/ReactTypes"

const isSameTag = (element: Fiber, oldFiber: Fiber) =>
  element.tag === oldFiber.tag

const isHookFiber = (fiber: Fiber): boolean => fiber.$$typeof === NodeType.Hook

const isRootFiber = (fiber: Fiber): boolean => fiber.$$typeof === NodeType.Root

const isHostFiber = (fiber: Fiber): boolean => fiber.$$typeof === NodeType.Host

const isTextFiber = (fiber: Fiber): boolean => fiber.$$typeof === NodeType.Text

const isHostParentFiber = (fiber: Fiber): boolean =>
  isHostFiber(fiber) || isRootFiber(fiber)

const isHostChildFiber = (fiber: Fiber): boolean =>
  isHostFiber(fiber) || isTextFiber(fiber)

export {
  isSameTag,
  isHostParentFiber,
  isHostChildFiber,
  isHookFiber,
  isRootFiber,
  isHostFiber,
  isTextFiber
}
