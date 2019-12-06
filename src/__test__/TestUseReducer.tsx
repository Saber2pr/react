/*
 * @Author: saber2pr
 * @Date: 2019-12-06 15:39:28
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 16:29:24
 */
import React, { useReducer } from ".."

export const TestUseReducer = () => {
  const [state, dispatch] = useReducer<
    { count: number },
    { type: "add" | "sub" }
  >(
    (state, action) => {
      switch (action.type) {
        case "add":
          return { count: state.count + 1 }
        case "sub":
          return { count: state.count - 1 }
        default:
          return state
      }
    },
    { count: 0 },
    { type: "add" }
  )

  return (
    <div>
      <div>TestUseReducer Demo</div>
      <div>
        <div>state:{state.count}</div>
        <button onclick={() => dispatch({ type: "add" })}>add</button>
        <button onclick={() => dispatch({ type: "sub" })}>sub</button>
      </div>
    </div>
  )
}
