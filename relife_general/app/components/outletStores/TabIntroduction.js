import React from 'react'
import PropTypes from 'prop-types'
import {Col, Table } from 'reactstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import I18nUtils from '../../utils/I18nUtils'

class TabIntroduction extends React.Component {
  render () {
    let outletStore = this.props.outletStore
    return (
      <div className="content tab-intro">
        <div className="builder-detail clearfix">
          <h2 className="detail-subtitle">
            {I18nUtils.t('store-intro-title')}
          </h2>
          <div className="company-intro">
            {outletStore.content}
          </div>
          <h2 className="detail-subtitle">
          {I18nUtils.t('store-data-title')}
          </h2>
          <div className="company-data">
            <Table>
              <tbody>
                <tr>
                  <th>会社名</th>
                  <td>{outletStore.title}</td>
                </tr>
                <tr>
                  <th>所在地</th>
                  <td>{outletStore.district && outletStore.district.name} {outletStore.district && outletStore.district.city ? outletStore.district.city.name : ''}</td>
                </tr>
                
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

TabIntroduction.propTypes = {
  outletStore: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
}

export default connect()(withRouter(TabIntroduction))
