/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import AuthsActions from '../../redux/wrapper/AuthsRedux'
import I18nUtils from '../../utils/I18nUtils'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Button, FormGroup, Label } from 'reactstrap'
import AppUtils from '../../utils/AppUtils'

import logo from '../../images/form-logo.png'
class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    document.body.classList.add('cms-index-auth')
  }

  componentWillUnmount() {
    document.body.classList.remove('cms-index-auth')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let data = nextProps.data.data
      if (data.token) {
        AppUtils.login(this.props.history, data.token, '/')
      }
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.loginRequest(data)
  }

  render() {
    return (
      <div className="form-account" id="login">
        <Helmet>
          <title>{I18nUtils.t('login-page-title')}</title>
        </Helmet>
        <div className="form-logo">
            <img src={logo}
              alt="logo" 
              width="100%"
            />
        </div>
        <h6 className="form-account_title">
          {I18nUtils.t('login-title')}
        </h6>
        <ValidationForm onSubmit={this.handleSubmit}>
          <FormGroup className="form-account_label">
            <Label for="username">{I18nUtils.t('username')}</Label>
            <TextInput
              className="form-control"
              type="text"
              name="username"
              id="username"
              placeholder={I18nUtils.t('all-place-username')}
              required
              pattern=".{3,}"
              errorMessage={{
                required: I18nUtils.t('validate-field-0'),
                pattern: I18nUtils.t('validate-field-3')
              }}
              onChange={this.handleChange}
              value={this.state.username}
            />
          </FormGroup>
          <FormGroup className="form-account_label">
            <Label for="password">{I18nUtils.t('password')}</Label>
            <TextInput
              type="password"
              name="password"
              id="password"
              placeholder={I18nUtils.t('all-place-password')}
              required
              pattern="(?=.*[A-Z]).{8,}"
              errorMessage={{
                required: I18nUtils.t('validate-field-0'),
                pattern: I18nUtils.t('validate-pass')
              }}
              onChange={this.handleChange}
              autoComplete="new-password"
              value={this.state.password}
            />
          </FormGroup>
          <Button className="form_btn btn-default">
            {I18nUtils.t('login')}
          </Button>
          <p className="text-center">
            <Link 
              to="/forgot-password"
              title={I18nUtils.t('forgot-password-text')}
              className="form_link text-green fs-12"
            >
              {I18nUtils.t('if-forgot-password')}
            </Link>
          </p>
        </ValidationForm>
      </div>
    )
  }
}

LoginPage.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
  processing: PropTypes.bool,
  loginRequest: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.auths.processing,
    data: state.auths.data
  }
}

const mapDispatchToProps = dispatch => ({
  loginRequest: data => dispatch(AuthsActions.loginRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage))
