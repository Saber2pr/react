/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:41:19
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-12-06 17:41:19
 */
import { React } from ".."
import { TestIf } from "./TestIF"
import { TestList } from "./TestList"
import { TestPlace } from "./TestPlace"
import { TestUseMemo } from "./TestUseMemo"
import { TestUseReducer } from "./TestUseReducer"
import { TestChildren } from "./TestChildren"

const Tests = [
  TestIf,
  TestList,
  TestPlace,
  TestUseMemo,
  TestUseReducer,
  TestChildren
]

const App = () => {
  return (
    <div>
      <header>
        <h1>React Features Tests</h1>
      </header>
      <main>
        <ol>
          {Tests.map((Test, i) => (
            <li>
              {i !== 0 && <hr />}
              <Test />
            </li>
          ))}
        </ol>
      </main>
      <footer>
        <i>
          by <a href="https://saber2pr.top/">saber2pr</a>
        </i>
      </footer>
    </div>
  )
}

React.render(<App />, document.body)
