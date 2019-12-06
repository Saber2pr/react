/*
 * @Author: saber2pr
 * @Date: 2019-12-06 15:28:50
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 16:29:05
 */
import React, { useState } from ".."

export const TestList = () => {
  const [list, setList] = useState([1, 2, 3])
  return (
    <div>
      <div>TestList Demo</div>
      <ul>
        {list.map(l => (
          <li>{l}</li>
        ))}
      </ul>
      <button onclick={() => setList([1, 2, 3, 4, 5])}>append</button>
      <button onclick={() => setList([1])}>remove</button>
      <button onclick={() => setList([0, 1, 2, 3])}>insert</button>
    </div>
  )
}
