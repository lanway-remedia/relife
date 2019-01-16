import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col, Button, Input} from 'reactstrap'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import ContactTableTr from './ContactTableTr'
import ContactTableTh from './ContactTableTh'
import ContactRadio from './ContactRadio'
import AttributeActions from '../../redux/wrapper/AttributesRedux'
import OutletStoreActions from '../../redux/wrapper/OutletStoresRedux'
class TabContact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listPrice: [],
      listFamilyMember: [],
      listHouseIncome: [],

      data: [],
      name : '',
      name_kana: '',
      zip1: '',
      zip2: '',
      address: '',
      email: '',
      tel: '',
      age: '',
      household_size: '',
      acreage: '',
      construction_position_type: '',
      construction_position: '',
      construction_duration: '',
      budget: '',
      household_income: '',
      construction_type: '',
      current_situation: '',
      content: '',

      showAddress: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    let data = {
      limit: '',
      offset: '' 
    }
    this.props.attributeHouseIncomeListRequest(data)
    this.props.attributeHouseSizeListRequest(data)
    this.props.attributePriceListRequest(data)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      //list price range
      if (response.isGetListPrice) {
        this.setState({
          listPrice: response.data
        })
      }
      // list house hold size
      if (response.isGetListHouseSize) {
        this.setState({
          listFamilyMember: response.data
        })
      }
      // list house hold income
      if (response.isGetListHouseIncome) {
        this.setState({
          listHouseIncome: response.data
        })
      }
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
    
    if (e.target.name == 'construction_position_type' && e.target.value == 3) {
      this.setState({
        showAddress : true
      })
    } else if (e.target.name == 'construction_position_type' && e.target.value !== 3) {
      this.setState({
        showAddress : false
      })
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    let data = new FormData()
    data.append('outlet_store_id', this.props.storeId)
    data.append('name', this.state.name)
    data.append('name_kana', this.state.name_kana)
    data.append('email', this.state.email)
    data.append('tel', this.state.tel)
    data.append('age', this.state.age)
    data.append('zipcode', `${this.state.zip1}－${this.state.zip2}`)
    data.append('address', this.state.address)

    data.append('household_size', this.state.household_size)
    data.append('acreage', this.state.acreage)
    data.append('construction_position', this.state.construction_position)
    data.append('construction_position_type', this.state.construction_position_type)
    data.append('construction_duration', this.state.construction_duration)
    data.append('budget', this.state.budget)
    data.append('household_income', this.state.household_income)
    data.append('construction_type', this.state.construction_type)
    data.append('current_situation', this.state.current_situation)
    data.append('content', this.state.content)

    this.props.outletStoresContactRequest(data)
  }
  render() {
    const household_size = [
      { 'id': 1, 'title': '1名〜2名'},
      { 'id': 2, 'title': '3名〜4名'},
      { 'id': 3, 'title': '5名〜6名'},
      { 'id': 4, 'title': '7名以上'},
    ]

    const acreage = [
      { 'id': 1, 'title': '20坪以下', 'order': 0 },
      { 'id': 2, 'title': '20坪台', 'order': 0 },
      { 'id': 3, 'title': '30坪台', 'order': 0 },
      { 'id': 4, 'title': '40坪台', 'order': 0 },
      { 'id': 5, 'title': '50坪台', 'order': 0 },
      { 'id': 6, 'title': '60坪台', 'order': 0 },
      { 'id': 6, 'title': '70坪台', 'order': 0 },
      { 'id': 6, 'title': '80坪台', 'order': 0 },
      { 'id': 6, 'title': '90坪以上', 'order': 0 },
    ]

    const construction_position_type = [
      { 'id': 1, 'title': '現住所と同じ', 'order': 0},
      { 'id': 2, 'title': '未定', 'order': 0},
      { 'id': 3, 'title': '予定地を入力（※土地をすでにお持ちの場合）', 'order': 0},
    ]

    const construction_duration = [
      { 'id': 1, 'title': '3ヵ月以内', 'order': 0},
      { 'id': 2, 'title': '6ヵ月以内', 'order': 0},
      { 'id': 3, 'title': '1年以内', 'order': 0},
      { 'id': 4, 'title': '1～2年以内', 'order': 0},
      { 'id': 5, 'title': '2～3年以内', 'order': 0},
      { 'id': 6, 'title': '未定', 'order': 0},
    ]

    const budget = [
      { 'id': 1, 'title': '1500万未満', 'order': 0},
      { 'id': 2, 'title': '1500万〜3000', 'order': 0},
      { 'id': 3, 'title': '3000万〜6000万', 'order': 0},
      { 'id': 4, 'title': '6000万以上', 'order': 0},
    ]

    const household_income = [
      { 'id': 1, 'title': '350万未満以下', 'order': 0},
      { 'id': 2, 'title': '350万〜500万未満', 'order': 0},
      { 'id': 3, 'title': '500万〜800万未満', 'order': 0},
      { 'id': 4, 'title': '800万〜1000万未満', 'order': 0},
      { 'id': 5, 'title': '1000万〜1500万未満', 'order': 0},
      { 'id': 6, 'title': '1500万〜2000万未満', 'order': 0},
      { 'id': 7, 'title': '2000万以上', 'order': 0},
    ]

    const construction_type = [
      { 'id': 1, 'title': '新規', 'order': 0},
      { 'id': 2, 'title': '建て替え', 'order': 0},
      { 'id': 3, 'title': 'リフォーム', 'order': 0},
      { 'id': 4, 'title': 'リノベーション', 'order': 0},
    ]

    const current_situation = [
      { 'id': 1, 'title': '住宅・リフォーム・リノベの検討を始めた', 'order': 0},
      { 'id': 2, 'title': '住宅・リフォーム・リノベ情報収集をしている（個別の会社とはまだ接触していない）', 'order': 0},
      { 'id': 3, 'title': '工務店・ハウスメーカーと契約した', 'order': 0},
      { 'id': 4, 'title': '工事に着手している', 'order': 0},
      { 'id': 5, 'title': 'すでに完成している', 'order': 0},
      { 'id': 6, 'title': 'その他', 'order': 0},
    ]
    const {showAddress} = this.state
    return (
      <Row className="tab-content-item clearfix">
        <Col xs="12" md="12" className="tab-contact padding-0">
          <ValidationForm
            onSubmit={this.handleSubmit}
            defaultErrorMessage={{ required: '必須項目に記入もれがあります。'}}
          >
            <ContactTableTr 
              title="お名前" 
              name="name" 
              placeholder="山田太郎" 
              required 
              onChange={this.handleChange}
              value={this.state.name}
            />
            <ContactTableTr 
              title="ふりがな" 
              name="name_kana" 
              placeholder="ヤマダタロウ" 
              required 
              onChange={this.handleChange}
              value={this.state.name_kana}
            />
            <div className="contact_table_tr">
              <ContactTableTh title="ご住所" required />
              <div className="contact_table_td">
                <div className="addressbar">
                  <p>〒</p>
                  <p>
                    <TextInput 
                      type="text"
                      name="zip1"
                      onChange={this.handleChange}
                      value={this.state.zip1}
                    />
                  </p>
                  <p> － </p>
                  <p>
                    <TextInput 
                        type="text"
                        name="zip2"
                        onChange={this.handleChange}
                        value={this.state.zip2}
                    />
                  </p>
                  <p className="attention">※半角で入力してください。住所が自動で入力されます</p>
                  <TextInput 
                    type="text"
                    name="address"
                    placeholder="自動で入力されます"
                    onChange={this.handleChange}
                    value={this.state.address}
                  />
                </div>
              </div>
            </div>

            <ContactTableTr 
              title="メールアドレス" 
              name="email" 
              placeholder="test@test.co.jp" 
              required 
              onChange={this.handleChange} 
              value={this.state.email}
            />
            <ContactTableTr 
              title="電話番号" 
              name="tel" 
              placeholder="ハイフンなどの入力は不要です" 
              required 
              onChange={this.handleChange}
              value={this.state.tel}
            />

            <div className="contact_table_tr">
              <ContactTableTh title="年齢" required={false} />
              <div className="contact_table_td">
                <span className="contact_table_td_input">
                  <Input 
                    type="number"
                    name="age"
                    onChange={this.handleChange}
                    style={{width: `20%`,
                            margin: `0 10px 0 0`,
                            display: `inline-block`
                          }}
                    value={this.state.age}
                  />
                </span>
                歳
              </div>
            </div>

            <div className="contact_table_tr">
              <ContactTableTh title="家族構成" required={false} />
              <ContactRadio 
                name="household_size" 
                data={household_size} 
                onChange={this.handleChange} 
                value={this.state.household_size} 
              />
            </div>

            <div className="contact_table_tr">
              <ContactTableTh title="希望の広さ（敷地面積）" required={false} />
              <ContactRadio 
                name="acreage" 
                data={acreage} 
                onChange={this.handleChange} 
                value={this.state.acreage} 
              />
            </div>

            <div className="contact_table_tr">
              <ContactTableTh title="建設予定地" required={false} />
              <ContactRadio 
                name="construction_position_type" 
                data={construction_position_type} 
                onChange={this.handleChange} 
                showAddress={showAddress} 
                value={this.state.construction_position_type} 
              />
            </div>

            <div className="contact_table_tr">
              <ContactTableTh 
                title="建設予定時期" 
                required={false} 
              />
              <ContactRadio 
                name="construction_duration" 
                data={construction_duration} 
                onChange={this.handleChange} 
                value={this.state.construction_duration} 
              />
            </div>

            <div className="contact_table_tr">
              <ContactTableTh 
                title="予算" 
                required={false} 
              />
              <ContactRadio 
                name="budget" 
                data={budget} 
                onChange={this.handleChange} 
                value={this.state.budget} 
              />
            </div>

            <div className="contact_table_tr">
              <ContactTableTh 
                title="世帯年収" 
                required={false} 
              />
              <ContactRadio 
                name="household_income" 
                data={household_income} 
                onChange={this.handleChange} 
                value={this.state.household_income} 
              />
            </div>

            <div className="contact_table_tr">
              <ContactTableTh 
                title="建設内容" 
                required={false} 
              />
              <ContactRadio 
                name="construction_type" 
                data={construction_type} 
                onChange={this.handleChange} 
                value={this.state.construction_type} 
              />
            </div>

            <div className="contact_table_tr">
              <ContactTableTh 
                title="現在の状況" 
                required={false} 
              />
              <ContactRadio 
                name="current_situation" 
                data={current_situation} 
                onChange={this.handleChange} 
                value={this.state.current_situation} 
              />
            </div>

            <div className="contact_table_tr">
              <ContactTableTh title="お問い合わせ・ご相談" required={false} />
              <div className="contact_table_td">
                <span className="contact_table_td_input">
                  <textarea
                    name="content"
                    placeholder="ご希望やご質問があれば自由にお書きください"
                    cols="40"
                    rows="10"
                    onChange={this.handleChange}
                    value={this.state.content}
                  />
                </span>
              </div>
            </div>

            <p className="form-text">
              ご入力頂いた個人情報は、Re:Life運営元である株式会社ランウェイ・リメディアのプライバシーポリシーに則って厳重に管理します。
              <br />
              Re:Lifeの
              <Link 
                to="/privacypolicy/"
                target="_blank"
              >
              プライバシーポリシー
              </Link>
              についてはリンク先をご覧ください。
            </p>

            <p className="contact-button">
              <Button className="btn-default">
                確認画面
              </Button>
            </p>
            
            <p className="form-text">
              <b>
                Re:Life（本サイト）の資料請求における個人情報の取扱いについて
              </b>
              <br />
              ●本サイトは、株式会社ランウェイ・リメディアが窓口となり、お客様からの資料請求について、住宅会社に対して資料の送付希望をお伝えするものです。
              <br />
              ●本フォームからお客様が記入・登録された個人情報は、資料送付・電子メール送信・電話連絡などの目的で株式会社ランウェイ・リメディアと、資料請求先の住宅会社が利用・保管します。
              <br />
              ●資料請求先住宅会社が保管する個人情報の取扱いについては、各住宅会社に直接お問合せください。
            </p>

            <p className="form-text">
              上記とは別に株式会社ランウェイ・リメディアでは本サイトを円滑に運用するために、お客様の個人情報をサービスご利用の控えとして一定期間保管いたします。
              <br />
              ご記入の内容が不明瞭で資料をお送りできない場合、その他当社が本サービスを円滑に運用するために必要な範囲において、直接株式会社ランウェイ・リメディアから確認のご連絡をさせていただくことがありますので、あらかじめご了承ください。
              <br />
              また、資料請求内容等は集計処理のうえ、個人を特定できない形で統計として活用させていただきます。
              <br />
              株式会社ランウェイ・リメディアの
              <Link to="/privacypolicy" target="_blank">プライバシーポリシー</Link>
              をご覧ください。
            </p>
          </ValidationForm>
        </Col>
      </Row>
    )
  }
}

