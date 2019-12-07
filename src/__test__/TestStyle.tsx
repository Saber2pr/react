/*
 * @Author: saber2pr
 * @Date: 2019-12-06 19:52:53
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 22:43:24
 */
import React, { useState } from ".."

export const TestStyle = () => {
  const [state, setState] = useState("red")
  return (
    <div>
      <div>TestStyle Demo</div>
      <div style={{ color: state }}>what color it is now?</div>
      <button onclick={() => setState("blue")}>change</button>
    </div>
  )
}
