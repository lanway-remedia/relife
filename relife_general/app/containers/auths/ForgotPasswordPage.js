
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { show, hide } from 'redux-modal'
import { bindActionCreators } from 'redux'
// import { ModalName } from '../../constants'
import AuthsActions from '../../redux/wrapper/AuthsRedux'
import I18nUtils from '../../utils/I18nUtils'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import validator from 'validator'
import { Button, FormGroup, FormText } from 'reactstrap'
class ForgotPasswordPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mail: ''
        }
    }

    componentDidMount() {
        document.body.classList.add('forgotpassword-index')
    }
    
    componentWillUnmount() {
        document.body.classList.remove('forgotpassword-index')
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.response != nextProps.response) {
        console.log(nextProps)
      }
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value
      })
    }

    handleSubmit = e => {
      e.preventDefault()
      let data = this.state.mail
      this.props.forgotPasswordRequest(data)
    }
    render() {
      return (
        <div className="login-page">
          <Helmet>
            <title>{I18nUtils.t('login-page-title')}</title>
          </Helmet>
          <div className="login-content">
            <div className="form-center">
              <div className="form-logo">
              </div>
              <div className="form-body">
                <ValidationForm>
                  <FormGroup>
                    <FormText color="muted">
                      {I18nUtils.t('forgot-text')}
                    </FormText>
                  </FormGroup>
                  <FormGroup>
                    <TextInput
                      type="email"
                      name="mail"
                      id="mail"
                      placeholder={I18nUtils.t('all-place-email')}
                      onChange={this.handleChange}
                      validator={validator.isEmail} 
                      errorMessage={{validator:'Please enter a valid email'}}
                      className="form-control"
                    />
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

ForgotPasswordPage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  processing: PropTypes.bool,
  response: PropTypes.object,
  show: PropTypes.func,
  hide: PropTypes.func,
  forgotPasswordRequest: PropTypes.func
}
const mapStateToProps = state => {
    return {
      processing: state.auths.processing,
      response: state.auths.data
    }
  }
  
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  forgotPasswordRequest: data => dispatch(AuthsActions.forgotPasswordRequest(data))
})
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ForgotPasswordPage))
