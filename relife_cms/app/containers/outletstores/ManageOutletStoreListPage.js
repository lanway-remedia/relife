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
import OutletStoreActions from '../../redux/wrapper/OutletStoresRedux'
import I18nUtils from '../../utils/I18nUtils'
import TableHeadComponent from '../../components/TableHeadComponent'
import PaginationComponent from '../../components/PaginationComponent'
import { toast } from 'react-toastify'
import { DefaultValue } from '../../constants'

class ManageOutletStoreListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      page: 0,
      limit: 0,
      storeList: []
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.redirectToAddNew = this.redirectToAddNew.bind(this)
    this.redirectToEdit = this.redirectToEdit.bind(this)
    this.getOutletStore = this.getOutletStore.bind(this)
  }

  getOutletStore() {
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
    this.props.outletStoreListRequest(data)
  }

  componentDidMount() {
    this.getOutletStore()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetStoreList) {
        if (response.data.count === 0) {
          toast.warn(I18nUtils.t('toast-no-record'))
        }
        this.setState({
          storeList: response.data.results,
          count: response.data.count
        })
      }

      if (response.messageCode === 'OT008' && response.isDeleteStore) {
        toast.success(
          I18nUtils.formatMessage(
            { id: 'toast-del-sucess' },
            { name: response.data.title }
          )
        )
        this.forceUpdate(this.getOutletStore)
      }
    }
  }

  handleDelete = store => {
    this.props.show(ModalName.COMMON, {
      bodyClass: 'text-center',
      title: I18nUtils.formatMessage(
        { id: 'modal-del-header' },
        { name: store.title }
      ),
      message: I18nUtils.t('modal-del-body'),
      okFunction: () => this.okFunction(store)
    })
  }

  redirectToAddNew = () => {
    this.props.history.push('add-new-outlet-store')
  }

  redirectToEdit = store => {
    this.props.history.push(`/edit-outlet-store/${store.id}`)
  }

  okFunction = store => {
    const originStoreList = this.state.storeList
    const storeList = originStoreList.filter(s => s.id !== store.id)
    const total = storeList.length

    this.setState({ storeList, total })

    this.props.outletStoreDeleteRequest(store.id)
    this.props.hide(ModalName.COMMON)
  }

  render() {
    let { page, limit, storeList, count } = this.state
    let { location } = this.props
    let isSearch
    if (location.search === '' || location.search === '?') isSearch = false
    else isSearch = true
    return (
      <Container fluid className="manage-outletstore-list">
        <Helmet>
          <title>{I18nUtils.t('otsl-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            {I18nUtils.t('otsl-page-title')}
            <Button onClick={this.redirectToAddNew} color="success">
              {I18nUtils.t('btn-add-new')}
            </Button>
          </h1>
        </div>
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
                  theadTitle="#,Image,Title,Email,Phone,Address,Zipcode,Action"
                />
                <tbody>
                  {storeList.length === 0 && (
                    <tr>
                      <td colSpan="8" className="alert alert-warning">
                        {I18nUtils.t('toast-no-record')}
                      </td>
                    </tr>
                  )}
                  {storeList.map((store, key) => {
                    return (
                      <tr key={key}>
                        <td>{(page - 1) * limit + key + 1}</td>
                        <td>
                          <img
                            alt={store.title}
                            src={store.img_large}
                            width="150"
                            height="100"
                          />
                        </td>
                        <td>{store.title}</td>
                        <td>{store.email}</td>
                        <td>{store.tel}</td>
                        <td>{store.address}</td>
                        <td>{store.zipcode}</td>
                        <td>
                          <Button
                            title={I18nUtils.t('edit')}
                            color="success"
                            size="sm"
                            className="btn-act"
                            onClick={() => this.redirectToEdit(store)}
                          >
                            {I18nUtils.t('edit')}
                          </Button>
                          <Button
                            title={I18nUtils.t('delete')}
                            color="secondary"
                            size="sm"
                            className="btn-act"
                            onClick={() => this.handleDelete(store)}
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

ManageOutletStoreListPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  outletStoreListRequest: PropTypes.func,
  outletStoreDeleteRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.outletStores.processing,
    data: state.outletStores.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  outletStoreListRequest: data =>
    dispatch(OutletStoreActions.outletStoreListRequest(data)),
  outletStoreDeleteRequest: data =>
    dispatch(OutletStoreActions.outletStoreDeleteRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManageOutletStoreListPage))
