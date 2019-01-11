/**
 * @author HANH TD
 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import I18nUtils from '../utils/I18nUtils'
import { Container, Row, Col} from 'reactstrap'
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
  render () {
    return (
      <Container fluid className="lower-contents one-column">
        <Row className="lower-contents-inner clearfix">
          <Col xs="12" md="12" className="padding-0">
            <section className="main">
              <h1 className="single-title">
                住まいづくりのコンシェルジュに無料で相談
                <span>
                  あなたに合う工務店・建築会社を紹介しサポートします。
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
                <div className="contact-body">
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    )
  }
}
ContactPage.propTypes = {
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
  // becomeStoreRequest: data =>
  //   dispatch(ProfileActions.becomeStoreRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactPage))
