/*
 * @Author: saber2pr
 * @Date: 2019-12-07 23:12:18
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-12-07 23:12:18
 */
import React from ".."
import ReactDOMServer from "../server"

const Content = ({ content }: { content: string }) => (
  <div>
    <div style={{ color: "red" }}>{content}</div>
    <button onclick={() => console.log("click")}>click</button>
  </div>
)

const App = () => {
  return (
    <div>
      <div>This is a SSR Demo</div>
      <Content content="has color" />
    </div>
  )
}

// run script: `yarn test`, then output the HTMLString
console.log(ReactDOMServer.renderToString(<App />))
