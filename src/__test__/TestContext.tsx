/*
 * @Author: saber2pr
 * @Date: 2019-12-10 20:27:38
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-10 20:37:35
 */
import React from ".."

const Context = React.createContext({ name: "" })

const Parent = ({ children }: { children: JSX.Element }) => {
  return <Context.Provider value={{ name: "qwq" }}>{children}</Context.Provider>
}

const Child = () => {
  return (
    <Context.Consumer>
      {({ name }) => {
        return <p>{name}</p>
      }}
    </Context.Consumer>
  )
}

const TestContext = () => {
  return (
    <div>
      <div>TestContext Demo</div>
      <div>
        <Parent>
          <div>
            <Child />
          </div>
        </Parent>
      </div>
    </div>
  )
}

export { TestContext }
