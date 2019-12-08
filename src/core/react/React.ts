/*
 * @Author: saber2pr
 * @Date: 2019-12-07 22:31:48
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 12:52:54
 */
import * as ReactFiberHooks from "../react-reconciler/ReactFiberHooks"
import { createRenderer } from "../react-reconciler/ReactFiberReconciler"
import { Children as ReactChildren } from "./ReactChildren"
import * as ReactElementType from "../shared/ReactElementType"
import * as ReactElement from "./ReactElement"
import { NodeType } from "../shared/ReactTypes"

namespace React {
  export const useCallBack = ReactFiberHooks.useCallBack
  export const useMemo = ReactFiberHooks.useMemo
  export const useReducer = ReactFiberHooks.useReducer
  export const useRef = ReactFiberHooks.useRef
  export const useState = ReactFiberHooks.useState

  export const createElement = ReactElement.createElement
  export const Children = ReactChildren
  export const Fragment = NodeType.Fragment
}

// TSX Typings

type Override<T, K extends keyof T, V> = {
  [P in keyof T]: P extends K ? V : T[P]
}

namespace React {
  export type Ref<T> = ReactElementType.Ref<T>
  export type Props<T> = ReactElementType.Props<T>

  type ExAttributes<T> = {
    dangerouslySetInnerHTML?: { __html: string }
  } & Props<T>

  export type HTMLAttributes<T extends HTMLElement> = Override<
    T,
    "style",
    CSSProperties
  > &
    ExAttributes<T>

  export type IntrinsicAttributes<T extends HTMLElement> = Partial<
    HTMLAttributes<T>
  >

  export type FC<T extends Object> = (props: T) => JSX.Element
  export type ComponentType<T> = FC<T>
  export type ReactElement = ReactElementType.ReactElement
  export type CSSProperties = Partial<CSSStyleDeclaration>
}

declare global {
  namespace JSX {
    type IntrinsicElements = {
      [K in keyof HTMLElementTagNameMap]: React.IntrinsicAttributes<
        HTMLElementTagNameMap[K]
      >
    }
    interface Element extends React.ReactElement {}
    interface ElementChildrenAttribute {
      children: {}
    }
    export import RefAttributes = React.Ref
  }
}

// hooks
const useCallBack = ReactFiberHooks.useCallBack
const useMemo = ReactFiberHooks.useMemo
const useReducer = ReactFiberHooks.useReducer
const useRef = ReactFiberHooks.useRef
const useState = ReactFiberHooks.useState

// TSX Types
type CSSProperties = React.CSSProperties
type Props<T extends HTMLElement> = React.Props<T>

// ReactElement
const Fragment = NodeType.Fragment

export default React
export {
  React,
  // hooks
  useCallBack,
  useMemo,
  useReducer,
  useRef,
  useState,
  // reconciler creator
  createRenderer,
  // TSX Types
  CSSProperties,
  Props,
  // ReactElement
  Fragment
}
