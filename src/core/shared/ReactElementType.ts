/*
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 12:32:58
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 12:33:31
 */
type Ref<T> =
  | {
      current: T
    }
  | ((value: T) => void)

interface Props<T> {
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
