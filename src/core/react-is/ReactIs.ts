/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:13:21
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 14:30:34
 */
import { Fiber, NodeType } from "../shared/ReactTypes"

const isSameTag = (element: Fiber, oldFiber: Fiber) =>
  element.tag === oldFiber.tag

const isHookFiber = (fiber: Fiber): boolean => fiber.$$typeof === NodeType.Hook

const isRootFiber = (fiber: Fiber): fiber is Fiber =>
  fiber.$$typeof === NodeType.Root

const isHostFiber = (fiber: Fiber): fiber is Fiber =>
  fiber.$$typeof === NodeType.Host

const isTextFiber = (fiber: Fiber): fiber is Fiber =>
  fiber.$$typeof === NodeType.Text

const isFragmentFiber = (fiber: Fiber): fiber is Fiber =>
  fiber.$$typeof === NodeType.Fragment

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
  isTextFiber,
  isFragmentFiber
}
