/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { show, hide } from 'redux-modal'
import { bindActionCreators } from 'redux'
import { ModalName } from '../../constants'
import AuthsActions from '../../redux/wrapper/AuthsRedux'
import I18nUtils from '../../utils/I18nUtils'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import {
  Button,
  FormGroup,
  FormText,
  Label
} from 'reactstrap'

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password1: '',
      password2: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    document.body.classList.add('cms-forgotpassword-index')
  }

  componentWillUnmount() {
    document.body.classList.remove('cms-forgotpassword-index')
  }

  matchPassword = (value) => {
    return value && value === this.state.password1
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response != nextProps.response) {
      let response = nextProps.response
      if (response.resetPassword) {
        this.props.show(ModalName.COMMON, { message: I18nUtils.t(response.messageCode), okFunction: () => this.okFunction()})
      }
    }
  }

  okFunction() {
    this.props.history.push('/login')
    this.props.hide(ModalName.COMMON)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = {
      uidb64: this.props.match.params.uidb64,
      token_key: this.props.match.params.token_key,
      password1: this.state.password1,
      password2: this.state.password2
    }
    this.props.resetPasswordRequest(data)
  }

  render() {
    return (
      <div className="login-page forgotpassword-page">
        <Helmet>
          <title>{I18nUtils.t('forgotpassword-page-title')}</title>
        </Helmet>
        <div className="login-header">
          <span>Re:Style</span>
        </div>
        <div className="login-content">
          <div className="form-center">
            <div className="form-header">
              <h3>{I18nUtils.t('forgotpassword-page-title')}</h3>
            </div>
            <div className="form-body">
              <ValidationForm
                onSubmit={this.handleSubmit}
              >
                <FormGroup>
                  <FormText color="muted">
                    {I18nUtils.t('forgot-text')}
                  </FormText>
                </FormGroup>
                <FormGroup>
                  <Label for="password1">{I18nUtils.t('newPassword')}</Label>
                  <TextInput
                    type="password"
                    name="password1"
                    id="password1"
                    placeholder={I18nUtils.t('all-place-password')}
                    onChange={this.handleChange}
                    required
                    pattern="(?=.*[A-Z]).{8,}"
                    errorMessage={{
                      required: I18nUtils.t('validate-field-0'),
                      pattern: I18nUtils.t('validate-pass')
                    }}
                    className="form-control"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password2">{I18nUtils.t('confirmPassword')}</Label>
                  <TextInput
                    type="password"
                    name="password2"
                    id="password2"
                    placeholder={I18nUtils.t('all-place-confirmPassword')}
                    onChange={this.handleChange}
                    required
                    validator={this.matchPassword}
                    errorMessage={{
                      required: I18nUtils.t('validate-field-0'),
                      validator: 'Password does not match'
                    }}
                    className="form-control"
                  />
                </FormGroup>
                <FormGroup>
                  <Link to="/login" title={I18nUtils.t('forgot-back-login')}>
                    &larr; {I18nUtils.t('forgot-back-login')}
                  </Link>
                </FormGroup>
                <FormGroup className="btns-group">
                  <Button color="primary">{I18nUtils.t('send')}</Button>
                </FormGroup>
              </ValidationForm>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ResetPasswordPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  processing: PropTypes.bool,
  response: PropTypes.object,
  show: PropTypes.func,
  hide: PropTypes.func,
  resetPasswordRequest: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.auths.processing,
    response: state.auths.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  resetPasswordRequest: data => dispatch(AuthsActions.resetPasswordRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPasswordPage))
