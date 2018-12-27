import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Form, Label, Input } from 'reactstrap'
import ContactTableTr from './ContactTableTr'
import ContactTableTh from './ContactTableTh'
class TabContact extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="contact-body clearfix">
          <div className="contact-form">
            <Form>
              <div className="contact-table">
                <ContactTableTr title="お名前" placeholder="山田太郎" required />
                <ContactTableTr title="ふりがな" placeholder="ヤマダタロウ" required />
                <ContactTableTr title="メールアドレス" placeholder="test@test.co.jp" required />
                <ContactTableTr title="電話番号" placeholder="ハイフンなどの入力は不要です" required />
                <div className="contact_table_tr">
                  <ContactTableTh title="ご住所" required />
                  <div className="contact_table_td">
                    <div className="addressbar">
                      <p>〒</p>
                      <p>
                        <input 
                          type="text"
                          name="zip1"
                        />
                      </p>
                      <p> － </p>
                      <p>
                        <input 
                            type="text"
                            name="zip2"
                        />
                      </p>
                      <p className="attention">※半角で入力してください。住所が自動で入力されます</p>
                      <input 
                        type="text"
                        name="your-address"
                        placeholder="自動で入力されます"
                      />
                    </div>
                  </div>
                </div>

                <div className="contact_table_tr">
                  <ContactTableTh title="ご住所" required={false} />
                  <div className="contact_table_td">
                    <span className="contact_table_td_input">
                      <input 
                        type="text"
                        name="your-age"
                        style={{width: `20%`,
                                margin: `0 10px 0 0`
                              }}
                      />
                    </span>
                    歳
                  </div>
                </div>

                <div className="contact_table_tr">
                  <ContactTableTh title="家族構成" required={false} />
                  <div className="contact_table_td">
                    <Label className="choices-item">
                      <Input className="choices-input" type="radio" name="a" />
                      <span className="choices-parts">350万未満以下</span>
                    </Label>
                    <Label className="choices-item">
                      <Input className="choices-input" type="radio" name="a" />
                      <span className="choices-parts">350万〜500万未満</span>
                    </Label>
                    <Label className="choices-item">
                      <Input className="choices-input" type="radio" name="a" />
                      <span className="choices-parts">350万〜500万未満</span>
                    </Label>
                    <Label className="choices-item">
                      <Input className="choices-input" type="radio" name="a" />
                      <span className="choices-parts">800万〜1000万未満</span>
                    </Label>
                  </div>
                </div>

              </div>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
export default connect()(withRouter(TabContact))
