/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {} from 'reactstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import I18nUtils from '../utils/I18nUtils'
import { StorageKeyConstants } from '../constants'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  goLoginPage = () => {
    this.props.history.push('/login')
  }

  render() {
    let groupId = localStorage.getItem(StorageKeyConstants.GROUP)
    let storeId = localStorage.getItem(StorageKeyConstants.STORE)
    let isStore = false
    if (groupId === '2') {
      isStore = true
    }
    return (
      <div className="sidebar">
        <div className="sb-content">
          <PerfectScrollbar>
            <ul className="sb-list">
              <li className="mn-head">{I18nUtils.t('mnh-profile')}</li>
              <li className="item">
                <Link to="/profile" title={I18nUtils.t('mni-profile')}>
                  {I18nUtils.t('mni-profile')}
                </Link>
              </li>
              <li className="mn-head">{I18nUtils.t('mnh-user')}</li>
              <li className="item">
                <Link to="/users" title={I18nUtils.t('mni-user-list')}>
                  {I18nUtils.t('mni-user-list')}
                </Link>
              </li>
              <li className="mn-head">{I18nUtils.t('mnh-store')}</li>
              <li className="item">
                {isStore && (
                  <Link
                    to={`/edit-outlet-store/${storeId}`}
                    title={I18nUtils.t('mni-store-detail')}
                  >
                    {I18nUtils.t('mni-store-detail')}
                  </Link>
                )}
                {!isStore && (
                  <Link
                    to="/manage-outlet-store-list"
                    title={I18nUtils.t('mni-store-list')}
                  >
                    {I18nUtils.t('mni-store-list')}
                  </Link>
                )}
              </li>
              <li className="mn-head">{I18nUtils.t('mnh-ehouse')}</li>
              <li className="item">
                <Link
                  to="/manage-example-house-list"
                  title={I18nUtils.t('mni-ehouse-list')}
                >
                  {I18nUtils.t('mni-ehouse-list')}
                </Link>
              </li>
              <li className="mn-head">{I18nUtils.t('mnh-inv')}</li>
              <li className="item">
                <Link
                  to="/invoice-release"
                  title={I18nUtils.t('mni-inv-release')}
                >
                  {I18nUtils.t('mni-inv-release')}
                </Link>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </div>
    )
  }
}

Navigation.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(Navigation))
