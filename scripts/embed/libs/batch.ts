import { debounce } from 'lodash/fp'

interface Deferred<R, E> {
  promise: Promise<R>;
  resolve?: (response: R) => void;
  reject?: (error: E) => void
}

function deferred<R, E = Error>(): Deferred<R, E> {
  let resolve
  let reject

  const promise = new Promise<R>((w, f) => {
    resolve = w
    reject = f
  })

  return { promise, resolve, reject }
}

type NormalizedFunction<T, R, A extends unknown[]> = (arg: T, ...args: A) => R
type BatchedFunction<T, R, A extends unknown[]> = NormalizedFunction<Array<T>, R, A>

export function batch<T, R, A extends unknown[]>(
  func: BatchedFunction<T, R, A>,
  wait: number
): NormalizedFunction<T, Promise<R>, A> {
  let debouncedIds = [] as Array<T>
  let defer = deferred<R>()

  const runAndReset = (ids: Array<T>, ...args: A) => {
    try {
      defer.resolve && defer.resolve(func(ids, ...args))
    } catch (error) {
      defer.reject && defer.reject(error)
    }

    debouncedIds = []
    defer = deferred<R>()
  }

  const debouncedFunc = debounce(wait)(runAndReset)

  return (id: T, ...args: A): Promise<R> => {
    debouncedIds = Array.prototype.concat(debouncedIds, [id])
    debouncedFunc(debouncedIds, ...args)
    return defer.promise
  }
}
