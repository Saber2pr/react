/*
 * @Author: saber2pr
 * @Date: 2019-12-10 17:13:15
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-10 17:59:23
 */
import React, { useRef, forwardRef, useImperativeHandle } from ".."

const Input = forwardRef<{ focus: Function }>(({}, ref) => {
  const input_ref = useRef<HTMLInputElement>()

  useImperativeHandle(ref, () => ({
    focus: () => {
      console.log("input focus!")
      input_ref.current.focus()
    }
  }))

  return <input type="text" ref={input_ref} />
})

export const TestForwardRef = () => {
  const ref = useRef<HTMLInputElement>()
  return (
    <div>
      <div>TestForwardRef Demo</div>
      <div>
        <Input ref={ref} />
      </div>
      <button onclick={() => ref.current.focus()}>focus the input</button>
    </div>
  )
}
