/*
 * @Author: saber2pr
 * @Date: 2019-12-06 16:44:19
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 22:41:29
 */
import { HostConfig } from "./ReactDOMHostConfig"
import ReactFiberReconciler from "../../react-reconciler/ReactFiberReconciler"

const renderer = ReactFiberReconciler(HostConfig)

namespace ReactDOM {
  export const render = (
    component: JSX.Element,
    container: HTMLElement,
    callback?: Function
  ) => {
    if (container === null) {
      throw new Error("Target container is not a DOM element.")
    } else {
      const isContainer = renderer.isContainer(container)
      if (isContainer) {
        renderer.updateContainer(component, container, callback)
      } else {
        renderer.createContainer(component, container, callback)
      }
    }
  }
}

export { ReactDOM, HostConfig }
export default ReactDOM
