import { debounce } from 'lodash/fp'

type Deferred<R, E> = {
  promise: Promise<R>;
  resolve?: (response: R) => void;
  reject?: (error: E) => void
}

type NormalizedFunction<T, R, A extends Array<unknown>> = (arg: T, ...args: A) => R
type BatchedFunction<T, R, A extends Array<unknown>> = NormalizedFunction<Array<T>, R, A>

function deferred<R, E = Error>(): Deferred<R, E> {
  let resolve
  let reject

  const promise = new Promise<R>((s, f) => {
    resolve = s
    reject = f
  })

  return { promise, resolve, reject }
}

export function batch<T, R, A extends Array<unknown>>(
  func: BatchedFunction<T, R, A>,
  wait: number
): NormalizedFunction<T, Promise<R>, A> {
  let debouncedIds = [] as Array<T>
  let defer = deferred<R>()

  const runAndReset = (ids: Array<T>, ...args: Array<unknown>) => {
    try {
      defer.resolve && defer.resolve(func(ids, ...args as A))
    } catch (error) {
      defer.reject && defer.reject(error)
    }

    debouncedIds = []
    defer = deferred<R>()
  }

  const debouncedFunc = debounce(wait)(runAndReset)

  return (id: T, ...args: Array<unknown>): Promise<R> => {
    debouncedIds = [...debouncedIds, id]
    debouncedFunc(debouncedIds, ...args as A)
    return defer.promise
  }
}
