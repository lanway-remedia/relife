import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Form, Label, Input, FormGroup, Button, Collapse } from 'reactstrap'

class SidebarFilterSP extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: false,

      keyword: '',
    }
    this.toggle = this.toggle.bind(this)
    this.handleResetForm = this.handleResetForm.bind(this)
  }
  handleResetForm = () => {
    document.getElementById('frm-search').reset()
  }
  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    return (
      <div className="filter-group sp">
        <div className="filter-button-open" onClick={this.toggle}>
          <span>
            さらに詳しく検索する
            <i className="fa fa-search" />
          </span>
        </div>
        <Collapse isOpen={this.state.collapse}>
          <div className="filter-block">
            <div className="filter-block-inner">
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
                      <select className="low">
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
                  <Button type="button" onClick={this.handleResetForm} className="sidebar-clear-btn btn clear-button">
                    入力値をリセット
                  </Button>
                  <Button type="button" className="sidebar-search-btn btn btn-default">
                    <i className="fa fa-search" />
                    検索
                  </Button>
                </div>
              </Form>
              <div className="filter-button-close" onClick={this.toggle}>
                <span className="css-cancel" />
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    )
  }
}
export default connect()(withRouter(SidebarFilterSP))
