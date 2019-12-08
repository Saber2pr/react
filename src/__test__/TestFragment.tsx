/*
 * @Author: saber2pr
 * @Date: 2019-12-08 11:09:47
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 11:24:14
 */
import React, { useState } from ".."

const Content = () => {
  const [state, setState] = useState(0)
  return (
    <>
      <p>in fragment1</p>
      <p>in fragment2</p>
      <>
        <div>fragment in fragment</div>
        {state}
        <button onclick={() => setState(state + 1)}>add</button>
      </>
    </>
  )
}

export const TestFragment = () => {
  return (
    <div>
      <div>TestFragment Demo</div>
      <div>
        <Content />
      </div>
    </div>
  )
}
