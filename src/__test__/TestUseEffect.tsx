/*
 * @Author: saber2pr
 * @Date: 2019-12-09 16:16:29
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-09 16:43:52
 */
import React, { useEffect, useState } from ".."

const listeners = []

const Subscription = () => {
  useEffect(() => {
    listeners.push("A")
    console.log("mount", listeners)
    return () => {
      listeners.pop()
      console.log("unmount", listeners)
    }
  })
  const [state, setState] = useState(0)

  return (
    <div>
      <p>I'm a subscriber</p>
      {state}
      <button onclick={() => setState(state + 1)}>update hook</button>
    </div>
  )
}

export const TestUseEffect = () => {
  const [state, setState] = useState(true)
  useEffect(() => {
    console.log("willUpdate")
    return () => {
      console.log("didupdate")
    }
  })
  return (
    <div>
      <div>TestUseEffect Demo</div>
      <div>
        {state ? (
          <Subscription />
        ) : (
          <div>
            <div>cleaned</div>
            <p>cleaned2</p>
          </div>
        )}
      </div>
      <button onclick={() => setState(!state)}>place hook by host</button>
    </div>
  )
}
