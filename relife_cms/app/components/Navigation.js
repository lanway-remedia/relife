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

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  goLoginPage = () => {
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sb-content">
          <PerfectScrollbar>
            <ul className="sb-list">
              <li className="mn-head">{I18nUtils.t('mnh-profile')}</li>
              <li className="item">
                <Link to="/" title="Menu 1">
                  {I18nUtils.t('mni-profile')}
                </Link>
              </li>
              <li className="item">
                <Link to="/" title="Menu 1">
                  {I18nUtils.t('mni-cpass')}
                </Link>
              </li>
              <li className="mn-head">Header Menu</li>
              <li className="item">
                <Link to="/" title="Menu 1">
                  Menu 1
                </Link>
              </li>
              <li className="item">
                <Link to="/" title="Menu 1">
                  Menu 1
                </Link>
              </li>
              <li className="item">
                <Link to="/" title="Menu 1">
                  Menu 1<span>234</span>
                </Link>
              </li>
              <li className="mn-head">Header Menu 2</li>
              <li className="item">
                <Link to="/" title="Menu 2-1">
                  Menu 2-1
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
