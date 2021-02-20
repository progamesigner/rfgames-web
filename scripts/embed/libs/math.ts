import { add, clamp, multiply, pipe } from 'rambda'

export function random(min: number, max: number): number {
  const pipeline = pipe(
    multiply(max - min),
    add(min),
    Math.round,
    clamp(min, max),
  )
  return pipeline(Math.random())
}
