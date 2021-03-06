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
import { ModalName } from '../../../constants'
import AttributeActions from '../../../redux/wrapper/AttributesRedux'
import I18nUtils from '../../../utils/I18nUtils'
import FilterGroupComponent from '../../../components/FilterGroupComponent'
import TableHeadComponent from '../../../components/TableHeadComponent'
import PaginationComponent from '../../../components/PaginationComponent'
import { toast } from 'react-toastify'
import { DefaultValue } from '../../../constants'

class ManageHouseHoldSizeListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      page: 0,
      limit: 0,
      title: '',
      dataList: []
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.redirectToAddNew = this.redirectToAddNew.bind(this)
    this.redirectToEdit = this.redirectToEdit.bind(this)
  }

  getAttributeHouseSizeList() {
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
    this.props.attributeHouseSizeListRequest(data)
  }

  componentDidMount() {
    this.getAttributeHouseSizeList()
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
      if (response.isDelete) {
        if (response.messageCode === 'SU001') {
          toast.success(
            I18nUtils.formatMessage(
              { id: 'toast-del-sucess' },
              { name: this.state.title }
            )
          )
        }
        this.forceUpdate(this.getAttributeHouseSizeList())
      }
    }
  }

  handleDelete = att => {
    this.props.show(ModalName.COMMON, {
      bodyClass: 'text-center',
      title: I18nUtils.formatMessage(
        { id: 'modal-del-header' },
        { name: att.title }
      ),
      message: I18nUtils.t('modal-del-body'),
      okFunction: () => this.okFunction(att)
    })
  }

  redirectToAddNew = () => {
    this.props.history.push('/add-new-household-size')
  }

  redirectToEdit = att => {
    this.props.history.push(`/edit-household-size/${att.id}`)
  }

  okFunction = att => {
    const originDataList = this.state.dataList
    const dataList = originDataList.filter(c => c.id !== att.id)
    const total = dataList.length

    this.setState({ dataList, total })

    this.props.attributeHouseSizeDeleteRequest(att.id)
    this.setState({
      title: att.title
    })
    this.props.hide(ModalName.COMMON)
  }

  render() {
    let { page, limit, count, dataList } = this.state

    return (
      <Container fluid className="manage-attribute-list">
        <Helmet>
          <title>{I18nUtils.t('att-hsize-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('att-hsize-page-title')}
            <Button onClick={this.redirectToAddNew} color="success">
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
              {dataList.map((att, key) => {
                return (
                  <tr key={key}>
                    <td>{(page - 1) * limit + key + 1}</td>
                    <td>{att.title}</td>
                    <td>{att.order}</td>
                    <td>
                      <Button
                        title={I18nUtils.t('edit')}
                        color="primary"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.redirectToEdit(att)}
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <Button
                        title={I18nUtils.t('delete')}
                        color="danger"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.handleDelete(att)}
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

ManageHouseHoldSizeListPage.propTypes = {
  history: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  attributeHouseSizeListRequest: PropTypes.func,
  attributeHouseSizeDeleteRequest: PropTypes.func,
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
  attributeHouseSizeListRequest: data =>
    dispatch(AttributeActions.attributeHouseSizeListRequest(data)),
  attributeHouseSizeDeleteRequest: data =>
    dispatch(AttributeActions.attributeHouseSizeDeleteRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManageHouseHoldSizeListPage))
