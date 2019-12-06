# @saber2pr/react

> react in typescript.

```bash
yarn add @saber2pr/react
```

## Examples

```tsx
import React, {
  useCallBack,
  useMemo,
  useReducer,
  useRef,
  useState
} from "@saber2pr/react"

function HelloMessage({ name }: { name: string }) {
  return <div>Hello {name}</div>
}

React.render(
  <HelloMessage name="Taylor" />,
  document.getElementById("container")
)
```

[examples](https://saber2pr.top/react/)

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
