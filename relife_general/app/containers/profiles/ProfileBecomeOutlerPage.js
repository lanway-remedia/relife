/**
 * @author HANH TD
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'reactstrap'

import { ValidationForm } from 'react-bootstrap4-form-validation'
import I18nUtils from '../../utils/I18nUtils'
import ProfileActions from '../../redux/wrapper/ProfileRedux'
import ContactTableTr from '../../components/outletStores/ContactTableTr'
import ContactTableTh from '../../components/outletStores/ContactTableTh'
class ProfileBecomeOutlerPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      email: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = new FormData()
    data.append('title', this.state.title)
    data.append('email', this.state.email)
    this.props.becomeStoreRequest(data)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Container fluid className="lower-contents one-column">
        <Row className="lower-contents-inner clearfix">
          <Col xs="12" md="12" className="padding-0">
            <section className="main">
              <h1 className="single-title">
                {I18nUtils.t('become-store-page-title')}
              </h1>
              <p className="contact-txt">
                 {I18nUtils.t('become-store-text-1')}
                <br />{I18nUtils.t('become-store-text-2')}
                <br />{I18nUtils.t('become-store-text-3')}
              </p>
              <div className="tab-contact padding-0">
                <ValidationForm
                  onSubmit={this.handleSubmit}
                  defaultErrorMessage={{ required: I18nUtils.t('validate-require')}}
                >
                  <ContactTableTr 
                    title={I18nUtils.t('your-company-name')}
                    name="title" 
                    placeholder={I18nUtils.t('all-place-your-company-name')} 
                    required 
                    onChange={this.handleChange}
                    value={this.state.title}
                  />
                  <ContactTableTr 
                    title={I18nUtils.t('your-company-name2')}
                    name="name" 
                    placeholder={I18nUtils.t('all-place-your-company-name2')}
                    required={false} 
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                  <ContactTableTr 
                    title={I18nUtils.t('name-person-charge')}
                    name="person_charge"
                    placeholder={I18nUtils.t('all-place-name-person-charge')}
                    required={false} 
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                  <ContactTableTr 
                    title={I18nUtils.t('name-contact-person')}
                    name="person_contact"
                    placeholder={I18nUtils.t('all-place-name-contact-person')}
                    required={false}
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                  <ContactTableTr 
                    title={I18nUtils.t('email')} 
                    name="email"
                    placeholder={I18nUtils.t('all-place-name-email-test')}
                    errorMessage={{
                      validator: I18nUtils.t('validate-email')
                    }}
                    required
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                  <ContactTableTr 
                    title={I18nUtils.t('tel')}
                    name="tel"
                    placeholder={I18nUtils.t('all-place-tel')}
                    required={false} 
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                  <div className="contact_table_tr">
                    <ContactTableTh 
                      title={I18nUtils.t('comment')}
                      required={false}
                    />
                    <div className="contact_table_td">
                      <span className="contact_table_td_input">
                        <textarea
                          name="content"
                          placeholder={I18nUtils.t('all-place-comment')}
                          cols="40"
                          rows="10"
                          onChange={this.handleChange}
                          value={this.state.content}
                        />
                      </span>
                    </div>
                  </div>
                  <p className="form-text">
                    {I18nUtils.t('privacy-policy-text-1')}
                    <br />
                    {I18nUtils.t('re-life')}
                    <Link 
                      to="/privacypolicy/"
                      target="_blank"
                    >
                    {I18nUtils.t('privacy-policy')}
                    </Link>
                    {I18nUtils.t('privacy-policy-text-2')}
                  </p>
                  <p className="contact-button">
                    <Button className="btn-default">
                      {I18nUtils.t('confirm')}
                    </Button>
                  </p>
                </ValidationForm>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    )
  }
}

ProfileBecomeOutlerPage.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
  show: PropTypes.func,
  hide: PropTypes.func,
  becomeStoreRequest: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    data: state.profile.data
  }
}

const mapDispatchToProps = dispatch => ({
  becomeStoreRequest: data =>
    dispatch(ProfileActions.becomeStoreRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileBecomeOutlerPage))
