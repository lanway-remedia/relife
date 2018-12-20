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
import AppUtils from '../utils/AppUtils'
import I18nUtils from '../utils/I18nUtils'
import ProfileActions from '../redux/wrapper/UserProfileRedux'
import { StorageKeyConstants } from '../constants'
import logo from '../images/logo.png'
import avatar from '../images/user.png'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hsearch: '',
      dropdownOpen: false,
      data: {},
      name: '',
      profileImage: ''
    }
    this.toggle = this.toggle.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  getUserInfo() {
    if (localStorage.getItem(StorageKeyConstants.TOKEN))
      this.props.profileRequest({})
  }

  componentDidMount() {
    this.getUserInfo()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.getProfile) {
        this.setState({
          data: response.data,
          name:
            response.data.first_name + ' ' + response.data.last_name ||
            response.data.username,
          profileImage: response.data.profile_image || avatar
        })
      }
    }

    return null
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSearch = () => {
    console.log('Search')
  }

  changeToEdit = () => {
    this.props.history.push('/profile-edit')
  }

  handleLogout = () => {
    AppUtils.logout(this.props.history)
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
                      <span>{this.state.name}</span>
                      <img
                        alt={this.state.name}
                        src={this.state.profileImage}
                      />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.changeToEdit}>
                        {I18nUtils.t('asetting')}
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.handleLogout}>
                        {I18nUtils.t('logout')}
                      </DropdownItem>
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
            </Col>
          </Row>
        </Container>
      </header>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object,
  profileRequest: PropTypes.func,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.userProfile.processing,
    data: state.userProfile.data
  }
}

const mapDispatchToProps = dispatch => ({
  profileRequest: data => dispatch(ProfileActions.profileRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header))
