/*
 * @Author: saber2pr
 * @Date: 2019-12-06 17:32:18
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 23:29:26
 */
import React from ".."

const ListFromProps = ({ list }: { list: number[] }) => (
  <ul>
    {list.map(l => (
      <li>{l}</li>
    ))}
  </ul>
)

const ListFromChildren = ({ children }: { children: number[] }) => (
  <ul>
    {children.map(l => (
      <li>{l}</li>
    ))}
  </ul>
)

const UseChildren = ({ children }: React.Props<any>) => {
  return <div>{children}</div>
}

export const TestChildren = () => {
  return (
    <div>
      <div>TestChildren</div>
      <ListFromProps list={[1, 2, 3]} />
      <ListFromChildren>{[4, 5, 6]}</ListFromChildren>
      <UseChildren>this is a single string child</UseChildren>
    </div>
  )
}
