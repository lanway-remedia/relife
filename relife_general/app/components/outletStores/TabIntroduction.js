import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Table } from 'reactstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import I18nUtils from '../../utils/I18nUtils'

class TabIntroduction extends React.Component {
  render () {
    let outletStore = this.props.outletStore
    const arrPrice = [
      '下限なし',
      '20万円以上',
      '30万円以上',
      '40万円以上',
      '50万円以上',
      '60万円以上',
      '70万円以上',
      '80万円以上',
      '90万円以上',
      '100万円以上',
      '100万円以上',
      '110万円以上',
      '120万円以上',
      '上限なし'
    ]
    return (
      <Row className="tab-content-item">
        <Col xs="12" md="12" className="tab-intro">
          <h2 className="detail-subtitle">
            {I18nUtils.t('company-intro-title')}
          </h2>
          <div className="company-intro">
            {outletStore.content}
          </div>
          <h2 className="detail-subtitle">
          {I18nUtils.t('company-data-title')}
          </h2>
          <div className="company-data">
            <Table>
              <tbody>
                {outletStore.title && (
                  <tr>
                    <th>{I18nUtils.t('company-name')}</th>
                    <td>{outletStore.title}</td>
                  </tr>
                )}
                {outletStore.establish && (
                  <tr>
                    <th>{I18nUtils.t('company-establish')}</th>
                    <td>{outletStore.establish}</td>
                  </tr>
                )}
                {outletStore.address && (
                  <tr>
                    <th>{I18nUtils.t('company-address')}</th>
                    <td>{outletStore.address}</td>
                  </tr>
                )}
                {outletStore.charter_capital && (
                  <tr>
                    <th>{I18nUtils.t('company-charter-capital')}</th>
                    <td>{outletStore.charter_capital}円</td>
                  </tr>
                )}
                {outletStore.employee_total && (
                  <tr>
                    <th>{I18nUtils.t('company-employee-total')}</th>
                    <td>{outletStore.employee_total}</td>
                  </tr>
                )}
                {outletStore.qualification && (
                  <tr>
                    <th>{I18nUtils.t('company-qualification')}</th>
                    <td>{outletStore.qualification}</td>
                  </tr>
                )}
                {outletStore.permit_number && (
                  <tr>
                    <th>{I18nUtils.t('company-permit-number')}</th>
                    <td>{outletStore.permit_number}</td>
                  </tr>
                )}
                {outletStore.construction_area && (
                  <tr>
                    <th>{I18nUtils.t('company-construction-area')}</th>
                    <td>{outletStore.construction_area}</td>
                  </tr>
                )}
                {outletStore.construction_result && (
                  <tr>
                    <th>{I18nUtils.t('company-construction-result')}</th>
                    <td>{outletStore.construction_result}</td>
                  </tr>
                )}
                {outletStore.min_price && (
                  <tr>
                    <th>{I18nUtils.t('company-price')}</th>
                    <td>{arrPrice[outletStore.min_price]}</td>
                  </tr>
                )}
                {outletStore.time_serving && (
                  <tr>
                    <th>{I18nUtils.t('company-time-serving')}</th>
                    <td>{outletStore.time_serving}</td>
                  </tr>
                )}
                
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
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
