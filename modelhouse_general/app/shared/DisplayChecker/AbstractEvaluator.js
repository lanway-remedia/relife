/**
 * @author Nam NH
 * AbstractEvaluator: base class for all display-condition evaluator
 */

export default class AbstractEvaluator {
  // eslint-disable-next-line no-unused-vars
  canEvaluate(condition) {
    throw new Error('Not implemented!')
  }

  // eslint-disable-next-line no-unused-vars
  evaluate(condition, now = new Date()) {
    throw new Error('Not implemented!')
  }
}
