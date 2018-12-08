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
// import InvoiceActions from '../../redux/wrapper/AttributesRedux'
import I18nUtils from '../../utils/I18nUtils'
import FilterGroupComponent from '../../components/FilterGroupComponent'
import TableHeadComponent from '../../components/TableHeadComponent'
import PaginationComponent from '../../components/PaginationComponent'
// import { toast } from 'react-toastify'
// import { DefaultValue } from '../../constants'

class ReleaseInvoicePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      page: 0,
      limit: 0,
      title: 'Invoice 01',
      dataList: [],
      exampleData: [
        {
          id: 'INV_0001100100',
          email: 'ha.phamvan@mor.com.vn',
          name: 'Ha Pham',
          phone: '0919868832',
          store: 'Minger Store'
        },
        {
          id: 'INV_0001100101',
          email: 'ducker@example.com',
          name: 'Ducker',
          phone: '09712518212',
          store: 'Pinker Store'
        },
        {
          id: 'INV_0001100102',
          email: 'vng@hunter.com.vn',
          name: 'Huyen Tai',
          phone: '08711426632',
          store: 'Hunter Company'
        },
        {
          id: 'INV_0001100103',
          email: 'husky@dasakawa.com',
          name: 'Husky',
          phone: '09158213822',
          store: 'Dasakawa Store'
        },
        {
          id: 'INV_0001100104',
          email: 'jaxtin@tiktok.panama.com',
          name: 'Jaxtin',
          phone: '0982122324',
          store: 'Tiktok Panama'
        }
      ]
    }
    this.handleExportPDF = this.handleExportPDF.bind(this)
    this.handleExportEXC = this.handleExportEXC.bind(this)
  }

  getInvoiceReleaseList() {
    // let params = new URLSearchParams(this.props.history.location.search)
    // let page = params.get('page') * 1 || DefaultValue.PAGE
    // let limit = params.get('limit') * 1 || DefaultValue.LIMIT
    // let data = {
    //   offset: (page - 1) * limit,
    //   limit: limit,
    //   page: page
    // }
    // this.setState({
    //   page: data.page,
    //   limit: data.limit
    // })
    // this.props.attributePriceListRequest(data)
  }

  componentDidMount() {
    // this.getInvoiceReleaseList()
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    // if (this.props.data != nextProps.data) {
    //   let response = nextProps.data
    //   if (response.isGetList) {
    //     if (response.data.count === 0) {
    //       toast.warn(I18nUtils.t('toast-no-record'))
    //     }
    //     this.setState({
    //       dataList: response.data.results,
    //       count: response.data.count
    //     })
    //   }
    //   if (response.isDelete) {
    //     if (response.messageCode === 'SU001') {
    //       toast.success(
    //         I18nUtils.formatMessage(
    //           { id: 'toast-del-sucess' },
    //           { name: this.state.title }
    //         )
    //       )
    //     }
    //     this.forceUpdate(this.getInvoiceReleaseList())
    //   }
    // }
  }

  handleExportPDF = inv => {
    this.props.show(ModalName.COMMON, {
      bodyClass: 'text-center',
      title: I18nUtils.formatMessage(
        { id: 'modal-ex-pdf-header' },
        { name: inv.id }
      ),
      message: I18nUtils.t('modal-inv-ex-body'),
      okFunction: () => this.ExportFilePDF(inv)
    })
  }

  handleExportEXC = inv => {
    this.props.show(ModalName.COMMON, {
      bodyClass: 'text-center',
      title: I18nUtils.formatMessage(
        { id: 'modal-ex-exc-header' },
        { name: inv.id }
      ),
      message: I18nUtils.t('modal-inv-ex-body'),
      okFunction: () => this.ExportFileEXC(inv)
    })
  }

  ExportFilePDF = inv => {
    console.log(inv)
    this.props.hide(ModalName.COMMON)
  }

  ExportFileEXC = inv => {
    console.log(inv)
    this.props.hide(ModalName.COMMON)
  }

  render() {
    let { page, limit, count, exampleData } = this.state

    return (
      <Container fluid className="manage-invoice-list">
        <Helmet>
          <title>{I18nUtils.t('inv-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('inv-page-title')}
          </h1>
        </div>
        <FilterGroupComponent inputTitle="IDInvoice,Email,Phone,OutletStore" />
        <div className="formTable">
          <PaginationComponent count={count} />
          <Table hover>
            <TableHeadComponent
              onSort={this.handleSort}
              theadTitle="#,Id Invoice,Email,Name,Phone,Outlet Store,Action"
            />
            <tbody>
              {exampleData.length === 0 && (
                <tr>
                  <td colSpan="7" className="alert alert-warning">
                    {I18nUtils.t('toast-no-record')}
                  </td>
                </tr>
              )}
              {exampleData.map((inv, key) => {
                return (
                  <tr key={key}>
                    <td>{(page - 1) * limit + key + 1}</td>
                    <td>{inv.id}</td>
                    <td>{inv.email}</td>
                    <td>{inv.name}</td>
                    <td>{inv.phone}</td>
                    <td>{inv.store}</td>
                    <td>
                      <Button
                        title={I18nUtils.t('inv-ex-pdf')}
                        color="primary"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.handleExportPDF(inv)}
                      >
                        <i className="fa fa-file-pdf-o" />
                      </Button>
                      <Button
                        title={I18nUtils.t('inv-ex-exc')}
                        color="danger"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.handleExportEXC(inv)}
                      >
                        <i className="fa fa-file-excel-o" />
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

ReleaseInvoicePage.propTypes = {
  history: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  attributePriceListRequest: PropTypes.func,
  attributePriceDeleteRequest: PropTypes.func,
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
  ...bindActionCreators({ show, hide }, dispatch)
  // attributePriceListRequest: data =>
  //   dispatch(AttributeActions.attributePriceListRequest(data)),
  // attributePriceDeleteRequest: data =>
  //   dispatch(AttributeActions.attributePriceDeleteRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ReleaseInvoicePage))
