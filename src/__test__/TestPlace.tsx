/*
 * @Author: saber2pr
 * @Date: 2019-12-06 15:28:44
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 16:41:58
 */
import React, { useState, useRef } from ".."

export const TestPlace = () => {
  const [state, setState] = useState(<p>to be placed</p>)
  const flag = useRef(true)
  const ref = useRef<HTMLDivElement>()
  return (
    <div>
      <div ref={ref}>TestPlace Demo</div>
      {state}
      <button
        onclick={() => {
          if (flag.current) {
            setState(
              <div>
                <header>header</header>
                <ul>
                  <li>content1</li>
                  <li>content2</li>
                </ul>
                <footer>footer</footer>
              </div>
            )
          } else {
            setState(<p>to be placed</p>)
          }
          flag.current = !flag.current
        }}
      >
        place
      </button>
      <button onclick={() => console.log(ref)}>console ref</button>
    </div>
  )
}
