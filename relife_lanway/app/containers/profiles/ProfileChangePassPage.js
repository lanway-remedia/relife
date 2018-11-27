/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProfileActions from '../../redux/wrapper/UserProfileRedux'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Container, Row, Col, Button, FormGroup, Label } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { ModalName } from '../../constants'
import I18nUtils from '../../utils/I18nUtils'

class ProfileChangePassPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      id: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  }

  componentDidMount() {
    document.title = `${I18nUtils.t('ucp-page-title')}`
    let data = {}
    this.props.profileRequest(data)
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = {
      password: this.state.currentPassword,
      password1: this.state.newPassword,
      password2: this.state.confirmNewPassword
    }
    this.props.changePassRequest(data)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      if (nextProps.data.getProfile) {
        this.setState({
          data: nextProps.data.data,
          id: nextProps.data.data.id
        })
      }
      if (nextProps.data.changePass) {
        if (nextProps.data.messageCode)
        this.props.show(ModalName.COMMON, { message: I18nUtils.t(nextProps.data.messageCode), closeFunction: () => this.closeFunction() })
      }
    }
  }

  closeFunction = () => {
    this.props.history.push(`/`)
    this.props.hide(ModalName.COMMON)
  }

  redirectToProfile = () => {
    this.props.history.push('/')
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  matchPassword = (value) => value && value === this.state.newPassword

  render() {
    let { data } = this.state
    let fullName = data.first_name + ' ' + data.last_name
    return (
      <Container fluid className="user-edit-profile">
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.formatMessage(
              { id: 'ucp-title' },
              { username: data.username }
            )}
          </h1>
        </div>
        <div className="account-avatar">
          <div className="info ed">
            <p>
              {I18nUtils.formatMessage({ id: 'ucp-hi' }, { name: fullName })}
            </p>
            <p>{I18nUtils.t('ucp-welcome')}</p>
          </div>
        </div>
        <ValidationForm className="form-user-info" onSubmit={this.handleSubmit}>
          <Row>
            <Col xs="12" md="6">
              <FormGroup>
                <Label for="currentPassword">
                  {I18nUtils.t('currentPassword')}
                </Label>
                <TextInput
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder={I18nUtils.t('all-place-currentPassword')}
                  value={this.state.currentPassword}
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
          </Row>
          <Row>
            <Col xs="12" md="6">
              <FormGroup>
                <Label for="fname">{I18nUtils.t('newPassword')}</Label>
                <TextInput
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder={I18nUtils.t('all-place-newPassword')}
                  value={this.state.newPassword}
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
                <Label for="email">{I18nUtils.t('confirmNewPassword')}</Label>
                <TextInput
                  type="password"
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  placeholder={I18nUtils.t('all-place-confirmNewPassword')}
                  value={this.state.confirmNewPassword}
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
            <Col xs="12" md="12">
              <div className="btns-group text-left">
                <Button color="success">{I18nUtils.t('changePassword')}</Button>
                <Button onClick={this.redirectToProfile} color="danger">
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

ProfileChangePassPage.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
  profileRequest: PropTypes.func,
  changePassRequest: PropTypes.func,
  show: PropTypes.func,
  hide:PropTypes.func
}

const mapStateToProps = state => {
  return {
    data: state.userProfile.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  profileRequest: data => dispatch(ProfileActions.profileRequest(data)),
  changePassRequest: data => dispatch(ProfileActions.changePassRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileChangePassPage))
