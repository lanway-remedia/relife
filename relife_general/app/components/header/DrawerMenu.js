import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import I18nUtils from '../../utils/I18nUtils'

class DrawerMenu extends React.Component {
  render() {
    return (
      <div>
        <div className="drawer-menu-title">
          {I18nUtils.t('for-order-house')}
        </div>
        <ul className="drawer-menu-right">
          <li>
            <Link to="/builder">
              {I18nUtils.t('find-company-store')}
            </Link>
          </li>
          <li>
            <Link to="/example">
              {I18nUtils.t('view-example-house')}
            </Link>
          </li>
          <li>
            <Link to="/contact">
              {I18nUtils.t('consult-an-order-house')}
            </Link>
          </li>
          <li>
            <Link to="/style">
              {I18nUtils.t('read-style')}
            </Link>
          </li>
        </ul>
        <div className="drawer-menu-title">
            {I18nUtils.t('about-relife')}
        </div>
        <ul className="drawer-menu-right">
          <li>
            <Link to="/about-us">
              {I18nUtils.t('what-is-relife')}
            </Link>
          </li>
          <li>
            <Link to="/form-builder">
              {I18nUtils.t('company-store')}
            </Link>
          </li>
          <li>
            <Link to="/style">
              {I18nUtils.t('re-style')}
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}
export default connect()(withRouter(DrawerMenu))
