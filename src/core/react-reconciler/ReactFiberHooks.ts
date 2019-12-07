/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:11:09
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 15:19:09
 */
import { getCurrentWorkInProgress } from "./ReactFiberWorkLoop"
import { scheduleWork } from "./ReactFiberReconciler"
import { getIndex } from "./ReactFiberStack"
import { is } from "../shared/objectIs"

function areHookInputsEqual(
  nextDeps: readonly any[],
  prevDeps: readonly any[] | null
) {
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

function useState<T>(initialState: T): [T, (state: T) => void] {
  const id = getIndex()
  const fiber = getCurrentWorkInProgress()

  const memoizedState: object = fiber.memoizedState || {}
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

function useRef<T>(value?: T) {
  const [state] = useState({ current: value })
  return state
}

function useCallBack<T extends Function>(
  callback: T,
  deps: readonly any[] = []
) {
  const ref = useRef(callback)
  const prevDepsRef = useRef(null)
  if (areHookInputsEqual(deps, prevDepsRef.current)) {
    return ref.current
  } else {
    ref.current = callback
    prevDepsRef.current = deps
    return callback
  }
}

function useMemo<T>(memoFunc: () => T, deps: readonly any[] = []) {
  const ref = useRef<T>(null)
  const prevDepsRef = useRef(null)
  if (areHookInputsEqual(deps, prevDepsRef.current)) {
    return ref.current
  } else {
    ref.current = memoFunc()
    prevDepsRef.current = deps
    return ref.current
  }
}

export { useCallBack, useMemo, useReducer, useRef, useState }
