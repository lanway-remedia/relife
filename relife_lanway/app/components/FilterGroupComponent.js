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

  render() {
    const props = this.props
    return (
      <div className="filter-group mb-5">
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
                      dateFormat="DD/MM/YYYY"
                      locale="en-us"
                      placeholderText="dd/mm/yyyy"
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
                      dateFormat="DD/MM/YYYY"
                      locale="en-us"
                      placeholderText="dd/mm/yyyy"
                      name={'filterTo' + props.calendarName.replace(' ', '')}
                    />
                  </InputGroup>
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
