/*
 * @Author: saber2pr
 * @Date: 2019-12-10 17:42:24
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-12-10 18:00:46
 */
import { MutableRefObject, RefForwardingComponent } from "../shared/ReactElementType"

const forwardRef = <T extends Object, P extends Object = {}>(
  FC: RefForwardingComponent<T, P>
) => ({ ref, ...props }: { ref: MutableRefObject<T> } & P) => FC(props as any, ref)

export { forwardRef }
