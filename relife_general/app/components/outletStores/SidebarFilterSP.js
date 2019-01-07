import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { Form, Label, Input, FormGroup, Button, Collapse, CustomInput } from 'reactstrap'
import I18nUtils from '../../utils/I18nUtils'
class SidebarFilterSP extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: false,

      keyword: '',
    }
    this.toggle = this.toggle.bind(this)
    this.handleResetForm = this.handleResetForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = e => {
    console.log(e.target.value)
  }
  handleResetForm = () => {
    document.getElementById('frm-search').reset()
  }
  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    let {locationList} = this.props
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
                          value={this.state.city}
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
                          className="field"
                          placeholder={I18nUtils.t('search-freeword')}
                          onChange={this.handleChange}
                        />
                    </div>
                  </div>
                  <div className="sidebar-search-choices-inner">
                    <div className="search-title">{I18nUtils.t('search-request')}</div>
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
                    <div className="search-title">{I18nUtils.t('search-content-request')}</div>
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
                    <div className="search-title">{I18nUtils.t('search-price-range')}</div>
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
                  <Button type="button" onClick={this.handleResetForm} className="sidebar-clear-btn btn clear-button">
                    {I18nUtils.t('search-clear')}
                  </Button>
                  <Button type="button" className="sidebar-search-btn btn btn-default">
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
}

export default connect()(withRouter(SidebarFilterSP))
