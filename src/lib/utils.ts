import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a list of tick for bar chart.
 *
 * @param {number} maxTick  - the maximum of tick.
 * @param {number} tickGap - gap between two adjacent labels..
 * @param {number} numOfTick - default number of ticks when none-data
 * @returns {Array<number>} - ticks.
 *
 */

export function generateTickForBarChart(maxTick: number, tickGap: number = 20, numOfTick: number = 5) {
  const ticks: Array<number> = [0]
  if (!maxTick) {
    let _numOfTick = numOfTick
    while (_numOfTick > 0) {
      ticks.push(ticks[ticks.length - 1] + tickGap)
      _numOfTick -= 1
    }
    return ticks
  }
  const _maxTick = maxTick

  while (_maxTick > ticks[ticks.length - 1]) {
    ticks.push(ticks[ticks.length - 1] + tickGap)
  }
  return ticks
}
