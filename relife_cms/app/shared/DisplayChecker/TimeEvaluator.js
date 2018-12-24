/**
 * @author Nam NH
 * TimeEvaluator: evaluate condition about weekday
 */

import _ from 'lodash'

import AbstractEvaluator from './AbstractEvaluator'

export default class TimeEvaluator extends AbstractEvaluator {
  constructor() {
    super()

    let timePattern = '(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]'

    this.patterns = {
      lessOrEqual: new RegExp(`time\\?-${timePattern}`),
      inPeriod: new RegExp(`time\\?${timePattern}-${timePattern}`),
      greaterOrEqual: new RegExp(`time\\?${timePattern}-`)
    }
  }

  canEvaluate(condition) {
    let pattern = this.determinePattern(condition)
    return pattern != null
  }

  // eslint-disable-next-line no-unused-vars
  evaluate(condition, now = new Date()) {
//    let pattern = this.determinePattern(condition)
    let period = this.extractTimePeriod(condition)
    return this.checkInPeriod(now, period)
  }

  // PRIVATE METHODS
  determinePattern(condition) {
    let pattern = null

    for (var key in this.patterns) {
      if (this.patterns.hasOwnProperty(key)) {
        let tmpPattern = this.patterns[key]
        if (tmpPattern.test(condition)) {
          pattern = tmpPattern
          break
        }
      }
    }

    return pattern
  }

  extractTimePeriod(condition) {
    let timesStr = _.replace(condition, 'time?', '')
    let timeParts = _.split(timesStr, '-')

    let period = {
      begin: null,
      end: null
    }

    if (!_.isEmpty(timeParts[0])) {
      period.begin = this.convertTimeToSeconds(timeParts[0])
    }
    if (!_.isEmpty(timeParts[1])) {
      period.end = this.convertTimeToSeconds(timeParts[1])
    }

    return period
  }

  convertTimeToSeconds(str) {
    let hour = parseInt(str.substr(0, 2), 10)
    let minute = parseInt(str.substr(2, 2), 10)
    return hour * 3600 + minute * 60
  }

  checkInPeriod(now, period) {
    let nowHour = now.getHours()
    let nowMinute = now.getMinutes()
    let nowTotalSeconds = nowHour * 3600 + nowMinute * 60

    let satisfyBegin = period.begin == null || nowTotalSeconds >= period.begin
    let satisfyEnd = period.end == null || nowTotalSeconds <= period.end
    return satisfyBegin && satisfyEnd
  }
}
