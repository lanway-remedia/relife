import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import I18nUtils from '../../utils/I18nUtils'

import HeaderSubMenu from './HeaderSubMenu'
class HeaderNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false
    }
  }

  handleOnMouseEnter = () => {
    this.setState({
      showMenu: true
    })
    document.getElementById('gnav').style.zIndex = 10000
  }

  handleOnMouseLeave = () => {
    this.setState({
      showMenu: false
    })
    document.getElementById('gnav').style.zIndex = 0
  }

  render() {
    let { showMenu } = this.state
    return (
      <nav id="gnav">
        <ul className="gnav">
          <li className="menu__mega"
            onMouseEnter={this.handleOnMouseEnter}
            onMouseLeave={this.handleOnMouseLeave}
          >
            <Link to="/builder">{I18nUtils.t('builder-title')}</Link>
              {showMenu &&
                <HeaderSubMenu />
              }
          </li>
          <li>
            <Link to="/example">{I18nUtils.t('example-house-title')}</Link>
          </li>
          <li>
            <Link to="/style">{I18nUtils.t('re-style-title')}</Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default connect(
)(withRouter(HeaderNav))
