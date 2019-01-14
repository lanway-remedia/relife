import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import logo from '../images/logo.png'
import fbIcon from '../images/fb-icon.png'
import instaIcon from '../images/insta-icon.png'
import pinIcon from '../images/pin-icon.png'
import twiIcon from '../images/twi-icon.png'
import lanwayLogo from '../images/lanway-logo.png'
import I18nUtils from '../utils/I18nUtils'
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
            <div className="footer-link-title">{I18nUtils.t('about-relife')}</div>
            <ul className="footer-link">
              <li><Link to="/about-us/">{I18nUtils.t('what-is-relife')}</Link></li>
              <li><Link to="/become-outler">{I18nUtils.t('company-store')}</Link></li>
              <li><Link to="http://style.relf.jp/">{I18nUtils.t('re-style')}</Link></li>
            </ul>
            <div className="footer-link-title">{I18nUtils.t('for-order-house')}</div>
            <ul className="footer-link">
              <li><Link to="/builder/">{I18nUtils.t('find-company-store')}</Link></li>
              <li><Link to="/example/">{I18nUtils.t('view-example-house')}</Link></li>
              <li><Link to="/contact/">{I18nUtils.t('consult-an-order-house')}</Link></li>
              <li><Link to="http://style.relf.jp/">{I18nUtils.t('read-style')}</Link></li>
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
              <li><a href="http://remedia.lanway.jp/">{I18nUtils.t('operating-company')}</a></li>
              <li><Link to="/privacy-policy/">{I18nUtils.t('privacy-policy')}</Link></li>
              <li><Link to="/rule/">{I18nUtils.t('rule-page-title')}</Link></li>
            </ul>
            <div className="copyright pc">{I18nUtils.t('copy-right-company')}</div>
          </div>
        </div>

        <div className="footer-sp sp">
          <div className="copyright">{I18nUtils.t('copy-right-company')}</div>
        </div>
      </footer>
    )
  }
}

export default connect()(withRouter(Footer))
