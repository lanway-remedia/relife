/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import LoginActions from '../redux/login/LoginRedux'
import I18nUtils from '../utils/I18nUtils'
import {
  Button,
  FormGroup,
  InputGroupAddon,
  Input,
  InputGroup,
  Label
} from 'reactstrap'
import AppUtils from '../utils/AppUtils'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    //this.props.loginRequest('namnh@test.com', 'Aa123456')
    document.body.classList.add('cms-login-index')
    document.title = `${I18nUtils.t('login-page-title')}`
  }

  componentWillUnmount() {
    document.body.classList.remove('cms-login-index')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let data = nextProps.data
      this.setState({
        data: data
      })
    }
  }

  login = () => {
    AppUtils.login(this.props.history, 'token', '/')
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-header">
          <span>Re:Style</span>
        </div>
        <div className="login-content">
          <div className="form-center">
            <div className="form-header">
              <h3>{I18nUtils.t('login-page-title')}</h3>
            </div>
            <div className="form-body">
              <FormGroup>
                <Label for="loginEmail">{I18nUtils.t('email')}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">
                      <i className="fa fa-envelope" aria-hidden="true" />
                    </span>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    name="loginEmail"
                    id="loginEmail"
                    placeholder={I18nUtils.t('all-place-email')}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="loginPassword">{I18nUtils.t('password')}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">
                      <i className="fa fa-unlock" aria-hidden="true" />
                    </span>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    name="loginPassword"
                    id="loginPassword"
                    placeholder={I18nUtils.t('all-place-password')}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Link
                  to="/forgot-password"
                  title={I18nUtils.t('forgotPassword')}
                >
                  {I18nUtils.t('forgotPassword')}
                </Link>
              </FormGroup>
              <FormGroup className="btns-group">
                <Button color="primary" onClick={() => this.login()}>
                  {I18nUtils.t('login')}
                </Button>
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.login.processing,
    data: state.login.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginRequest: (email, password) =>
      dispatch(LoginActions.loginRequest(email, password))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage))
