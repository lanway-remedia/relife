import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
// import I18nUtils from '../../utils/I18nUtils'
import { Form, Label, Input, FormGroup } from 'reactstrap'
import exh02 from '../../images/exh-01.jpg'
import exhItem01 from '../../images/exh-item-01.jpg'
import exhItem02 from '../../images/exh-item-02.jpg'
import exhItem03 from '../../images/exh-item-03.jpg'
class ExampleHouseListPage extends React.Component {
  render() {
    return (
      <div className="lower-contents">
        <div className="lower-contents-inner clearfix">
          <section className="main">
            <h1 className="search-result page-title">建築実例一覧</h1>
            <div className="adv-example">
              <div className="adv-example-once">
                <div className="adv-example-one-img">
                  <img src={exh02} alt="exh01" />
                </div>

                <div className="adv-example-once-title-wrap clearfix">
                  <div className="adv-example-once-title-left">
                    <h2 className="adv-example-once-title">ゆっくりとした時間が流れる家
                      <span className="pr-icon">PR</span>
                    </h2>
                  </div>

                  <div className="adv-example-once-title-right">
                    <div className="adv-example-once-link">
                      <Link to="/">詳細はこちら</Link>
                    </div>
                  </div>

                  <div className="adv-example-once-text">シンプルだけど存在感の大きさを感じる絶妙なデザイン</div>
                  <div className="adv-example-once-company-area">東京都西東京市</div>
                  <div className="adv-example-once-company">株式会社クレアホームの施工事例</div>
                </div>
              </div>
            </div>

            <div className="example-list clearfix">
              <Link to="" className="example-list-once">
                <div className="example-list-once-img">
                  <img src={exhItem01} alt="exh-item" />
                </div>

                <h3 className="example-list-once-title">
                  室内を見渡すのが楽しくなる、開放的な住まい
                </h3>

                <div className="example-list-once-company-area">東京都西東京市</div>

                <div className="example-list-once-company">株式会社クレアホームの施工事例</div>
              </Link>

              <Link to="" className="example-list-once">
                <div className="example-list-once-img">
                  <img src={exhItem02} alt="exh-item" />
                </div>

                <h3 className="example-list-once-title">
                  室内を見渡すのが楽しくなる、開放的な住まい
                </h3>

                <div className="example-list-once-company-area">東京都西東京市</div>

                <div className="example-list-once-company">株式会社クレアホームの施工事例</div>
              </Link>

              <Link to="" className="example-list-once">
                <div className="example-list-once-img">
                  <img src={exhItem03} alt="exh-item" />
                </div>

                <h3 className="example-list-once-title">
                  室内を見渡すのが楽しくなる、開放的な住まい
                </h3>

                <div className="example-list-once-company-area">東京都西東京市</div>

                <div className="example-list-once-company">株式会社クレアホームの施工事例</div>
              </Link>
            </div>
          </section>

          <section className="side pc">
            <Form>
              <div className="sidebar-search-choices">
                <div className="sidebar-search-choices-inner">
                  <div className="search-title">価格帯（価格）</div>
                    <FormGroup>
                      <Label>
                        <Input className="choices-input" type="checkbox" name="price_range[]" value="1500万未満" id="choices1" />
                        <span className="choices-parts">1500万未満</span>
                      </Label>
                      <Label>
                        <Input className="choices-input" type="checkbox" name="price_range[]" value="2000万未満" id="choices1" />
                        <span className="choices-parts">1500万未満</span>
                      </Label>
                    </FormGroup>
                </div>

                <div className="sidebar-search-choices-inner">
                  <div className="search-title">構造）</div>
                    <FormGroup>
                      <Label>
                        <Input className="choices-input" type="checkbox" name="price_range[]" value="1500万未満" id="choices1" />
                        <span className="choices-parts">木造軸組（在来）工法</span>
                      </Label>
                      <Label>
                        <Input className="choices-input" type="checkbox" name="price_range[]" value="2000万未満" id="choices1" />
                        <span className="choices-parts">ツーバイフォー・ツーバイシックス</span>
                      </Label>
                    </FormGroup>
                </div>
                <button name="action" value="clear" type="button" className="sidebar-clear-btn btn clear-button">
                  入力値をリセット
                </button>
                <button type="button" className="sidebar-search-btn btn btn-default">
                  <i className="fa fa-search" />
                  検索
                </button>
              </div>
            </Form>
          </section>
        </div>
      </div>
    )
  }
}

export default connect()(withRouter(ExampleHouseListPage))
