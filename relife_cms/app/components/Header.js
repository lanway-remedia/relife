/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {
  Row,
  Col,
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  DropdownToggle,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import I18nUtils from '../utils/I18nUtils'

import logo from '../images/logo.png'
import avatar from '../images/user.png'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hsearch: '',
      dropdownOpen: false
    }
    this.toggle = this.toggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  goLoginPage = () => {
    this.props.history.push('/login')
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSearch = () => {
    console.log('Search')
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {
    return (
      <header>
        <Container fluid>
          <Row>
            <Col xs="12" sm="9">
              <div className="col-logo">
                <Link to="/" title={I18nUtils.t('logo')}>
                  <img alt={I18nUtils.t('logo')} src={logo} />
                </Link>
              </div>
              <div className="col-search">
                <Link
                  className="hlink-home d-inline-flex"
                  to="/"
                  title={I18nUtils.t('go-home')}
                >
                  {I18nUtils.t('home')}
                </Link>
                <Form
                  onSubmit={this.handleSearch}
                  inline
                  className="form-search"
                >
                  <FormGroup>
                    <Input
                      type="text"
                      placeholder={I18nUtils.t('search-lbl')}
                      name="hsearch"
                      id="hsearch"
                      value={this.state.hsearch}
                      onChange={this.handleChange}
                    />
                    <Button color="success">
                      <i className="fa fa-search" aria-hidden="true" />
                    </Button>
                  </FormGroup>
                </Form>
              </div>
            </Col>
            <Col xs="12" sm="3">
              <div className="d-flex flex-row-reverse">
                <div className="box-user">
                  <ButtonDropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                  >
                    <DropdownToggle>
                      <span>Hinosima Name</span>
                      <img alt="asdasd" src={avatar} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem to="/account-setting">
                        Account Setting
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem to="/logout">Logout</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
                <div className="box-noti box-full">
                  <Link
                    to="/"
                    title={I18nUtils.formatMessage(
                      { id: 'h-noti' },
                      { count: '8' }
                    )}
                  >
                    <span>3</span>
                    <i className="fa fa-bell-o" aria-hidden="true" />
                  </Link>
                </div>
                <div className="box-mail box-full">
                  <Link
                    to="/"
                    title={I18nUtils.formatMessage(
                      { id: 'h-mail' },
                      { count: '8' }
                    )}
                  >
                    <span>8</span>
                    <i className="fa fa-envelope-o" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* <Button color="link" onClick={() => this.goLoginPage()}>
                {I18nUtils.t('login')}
              </Button> */}
            </Col>
          </Row>
        </Container>
      </header>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(Header))
