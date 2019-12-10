/*
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 12:32:58
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-10 20:35:19
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

type FC<T extends Object> = (props: T, ...params: any[]) => ReactElement
type RefForwardingComponent<T, P> = (props: P, ref: Ref<T>) => ReactElement

type Provider<T> = (props: {
  value?: T
  children?: ReactElement
}) => ReactElement

type Consumer<T> = (props: {
  children?: (context: T) => ReactElement
}) => ReactElement

type ReactContext<T> = {
  Provider: Provider<T>
  Consumer: Consumer<T>
  value: T
}

type LazyComponent<T> = (props: T) => Promise<{ default: JSX.Element }>

export {
  ReactElement,
  Ref,
  Props,
  FC,
  RefForwardingComponent,
  Provider,
  Consumer,
  ReactContext,
  LazyComponent
}
