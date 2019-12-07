/*
 * @Author: saber2pr
 * @Date: 2019-12-07 23:12:34
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-12-07 23:12:34
 */
import React from ".."

export const TestSetInnerHTML = () => {
  return (
    <div>
      <div>TestSetInnerHTML Demo</div>
      <div
        dangerouslySetInnerHTML={{
          __html: `<div>
          <strong>from dangerouslySetInnerHTML</strong>
        </div>`
        }}
      />
    </div>
  )
}