TabContact.propTypes = {
  processing: PropTypes.bool,
  data: PropTypes.object,
  attributePriceListRequest: PropTypes.func,
  attributeContructionListRequest: PropTypes.func,
  attributeFloorListRequest: PropTypes.func,
  attributeStyleListRequest: PropTypes.func,
  attributeHouseSizeListRequest: PropTypes.func,
  attributeHouseIncomeListRequest: PropTypes.func,
  outletStoresContactRequest: PropTypes.func,
  storeId: PropTypes.number
}

const mapStateToProps = state => {
  return {
    processing: state.attributes.processing,
    data: state.attributes.data
  }
}

const mapDispatchToProps = dispatch => ({
  attributePriceListRequest: data =>
    dispatch(AttributeActions.attributePriceListRequest(data)),
  attributeContructionListRequest: data =>
    dispatch(AttributeActions.attributeContructionListRequest(data)),
  attributeFloorListRequest: data =>
    dispatch(AttributeActions.attributeFloorListRequest(data)),
  attributeStyleListRequest: data =>
    dispatch(AttributeActions.attributeStyleListRequest(data)),
  attributeHouseSizeListRequest: data =>
    dispatch(AttributeActions.attributeHouseSizeListRequest(data)),
  attributeHouseIncomeListRequest: data =>
    dispatch(AttributeActions.attributeHouseIncomeListRequest(data)),
  outletStoresContactRequest: data =>
    dispatch(OutletStoreActions.outletStoresContactRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TabContact))
