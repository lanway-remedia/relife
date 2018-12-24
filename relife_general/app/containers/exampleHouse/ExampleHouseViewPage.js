import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import exh01 from '../../images/exh-01.jpg'
import exhItem01 from '../../images/exh-item-01.jpg'
import fbShare from '../../images/fb-share.png'
import twShare from '../../images/tw-share.png'
import ggShare from '../../images/gg-share.png'
import hatebuShare from '../../images/hatebu-share.png'
import rssShare from '../../images/rss-share.png'
import amebloShare from '../../images/ameblo-share.png'
import lineShare from '../../images/line-share.png'
class ExampleHouseViewPage extends React.Component {
  componentDidMount() {
    document.body.classList.add('example-house-view')
  }

  componentWillUnmount() {
    document.body.classList.remove('example-house-view')
  }

  render() {
    return (
      <div className="lower-contents">
        <div className="lower-contents-inner clearfix">
          <section className="main">
            <h1 className="page-title detail-title"> 
              ゆっくりとした時間が流れる家
            </h1>

            <div className="example-detail-company-name">
              株式会社クレアホーム
            </div>

            <div className="detail-img">
              <img src={exh01} />
            </div>

            <ul className="detail-keywords-link">
              <li><Link to="">かわいい</Link></li>
              <li><Link to="">アフターフォロー</Link></li>
              <li><Link to="">アフターメンテナンス</Link></li>
              <li><Link to="">二階建て</Link></li>
            </ul>

            <div className="example-detail">
            </div>

            <div className="detail-btn-wrap clearfix">
              <div className="detail-btn">
                <Link to="">この建築実例の会社案内</Link>
              </div>
            </div>

            <h2 className="detail-subtitle">この工務店の建築実例</h2>

            <div className="detail-list clearfix">
              <Link to="" className="detail-list-once">
                <div className="detail-list-once-img">
                  <img src={exhItem01} alt="exh-item" />
                </div>

                <h3 className="detail-list-once-title">
                  室内を見渡すのが楽しくなる、開放的な住まい
                </h3>

                <div className="detail-list-once-company-area">東京都西東京市</div>

                <div className="detail-list-once-company">株式会社クレアホームの施工事例</div>
              </Link>
            </div>

            <div className="share-body cf">
              <div className="share-body-block">
                <Link to="/">
                  <img src={fbShare} />
                </Link>
              </div>
              <div className="share-body-block">
                <Link to="/">
                  <img src={twShare} />
                </Link>
              </div>
              <div className="share-body-block">
                <Link to="/">
                  <img src={ggShare} />
                </Link>
              </div>
              <div className="share-body-block">
                <Link to="/">
                  <img src={hatebuShare} />
                </Link>
              </div>
              <div className="share-body-block">
                <Link to="/">
                  <img src={amebloShare} />
                </Link>
              </div>
              <div className="share-body-block">
                <Link to="/">
                  <img src={rssShare} />
                </Link>
              </div>
              <div className="share-body-block">
                <Link to="/">
                  <img src={lineShare} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(ExampleHouseViewPage))
