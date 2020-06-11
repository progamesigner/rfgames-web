import * as m from 'mithril'

import { CSSProperties } from 'typestyle/lib/types'

import { bindEventListener, UnbindEventListener } from '../../libs'

import { hideTooltip } from '../actions'
import { Tooltip } from '../components'
import { HasStoreAttributes, HasWindowAttributes } from '../types'
import { px, transform, translate3d } from '../libs'

const borderWidth = 1
const borderGap = 8

type TooltipContainerAttributes =
  m.Attributes &
  HasStoreAttributes &
  HasWindowAttributes

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

  protected style: CSSProperties | null = {
    opacity: 0 // @note: avoid wrong positioned tooltip shown
  };

  protected unbindEvent: UnbindEventListener | null= null;

  public oncreate({ attrs }: m.VnodeDOM<TooltipContainerAttributes>): void {
    const {
      window
    } = attrs

    this.unbindEvent = bindEventListener(window, 'mousemove', event => {
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

        window.requestAnimationFrame(() => m.redraw())
      }
    })
  }

  public onremove(): void {
    if (this.unbindEvent) {
      this.unbindEvent()
      this.unbindEvent = null
    }
    this.container = null
  }

  public onupdate({
    attrs: {
      store
    },
    dom
  }: m.VnodeDOM<TooltipContainerAttributes>): void {
    const {
      tooltip
    } = store.getState()

    this.container = dom || null

    if (!tooltip || !tooltip.show) {
      this.style = {
        ...this.style,
        opacity: 0 // @note: reset opacity to void blinks
      }
    }
  }

  public view({ attrs: {
    className,
    store
  } }: m.Vnode<TooltipContainerAttributes>): m.Children {
    const {
      tooltip
    } = store.getState()

    const hide = () => store.dispatch(hideTooltip())

    return <Tooltip
      className={className}
      ontouchend={hide}
      store={store}
      style={this.style}
      {...tooltip}
    ></Tooltip>
  }
}
