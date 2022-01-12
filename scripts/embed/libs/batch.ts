import { debounce } from 'throttle-debounce'

type Deferred<R, E> = {
  promise: Promise<R>;
  resolve?: (response: R) => void;
  reject?: (error: E) => void
}

type NormalizedFunction<T, R, A extends ReadonlyArray<unknown>> = (arg: T, ...args: A) => R
type BatchedFunction<T, R, A extends ReadonlyArray<unknown>> = NormalizedFunction<ReadonlyArray<T>, R, A>

function deferred<R, E = Error>(): Deferred<R, E> {
  let resolve
  let reject

  const promise = new Promise<R>((s, f) => {
    resolve = s
    reject = f
  })

  return { promise, resolve, reject }
}

export function batch<T, R, A extends ReadonlyArray<unknown>>(
  func: BatchedFunction<T, R, A>,
  wait: number
): NormalizedFunction<T, Promise<R>, A> {
  let debouncedIds = [] as ReadonlyArray<T>
  let defer = deferred<R>()

  const runAndReset = (ids: ReadonlyArray<T>, ...args: ReadonlyArray<unknown>) => {
    try {
      defer.resolve && defer.resolve(func(ids, ...args as A))
    } catch (error) {
      if (error instanceof Error) {
        defer.reject && defer.reject(error as Error)
      } else {
        defer.reject && defer.reject(new Error(error as string))
      }
    }

    debouncedIds = []
    defer = deferred<R>()
  }

  const debouncedFunc = debounce(wait, runAndReset)

  return (id: T, ...args: ReadonlyArray<unknown>): Promise<R> => {
    debouncedIds = [...debouncedIds, id]
    debouncedFunc(debouncedIds, ...args as A)
    return defer.promise
  }
}
