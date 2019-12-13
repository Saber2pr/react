/*
 * @Author: saber2pr
 * @Date: 2019-12-07 22:37:31
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 22:41:21
 */
import * as ReactDOMStringRenderer from "./ReactDOMStringRenderer"

namespace ReactDOMServer {
  export const renderToString = ReactDOMStringRenderer.renderToString
}

const renderToString = ReactDOMStringRenderer.renderToString

export { ReactDOMServer, renderToString }
export default ReactDOMServer
