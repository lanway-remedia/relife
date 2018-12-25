import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import OutletStoreActions from '../../redux/wrapper/OutletStoresRedux'
import { DefaultValue } from '../../constants'
import I18nUtils from '../../utils/I18nUtils'

class TabIntroduction extends React.Component {
  render () {
    return (
      <div className="content">
        <div className="builder-detail clearfix">
          <h2 className="detail-subtitle">
            会社紹介
          </h2>
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(TabIntroduction))
