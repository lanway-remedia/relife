/**
 * @author Nam NH
 * BooleanEvaluator: evaluate 1 simple condition (condition: always)
 */

import AbstractEvaluator from './AbstractEvaluator'

export default class BooleanEvaluator extends AbstractEvaluator {
  canEvaluate(condition) {
    return condition === 'always'
  }

  // eslint-disable-next-line no-unused-vars
  evaluate(condition, now = new Date()) {
    return condition === 'always'
  }
}
