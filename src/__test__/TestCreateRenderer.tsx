/*
 * @Author: saber2pr
 * @Date: 2019-12-06 20:38:27
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-13 12:57:50
 */
import React from ".."
import ReactFiberReconciler from "../reconciler"
import { HostConfig } from "../client"

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
          Renderer.updateContainer(<TestCreateRenderer />, container, () =>
            console.log(Store.state)
          )
        }}
      >
        add
      </button>
    </div>
  )
}

const container = document.createElement("div")
document.body.append(container)

// init render
Renderer.createContainer(<TestCreateRenderer />, container)
