/**
 * @author Hanh TD
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown } from 'reactstrap'
import I18nUtils from '../../utils/I18nUtils'
import AppUtils from '../../utils/AppUtils'
import 'react-drawer/lib/react-drawer.css'

import HeaderLogo from './HeaderLogo'
import HeaderNav from './HeaderNav'
import HeaderSP from './HeaderSP'
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
        <Container fluid className="header pc padding-0">
          <Row className="header-inner">
            <HeaderLogo />
            <HeaderNav />
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
          </Row>
        </Container>
        <HeaderSP />
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
