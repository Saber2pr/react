/*
 * @Author: saber2pr
 * @Date: 2019-12-13 16:35:23
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-13 16:57:09
 */
import React from "./React"
import { shallowEqual } from "../shared/shallowEqual"
import { useRef } from "../react-reconciler/ReactFiberHooks"

// omit key `children` in props compared.
const pickProps = (props: Object) =>
  Object.fromEntries(Object.entries(props).filter(([k]) => k !== "children"))

function memo<P extends Object>(
  component: React.FC<P>,
  compare?: (oldProps: P, newProps: P) => boolean
) {
  const Component = (props: P) => {
    const newProps = pickProps(props) as P
    const prevProps = useRef<P>(null)
    const result = useRef<JSX.Element>(null)

    if (compare) {
      if (compare(prevProps.current, newProps)) {
        return result.current
      }
    } else {
      if (shallowEqual(prevProps.current, newProps)) {
        return result.current
      }
    }

    prevProps.current = newProps
    result.current = component(props)
    return result.current
  }

  return Component
}

export { memo }
