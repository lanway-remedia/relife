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
      type: '',
      outlet_store_business: [],
      min_price: '',
      max_price: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleResetForm = this.handleResetForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    let type = e.target.type
    console.log(type)
    if (type == 'text' || type == 'select-one') {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleResetForm = () => {
    document.getElementById('frm-search-pc').reset()
    this.form && this.form.reset()
  }

  handleSubmit = () => {

  }
  componentDidMount() {
    console.log(this.props)
  }

  render () {
    let {locationList} = this.props
    console.log(locationList)
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
                  value={this.state.city}
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
                className="field"
                placeholder={I18nUtils.t('search-freeword')}
                onChange={this.handleChange}
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
                id="ハウスメーカー" 
                label="ハウスメーカー"
                onChange={this.handleChange}
              />
              <CustomInput 
                type="checkbox" 
                id="工務店" 
                label="工務店"
                onChange={this.handleChange}
              />
              <CustomInput 
                type="checkbox" 
                id="設計事務所" 
                label="設計事務所"
                onChange={this.handleChange}
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
                id="注文住宅" 
                label="注文住宅"
                onChange={this.handleChange}
              />
              <CustomInput 
                type="checkbox" 
                id="リフォーム" 
                label="リフォーム"
                onChange={this.handleChange}
              />
              <CustomInput 
                type="checkbox" 
                id="リノベーション" 
                label="リノベーション"
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
  locationList : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
}

export default connect()(withRouter(SidebarFilterPC))
