/*
 * @Author: saber2pr
 * @Date: 2019-12-10 20:01:34
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-10 22:00:33
 */
import {
  useState,
  useContext,
  useEffect
} from "../react-reconciler/ReactFiberHooks"
import { createContext } from "./ReactContext"
import { LazyComponent } from "../shared/ReactElementType"

const SuspenseContext = createContext<{
  fallback?: JSX.Element
  result?: JSX.Element
}>({})

const lazy = <T extends Object>(lazyComponent: LazyComponent<T>) => (
  props: T
) => {
  const Context = useContext(SuspenseContext)
  const { fallback, result } = Context

  const [state, setState] = useState(fallback)

  useEffect(() => {
    //TODO: when it will unmount, cancel the render.
    if (result) {
      setState(result)
    } else {
      lazyComponent(props).then(({ default: render }) => {
        const result = render()
        setState(result)
        Context.result = result
      })
    }
  }, [Context.fallback])

  return state
}

const Suspense = ({
  fallback,
  children
}: {
  fallback: JSX.Element
  children?: JSX.Element
}) => {
  const Context = useContext(SuspenseContext)
  Context.fallback = fallback
  return children
}

export { Suspense, lazy }
