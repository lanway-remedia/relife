/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Button, Table } from 'reactstrap'
import { Helmet } from 'react-helmet'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { ModalName } from '../../constants'
import ExampleHouseActions from '../../redux/wrapper/ExampleHousesRedux'
import I18nUtils from '../../utils/I18nUtils'
import TableHeadComponent from '../../components/TableHeadComponent'
import PaginationComponent from '../../components/PaginationComponent'
import { DefaultValue } from '../../constants'
import SearchCondition from './../../components/SearchCondition'

const TIMEOUT = 0

class ManageExampleHouseListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      page: 0,
      limit: 0,
      timeout: TIMEOUT,
      collapse: false,
      dataList: []
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.redirectToAddNew = this.redirectToAddNew.bind(this)
    this.redirectToEdit = this.redirectToEdit.bind(this)
    this.getExampleHouseList = this.getExampleHouseList.bind(this)
  }

  getExampleHouseList() {
    let params = new URLSearchParams(this.props.history.location.search)
    let page = params.get('page') * 1 || DefaultValue.PAGE
    let limit = params.get('limit') * 1 || DefaultValue.LIMIT
    let title = params.get('freeword')
    let status = params.get('status')
    let store_id = params.get('store')
    let data = {
      offset: (page - 1) * limit,
      limit: limit,
      page: page,
      ...(title && { title: title }),
      ...(status && { status: status }),
      ...(store_id && { store_id: store_id })
    }
    this.setState({
      page: data.page,
      limit: data.limit
    })
    this.props.exampleHouseListRequest(data)
  }

  componentDidMount() {
    this.getExampleHouseList()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataExamples != nextProps.dataExamples) {
      let response = nextProps.dataExamples
      if (response.isGetHouseList) {
        if (response.messageCode === 'EX200')
          this.setState({
            dataList: response.data.results,
            count: response.data.count
          })
        else if (response.data.count === 0) {
          this.props.show(ModalName.COMMON, {
            message: (
              <span className="text-danger">
                {I18nUtils.t('toast-no-record')}
              </span>
            )
          })
        }
      }

      if (response.messageCode === 'EX205' && response.isDeleteHouse) {
        this.props.show(ModalName.COMMON, {
          message: (
            <span className="text-success">
              {I18nUtils.t('modal-del-success')}
            </span>
          )
        })
        this.forceUpdate(this.getExampleHouseList)
      }
    }

    return null
  }

  handleDelete = store => {
    this.props.show(ModalName.COMMON, {
      bodyClass: 'text-center',
      title: I18nUtils.formatMessage(
        { id: 'modal-del-header' },
        { name: store.title }
      ),
      message: I18nUtils.t('modal-del-body'),
      deleteFunction: () => this.deleteFunction(store)
    })
  }

  redirectToAddNew = () => {
    this.props.history.push('add-new-example-house')
  }

  redirectToEdit = val => {
    this.props.history.push(`/edit-example-house/${val.id}`)
  }

  deleteFunction = val => {
    const originDataList = this.state.dataList
    const dataList = originDataList.filter(d => d.id !== val.id)
    const total = dataList.length

    this.setState({ dataList, total })

    this.props.exampleHouseDeleteRequest(val.id)
    this.props.hide(ModalName.COMMON)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleShowHideForm = () => {
    this.setState(
      {
        timeout: TIMEOUT
      },
      () => {
        this.setState({ collapse: !this.state.collapse })
      }
    )
  }

  render() {
    let { page, limit, dataList, count } = this.state
    let { location } = this.props
    let isSearch
    if (location.search === '' || location.search === '?') isSearch = false
    else isSearch = true
    return (
      <Container fluid className="manage-examplehouse-list">
        <Helmet>
          <title>{I18nUtils.t('expl-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            {I18nUtils.t('expl-page-title')}
            <Button onClick={this.redirectToAddNew} color="success">
              {I18nUtils.t('btn-add-new')}
            </Button>
          </h1>
        </div>
        <SearchCondition
          hasFreeword={{ title: I18nUtils.t('title') }}
          hasStore
          hasStatus
          hasAttribute
        />
        {/* <div className="filter-group">
          <div className="filter-title">
            <h4 onClick={this.handleShowHideForm}>
              {I18nUtils.t('lb-ad-search')}
            </h4>
          </div>
          <div className="filter-body">
            <Collapse isOpen={collapse} timeout={timeout}>
              <Form onSubmit={this.handleSubmit} ref={f => (this.form = f)}>
                <Row>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label for="title">{I18nUtils.t('title')}</Label>
                      <Input
                        type="text"
                        name="title"
                        id="title"
                        onChange={this.handleChange}
                        placeholder={I18nUtils.t('all-place-input')}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label for="title">{I18nUtils.t('email')}</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        onChange={this.handleChange}
                        placeholder={I18nUtils.t('all-place-input')}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="4">
                    <FormGroup>
                      <Label for="title">{I18nUtils.t('phone')}</Label>
                      <Input
                        type="text"
                        name="phone"
                        id="phone"
                        onChange={this.handleChange}
                        placeholder={I18nUtils.t('all-place-input')}
                      />
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
              </Form>
            </Collapse>
            {!collapse && (
              <span className="lb-showhide text-success active">
                {I18nUtils.t('lb-showhide')}
              </span>
            )}
          </div>
        </div> */}
        <div className="box-group">
          {isSearch && (
            <div className="box-title">
              <h4>{I18nUtils.t('box-result')}</h4>
            </div>
          )}
          <div className="box-content">
            <div className="formTable">
              <PaginationComponent count={count} />
              <Table hover responsive bordered>
                <TableHeadComponent
                  onSort={this.handleSort}
                  theadTitle="#,Image,Title,Outlet Store,Status,Created,Action"
                />
                <tbody>
                  {dataList.length === 0 && (
                    <tr>
                      <td colSpan="9" className="alert alert-warning">
                        {I18nUtils.t('toast-no-record')}
                      </td>
                    </tr>
                  )}
                  {dataList.map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{(page - 1) * limit + key + 1}</td>
                        <td>
                          <img
                            alt={val.title}
                            src={val.img_large}
                            width="150"
                            height="100"
                          />
                        </td>
                        <td>{val.title}</td>
                        <td>{val.store.title}</td>
                        <td>
                          {val.status_flag && 'Enable'}
                          {!val.status_flag && 'Disabled'}
                        </td>
                        <td>{val.created}</td>
                        <td>
                          <Button
                            title={I18nUtils.t('edit')}
                            color="success"
                            size="sm"
                            className="btn-act"
                            onClick={() => this.redirectToEdit(val)}
                          >
                            {I18nUtils.t('edit')}
                          </Button>
                          <Button
                            title={I18nUtils.t('delete')}
                            color="secondary"
                            size="sm"
                            className="btn-act"
                            onClick={() => this.handleDelete(val)}
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
      </Container>
    )
  }
}

ManageExampleHouseListPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  processing: PropTypes.bool,
  dataExamples: PropTypes.object,
  exampleHouseListRequest: PropTypes.func,
  exampleHouseDeleteRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.outletStores.processing,
    dataExamples: state.exampleHouses.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  exampleHouseListRequest: dataExamples =>
    dispatch(ExampleHouseActions.exampleHouseListRequest(dataExamples)),
  exampleHouseDeleteRequest: dataExamples =>
    dispatch(ExampleHouseActions.exampleHouseDeleteRequest(dataExamples))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManageExampleHouseListPage))
