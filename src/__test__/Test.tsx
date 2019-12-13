/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:41:19
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-13 16:38:54
 */
import React, { useState, useEffect, useRef } from ".."
import ReactDOM from "../client"
import { TestIf } from "./TestIF"
import { TestList } from "./TestList"
import { TestPlace } from "./TestPlace"
import { TestUseMemo } from "./TestUseMemo"
import { TestUseReducer } from "./TestUseReducer"
import { TestChildren } from "./TestChildren"
import { TestStyle } from "./TestStyle"
import "./TestCreateRenderer"
import { TestSetInnerHTML } from "./TestSetInnerHTML"
import { TestFragment } from "./TestFragment"
import { TestUseEffect } from "./TestUseEffect"
import { TestForwardRef } from "./TestForwardRef"
import { TestContext } from "./TestContext"
import { TestLazy } from "./TestLazy"
import { TestMemo } from "./TestMemo"

const Store = {
  state: 0
}

const TestRerenderRoot = () => {
  const state = Store.state
  return (
    <div>
      <div>This is a RerenderRoot Test</div>
      <div>{state}</div>
      <button
        onclick={() => {
          Store.state++
          ReactDOM.render(<App />, document.getElementById("root"))
        }}
      >
        add
      </button>
    </div>
  )
}

const Tests = [
  TestRerenderRoot,
  TestIf,
  TestList,
  TestPlace,
  TestUseMemo,
  TestUseReducer,
  TestChildren,
  TestStyle,
  TestSetInnerHTML,
  TestFragment,
  TestUseEffect,
  TestForwardRef,
  TestContext,
  TestLazy,
  TestMemo
]

const App = () => {
  const [state, setState] = useState(false)
  useWatchStack(state)
  return (
    <div>
      <header>
        <h1>React Features Tests</h1>
      </header>
      <main>
        <section>
          performance analysis:
          <input
            type="checkbox"
            oninput={event => setState(event.target["checked"])}
          />
        </section>
        <section>
          <ol>
            {Tests.map((Test, i) => (
              <li>
                {i !== 0 && <hr />}
                <Test />
              </li>
            ))}
          </ol>
        </section>
      </main>
      <footer>
        <i>
          by <a href="https://saber2pr.top/">saber2pr</a>
        </i>
      </footer>
    </div>
  )
}

// if need analysis the performance.
const useWatchStack = (shouldWatchStack = false) => {
  const cancel = useRef<Function>()
  useEffect(() => {
    if (shouldWatchStack) {
      cancel.current = React.Stack.watchStackSize(console.log)
    } else {
      if (cancel.current) {
        cancel.current()
        cancel.current = null
      }
    }
  }, [shouldWatchStack])
}

// open '../../index.html' in browser.
ReactDOM.render(<App />, document.getElementById("root"))
