import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { withRouter, Link } from 'react-router-dom'
import I18nUtils from '../../utils/I18nUtils'
import logo from '../../images/logo.png'
import DrawerMenu from './DrawerMenu'
import ReactDrawer from 'react-drawer'
class HeaderSP extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      position: 'right',
      noOverlay: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  toggleDrawer() {
    this.setState({open: !this.state.open})
    if (!this.state.open) {
      document.body.classList.add('drawer-open')
    } else {
      document.body.classList.remove('drawer-open')
    }
  }
  render () {
    return (
      <Container fluid className="header sp padding-0">
        <Row className="drawer-navbar sp">
          <div className="drawer-container">
            <div className="drawer-navbar-header">
              <div className="drawer-navbar-header-logo">
                <Link to="">
                  <img src={logo} />
                </Link>
              </div>
              <div className="drawer-navbar-header-text">
                {I18nUtils.t('header-logo-text')}
              </div>
              <button
                className="drawer-btn"
                onClick={this.toggleDrawer}
              >
                <span className="drawer-btn-icon" />
              </button>
            </div>
          </div>
        </Row>
        <ReactDrawer
          open={this.state.open}
          position={this.state.position}
          onClose={this.onDrawerClose}
          noOverlay={this.state.noOverlay} 
        >
          <DrawerMenu />
        </ReactDrawer>
      </Container>
    )
  }
}
export default connect()(withRouter(HeaderSP))