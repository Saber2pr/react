/*
 * @Author: saber2pr
 * @Date: 2019-12-10 20:16:31
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-10 20:19:33
 */
import { ReactContext, Provider, Consumer } from "../shared/ReactElementType"

function createContext<T extends Object>(context: T): ReactContext<T> {
  const Provider: Provider<T> = ({ children, value }) => {
    context = value
    return children
  }
  const Consumer: Consumer<T> = ({ children }) => {
    return children(context)
  }
  return {
    Provider,
    Consumer,
    value: context
  }
}

export { createContext }
