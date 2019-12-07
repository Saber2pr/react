/*
 * @Author: saber2pr
 * @Date: 2019-12-07 21:38:02
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-07 23:00:32
 */
type Ref<T extends HTMLElement> =
  | {
      current: T
    }
  | ((value: T) => void)

interface Props<T extends HTMLElement> {
  ref?: Ref<T>
  children?: any
  [compatibleProps: string]: any
}

type ReactElement = {
  $$typeof: symbol
  props: Props<any>
  tag: any
}

export { ReactElement, Ref, Props }
