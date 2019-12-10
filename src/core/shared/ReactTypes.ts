/*
 * @Author: saber2pr
 * @Date: 2019-12-06 16:47:37
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-10 17:24:55
 */
import { Props } from "./ReactElementType"

namespace NodeType {
  export const Text = Symbol("Text")
  export const Fragment = Symbol("DocumentFragment")
  export const Root = Symbol("Container")
  export const Hook = Symbol("Hook")
  export const Host = Symbol("Host")
  export const Unknown = Symbol("Unknown")
}

namespace EffectType {
  export const Place = Symbol("Place")
  export const Update = Symbol("Update")
  export const Delete = Symbol("Delete")
  export const Create = Symbol("Create")

  export const getEffectLevel = (effectType: symbol): number => {
    switch (effectType) {
      case Create:
        return 4
      case Update:
        return 3
      case Place:
        return 2
      case Delete:
        return 1
      default:
        return 0
    }
  }
}

interface Instance {}
interface TextInstance {}
interface FragmentInstance {}

type Effect = () => (() => void) | void

interface MemoizedState {
  in?: Effect[]
  out?: Effect[]
  [id: number]: any
}

type Fiber = {
  tag?: any
  $$typeof?: symbol
  props?: Props<any>
  memoizedState?: MemoizedState
  stateNode?: Instance | TextInstance | FragmentInstance
  return?: Fiber
  child?: Fiber
  sibling?: Fiber
  alternate?: Fiber
  effectType?: symbol
  effectList?: Fiber[]
  callback?: Function
  [key: string]: any
}

export {
  NodeType,
  EffectType,
  Instance,
  TextInstance,
  FragmentInstance,
  Effect,
  MemoizedState,
  Fiber
}
