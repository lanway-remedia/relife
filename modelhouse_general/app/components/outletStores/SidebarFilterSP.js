import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { Form, Input, FormGroup, Button, Collapse, CustomInput } from 'reactstrap'
import I18nUtils from '../../utils/I18nUtils'
class SidebarFilterSP extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: false,

      locationList: [],
      city: '',
      keyword: '',
      type: [],
      business: [],
      min_price: '',
      max_price: '',
    }
    this.toggle = this.toggle.bind(this)
    this.handleResetForm = this.handleResetForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = e => {
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
    this.toggle()
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
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

  render() {
    let {locationList} = this.props
    let {city, keyword, type, business, min_price, max_price} = this.state
    const dataType = [
      { 'id': 1, 'title': 'ハウスメーカー'},
      { 'id': 2, 'title': '工務店'},
      { 'id': 3, 'title': '設計事務所'},
    ]
    const dataBussines = [
      { 'id': 1, 'title': '注文住宅'},
      { 'id': 2, 'title': 'リフォーム'},
      { 'id': 3, 'title': 'リノベーション'},
    ]
    return (
      <div className="filter-group sp">
        <div className="filter-button-open" onClick={this.toggle}>
          <span>
            {I18nUtils.t('search-view-more')}
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
                      <div className="search-title">{I18nUtils.t('search-city')}</div>
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
                      <div className="search-title">{I18nUtils.t('search-freeword')}</div>
                        <Input
                          type="text"
                          name="keyword"
                          value={keyword}
                          className="field"
                          placeholder={I18nUtils.t('search-freeword')}
                          onChange={this.handleChange}
                        />
                    </div>
                  </div>
                  <div className="sidebar-search-choices-inner">
                    <div className="search-title">{I18nUtils.t('search-request')}</div>
                      <FormGroup check>
                        {dataType.map((val, key) => (
                          <CustomInput
                          key={key}
                          type="checkbox" 
                          id={`${val.title}_sp`}
                          label={val.title}
                          value={val.id}
                          name="type"
                          onChange={this.handleChange}
                          defaultChecked={type.includes(val.id.toString())}
                          />
                        ))}
                      </FormGroup>
                  </div>

                  <div className="sidebar-search-choices-inner">
                    <div className="search-title">{I18nUtils.t('search-content-request')}</div>
                      <FormGroup check>
                        {dataBussines.map((val, key) => (
                          <CustomInput
                          key={key}
                          type="checkbox" 
                          id={`${val.title}_sp`}
                          label={val.title}
                          value={val.id}
                          name="business"
                          onChange={this.handleChange}
                          defaultChecked={business.includes(val.id.toString())}
                          />
                        ))}
                      </FormGroup>
                  </div>

                  <div className="sidebar-search-choices-inner">
                    <div className="search-title">{I18nUtils.t('search-price-range')}</div>
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

SidebarFilterSP.propTypes = {
  locationList : PropTypes.array,
  history: PropTypes.object,
  onPageLoad: PropTypes.func,
}

export default connect()(withRouter(SidebarFilterSP))
