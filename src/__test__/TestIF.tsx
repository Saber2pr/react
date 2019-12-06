/*
 * @Author: saber2pr
 * @Date: 2019-12-06 15:28:47
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-06 17:28:45
 */
import React, { useCallBack, useState } from ".."

export const TestIf = () => {
  const [isShow, setState] = useState(true)
  const clickWithDeps = useCallBack(() => setState(!isShow), [isShow])
  const clickWithoutDes = useCallBack(() => setState(!isShow))
  return (
    <div>
      <div>TestIf Demo</div>
      {isShow && (
        <ol>
          <li>apple</li>
          <li>banana</li>
          <li>orange</li>
        </ol>
      )}
      <button onclick={clickWithDeps}>change(with deps)</button>
      <button onclick={clickWithoutDes}>change(without deps)</button>
    </div>
  )
}
