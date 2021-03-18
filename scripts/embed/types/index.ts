import { Action } from 'redux'

export * from './attribute'
export * from './gw2'
export * from './store'
export * from './tooltip'

export type BaseAction<T> = Action<string> & T
export type Optional<T> = T | undefined
