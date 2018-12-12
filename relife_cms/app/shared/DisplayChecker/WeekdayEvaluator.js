/**
 * @author Nam NH
 * WeekdayEvaluator: evaluate condition about weekday
 */

import _ from 'lodash'

import AbstractEvaluator from './AbstractEvaluator'
import Weekday from '../../constants/Weekday'

export default class WeekdayEvaluator extends AbstractEvaluator {
  constructor() {
    super()
    this.pattern = /weekday\?[sun|mon|wed|tue|thu|fri|sat]/
  }

  canEvaluate(condition) {
    return this.pattern.test(condition)
  }

  // eslint-disable-next-line no-unused-vars
  evaluate(condition, now = new Date()) {
    let currentDay = now.getDay()

    let daySymbol = _.split(condition, '?')[1]

    let symbolDayMap = {
      sun: Weekday.SUNDAY,
      mon: Weekday.MONDAY,
      tue: Weekday.TUESDAY,
      wed: Weekday.WEDNESDAY,
      thu: Weekday.THURSDAY,
      fri: Weekday.FRIDAY,
      sat: Weekday.SATURDAY
    }

    let dayToVisible = symbolDayMap[daySymbol]
    return dayToVisible == currentDay
  }
}
