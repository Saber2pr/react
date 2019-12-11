/*
 * @Author: saber2pr
 * @Date: 2019-12-11 16:22:14
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-12-11 16:22:14
 */
import React, { Suspense, lazy, useState } from ".."

const timeout = (delta = 1000) =>
  new Promise(resolve => setTimeout(resolve, delta))

const Content = lazy(async () => {
  await timeout(2000)
  console.log("lazy-component loaded.")
  return {
    default: () => (
      <div>
        <p>lazy content</p>
      </div>
    )
  }
})

const TestLazy = () => {
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
      <button onclick={() => setState(!state)}>
        {state ? "unmount the lazy" : "mount the lazy"}
      </button>
    </div>
  )
}

export { TestLazy }
