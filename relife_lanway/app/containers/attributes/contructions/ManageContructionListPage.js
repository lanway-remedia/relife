/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Container,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Table
} from 'reactstrap'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Helmet } from 'react-helmet'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { ModalName } from '../../../constants'
import AttributeActions from '../../../redux/wrapper/AttributesRedux'
import I18nUtils from '../../../utils/I18nUtils'
import FilterGroupComponent from '../../../components/FilterGroupComponent'
import TableHeadComponent from '../../../components/TableHeadComponent'
import PaginationComponent from '../../../components/PaginationComponent'
import { toast } from 'react-toastify'
import { DefaultValue } from '../../../constants'

class ManageContructionListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      page: 0,
      limit: 0,
      title: '',
      order: '',
      dataList: []
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.redirectToAddNew = this.redirectToAddNew.bind(this)
    this.redirectToEdit = this.redirectToEdit.bind(this)
    this.formHtml = this.formHtml.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getAttributeContructionList() {
    let params = new URLSearchParams(this.props.history.location.search)
    let page = params.get('page') * 1 || DefaultValue.PAGE
    let limit = params.get('limit') * 1 || DefaultValue.LIMIT
    let data = {
      offset: (page - 1) * limit,
      limit: limit,
      page: page
    }
    this.setState({
      page: data.page,
      limit: data.limit
    })
    this.props.attributeContructionListRequest(data)
  }

  componentDidMount() {
    this.getAttributeContructionList()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetList) {
        if (response.data.count === 0) {
          toast.warn(I18nUtils.t('toast-no-record'))
        }
        this.setState({
          dataList: response.data.results,
          count: response.data.count
        })
      }
      if (response.isGetId) {
        console.log('isGetId')
      }
      if (response.isAdd) {
        if (response.messageCode === 'SU001') {
          toast.success(
            I18nUtils.formatMessage({ id: 'SU001' }, { name: this.state.title })
          )
        }
        if (response.messageCode === 'FA001') {
          toast.error(I18nUtils.t('FA001'))
        }

        this.forceUpdate(this.getAttributeContructionList())
      }
      if (response.isEdit) {
        if (response.messageCode === 'SU001') {
          toast.success(
            I18nUtils.formatMessage(
              { id: 'SU001' },
              { name: response.data.title }
            )
          )
        }
        if (response.messageCode === 'FA001') {
          toast.error(I18nUtils.t('FA001'))
        }
        this.forceUpdate(this.getAttributeContructionList())
      }
      if (response.isDelete) {
        if (response.messageCode === 'SU001') {
          toast.success(
            I18nUtils.formatMessage(
              { id: 'toast-del-sucess' },
              { name: this.state.title }
            )
          )
        }
        this.forceUpdate(this.getAttributeContructionList())
      }
    }
  }

  formHtml = att => {
    let attId = ''
    let attTitle = ''
    let attOrder = ''
    if (att) {
      attId = att.id
      attTitle = att.title
      attOrder = att.order
    }
    return (
      <ValidationForm
        className="popup-category col-no-mg"
        onSubmit={this.handleSubmit}
      >
        <Row>
          <TextInput
            type="hidden"
            name="idAtt"
            id="idAtt"
            placeholder={I18nUtils.t('all-place-input')}
            defaultValue={attId}
            required
          />
          <Col xs="12" md="12">
            <FormGroup>
              <Label htmlFor="title">{I18nUtils.t('title')}</Label>
              <TextInput
                type="text"
                name="title"
                id="title"
                placeholder={I18nUtils.t('all-place-input')}
                defaultValue={att === null ? this.state.title : attTitle}
                required
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="12">
            <FormGroup>
              <Label htmlFor="order">{I18nUtils.t('order')}</Label>
              <TextInput
                type="text"
                name="order"
                id="order"
                placeholder={I18nUtils.t('all-place-input')}
                defaultValue={att === null ? this.state.order : attOrder}
                required
              />
            </FormGroup>
          </Col>
          <Col xs="12" md="12" className="col-footer">
            <div className="btns-group text-right pt-4">
              <Button color="success">{I18nUtils.t('btn-add-new')}</Button>
              <Button
                title={I18nUtils.t('ots-title-back-list')}
                onClick={this.handleCloseModal}
                color="danger"
              >
                {I18nUtils.t('close')}
              </Button>
            </div>
          </Col>
        </Row>
      </ValidationForm>
    )
  }

  handleDialog = att => {
    let modalTitle = ''
    if (att.title) {
      modalTitle = I18nUtils.formatMessage(
        { id: 'att-cons-ed-page-title' },
        { name: att.title }
      )
      this.setState(
        {
          title: att.title,
          order: att.order
        },
        () => {
          this.showDetailModal(modalTitle, att)
        }
      )
    } else {
      modalTitle = I18nUtils.t('att-cons-add-page-title')
      this.setState(
        {
          title: '',
          order: ''
        },
        () => {
          this.showDetailModal(modalTitle)
        }
      )
    }
  }

  showDetailModal = (modalTitle, att) => {
    this.props.show(ModalName.COMMON, {
      modalClass: 'center-modal hide-footer',
      title: modalTitle,
      message: this.formHtml(att, this.handleChange),
      hideCloseButton: true
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })

    //console.log([e.target.name], e.target.value)
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(e.target.idAtt.value.length)
    let data = new FormData()
    if (e.target.idAtt.value.length === 0) {
      data.append('title', e.target.title.value)
      data.append('order', e.target.order.value)
      this.props.attributeContructionAddRequest(data)
    } else {
      data.append('id', e.target.idAtt.value)
      data.append('title', e.target.title.value)
      data.append('order', e.target.order.value)
      this.props.attributeContructionEditRequest(data)
    }
  }

  handleCloseModal = () => {
    this.props.hide(ModalName.COMMON)
  }

  handleDelete = cons => {
    this.props.show(ModalName.COMMON, {
      bodyClass: 'text-center',
      title: I18nUtils.formatMessage(
        { id: 'modal-del-header' },
        { name: cons.title }
      ),
      message: I18nUtils.t('modal-del-body'),
      okFunction: () => this.okDeleteFunction(cons)
    })
  }

  redirectToAddNew = () => {
    this.props.history.push('/add-new-contruction')
  }

  redirectToEdit = cons => {
    this.props.history.push(`/edit-contruction/${cons.id}`)
  }

  okFunction = cons => {
    const originDataList = this.state.dataList
    const dataList = originDataList.filter(c => c.id !== cons.id)
    const total = dataList.length

    this.setState({ dataList, total })

    this.props.attributeContructionDeleteRequest(cons.id)
    this.setState({
      title: cons.title
    })
    this.props.hide(ModalName.COMMON)
  }

  render() {
    let { page, limit, count, dataList } = this.state

    return (
      <Container fluid className="manage-attribute-list">
        <Helmet>
          <title>{I18nUtils.t('att-cons-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('att-cons-page-title')}
            <Button onClick={this.handleDialog} color="success">
              {I18nUtils.t('btn-add-new')}
            </Button>
          </h1>
        </div>
        <FilterGroupComponent inputTitle="Name" />
        <div className="formTable">
          <PaginationComponent count={count} />
          <Table hover>
            <TableHeadComponent
              onSort={this.handleSort}
              theadTitle="#,Name,Order,Action"
            />
            <tbody>
              {dataList.length === 0 && (
                <tr>
                  <td colSpan="4" className="alert alert-warning">
                    {I18nUtils.t('toast-no-record')}
                  </td>
                </tr>
              )}
              {dataList.map((cons, key) => {
                return (
                  <tr key={key}>
                    <td>{(page - 1) * limit + key + 1}</td>
                    <td>{cons.title}</td>
                    <td>{cons.order}</td>
                    <td>
                      <Button
                        title={I18nUtils.t('edit')}
                        color="primary"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.handleDialog(cons)}
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <Button
                        title={I18nUtils.t('delete')}
                        color="danger"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.handleDelete(cons)}
                      >
                        <i className="fa fa-trash" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    )
  }
}

ManageContructionListPage.propTypes = {
  history: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  attributeContructionListRequest: PropTypes.func,
  attributeContructionAddRequest: PropTypes.func,
  attributeContructionEditRequest: PropTypes.func,
  attributeContructionDeleteRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.attributes.processing,
    data: state.attributes.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  attributeContructionListRequest: data =>
    dispatch(AttributeActions.attributeContructionListRequest(data)),
  attributeContructionGetRequest: data =>
    dispatch(AttributeActions.attributeContructionGetRequest(data)),
  attributeContructionAddRequest: data =>
    dispatch(AttributeActions.attributeContructionAddRequest(data)),
  attributeContructionEditRequest: data =>
    dispatch(AttributeActions.attributeContructionEditRequest(data)),
  attributeContructionDeleteRequest: data =>
    dispatch(AttributeActions.attributeContructionDeleteRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManageContructionListPage))
