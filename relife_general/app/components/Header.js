/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col, Button, DropdownToggle, DropdownMenu, DropdownItem, Container, Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown } from 'reactstrap'
// import defaultAvatar from '../images/user.png'
import I18nUtils from '../utils/I18nUtils'
import AppUtils from '../utils/AppUtils'
import logo from '../images/logo.png'
class Header extends React.Component {
  constructor(props) {
      super(props)
      this.toggle = this.toggle.bind(this)
      this.state = {
        dropdownOpen: false
      }
  }
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  goLoginPage = () => {
    this.props.history.push('/login')
  }
  goRegisterPage = () => {
    this.props.history.push('/register')
  }

  render() {
    let {isAuthenticated, name, image} = this.props
    return (
      <header className="header pc">
        <div className="header-inner">
          <div className="header-logo">
            <Link to="/" className="header-logo-inner">
              <img src={logo} className="header-logo-img" />
              <span className="header-logo-text">{I18nUtils.t('header-logo-text')}</span>
            </Link>
            <Link to="/about-us" className="header-logo-link">Re:Lifeとは </Link>
          </div>
          <nav id="gnav">
            <ul className="gnav">
              <li>
                <Link to="/example">建築会社・工務店</Link>
              </li>
              <li>
                <Link to="/example">建築実例</Link>
              </li>
              <li>
                <Link to="/example">Re:Life style</Link>
              </li>
            </ul>
          </nav>
          <ul className="header-login">
            <li>
              <Link to="/login">{I18nUtils.t('login')}</Link>
            </li>
            <li>
              <Link to="/register">{I18nUtils.t('register')}</Link>
            </li>
          </ul>
        </div>

      </header>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  name: PropTypes.string,
  image: PropTypes.string
}

export default connect()(withRouter(Header))
