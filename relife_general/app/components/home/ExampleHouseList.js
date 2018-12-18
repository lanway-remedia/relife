/**
 * @author Hanh TD
 * Top map component
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import I18nUtils from '../../utils/I18nUtils'

class ExampleHouseList extends React.Component {
  render() {
    return (
      <div className="top-result">
        <div className="top-result-inner">
          <h2 className="top-result-title">注文住宅の建築実績を見る</h2>
          <p className="top-result-text">こだわり住まいのさまざまな情報を、注文住宅の事例からお探しできます。</p>
        </div>
      </div>
    )
  }
}
export default connect()
(withRouter(ExampleHouseList))

