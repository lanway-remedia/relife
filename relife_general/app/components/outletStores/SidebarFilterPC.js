import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Form, Label, Input, FormGroup, Button, Select} from 'reactstrap'

class SidebarFilterPC extends React.Component {
  handleResetForm = () => {
    document.getElementById('frm-search').reset()
  }
  render () {
    return (
      <section className="side pc">
        <Form id="frm-search">
          <div className="sidebar-search-choices">
            <div className="sidebar-search-choices-inner">
              <div className="sidebar-search-place">
                <div className="search-title">地域</div>
                <input className="field" placeholder="地域" />
              </div>

              <div className="sidebar-search-word">
                <div className="search-title">フリーワード</div>
                <input className="field" placeholder="フリーワード" />
              </div>
            </div>
            <div className="sidebar-search-choices-inner">
              <div className="search-title">依頼先</div>
              <FormGroup>
                <Label>
                  <Input className="choices-input" type="checkbox" />
                  <span className="choices-parts">ハウスメーカー</span>
                </Label>
                <Label>
                  <Input className="choices-input" type="checkbox" />
                  <span className="choices-parts">工務店</span>
                </Label>
                <Label>
                  <Input className="choices-input" type="checkbox" />
                  <span className="choices-parts">設計事務所</span>
                </Label>
              </FormGroup>
            </div>

            <div className="sidebar-search-choices-inner">
              <div className="search-title">依頼先</div>
              <FormGroup>
                <Label>
                  <Input className="choices-input" type="checkbox" />
                  <span className="choices-parts">注文住宅</span>
                </Label>
                <Label>
                  <Input className="choices-input" type="checkbox" />
                  <span className="choices-parts">リフォーム</span>
                </Label>
                <Label>
                  <Input className="choices-input" type="checkbox" />
                  <span className="choices-parts">リノベーション</span>
                </Label>
              </FormGroup>
            </div>

            <div className="sidebar-search-choices-inner">
              <div className="search-title">価格帯（坪単価）</div>
              <div className="select-wrap">
                <select>
                  <option>20万円以上</option>
                  <option>30万円以上</option>
                  <option>40万円以上</option>
                  <option>50万円以上</option>
                </select>
              </div>
              <span className="select-between">
              ～
              </span>
              <div className="select-wrap">
                <select className="low">
                  <option>20万円以上</option>
                  <option>30万円以上</option>
                  <option>40万円以上</option>
                  <option>50万円以上</option>
                </select>
              </div>
            </div>
            <button type="button" onClick={this.handleResetForm} className="sidebar-clear-btn btn clear-button">
              入力値をリセット
            </button>
            <Button type="button" className="sidebar-search-btn btn btn-default">
              <i className="fa fa-search" />
              検索
            </Button>
          </div>
        </Form>
      </section>
    )
  }
}

export default connect()(withRouter(SidebarFilterPC))
