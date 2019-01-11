import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import logo from '../images/logo.png'
import fbIcon from '../images/fb-icon.png'
import instaIcon from '../images/insta-icon.png'
import pinIcon from '../images/pin-icon.png'
import twiIcon from '../images/twi-icon.png'
import lanwayLogo from '../images/lanway-logo.png'
class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo">
            <img src={logo} alt="Re:style" />
          </div>
        </div>
        <div className="footer-inner clearfix">
          <div className="fl clearfix">
            <div className="footer-link-title">Re:Lifeについて</div>
            <ul className="footer-link">
              <li><Link to="/about_us/">Re:Lifeとは</Link></li>
              <li><Link to="/become-outler">建築会社・工務店さまへ</Link></li>
              <li><Link to="http://style.relf.jp/">Re:Style</Link></li>
            </ul>
            <div className="footer-link-title">注文住宅を検討の方へ</div>
            <ul className="footer-link">
              <li><Link to="/builder/">建築会社・工務店を探す</Link></li>
              <li><Link to="/example/">建築実例を見る</Link></li>
              <li><Link to="/contact/">注文住宅を相談する</Link></li>
              <li><Link to="http://style.relf.jp/">専門家コラムを読む</Link></li>
            </ul>
          </div>
          <div className="footer-sns clearfix">
            <div className="footer-sns-title">FOLLOW US!</div>
            <ul>
              <li>
                <a href="https://www.facebook.com/relf.jp/">
                  <img src={fbIcon} alt="fb-icon" />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/relf_jp">
                  <img src={twiIcon} alt="fb-icon" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/relf_jp/">
                  <img src={instaIcon} alt="fb-icon" />
                </a>
              </li>
              <li>
                <a href="https://www.pinterest.jp/relf_jp/">
                  <img src={pinIcon} alt="fb-icon" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-inner clearfix">
            <div className="lanway-logo">
              <img src={lanwayLogo} alt="Lanway" />
            </div>
            <ul className="footer-bottom-link">
              <li><a href="http://remedia.lanway.jp/">運営会社</a></li>
              <li><Link to="/privacypolicy/">プライバシーポリシー</Link></li>
              <li><Link to="/rule/">利用規約</Link></li>
            </ul>
            <div className="copyright pc">© 2018 LanWay Inc.</div>
          </div>
        </div>

        <div className="footer-sp sp">
          <div className="copyright">© 2018 LanWay Inc.</div>
        </div>
      </footer>
    )
  }
}

export default connect()(withRouter(Footer))
