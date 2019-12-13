/*
 * @Author: saber2pr
 * @Date: 2019-12-13 16:38:42
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-13 16:55:19
 */
import React, { useEffect, useState } from ".."

const Content = React.memo(({ content }: { content: string }) => {
  useEffect(() => {
    console.log("memo")
  })
  return <div>{content}</div>
})

const useForceUpdate = () => {
  const [tick, setTick] = useState(0)
  return () => setTick(tick + 1)
}

const TestMemo = () => {
  const [text, setText] = useState("awsl")
  const forceUpdate = useForceUpdate()
  return (
    <div>
      <div>TestMemo Demo</div>
      <div>
        <Content content={text} />
      </div>
      <div>
        <button onclick={() => setText("xmsl")}>setText1</button>
        <button onclick={() => setText("awsl")}>setText2</button>
      </div>
      <button onclick={forceUpdate}>forceUpdate</button>
    </div>
  )
}

export { TestMemo }
