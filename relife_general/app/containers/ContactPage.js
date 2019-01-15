/**
 * @author HANH TD
 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import I18nUtils from '../utils/I18nUtils'
import { Container, Row, Col, Button} from 'reactstrap'
import ContactTableTr from '../components/outletStores/ContactTableTr'
import ContactTableTh from '../components/outletStores/ContactTableTh'
import ContactRadio from '../components/outletStores/ContactRadio'
import OutletStoreActions from '../redux/wrapper/OutletStoresRedux'

import { ValidationForm, SelectGroup } from 'react-bootstrap4-form-validation'
import contactIcon01 from '../images/contact-icon01.jpg'
import contactIcon02 from '../images/contact-icon02.jpg'
import contactIcon03 from '../images/contact-icon03.jpg'
import contactIcon04 from '../images/contact-icon04.jpg'
import contactIcon05 from '../images/contact-icon05.jpg'
import ContactItem from '../components/ContactItem'
class ContactPage extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      name: '',
      email: '',
      tel: '',
      content: '',
      purpose: '',
      area: '',

    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = new FormData()
    data.append('name', this.state.name)
    data.append('email', this.state.email)
    data.append('tel', this.state.tel)
    data.append('area', this.state.area)
    data.append('purpose', this.state.purpose)
    data.append('content', this.state.content)
    this.props.outletStoresContactRequest(data)
  }

  render () {
    const purpose = [
      {id:1, title: '注文住宅について'},
      {id:2, title: '住宅のリノベーションについて'}
    ]
    return (
      <Container fluid className="lower-contents">
        <Row className="lower-contents-inner clearfix">
          <Col xs="12" md="12" className="padding-0">
              <h1 className="single-title">
                {I18nUtils.t('contact-page-title')}
                <span>
                  {I18nUtils.t('contact-page-sub-title')}
                </span>
              </h1>
              <div className="contact-subtitle-wrap clearfix">
                <ContactItem
                  title="1.工務店・建築会社がわかる"
                  imgSrc={contactIcon01}
                  content="各社の環境や雰囲気を考慮して、あなたにとって最適な会社をコンシェルジュがご紹介します。"
                />
                <ContactItem
                  title="2.ご希望に合った住まいのご相談"
                  imgSrc={contactIcon02}
                  content="リフォーム・リノベーション、二世帯住宅、趣味を生かした家など、理想の住宅についてご相談ください。"
                />
                <ContactItem
                  title="3.お金についてのアドバイス"
                  imgSrc={contactIcon03}
                  content="住宅ローンはもちろん、見落としがちな費用のアドバイスもします。提携のFPも無料で紹介します。"
                />
                <ContactItem
                  title="4.家づくりの流れと注意点"
                  imgSrc={contactIcon04}
                  content="住まいに関する基本的な知識が身につけられるよう、専門家が監修する講座が無料で受講できます。"
                />
                <ContactItem
                  title="5.打ち合わせ日調整の代行"
                  imgSrc={contactIcon05}
                  content="工務店・建築会社との打ち合わせ日程の調整をします。後にお断りする際の代行もいたします。"
                />
              </div>

              <div className="tab-contact padding-0">
                <ValidationForm
                  onSubmit={this.handleSubmit}
                  defaultErrorMessage={{ required: I18nUtils.t('validate-require')}}
                >
                  <ContactTableTr 
                    title={I18nUtils.t('name')}
                    name="name" 
                    placeholder={I18nUtils.t('all-place-your-company-name2')}
                    required
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                  <ContactTableTr 
                    title={I18nUtils.t('email')}
                    name="email" 
                    placeholder={I18nUtils.t('all-place-name-email-test')}
                    required
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                  <ContactTableTr 
                    title={I18nUtils.t('tel')}
                    name="tel"
                    placeholder={I18nUtils.t('all-place-tel')}
                    required={false}
                    onChange={this.handleChange}
                    value={this.state.tel}
                  />
                  <div className="contact_table_tr">
                    <ContactTableTh
                      title={I18nUtils.t('resident-area')}
                      required
                    />
                    <div className="contact_table_td">
                      <span className="contact_table_td_input">
                        <div className="contact_table_select">
                          <SelectGroup name="area" id="araa"
                            value={this.state.area}
                            required
                            onChange={this.handleChange}
                          >
                            <option value="">{I18nUtils.t('all-place-area')}</option>
                            <option value="0">Red</option>
                            <option value="1">Green</option>
                            <option value="2">Blue</option>
                            <option value="3">Yellow</option>
                          </SelectGroup>
                        </div>
                      </span>
                    </div>
                  </div>

                  <div className="contact_table_tr">
                    <ContactTableTh
                      title={I18nUtils.t('things-consideration')}
                      required={false}
                    />
                    <ContactRadio
                      name="purpose"
                      data={purpose}
                      onChange={this.handleChange}
                      value={this.state.purpose}
                    />
                  </div>
                  <div className="contact_table_tr">
                    <ContactTableTh 
                      title={I18nUtils.t('contact-inquiry')}
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
                  <p className="contact-button">
                    <Button className="btn-default">
                      {I18nUtils.t('confirm')}
                    </Button>
                  </p>
                </ValidationForm>
              </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
ContactPage.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
  outletStoresContactRequest: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    data: state.outletStores.data,
  }
}

const mapDispatchToProps = (dispatch) => ({
  outletStoresContactRequest: data =>
    dispatch(OutletStoreActions.outletStoresContactRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactPage))
