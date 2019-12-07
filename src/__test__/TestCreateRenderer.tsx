/*
 * @Author: saber2pr
 * @Date: 2019-12-06 20:38:27
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 22:43:47
 */
import React, { createRenderer } from ".."
import { HostConfig } from "../client"

const renderer = createRenderer(HostConfig)

const container = document.createElement("div")

document.body.append(container)

const Store = {
  state: 0
}

export const TestCreateRenderer = () => {
  const state = Store.state
  return (
    <div>
      <hr />
      <div>This is a UpdateContainer Test</div>
      <div>{state}</div>
      <button
        onclick={() => {
          Store.state++
          renderer.updateContainer(<TestCreateRenderer />, container, () =>
            console.log(Store.state)
          )
        }}
      >
        add
      </button>
    </div>
  )
}

renderer.createContainer(<TestCreateRenderer />, container)
