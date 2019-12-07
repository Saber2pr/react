# @saber2pr/react

> react in typescript.

```bash
yarn add @saber2pr/react
```

## Examples

1. CSR Demo

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

2. SSR Demo

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
