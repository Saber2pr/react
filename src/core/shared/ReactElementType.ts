/*
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-08 12:32:58
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-10 20:35:19
 */
interface MutableRefObject<T> {
  current: T;
}

type RefObject<T> = MutableRefObject<T> | ((value: T) => void)

interface Props<T> {
  ref?: RefObject<T>
  children?: any
  [compatibleProps: string]: any
}

type ReactElement = {
  $$typeof: symbol
  props: Props<any>
  tag: any
}

type FC<T extends Object> = (props: T, ...params: any[]) => ReactElement
type RefForwardingComponent<T, P> = (props: P, ref: MutableRefObject<T>) => ReactElement

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

type LazyComponent<T> = (props: T) => Promise<{ default: () => JSX.Element }>

export {
  ReactElement,
  MutableRefObject,
  RefObject,
  Props,
  FC,
  RefForwardingComponent,
  Provider,
  Consumer,
  ReactContext,
  LazyComponent
}
