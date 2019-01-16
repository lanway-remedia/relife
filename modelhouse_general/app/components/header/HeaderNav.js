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
          <li>
            <Link to="/exhibition">
              {I18nUtils.t('exhibition')}
            </Link>
          </li>
          <li className="menu__mega"
            onMouseEnter={this.handleOnMouseEnter}
            onMouseLeave={this.handleOnMouseLeave}
          >
            <Link to="/modelhouse">
              {I18nUtils.t('model-house')}
            </Link>
              {showMenu &&
                <HeaderSubMenu />
              }
          </li>
        </ul>
      </nav>
    )
  }
}

export default connect(
)(withRouter(HeaderNav))
