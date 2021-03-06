/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:11:09
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-10 21:01:24
 */
import { getCurrentWorkInProgress } from "./ReactFiberWorkLoop"
import { scheduleWork } from "./ReactFiberReconciler"
import { getIndex } from "./ReactFiberStack"
import { is } from "../shared/objectIs"
import { Effect, MemoizedState } from "../shared/ReactTypes"
import { MutableRefObject, ReactContext, RefObject } from "../shared/ReactElementType"

const areHookInputsEqual = (
  nextDeps: readonly any[],
  prevDeps: readonly any[] | null
) => {
  if (prevDeps === null) {
    return false
  }
  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (is(nextDeps[i], prevDeps[i])) {
      continue
    }
    return false
  }
  return true
}

const useState = <T>(initialState: T): [T, (state: T) => void] => {
  const id = getIndex()
  const fiber = getCurrentWorkInProgress()

  const memoizedState: MemoizedState = fiber.memoizedState || {}
  if (!(id in memoizedState)) {
    memoizedState[id] = initialState
    fiber.memoizedState = memoizedState
  }

  const setState = (state: T) => {
    if (state === memoizedState[id]) return
    memoizedState[id] = state
    scheduleWork(fiber)
  }

  return [memoizedState[id], setState]
}

const useReducer = <S, A>(
  initReducer: (state: S, action: A) => S,
  initialState: S,
  initAction?: A
): [S, (action: A) => void] => {
  const reducer = useCallBack(initReducer)
  const initState = initAction
    ? reducer(initialState, initAction)
    : initialState
  const [state, setState] = useState(initState)
  const dispatch = (action: A) => setState(reducer(state, action))
  return [state, dispatch]
}

const useRef = <T>(value?: T): MutableRefObject<T> => {
  const [state] = useState({ current: value })
  return state
}

const useCallBack = <T extends Function>(
  callback: T,
  deps?: readonly any[]
) => {
  const ref = useRef(callback)
  const prevDepsRef = useRef(null)
  if (deps && areHookInputsEqual(deps, prevDepsRef.current)) {
    return ref.current
  } else {
    ref.current = callback
    prevDepsRef.current = deps
    return callback
  }
}

const useMemo = <T>(memoFunc: () => T, deps?: readonly any[]) => {
  const ref = useRef<T>(null)
  const prevDepsRef = useRef(null)
  if (deps && areHookInputsEqual(deps, prevDepsRef.current)) {
    return ref.current
  } else {
    ref.current = memoFunc()
    prevDepsRef.current = deps
    return ref.current
  }
}

const pushEffect = (effect: MemoizedState | null, create: Effect) => {
  const sideEffect = effect || {}
  const updateQueue = sideEffect.in || []
  updateQueue.push(create)
  sideEffect.in = updateQueue
  return sideEffect
}

const useEffect = (create: Effect, deps?: readonly any[]) => {
  const fiber = getCurrentWorkInProgress()
  const effect = fiber.memoizedState
  const prevDepsRef = useRef(null)
  if (deps && areHookInputsEqual(deps, prevDepsRef.current)) {
    return
  } else {
    prevDepsRef.current = deps
    fiber.memoizedState = pushEffect(effect, create)
  }
}

const useImperativeHandle = <T, R extends T>(
  ref: RefObject<T>,
  creator: () => R,
  deps?: readonly any[]
) => {
  const prevDepsRef = useRef(null)
  if (deps && areHookInputsEqual(deps, prevDepsRef.current)) {
    return
  } else {
    prevDepsRef.current = deps
    const ret = creator()
    if (typeof ref === "function") {
      ref(ret)
    } else {
      ref.current = ret
    }
  }
}

const useContext = <T>(context: ReactContext<T>): T => context.value

export {
  useCallBack,
  useMemo,
  useReducer,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  useContext
}
