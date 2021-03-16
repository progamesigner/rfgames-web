import * as m from 'mithril'

import { hideTooltip, updateStyles } from '../actions'
import { Tooltip } from '../components'
import { EmbedStore, HasStoreAttributes, HasWindowAttributes } from '../types'
import { px, transform, translate3d, types } from '../libs'

import * as styles from '../components/styles'

type UnbindEventListener = () => void

// @note: we assume default base is 16px
const tooltipOffset = styles.layouts.tooltipOffset * 16

interface TooltipContainerAttributes extends
  m.Attributes,
  HasStoreAttributes,
  HasWindowAttributes
{
}

function calculateStyle(
  window: Window,
  container: HTMLElement,
  {
    clientX: x,
    clientY: y
  }: MouseEvent
): types.CSSProperties {
  return {
    transform: transform(translate3d(
      px(Math.min(
        x,
        window.innerWidth - container.offsetWidth - tooltipOffset * 2
      )),
      px(Math.min(
        y,
        window.innerHeight - container.offsetHeight - tooltipOffset * 2
      )),
      0
    ))
  }
}

function isSmallScreen(window: Window): boolean {
  return window.document.body.offsetWidth <= styles.SMALL_SCREEN_WIDTH
}

function isTouchDevice(window: Window): boolean {
  return window.navigator.maxTouchPoints > 0
}

export class TooltipContainer implements m.Component<TooltipContainerAttributes> {
  protected container: Element | null = null
  protected requestedAnimationFrame: number | null = null
  protected unbindMouseMoveEvent: UnbindEventListener | null = null

  public oncreate({
    attrs: {
      store,
      window
    }
  }: m.VnodeDOM<TooltipContainerAttributes>): void {
    const {
      tooltipStyles
    } = store.getState()

    const listener = this.handleMouseMove.bind(this, window, store)

    // @note: show tooltip by default on small-screen devices
    if (isSmallScreen(window)) {
      store.dispatch(updateStyles({
        ...tooltipStyles,
        opacity: 1
      }))
    }

    this.unbindMouseMoveEvent =  (): void => {
      window.removeEventListener('mousemove', listener, false)
    }

    window.addEventListener('mousemove', listener, false)
  }

  public onremove(): void {
    if (this.unbindMouseMoveEvent) {
      this.unbindMouseMoveEvent()
      this.unbindMouseMoveEvent = null
    }
    this.container = null
  }

  public onupdate({ dom }: m.VnodeDOM<TooltipContainerAttributes>): void {
    this.container = dom
  }

  public view({
    attrs: {
      className,
      store
    }
  }: m.Vnode<TooltipContainerAttributes>): m.Children {
    const {
      tooltip,
      tooltipStyles
    } = store.getState()

    const hide = (event: TouchEvent) => {
      tooltip && tooltip.show && store.dispatch(hideTooltip())
      event.preventDefault()
    }

    return <Tooltip
      className={className}
      data={tooltip && tooltip.data}
      ontouchend={hide}
      store={store}
      style={tooltipStyles}
      type={tooltip && tooltip.type}
    ></Tooltip>
  }

  protected handleMouseMove(
    window: Window,
    store: EmbedStore,
    event: Event
  ): void {
    if (this.container) {
      if (this.requestedAnimationFrame) {
        window.cancelAnimationFrame(this.requestedAnimationFrame)
      }

      this.requestedAnimationFrame = window.requestAnimationFrame(() => {
        const {
          tooltip,
          tooltipStyles
        } = store.getState()

        store.dispatch(updateStyles({
          ...tooltipStyles,
          opacity: 0 // @note: reset opacity to avoid blinks
        }))

        if (
          this.container &&
          tooltip &&
          tooltip.show &&
          (
            !isTouchDevice(window) ||
            event.target === window
          )
        ) {
          const style = calculateStyle(
            window,
            this.container as HTMLElement,
            event as MouseEvent
          )

          store.dispatch(updateStyles({
            ...tooltipStyles,
            ...style,
            opacity: 1
          }))
        }
      })
    }
  }
}
