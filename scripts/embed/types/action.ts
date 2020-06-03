import { Action } from 'redux'

export enum AsyncState {
  PENDING,
  DONE,
  FAILED
}

export type BaseAction<T> = Action<string> & {
  payload: T;
}
