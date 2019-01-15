import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import I18nUtils from '../utils/I18nUtils'
import { Container, Row} from 'reactstrap'
import AboutUsOne from './../components/AboutUsOne'

import logo from '../images/logo.png'
import m1 from '../images/m1.jpg'
import m2 from '../images/m2.jpg'
import m3 from '../images/m3.jpg'
import m4 from '../images/m4.jpg'
import m5 from '../images/m5.jpg'
import m6 from '../images/m6.jpg'
import m7 from '../images/m7.jpg'
import m8 from '../images/m8.jpg'
import m9 from '../images/m9.jpg'

import aboutUs1 from '../images/about01.jpg'
import aboutUs2 from '../images/about02.jpg'
import aboutUs3 from '../images/about03.jpg'
import aboutUs4 from '../images/about04.jpg'
import aboutUs5 from '../images/about05.jpg'
class AboutUsPage extends React.Component {
  render() {
    let items = [m1, m2, m3, m4, m5, m6, m7, m8, m9]
    let item = items[Math.floor(Math.random()*items.length)]
    return (
      <div>
        <div className="back-ground-wrap">
          <div className="back-ground" style={{backgroundImage: `url(${item})`}} />
        </div>
        <Container fluid className="lower-contents one-column">
          <Row className="lower-contents-inner">
            <section className="about-us">
              <div className="about-us-logo">
                <img src={logo} alt="logo" />
              </div>
              <h1 className="about-us-title">
                {I18nUtils.t('about-us-page-title-1')}
              <br className="sp" />
                {I18nUtils.t('about-us-page-title-2')}
              </h1>
              <p className="about-us-text">
                {I18nUtils.t('about-us-text-1')}
                <br />
                {I18nUtils.t('about-us-text-2')}
              </p>
              <div className="about-us-wrap">
                <AboutUsOne
                  title="理想の家を思い描く"
                  content="たくさんの施工事例を見て、あなた自身の家づくりについて、考えるヒントにしましょう。"
                  imgSrc={aboutUs1}
                />
                <AboutUsOne
                  title="全国のモデルハウスを検索"
                  content="目的のモデルハウスを見つける事ができる検索軸を搭載。モデルハウスから家づくりを検討したい方にオススメです。"
                  imgSrc={aboutUs2}
                />
                <AboutUsOne
                  title="工務店・施工会社を見る"
                  content="あなたの住んでいる地域を施工エリアにしている工務店や施工会社を探しましょう。"
                  imgSrc={aboutUs3}
                />
                <AboutUsOne
                  title="専門家に相談する"
                  content="経験豊富なコンシェルジュが家づくりについてのどんなことでもアドバイスします。"
                  imgSrc={aboutUs4}
                />
                <AboutUsOne
                  title="理想の家に住む"
                  content="完成した理想の住まい。豊かに暮らすためのノウハウが満載なウェブマガジン。Re:Style。"
                  imgSrc={aboutUs5}
                />
              </div>
            </section>
          </Row>
        </Container>
      </div>
    )
  }
}
export default connect()(withRouter(AboutUsPage))
