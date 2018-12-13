/**
 * @author HungDQ
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import AuthsActions from '../../redux/wrapper/AuthsRedux'
import I18nUtils from '../../utils/I18nUtils'
import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation'
import {Button, FormGroup, Label} from 'reactstrap'
import AppUtils from '../../utils/AppUtils'
// import { validator } from 'validator'
import { toast } from 'react-toastify'
import formLogo from '../../images/form-logo.png'
class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        document.body.classList.add('register-index')
    }
    componentWillUnmount() {
        document.body.classList.remove('register-index')
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.data != nextProps.data) {
            let data = nextProps.data.data
            if (data.token) {
                AppUtils.login(this.props.history, data.token, '/login')
                toast.success(
                    I18nUtils.formatMessage(
                        { id: 'toast-register-sucess' },
                    )
                )
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
            mail: this.state.email,
            username: this.state.username,
            password1: this.state.password,
            password2: this.state.confirmPassword,
            domain: window.location.origin + '/'
        }
        this.props.registerRequest(data)
    }
    matchPassword = (value) => value && value === this.state.password
    redirectBack = () => {
        this.props.history.back()
    }
    render() {
        return (
            <div className="register-page form-account">
                <Helmet>
                    <title>{I18nUtils.t('register-page-title')}</title>
                </Helmet>
                <div className="form-logo">
                    <img src={formLogo}
                        alt="logo" 
                        width="100%"
                    />
                </div>
                <h6 className="form-account_title">{I18nUtils.t('register')}</h6>

                <ValidationForm onSubmit={this.handleSubmit}>
                    <FormGroup className="form-account_label">
                        <Label for="email">{I18nUtils.t('email')}</Label>
                        <TextInput
                            className="form-control"
                            type="text"
                            name="email"
                            id="email"
                            placeholder={I18nUtils.t('email')}
                            required
                            pattern=".{3,}"
                            errorMessage={{
                                required: I18nUtils.t('validate-field-0'),
                                pattern: I18nUtils.t('validate-field-3')
                            }}
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </FormGroup>
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
                            className="form-control"
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
                    <FormGroup className="form-account_label">
                        <Label for="confirmPassword">{I18nUtils.t('confirmPassword')}</Label>
                        <TextInput
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder={I18nUtils.t('all-place-confirmPassword')}
                            value={this.state.confirmPassword}
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
                    <Button className="form_btn">{I18nUtils.t('register')}</Button>
                </ValidationForm>
            </div>
        )
    }
}
RegisterPage.propTypes = {
    history: PropTypes.object,
    data: PropTypes.object,
    processing: PropTypes.bool,
    registerRequest: PropTypes.func
}
const mapStateToProps = state => {
    return {
        processing: state.auths.processing,
        data: state.auths.data
    }
}
const mapDispatchToProps = dispatch => ({
    registerRequest: data => dispatch(AuthsActions.registerRequest(data))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(RegisterPage))
