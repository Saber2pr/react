import React, { Suspense, lazy, useState } from ".."

const timeout = (delta = 1000) =>
  new Promise(resolve => setTimeout(resolve, delta))

const Content = lazy(async () => {
  await timeout(2000)
  console.log("lazy-component loaded.")
  return {
    default: (
      <div>
        <p>lazy content</p>
      </div>
    )
  }
})

const useForceUpdate = () => {
  const [tick, setNextTick] = useState(0)
  return () => setNextTick(tick + 1)
}

const TestLazy = () => {
  const forceUpdate = useForceUpdate()
  const [state, setState] = useState(true)
  return (
    <div>
      <div>TestLazy Demo</div>
      <div>
        {state ? (
          <Suspense fallback={<p>loading...</p>}>
            <Content />
          </Suspense>
        ) : (
          <p>lazy is unmount</p>
        )}
      </div>
      <button onclick={forceUpdate}>force update</button>
      <button onclick={() => setState(!state)}>unmount the lazy</button>
    </div>
  )
}

export { TestLazy }
