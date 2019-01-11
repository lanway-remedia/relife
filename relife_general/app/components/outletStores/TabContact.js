import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col, Button, Input} from 'reactstrap'
import I18nUtils from '../../utils/I18nUtils'
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
            defaultErrorMessage={{ required: I18nUtils.t('validate-require')}}
          >
            <ContactTableTr 
              title={I18nUtils.t('name')}
              name="name" 
              placeholder={I18nUtils.t('all-place-name')}
              required 
              onChange={this.handleChange}
              value={this.state.name}
            />
            <ContactTableTr 
              title={I18nUtils.t('name-kana')}
              name="name_kana" 
              placeholder={I18nUtils.t('all-place-name-kana')}
              required 
              onChange={this.handleChange}
              value={this.state.name_kana}
            />
            <div className="contact_table_tr">
              <ContactTableTh title={I18nUtils.t('address-1')} required />
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
                  <p className="attention">※{I18nUtils.t('address-attention')}</p>
                  <TextInput 
                    type="text"
                    name="address"
                    placeholder={I18nUtils.t('all-place-address')}
                    onChange={this.handleChange}
                    value={this.state.address}
                  />
                </div>
              </div>
            </div>

            <ContactTableTr 
              title={I18nUtils.t('email')}
              name="email"
              placeholder={I18nUtils.t('all-place-name-email-test')}
              required
              onChange={this.handleChange}
              value={this.state.email}
            />
            <ContactTableTr
              title={I18nUtils.t('tel')}
              name="tel"
              placeholder={I18nUtils.t('all-place-tel')}
              required
              onChange={this.handleChange}
              value={this.state.tel}
            />

            <div className="contact_table_tr">
              <ContactTableTh title={I18nUtils.t('age')} required={false} />
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
                {I18nUtils.t('age1')}
              </div>
            </div>

            <div className="contact_table_tr">
              <ContactTableTh title={I18nUtils.t('household-size')} required={false} />
              <ContactRadio 
                name="household_size" 
                data={household_size} 
                onChange={this.handleChange} 
                value={this.state.household_size} 
              />
            </div>

            <div className="contact_table_tr">
              <ContactTableTh title={I18nUtils.t('acreage')} required={false} />
              <ContactRadio 
                name="acreage" 
                data={acreage} 
                onChange={this.handleChange} 
                value={this.state.acreage} 
              />
            </div>

            <div className="contact_table_tr">
              <ContactTableTh title={I18nUtils.t('construction-position-type')} required={false} />
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
                title={I18nUtils.t('construction-duration')} 
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
                title={I18nUtils.t('budget')}
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
                title={I18nUtils.t('household-income')}
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
                title={I18nUtils.t('construction-type')} 
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
                title={I18nUtils.t('current-situation')}
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
              <ContactTableTh title={I18nUtils.t('question')} required={false} />
              <div className="contact_table_td">
                <span className="contact_table_td_input">
                  <textarea
                    name="content"
                    placeholder={I18nUtils.t('all-place-question')}
                    cols="40"
                    rows="10"
                    onChange={this.handleChange}
                    value={this.state.content}
                  />
                </span>
              </div>
            </div>

            <p className="form-text">
              {I18nUtils.t('privacy-policy-text-1')}
              <br />
              {I18nUtils.t('re-life')}
              <Link 
                to="/privacypolicy/"
                target="_blank"
              >
              {I18nUtils.t('privacy-policy')}
              </Link>
              {I18nUtils.t('privacy-policy-text-2')}
            </p>

            <p className="contact-button">
              <Button className="btn-default">
                {I18nUtils.t('confirm')}
              </Button>
            </p>
            
            <p className="form-text">
              <b>
              {I18nUtils.t('privacy-policy-text-3')}
              </b>
              <br />
              ●{I18nUtils.t('privacy-policy-text-3-1')}
              <br />
              ●{I18nUtils.t('privacy-policy-text-3-2')}
              <br />
              ●{I18nUtils.t('privacy-policy-text-3-3')}
            </p>

            <p className="form-text">
              {I18nUtils.t('privacy-policy-text-4')}
              <br />
              {I18nUtils.t('privacy-policy-text-5')}
              <br />
              {I18nUtils.t('privacy-policy-text-6')}
              <br />
              {I18nUtils.t('privacy-policy-text-7')}
              <Link to="/privacypolicy" target="_blank">{I18nUtils.t('privacy-policy')}</Link>
              {I18nUtils.t('privacy-policy-text-8')}
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
