/*
 * @Author: saber2pr
 * @Date: 2019-12-06 16:44:19
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 22:41:29
 */
import { HostConfig } from "./ReactDOMHostConfig"
import { createRenderer as ReactCreateRenderer } from "../../react-reconciler/ReactFiberReconciler"

const renderer = ReactCreateRenderer(HostConfig)

namespace ReactDOM {
  export const render = (
    component: JSX.Element,
    container: HTMLElement,
    callback?: Function
  ) => {
    const isContainer = renderer.isContainer(container)
    if (isContainer) {
      renderer.updateContainer(component, container, callback)
    } else {
      renderer.createContainer(component, container, callback)
    }
  }
}

export { ReactDOM, HostConfig }
export default ReactDOM
