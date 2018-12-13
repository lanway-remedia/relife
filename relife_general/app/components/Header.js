/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Nav, NavDropdown, MenuItem } from 'reactstrap'
// import defaultAvatar from '../images/user.png'
import I18nUtils from '../utils/I18nUtils'
import { ProfileTypes } from './../redux/wrapper/ProfileRedux'
import AppUtils from '../utils/AppUtils'
import logo from '../images/form-logo.png'
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
      <header>
        <Container>
          <Row noGutters>
            <Col xs="12" sm="8">
              <div className="header-logo">
                <Link to="/">
                  <img src={logo} />
                </Link>
              </div>
            </Col>
            {!isAuthenticated ? (
            <Col xs="12" sm="4">
              <Button className="btn-login" onClick={() => this.goRegisterPage()}>{I18nUtils.t('register')}</Button>{' '}
              <Button className="btn-login" onClick={() => this.goLoginPage()}>{I18nUtils.t('login')}</Button>{' '}
            </Col>
            ) : (
              <Col xs="12" sm="4">
                <div className="profile-info">
                  <div className="profile-image">
                    <img className="avatar-img" src={image} />
                  </div>
                  <div className="profile-name">
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle color="success" className="btn-username-dropdown" caret>
                        {name}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem><Link to="/profile">{I18nUtils.t('ud-page-title')}</Link></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => AppUtils.logout(this.props.history)}>{I18nUtils.t('sign-out')}</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </Container>
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
