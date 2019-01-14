/**
 * @author Nam NH
 * DisplayChecker: check whole display condition
 */

import _ from 'lodash'

import BooleanEvaluator from './BooleanEvaluator'
import WeekdayEvaluator from './WeekdayEvaluator'
import TimeEvaluator from './TimeEvaluator'

let instance = null

export default class DisplayChecker {
  constructor() {
    if (instance) {
      return instance
    }

    this.evaluators = [
      new BooleanEvaluator(),
      new WeekdayEvaluator(),
      new TimeEvaluator()
    ]

    instance = this
  }

  checkCondition(condition, now = new Date()) {
    let singleConditions = _.split(condition, '|')
    for (let i = 0; i < singleConditions.length; i++) {
      if (this.checkSingleCondition(condition, now)) {
        return true
      }
    }

    return false
  }

  checkSingleCondition(condition, now = new Date()) {
    for (let i = 0; i < this.evaluators.length; i++) {
      let evaluator = this.evaluators[i]
      let evaluatable = evaluator.canEvaluate(condition)

      if (evaluatable && evaluator.evaluate(condition, now)) {
        return true
      }
    }

    return false
  }
}
