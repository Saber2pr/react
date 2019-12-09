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
  return <div>I'm a subscriber</div>
}

export const TestUseEffect = () => {
  const [state, setState] = useState(true)
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
