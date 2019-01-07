import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { Form, Input, FormGroup, Button } from 'reactstrap'
import I18nUtils from '../../utils/I18nUtils'
import { CustomInput } from 'reactstrap'

class SidebarFilterPC extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationList: [],

      city: '',
      keyword: '',
      type: [],
      business: [],
      min_price: '',
      max_price: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleResetForm = this.handleResetForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    let type = e.target.type
    let name = e.target.name
    if (type == 'text' || type == 'select-one') {
      this.setState({
        [e.target.name]: e.target.value
      })
    } else if (type == 'checkbox') {
      let itemChecked
      if (name == 'type') {
        itemChecked = this.state.type
      } else if (name == 'business') {
        itemChecked = this.state.business
      }
      const value = e.target.value
      const isChecked = e.target.checked

      if (isChecked === false) {
        itemChecked = itemChecked.filter(item => item !== value)
      } else {
        itemChecked.push(value)
      }
      this.setState({
        [e.target.name] : itemChecked
      })
    }
  }

  handleResetForm = () => {
    this.props.history.push({
      search: `` 
    })

    this.setState({
      city: '',
      keyword: '',
      type: [],
      business: [],
      min_price: '',
      max_price: '',
    })

    document.getElementById('frm-search-pc').reset()
    this.props.onPageLoad()
  }

  handleSubmit = () => {
    let {city, keyword, type, business, min_price, max_price} = this.state
    let typeParam = type.join(',')
    let businessParam = business.join(',')
    let parsed = {
      ...(city && { city: city}),
      ...(keyword && { keyword: keyword}),
      ...(type.length > 0 && { type__in: typeParam}),
      ...(business.length > 0 && { business__business__in: businessParam}),
      ...(min_price && { min_price__gte: min_price}),
      ...(max_price && { max_price__lte: max_price})
    }
    let search = new URLSearchParams(parsed)
    this.props.history.push({
      search: `?${search.toString()}`
    })
    this.props.onPageLoad()
  }
  componentDidMount() {
    let params = new URLSearchParams(this.props.history.location.search)
    let city = params.get('city')
    let keyword = params.get('keyword')
    let type = params.get('type__in')
    let business = params.get('business__business__in')
    let max_price = params.get('max_price__lte')
    let min_price = params.get('min_price__gte')

    this.setState({
      city: city ? city : '',
      keyword: keyword ? keyword : '',
      type: type ? type.split(',') : [],
      business: business ? business.split(',') : [],
      max_price: max_price ? max_price : '',
      min_price: min_price ? min_price : '',
    })
  }

  render () {
    let {locationList} = this.props
    let {city, keyword, type, business, min_price, max_price} = this.state
    console.log(type.includes('1'))
    return (
      <section className="side pc">
        <Form id="frm-search-pc">
          <div className="sidebar-search-choices-inner">
            <div className="sidebar-search-place">
              <div className="search-title">
              { I18nUtils.t('search-city')}
              </div>
              <div className="select-wrap">
                <Input 
                  type="select"
                  name="city"
                  onChange={this.handleChange}
                  value={city}
                >
                  {locationList.map((val, key) => (
                    <option key={key}>{val.name}</option>
                  ))}
                </Input>
              </div>
            </div>

            <div className="sidebar-search-word">
              <div className="search-title">
                {I18nUtils.t('search-freeword')}
              </div>
              <Input
                type="text"
                name="keyword"
                value={keyword}
                className="field"
                placeholder={I18nUtils.t('search-freeword')}
                onChange={this.handleChange}
                defaultChecked="true"
              />
            </div>
          </div>

          <div className="sidebar-search-choices-inner">
            <div className="search-title">
              {I18nUtils.t('search-request')}
            </div>
            <FormGroup check>
              <CustomInput 
                type="checkbox" 
                id="ハウスメーカー_pc" 
                label="ハウスメーカー"
                value="1"
                name="type"
                onChange={this.handleChange}
                defaultChecked
              />
              <CustomInput 
                type="checkbox" 
                id="工務店_pc" 
                label="工務店"
                value="2"
                name="type"
                onChange={this.handleChange}
                defaultChecked={type.includes('2')}
              />
              <CustomInput 
                type="checkbox" 
                id="設計事務所_pc" 
                label="設計事務所"
                value="3"
                name="type"
                onChange={this.handleChange}
                defaultChecked={type.includes('3')}
              />
            </FormGroup>
          </div>

          <div className="sidebar-search-choices-inner">
            <div className="search-title">
              {I18nUtils.t('search-content-request')}
            </div>
            <FormGroup check>
              <CustomInput 
                type="checkbox" 
                id="注文住宅_pc" 
                label="注文住宅"
                value="1"
                name="business"
                onChange={this.handleChange}
              />
              <CustomInput 
                type="checkbox" 
                id="リフォーム_pc" 
                label="リフォーム"
                value="2"
                name="business"
                onChange={this.handleChange}
              />
              <CustomInput 
                type="checkbox" 
                id="リノベーション_pc" 
                label="リノベーション"
                value="3"
                name="business"
                onChange={this.handleChange}
              />
            </FormGroup>
          </div>

          <div className="sidebar-search-choices-inner">
            <div className="search-title">
              {I18nUtils.t('search-price-range')}
            </div>
            <div className="select-wrap">
              <Input 
              type="select" 
              name="min_price"
              onChange={this.handleChange}
              value={min_price}
              >
                <option value="0">下限なし</option>
                <option value="1">20万円以上</option>
                <option value="2">30万円以上</option>
                <option value="3">40万円以上</option>
                <option value="4">50万円以上</option>
                <option value="5">60万円以上</option>
                <option value="6">70万円以上</option>
                <option value="7">80万円以上</option>
                <option value="8">90万円以上</option>
                <option value="9">100万円以上</option>
                <option value="10">110万円以上</option>
                <option value="11">120万円以上</option>
              </Input>
            </div>
            <span className="select-between">
              ～
            </span>
            <div className="select-wrap">
              <Input 
                type="select" 
                name="max_price" 
                onChange={this.handleChange}
                value={max_price}
              >
                <option value="1">20万円以下</option>
                <option value="2">30万円以下</option>
                <option value="3">40万円以下</option>
                <option value="4">50万円以下</option>
                <option value="5">60万円以下</option>
                <option value="6">70万円以下</option>
                <option value="7">80万円以下</option>
                <option value="8">90万円以下</option>
                <option value="9">100万円以下</option>
                <option value="10">110万円以下</option>
                <option value="11">120万円以下</option>
                <option value="12">上限なし</option>
              </Input>
            </div>
          </div>
          <Button 
            type="button" 
            onClick={this.handleResetForm} 
            className="sidebar-clear-btn btn clear-button"
          >
            {I18nUtils.t('search-clear')}
          </Button>
          <Button 
            type="button" 
            className="sidebar-search-btn btn btn-default"
            onClick={this.handleSubmit}
          >
            <i className="fa fa-search" />
            {I18nUtils.t('search')}
          </Button>
        </Form>
      </section>
    )
  }
}
SidebarFilterPC.propTypes = {
  locationList : PropTypes.array,
  history: PropTypes.object,
  onPageLoad: PropTypes.func,
}

export default connect()(withRouter(SidebarFilterPC))
