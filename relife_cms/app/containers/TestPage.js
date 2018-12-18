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
  Table,
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
import { ModalName, DefaultValue } from '../constants'
import TableHeadComponent from '../components/TableHeadComponent'
import PaginationComponent from '../components/PaginationComponent'
import UsersActions from '../redux/wrapper/UsersRedux'

class TestPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toDate: moment(),
      isDate: false,
      title: '',
      count: 0,
      users: []
    }
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this)
    this.handleChangeToDate = this.handleChangeToDate.bind(this)
    this.handleCompareFromDate = this.handleCompareFromDate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleResetForm = this.handleResetForm.bind(this)
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

  handleCompareFromDate = () => {
    const { fromDate, toDate } = this.state
    if (toDate < fromDate) {
      this.props.show(ModalName.COMMON, {
        bodyClass: 'text-center',
        title: I18nUtils.t('al-calendar-h'),
        message: I18nUtils.t('al-calendar-b')
      })
      this.setState({
        isDate: false
      })
    } else {
      this.setState({
        isDate: true
      })
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleResetForm = e => {
    // this.myFormRef.reset()
    e.preventDefault()
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.isDate) console.log('Submit')
  }

  getUserList() {
    let params = new URLSearchParams(this.props.history.location.search)
    let page = params.get('page') * 1 || DefaultValue.PAGE
    let limit = params.get('limit') * 1 || DefaultValue.LIMIT
    let name = params.get('freeword')
    let group_id = params.get('group')
    let store_id = params.get('store')
    let data = {
      offset: (page - 1) * limit,
      limit: limit,
      ...(name && { name: name }),
      ...(group_id && { group_id: group_id }),
      ...(store_id && { store_id: store_id })
    }
    this.props.userListRequest(data)
  }

  componentDidMount() {
    this.getUserList()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response != nextProps.response) {
      let response = nextProps.response
      if (response.listUser) {
        this.setState({
          users: response.data.results,
          count: response.data.count
        })
      }
    }
  }

  render() {
    let { count, users } = this.state
    let { location } = this.props
    let isSearch
    if (location.search === '' || location.search === '?') isSearch = false
    else isSearch = true
    return (
      <div className="test-page">
        <div className="page-title">
          <h1>
            Page Title
            <Button color="success">{I18nUtils.t('btn-add-new')}</Button>
          </h1>
        </div>
        {/* Filter Start */}
        <div className="filter-group">
          <div className="filter-title">
            <h4>{I18nUtils.t('lb-ad-search')}</h4>
          </div>
          <div className="filter-body">
            <ValidationForm
              ref={el => (this.myFormRef = el)}
              onSubmit={this.handleSubmit}
              autoComplete="off"
            >
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
                        onBlur={this.handleCompareFromDate}
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
        {/* Filter End */}
        {/* Box Start */}
        <div className="box-group">
          {isSearch && (
            <div className="box-title">
              <h4>{I18nUtils.t('box-result')}</h4>
            </div>
          )}
          <div className="box-content">
            <div className="formTable">
              <PaginationComponent count={count} />
              <Table hover responsive>
                <TableHeadComponent theadTitle="#,Name,Email,Store,Group,Action" />
                <tbody>
                  {users.map((user, key) => {
                    return (
                      <tr key={key}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.store ? user.store.title : ''}</td>
                        <td>{I18nUtils.t(`group-${user.group}`)}</td>
                        <td>
                          <Button
                            title={I18nUtils.t('edit')}
                            color="success"
                            size="sm"
                            className="btn-act"
                            onClick={() => this.editUser(user.id)}
                          >
                            {I18nUtils.t('edit')}
                          </Button>
                          <Button
                            title={I18nUtils.t('delete')}
                            color="secondary"
                            size="sm"
                            className="btn-act"
                            onClick={() => this.deleteUser(user)}
                          >
                            {I18nUtils.t('delete')}
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        {/* Box End */}
      </div>
    )
  }
}

TestPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  processing: PropTypes.bool,
  response: PropTypes.object,
  userListRequest: PropTypes.func,
  deleteUserRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.users.processing,
    response: state.users.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  userListRequest: data => dispatch(UsersActions.userListRequest(data)),
  deleteUserRequest: id => dispatch(UsersActions.deleteUserRequest(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TestPage))
