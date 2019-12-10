/*
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 12:32:58
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-10 18:00:34
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

type FC<T extends Object> = (props: T, ...params: any[]) => JSX.Element
type RefForwardingComponent<T, P> = (props: P, ref: Ref<T>) => JSX.Element

export { ReactElement, Ref, Props, FC, RefForwardingComponent }
