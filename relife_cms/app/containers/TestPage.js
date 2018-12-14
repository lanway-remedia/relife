/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import I18nUtils from '../utils/I18nUtils'
import {
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input
} from 'reactstrap'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { ModalName } from '../constants'

class TestPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toDate: moment()
    }
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this)
    this.handleChangeToDate = this.handleChangeToDate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    console.log('Submit')
    console.log(e)
  }

  handleDelete = tag => {
    this.props.show(ModalName.COMMON, {
      bodyClass: 'text-center',
      title: I18nUtils.formatMessage(
        { id: 'modal-del-header' },
        { name: tag.name }
      ),
      message: I18nUtils.t('modal-del-body')
    })
  }

  render() {
    return (
      <div className="test-page">
        <div className="page-title">
          <h1>
            Page Title
            <Button color="success">{I18nUtils.t('btn-add-new')}</Button>
          </h1>
        </div>
        <div className="filter-group">
          <div className="filter-title">
            <h4>{I18nUtils.t('lb-ad-search')}</h4>
          </div>
          <div className="filter-body">
            <ValidationForm onSubmit={this.handleSubmit} autoComplete="off">
              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="title">
                      {I18nUtils.t('email')}
                      <em>{I18nUtils.t('lb-req')}</em>
                    </Label>
                    <TextInput
                      type="text"
                      name="title"
                      id="title"
                      placeholder={I18nUtils.t('all-place-input')}
                      value={this.state.title}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="fromDate">{I18nUtils.t('created-date')}</Label>
                    <InputGroup className="form-datepicker">
                      <DatePicker
                        className="form-control"
                        selected={this.state.fromDate}
                        onChange={this.handleChangeFromDate}
                        dateFormat="YYYY/MM/DD"
                        locale="en-us"
                        placeholderText="yyyy/mm/dd"
                        id="fromDate"
                        name="fromDate"
                        autoComplete="off"
                        popperPlacement="bottom"
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
                        id="toDate"
                        name="toDate"
                        autoComplete="off"
                        popperPlacement="bottom"
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
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
                <Col xs="12" md="12">
                  <div className="btns-group text-center mt-2">
                    <Button color="secondary" onClick={this.handleResetForm}>
                      {I18nUtils.t('reset')}
                    </Button>
                    <Button color="success" onClick={this.onclickSubmit}>
                      {I18nUtils.t('search')}
                    </Button>
                  </div>
                </Col>
              </Row>
            </ValidationForm>
          </div>
        </div>
      </div>
    )
  }
}

TestPage.propTypes = {
  history: PropTypes.object,
  show: PropTypes.func,
  hide: PropTypes.func
}
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch)
})

export default connect(mapDispatchToProps)(withRouter(TestPage))
