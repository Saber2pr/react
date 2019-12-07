/*
 * @Author: saber2pr
 * @Date: 2019-12-07 15:33:32
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 15:49:29
 */
import {
  useCallBack as ReactUseCallBack,
  useMemo as ReactUseMemo,
  useState as ReactUseState,
  useRef as ReactUseRef,
  useReducer as ReactUseReducer
} from "./react-reconciler/ReactFiberHooks"
import { createRenderer } from "./react-reconciler/ReactFiberReconciler"
import { Children as ReactChildren } from "./react/ReactChildren"
import { createElement as ReactCreateElement } from "./react-dom/ReactDOM"

namespace React {
  export const useCallBack = ReactUseCallBack
  export const useMemo = ReactUseMemo
  export const useReducer = ReactUseReducer
  export const useRef = ReactUseRef
  export const useState = ReactUseState

  export const createElement = ReactCreateElement
  export const Children = ReactChildren
}

// TSX Typings

type CSSStyle = Partial<CSSStyleDeclaration>

type Override<T, K extends keyof T, V> = {
  [P in keyof T]: P extends K ? V : T[P]
}

type Dict = { [k: string]: any }

namespace React {
  export type Ref<T extends HTMLElement> =
    | {
        current: T
      }
    | ((value: T) => void)

  export interface VNodeAttributes<T extends HTMLElement> {
    ref?: Ref<T>
    children?: any
    dangerouslySetInnerHTML?: { __html: string }
    [compatibleProps: string]: any
  }

  export type Attributes<T extends HTMLElement> = Override<
    T,
    "style",
    CSSStyle
  > &
    React.VNodeAttributes<T>

  export type IntrinsicAttributes<T extends HTMLElement> = Partial<
    React.Attributes<T>
  >

  export type FC<T extends Dict = Dict> = (props: T) => JSX.Element
  export type ComponentType<T> = FC<T>
}

declare global {
  namespace JSX {
    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: React.IntrinsicAttributes<
        HTMLElementTagNameMap[K]
      >
    }
    interface Element {}
    interface ElementChildrenAttribute {
      children: {}
    }
    export import RefAttributes = React.Ref
  }
}

const useCallBack = ReactUseCallBack
const useMemo = ReactUseMemo
const useReducer = ReactUseReducer
const useRef = ReactUseRef
const useState = ReactUseState

export default React
export {
  React,
  useCallBack,
  useMemo,
  useReducer,
  useRef,
  useState,
  createRenderer
}
export * from "./react-dom/ReactDOM"
