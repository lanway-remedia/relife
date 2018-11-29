/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { ModalName } from '../../constants'
import UsersActions from '../../redux/wrapper/UsersRedux'
import I18nUtils from '../../utils/I18nUtils'
import { Helmet } from 'react-helmet'

class EditUserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: null,
      username: '',
      fname: '',
      lname: '',
      email: '',
      phone: '',
      address: '',
      store: {},
      group: 4
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    let id = this.props.match.params.id
    this.props.findUserById(id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response != nextProps.response) {
      let response = nextProps.response
      if (response.findUserById) {
        this.setState({
          username: response.data.username,
          fname: response.data.first_name || '',
          lname: response.data.last_name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          address: response.data.address || '',
          store: response.data.store || {},
          group: response.data.group
        })
      }
      if (response.editUser) {
        this.props.show(ModalName.COMMON, { message: I18nUtils.t('US016'), closeFunction: () => this.closeFunction() })
      }
    }
  }

  closeFunction = () => {
    this.props.history.push(`/user/${this.props.match.params.id}`)
    this.props.hide(ModalName.COMMON)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  redirectToDetailAcc = () => {
    this.props.history.push(`/user/${this.props.match.params.id}`)
  }

  editUser = () => {
    let data = {
      id: this.props.match.params.id,
      email: this.state.email,
      first_name: this.state.fname,
      last_name: this.state.lname,
      tel: this.state.phone,
      address: this.state.address
    }
    this.props.editUserRequest(data)
  }

  render() {
    let { username, fname, lname, email, phone, address, store, group } = this.state

    return (
      <Container fluid className="user-edit-profile">
        <Helmet>
          <title>{username}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.formatMessage({ id: 'ed-title' }, { username: username })}
          </h1>
        </div>
        <ValidationForm className="form-user-info" onSubmit={this.handleSubmit}>
          <Row>
            <Col xs="12" md="6">
              <FormGroup>
                <Label for="username">{I18nUtils.t('username')}</Label>
                <TextInput
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label for="email">{I18nUtils.t('email')}</Label>
                <TextInput
                  type="text"
                  name="email"
                  id="email"
                  placeholder={I18nUtils.t('all-place-email')}
                  value={email}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label for="fname">{I18nUtils.t('fname')}</Label>
                <TextInput
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder={I18nUtils.t('all-place-fname')}
                  value={fname}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label for="fname">{I18nUtils.t('lname')}</Label>
                <TextInput
                  type="text"
                  name="lname"
                  id="lname"
                  placeholder={I18nUtils.t('all-place-lname')}
                  value={lname}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label for="phone">{I18nUtils.t('phone')}</Label>
                <TextInput
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder={I18nUtils.t('all-place-phone')}
                  value={phone}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label for="address">{I18nUtils.t('address')}</Label>
                <TextInput
                  type="text"
                  name="address"
                  id="address"
                  placeholder={I18nUtils.t('all-place-address')}
                  value={address}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label for="store">{I18nUtils.t('store-selection')}</Label>
                <Input type="text" name="store" id="store" value={store.title || ''} disabled />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label for="group">{I18nUtils.t('group-selection')}</Label>
                <Input type="select" name="group" id="group" value={group} disabled>
                  <option value={4}>{I18nUtils.t('group-user')}</option>
                  <option value={3}>{I18nUtils.t('group-sub-store')}</option>
                  <option value={2}>{I18nUtils.t('group-store-admin')}</option>
                  <option value={1}>{I18nUtils.t('group-system-admin')}</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xs="12" md="12">
              <div className="btns-group text-left">
                <Button color="success" onClick={this.editUser}>{I18nUtils.t('save')}</Button>
                <Button onClick={this.redirectToDetailAcc} color="danger">
                  {I18nUtils.t('back')}
                </Button>
              </div>
            </Col>
          </Row>
        </ValidationForm>
      </Container>
    )
  }
}

EditUserPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  show: PropTypes.func,
  hide: PropTypes.func,
  response: PropTypes.object,
  editUserRequest: PropTypes.func,
  findUserById: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.users.processing,
    response: state.users.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  editUserRequest: data => dispatch(UsersActions.editUserRequest(data)),
  findUserById: id => dispatch(UsersActions.findUserById(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditUserPage))
