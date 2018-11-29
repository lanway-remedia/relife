/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Container, Row, Col, Button, FormGroup, Label, InputGroup, Input, InputGroupAddon } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { ModalName } from '../../constants'
import StoreListModal from '../../components/StoreListModal'
import UsersActions from '../../redux/wrapper/UsersRedux'
import I18nUtils from '../../utils/I18nUtils'
import { Helmet } from 'react-helmet'

class AddUserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: null,
      showStoreList: false,
      id: null,
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      store: {},
      group: 4
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response != nextProps.response) {
      let response = nextProps.response
      if (response.addUser) {
        this.setState({
          id: response.id
        }, () => {
          this.props.show(ModalName.COMMON, { message: I18nUtils.t('US015'), closeFunction: () => this.closeFunction()})
        })
      }
    }
  }

  closeFunction = () => {
    this.props.history.push(`/user/${this.state.id}`)
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

  redirectToListAcc = () => {
    this.props.history.push('/users')
  }

  matchPassword = (value) => value && value === this.state.password

  showStoreListHandle = () => {
    this.setState({
      showStoreList: true
    })
  }

  toggleHandle = isOpen => {
    this.setState({
      showStoreList: isOpen
    })
  }

  selectStore = selectedStore => {
    this.setState({
      store: selectedStore,
      showStoreList: false
    })
  }

  addUser = () => {
    let data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      store: this.state.store.id,
      group: this.state.group
    }
    this.props.addUserRequest(data)
  }

  render() {
    let { showStoreList, username, password, confirmPassword, email, store, group } = this.state

    return (
      <Container fluid className="user-edit-profile">
        <Helmet>
          <title>{I18nUtils.t('add-user')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('add-user')}
          </h1>
        </div>
        <StoreListModal
          isOpen={showStoreList}
          toggle={isOpen => this.toggleHandle(isOpen)}
          selectStore={selectedStore => this.selectStore(selectedStore)}
        />
        <ValidationForm className="form-user-info" onSubmit={this.handleSubmit}>
          <Row>

            <Col xs="12" md="6">
              <FormGroup>
                <Label for="username">{I18nUtils.t('username')}</Label>
                <TextInput
                  type="text"
                  name="username"
                  id="username"
                  placeholder={I18nUtils.t('all-place-username')}
                  value={username}
                  onChange={this.handleChange}
                  required
                  pattern=".{3,}"
                  errorMessage={{
                    required: I18nUtils.t('validate-field-0'),
                    pattern: I18nUtils.t('validate-field-3')
                  }}
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
                <Label for="password">{I18nUtils.t('password')}</Label>
                <TextInput
                  type="password"
                  name="password"
                  id="password"
                  placeholder={I18nUtils.t('all-place-password')}
                  value={password}
                  onChange={this.handleChange}
                  required
                  pattern="(?=.*[A-Z]).{8,}"
                  errorMessage={{
                    required: I18nUtils.t('validate-field-0'),
                    pattern: I18nUtils.t('validate-pass')
                  }}
                  autoComplete="new-password"
                />
              </FormGroup>
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Label for="confirmPassword">{I18nUtils.t('confirmPassword')}</Label>
                <TextInput
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder={I18nUtils.t('all-place-confirmPassword')}
                  value={confirmPassword}
                  onChange={this.handleChange}
                  required
                  validator={this.matchPassword}
                  errorMessage={{
                    required: I18nUtils.t('validate-field-0'),
                    validator: 'Password does not match'
                  }}
                  autoComplete="new-password"
                />
              </FormGroup>
            </Col>

            <Col xs="12" md="6">
              <FormGroup>
                <Label for="store">{I18nUtils.t('store-selection')}</Label>
                <InputGroup>
                  <Input type="text" name="store" id="store" value={store.title || ''} disabled />
                  <InputGroupAddon addonType="append">
                    <Button type="button" color="secondary" onClick={this.showStoreListHandle}>{I18nUtils.t('store-selection')}</Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col>

            <Col xs="12" md="6">
              <FormGroup>
                <Label for="group">{I18nUtils.t('group-selection')}</Label>
                <Input type="select" name="group" id="group" onChange={this.handleChange} value={group}>
                  <option value={4}>{I18nUtils.t('group-4')}</option>
                  <option value={3}>{I18nUtils.t('group-3')}</option>
                  <option value={2}>{I18nUtils.t('group-2')}</option>
                  <option value={1}>{I18nUtils.t('group-1')}</option>
                </Input>
              </FormGroup>
            </Col>

            <Col xs="12" md="12">
              <div className="btns-group text-left">
                <Button color="success" onClick={this.addUser}>{I18nUtils.t('save')}</Button>
                <Button onClick={this.redirectToListAcc} color="danger">
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

AddUserPage.propTypes = {
  history: PropTypes.object,
  show: PropTypes.func,
  hide: PropTypes.func,
  maxFileSize: PropTypes.number,
  onChange: PropTypes.func,
  profileRequest: PropTypes.func,
  editProfileRequest: PropTypes.func,
  editProfileAvatarRequest: PropTypes.func,
  response: PropTypes.object,
  addUserRequest: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.users.processing,
    response: state.users.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  addUserRequest: data => dispatch(UsersActions.addUserRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddUserPage))
