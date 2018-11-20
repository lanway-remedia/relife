/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Container, Row, Col, Button, FormGroup, Label, InputGroup, Input, InputGroupAddon } from 'reactstrap'
import StoreListModal from '../../components/StoreListModal'
import UsersActions from '../../redux/wrapper/UsersRedux'
import I18nUtils from '../../utils/I18nUtils'

class UserDetailPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: null,
      isAdd: true,
      showStoreList: false,
      username: '',
      password: '',
      confirmPassword: '',
      fname: '',
      lname: '',
      email: '',
      phone: '',
      address: '',
      store: null,
      group: 4
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      isAdd: this.props.history.location.pathname == '/add-user'
    })
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.data != nextProps.data) {
      
  //   }
  // }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  redirectToListAcc = () => {
    this.props.history.push('list-account')
  }

  matchPassword = (value) => {
    return value && value === this.state.password1
  }

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

  render() {
    let { isAdd, showStoreList, username, password, confirmPassword, fname, lname, email, phone, address, group } = this.state

    return (
      <Container fluid className="user-edit-profile">
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {isAdd ? I18nUtils.t('add-user') : I18nUtils.formatMessage({ id: 'ed-title' }, { username: username })}
          </h1>
        </div>
        <StoreListModal isOpen={showStoreList} toggle={isOpen => this.toggleHandle(isOpen)} />
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
                <InputGroup>
                  <Input type="text" name="store" id="store" disabled />
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
                  <option value={4}>{I18nUtils.t('group-user')}</option>
                  <option value={3}>{I18nUtils.t('group-sub-store')}</option>
                  <option value={2}>{I18nUtils.t('group-store-admin')}</option>
                  <option value={1}>{I18nUtils.t('group-system-admin')}</option>
                </Input>
              </FormGroup>
            </Col>

            <Col xs="12" md="12">
              <div className="btns-group text-left">
                <Button color="success">{isAdd ? I18nUtils.t('add') : I18nUtils.t('edit')}</Button>
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

UserDetailPage.propTypes = {
  history: PropTypes.object,
  maxFileSize: PropTypes.number,
  onChange: PropTypes.func,
  profileRequest: PropTypes.func,
  editProfileRequest: PropTypes.func,
  editProfileAvatarRequest: PropTypes.func,
  response: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.userProfile.processing,
    response: state.userProfile.data
  }
}

const mapDispatchToProps = dispatch => ({
  addUserRequest: data => dispatch(UsersActions.addUserRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserDetailPage))
