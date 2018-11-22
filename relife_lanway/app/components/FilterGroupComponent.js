import React, { Component } from 'react'
import PropTypes from 'prop-types'
import I18nUtils from '../utils/I18nUtils'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap'

class FilterGroupComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toDate: moment()
    }
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this)
    this.handleChangeToDate = this.handleChangeToDate.bind(this)
  }

  handleChangeFromDate(date) {
    this.setState({
      fromDate: date
    })
  }

  handleChangeToDate(date) {
    this.setState({
      toDate: date
    })
  }

  handleShowHideForm = e => {
    let elem = e.target
    let lbNotice = document.getElementsByClassName('lb-showhide')
    if (elem.nextSibling.offsetHeight > 0)
      elem.nextSibling.setAttribute('style', 'display:none'),
        lbNotice[0].classList.add('active'),
        elem.classList.remove('active')
    else
      elem.nextSibling.setAttribute('style', 'display:block'),
        lbNotice[0].classList.remove('active'),
        elem.classList.add('active')
  }

  render() {
    const props = this.props
    return (
      <div className="filter-group mb-5">
        <label
          className="lb-search"
          onClick={this.handleShowHideForm}
          title={I18nUtils.t('lb-fil-tooltip')}
        >
          {I18nUtils.t('lb-ad-search')}
          <i className="fa fa-angle-down" aria-hidden="true" />
        </label>
        <Form
          className={props.formClass}
          method="POST"
          action={props.formAction}
        >
          <Row>
            {props.inputTitle &&
              props.inputTitle.split(',').map((title, key) => {
                return (
                  <Col xs="12" md="6" key={key}>
                    <FormGroup>
                      <Label for={'filter' + title}>
                        {I18nUtils.t(title.toLowerCase())}
                      </Label>
                      <Input
                        type={title === 'Email' ? 'email' : 'text'}
                        name={'filter' + title}
                        id={'filter' + title}
                        placeholder={I18nUtils.t(
                          'all-place-' + title.toLowerCase()
                        )}
                      />
                    </FormGroup>
                  </Col>
                )
              })}
            {props.calendarName && (
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for={'filter' + props.calendarName.replace(' ', '')}>
                    {I18nUtils.t(
                      props.calendarName.replace(' ', '-').toLowerCase()
                    )}
                  </Label>
                  <InputGroup className="form-datepicker">
                    <DatePicker
                      className="form-control"
                      selected={this.state.fromDate}
                      onChange={this.handleChangeFromDate}
                      dateFormat="YYYY/MM/DD"
                      locale="en-us"
                      placeholderText="yyyy/mm/dd"
                      name={'filterFrom' + props.calendarName.replace(' ', '')}
                    />
                    <InputGroupAddon
                      addonType="prepend"
                      className="input-group-append"
                    >
                      ~
                    </InputGroupAddon>
                    <DatePicker
                      className="form-control"
                      selected={this.state.toDate}
                      onChange={this.handleChangeToDate}
                      dateFormat="YYYY/MM/DD"
                      locale="en-us"
                      placeholderText="yyyy/mm/dd"
                      name={'filterTo' + props.calendarName.replace(' ', '')}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
            )}
            {props.status && (
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for={'filterStatus'}>{I18nUtils.t('status')}</Label>
                  <Input type="select" name="filterStatus" id="filterStatus">
                    <option value="">{I18nUtils.t('lb-select')}</option>
                    <option value="">{I18nUtils.t('lb-enable')}</option>
                    <option value="">{I18nUtils.t('lb-disabled')}</option>
                  </Input>
                </FormGroup>
              </Col>
            )}
            {props.city && (
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for={'filterCity'}>{I18nUtils.t('city')}</Label>
                  <Input type="select" name="filterCity" id="filterCity">
                    <option value="">{I18nUtils.t('lb-select')}</option>
                    <option value="">{I18nUtils.t('lb-enable')}</option>
                    <option value="">{I18nUtils.t('lb-disabled')}</option>
                  </Input>
                </FormGroup>
              </Col>
            )}
            {props.district && (
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for={'filterDistrict'}>
                    {I18nUtils.t('district')}
                  </Label>
                  <Input
                    type="select"
                    name="filterDistrict"
                    id="filterDistrict"
                  >
                    <option value="">{I18nUtils.t('lb-select')}</option>
                    <option value="">{I18nUtils.t('lb-enable')}</option>
                    <option value="">{I18nUtils.t('lb-disabled')}</option>
                  </Input>
                </FormGroup>
              </Col>
            )}
            <Col xs="12" md="12">
              <div className="btns-group text-center mt-2">
                <Button color="success">{I18nUtils.t('search')}</Button>
                <Button color="danger">{I18nUtils.t('reset')}</Button>
              </div>
            </Col>
          </Row>
        </Form>
        <span className="lb-showhide text-success active">
          {I18nUtils.t('lb-showhide')}
        </span>
      </div>
    )
  }
}

FilterGroupComponent.propTypes = {
  formClass: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  size: PropTypes.string,
  className: PropTypes.string
}

export default connect()(withRouter(FilterGroupComponent))
