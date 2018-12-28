import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import I18nUtils from '../../utils/I18nUtils'
import { Form } from'reactstrap'

class HeaderNav extends React.Component {
  render() {
    return (
      <nav id="gnav">
        <ul className="gnav">
          <li className="menu__mega">
            <Link to="/builder">{I18nUtils.t('builder-title')}</Link>
            <div className="menu__second-level clearfix">
              <div className="mega-menu-inner-left">
                <div className="top-map-list">
                  <div className="top-map-list-once clearfix">
                    <div className="top-map-list-area">北海道・東北</div>
                    <ul>
                      <li>
                        <Link to="">aaa</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mega-menu-inner-right">
                <div className="mega-menu-form">
                  <div className="mega-menu-inner-title">キーワードで検索</div>
                </div>
                <Form>

                </Form>
              </div>
            </div>
          </li>
          <li>
            <Link to="/example">{I18nUtils.t('example-house-title')}</Link>
          </li>
          <li>
            <Link to="/example">{I18nUtils.t('re-style-title')}</Link>
          </li>
        </ul>
      </nav>
    )
  }
}
export default connect()(withRouter(HeaderNav))
