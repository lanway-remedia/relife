/**
 * @author Hanh TD
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown, Button } from 'reactstrap'
import I18nUtils from '../utils/I18nUtils'
import AppUtils from '../utils/AppUtils'
import logo from '../images/logo.png'
import ReactDrawer from 'react-drawer'
import 'react-drawer/lib/react-drawer.css'
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false,
      open: false,
      position: 'right',
      noOverlay: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
    this.onDrawerClose = this.onDrawerClose.bind(this)
  }

  toggleDrawer() {
    this.setState({open: !this.state.open})
    if (!this.state.open) {
      document.body.classList.add('drawer-open')
    } else {
      document.body.classList.remove('drawer-open')
    }
  }
  closeDrawer() {
    this.setState({open: false})
  }
  onDrawerClose() {
    this.setState({open: false})
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

  goToProfile = () => {
    this.props.history.push('/profile')
  }

  handleLogout = () => {
    AppUtils.logout(this.props.history)
  }

  render() {
    let {isAuthenticated, name, image } = this.props
    return (
      <div>
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
          {!isAuthenticated ? (
          <ul className="header-login">
            <li>
              <Link to="/login">{I18nUtils.t('login')}</Link>
            </li>
            <li>
              <Link to="/register">{I18nUtils.t('register')}</Link>
            </li>
          </ul>
          ) : (
            <div className="header-login">
              <div className="box-user">
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle>
                    <span>{name}</span>
                    <img
                      alt={name}
                      src={image}
                    />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.goToProfile}>
                      {I18nUtils.t('asetting')}
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.handleLogout}>
                      {I18nUtils.t('logout')}
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
            </div>
          )
          }
        </div>
      </header>

      <header className="header sp">
          <div className="drawer-navbar sp">
            <div className="drawer-container">
              <div className="drawer-navbar-header">
                <div className="drawer-navbar-header-logo">
                  <Link to="">
                    <img src={logo} />
                  </Link>
                </div>
                <div className="drawer-navbar-header-text">
                  暮らしづくりのコンシェルジュ
                </div>
                <button
                  className="drawer-btn"
                  onClick={this.toggleDrawer}
                >
                  <span className="drawer-btn-icon" />
                </button>
              </div>
            </div>
          </div>
      </header>
      <ReactDrawer
        open={this.state.open}
        position={this.state.position}
        onClose={this.onDrawerClose}
        noOverlay={this.state.noOverlay} 
      >
      <div className="drawer-menu-title">
        注文住宅を検討の方へ
      </div>
      <ul className="drawer-menu-right">
        <li>
          <Link to="/builder">
            建築会社・工務店を探す
          </Link>
        </li>
        <li>
          <Link to="/example">
            建築実例を見る
          </Link>
        </li>
        <li>
          <Link to="/contact">
            注文住宅を相談する
          </Link>
        </li>
        <li>
          <Link to="/style">
          専門家コラムを読む
          </Link>
        </li>
      </ul>
      <div className="drawer-menu-title">
        Re:Lifeについて
      </div>
      <ul className="drawer-menu-right">
        <li>
          <Link to="/about-us">
          Re:Lifeとは
          </Link>
        </li>
        <li>
          <Link to="/form-builder">
          建築会社・工務店さまへ
          </Link>
        </li>
        <li>
          <Link to="/style">
            Re:Style
          </Link>
        </li>
      </ul>
      </ReactDrawer>
      </div>
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
