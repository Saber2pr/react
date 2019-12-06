/*
 * @Author: saber2pr
 * @Date: 2019-12-06 15:39:28
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 16:29:18
 */
import React, { useState, useMemo } from ".."

export const TestUseMemo = () => {
  const [state, setState] = useState(0)

  const expression = () => {
    return state + 1
  }

  const resultMemo = useMemo(expression)

  const result = expression()

  return (
    <div>
      <div>TestUseMemo Demo</div>
      <div>
        <ul>
          <li>state:{state}</li>
          <li>memoState:{resultMemo}</li>
          <li>no memoState:{result}</li>
        </ul>
        <button onclick={() => setState(state + 1)}>update</button>
      </div>
    </div>
  )
}
