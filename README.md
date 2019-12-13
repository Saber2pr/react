# @saber2pr/react

> react in typescript.

```bash
yarn add @saber2pr/react
```

## Examples

1. CSR

render Component to DOM in browser.

```tsx
import React, {
  useCallBack,
  useMemo,
  useReducer,
  useRef,
  useState
} from "@saber2pr/react"
import ReactDOM from "@saber2pr/react/lib/client"

function HelloMessage({ name }: { name: string }) {
  return <div>Hello {name}</div>
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById("container")
)
```

[examples](https://saber2pr.top/react/)

2. SSR

render Component to string.

```tsx
import React from "@saber2pr/react"
import ReactDOMServer from "@saber2pr/react/lib/server"

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

console.log(ReactDOMServer.renderToString(<App />))
```

3. Custom Render

create a custom renderer.

```tsx
import React from "@saber2pr/react"
import ReactFiberReconciler from "@saber2pr/react/lib/reconciler"

// use your host config.
const Renderer = ReactFiberReconciler(HostConfig)

const Store = {
  state: 0
}

const TestCreateRenderer = () => {
  const state = Store.state
  return (
    <div>
      <hr />
      <div>This is a UpdateContainer Test</div>
      <div>{state}</div>
      <button
        onclick={() => {
          Store.state++
          // update
          Renderer.updateContainer(<TestCreateRenderer />, container)
        }}
      >
        add
      </button>
    </div>
  )
}

// init render
Renderer.createContainer(
  <TestCreateRenderer />,
  document.getElementById("container")
)
```

---

### Dev

```bash
yarn install

yarn start

yarn dev
```

## License

MIT

> Author: saber2pr

## Reference

[facebook/react](https://github.com/facebook/react)
