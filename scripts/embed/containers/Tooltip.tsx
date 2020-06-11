import * as m from 'mithril'

import { CSSProperties } from 'typestyle/lib/types'

import { bindEventListener, UnbindEventListener } from '../../libs'

import { destroyTooltip, hideTooltip } from '../actions'
import { Tooltip } from '../components'
import { EmbedStore, HasStoreAttributes, HasWindowAttributes } from '../types'
import { px, transform, translate3d } from '../libs'

const tooltipOffset = 8

interface TooltipContainerAttributes extends
  m.Attributes,
  HasStoreAttributes,
  HasWindowAttributes {
}

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
        window.innerWidth - container.offsetWidth - tooltipOffset
      )),
      px(Math.min(
        y,
        window.innerHeight - container.offsetHeight - tooltipOffset
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
  protected unbindMouseMoveEvent: UnbindEventListener | null = null;
  protected unbindTransitionEndEvent: UnbindEventListener | null = null;

  public oncreate({
    attrs: {
      store,
      window
    }
  }: m.VnodeDOM<TooltipContainerAttributes>): void {
    this.unbindMouseMoveEvent = bindEventListener(
      window,
      'mousemove',
      this.handleMouseMove.bind(this, window, store)
    )
  }

  public onremove(): void {
    if (this.unbindMouseMoveEvent) {
      this.unbindMouseMoveEvent()
      this.unbindMouseMoveEvent = null
    }

    if (this.unbindTransitionEndEvent) {
      this.unbindTransitionEndEvent()
      this.unbindTransitionEndEvent = null
    }

    this.container = null
  }

  public onupdate({ dom }: m.VnodeDOM<TooltipContainerAttributes>): void {
    this.container = dom || null
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
      data={tooltip && tooltip.data}
      ontouchend={hide}
      store={store}
      style={this.style}
      type={tooltip && tooltip.type}
    ></Tooltip>
  }

  protected handleMouseMove(
    window: Window,
    store: EmbedStore,
    event: Event
  ): void {
    const {
      tooltip
    } = store.getState()

    this.style = {
      ...this.style,
      opacity: 0 // @note: reset opacity to avoid blinks
    }

    if (this.container) {
      if (tooltip && tooltip.show) {
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

        if (this.unbindTransitionEndEvent) {
          this.unbindTransitionEndEvent()
          this.unbindTransitionEndEvent = null
        }

        window.requestAnimationFrame(() => m.redraw())
      } else if (!this.unbindTransitionEndEvent) {
        this.unbindTransitionEndEvent = bindEventListener(
          this.container,
          'transitionend',
          () => store.dispatch(destroyTooltip())
        )
      }
    }
  }
}
