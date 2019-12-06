/*
 * @Author: saber2pr
 * @Date: 2019-12-06 16:44:19
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 19:37:06
 */
import { HostConfig } from "./ReactDefaults"
import { NodeType, Fiber } from "./ReactTypes"
import {
  createElement as ReactCreateElement,
  Children as ReactChildren
} from "./ReactFiberElement"
import {
  useCallBack as ReactUseCallBack,
  useMemo as ReactUseMemo,
  useState as ReactUseState,
  useRef as ReactUseRef,
  useReducer as ReactUseReducer
} from "./ReactFiberHooks"
import { createRenderer as ReactCreateRenderer } from "./ReactFiberReconciler"

const renderer = ReactCreateRenderer(HostConfig)

export namespace React {
  export const render = (
    component: any,
    container: HTMLElement,
    callback?: Function
  ) => {
    const rootFiber: Fiber = {
      $$typeof: NodeType.Root,
      stateNode: container,
      props: { children: [component] },
      callback
    }
    renderer(rootFiber)
  }

  export const createElement = ReactCreateElement

  export const Children = ReactChildren

  export const useCallBack = ReactUseCallBack
  export const useMemo = ReactUseMemo
  export const useReducer = ReactUseReducer
  export const useRef = ReactUseRef
  export const useState = ReactUseState
  export const createRenderer = ReactCreateRenderer
}

// TSX Typings

type CSSStyle = Partial<CSSStyleDeclaration>

type Override<T, K extends keyof T, V> = {
  [P in keyof T]: P extends K ? V : T[P]
}

type Dict = { [k: string]: any }

export namespace React {
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
const createRenderer = ReactCreateRenderer

export default React
export { useCallBack, useMemo, useReducer, useRef, useState, createRenderer }
