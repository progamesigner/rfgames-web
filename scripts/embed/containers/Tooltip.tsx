import * as m from 'mithril'

import { CSSProperties } from 'typestyle/lib/types'

import { bindEventListener, UnbindEventListener } from '../../libs'

import { hideTooltip } from '../actions'
import { Tooltip } from '../components'
import { HasStoreAttributes, HasWindowAttributes } from '../types'
import { px, transform, translate3d } from '../libs'

const borderWidth = 1
const borderGap = 8

type TooltipContainerAttributes = m.Attributes & HasStoreAttributes & HasWindowAttributes

function calculateStyle(
  window: Window,
  container: HTMLElement,
  {
    clientX: x,
    clientY: y
  }: MouseEvent
): CSSProperties {
  return {
    transform: transform(translate3d(
      px(Math.min(
        x,
        window.innerWidth - container.offsetWidth - (2 * borderGap) - borderWidth
      )),
      px(Math.min(
        y,
        window.innerHeight - container.offsetHeight - (2 * borderGap) - borderWidth
      )),
      0
    ))
  }
}

export class TooltipContainer implements m.Component<TooltipContainerAttributes> {
  protected container: Element | null = null;
  protected unbindEvent: UnbindEventListener | null= null;
  protected style: CSSProperties | null = null;

  public oncreate({ attrs }: m.VnodeDOM<TooltipContainerAttributes>): void {
    const {
      window
    } = attrs

    this.style = {
      opacity: 0, // @note: avoid wrong positioned tooltip shown
    }

    this.unbindEvent = bindEventListener(window, 'mousemove', event => {
      window.requestAnimationFrame(() => {
        if (this.container) {
          const style = calculateStyle(
            window,
            this.container as HTMLElement,
            event as MouseEvent
          )

          this.style = {
            ...this.style,
            ...style,
            opacity: 1
          }
          m.redraw()
        }
      })
    })
  }

  public onremove(): void {
    if (this.unbindEvent) {
      this.unbindEvent()
      this.unbindEvent = null
    }
    this.container = null
  }

  public onupdate({ dom }: m.VnodeDOM<TooltipContainerAttributes>): void {
    this.container = dom || null
  }

  public view({ attrs }: m.Vnode<TooltipContainerAttributes>): m.Children {
    const {
      className,
      store
    } = attrs

    const {
      tooltip
    } = store.getState()

    const hide = () => store.dispatch(hideTooltip())

    return <Tooltip
      className={className}
      ontouchend={hide}
      style={this.style}
      {...tooltip}
    ></Tooltip>
  }
}
