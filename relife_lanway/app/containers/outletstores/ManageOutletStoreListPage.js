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
import OutletStoreActions from '../../redux/wrapper/OutletStoresRedux'
import I18nUtils from '../../utils/I18nUtils'
import FilterGroupComponent from '../../components/FilterGroupComponent'
import TableHeadComponent from '../../components/TableHeadComponent'
import PaginationComponent from '../../components/PaginationComponent'

class ManageOutletStoreListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 10,
      totalCount: 10,
      currentPage: 1,
      storeList: []
    }
  }

  redirectToAddNew = () => {
    this.props.history.push('add-new-outlet-store')
  }

  componentDidMount() {
    this.props.outletStoreListRequest({})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let data = nextProps.data
      if (data.data) {
        this.setState({
          storeList: data.data
        })
      }
    }
  }

  render() {
    let { pageSize, totalCount, currentPage, storeList } = this.state
    totalCount = storeList.length
    // console.log(storeList.length)
    return (
      <Container fluid className="manage-outletstore-list">
        <Helmet>
          <title>{I18nUtils.t('otsl-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('otsl-page-title')}
          </h1>
          <Button onClick={this.redirectToAddNew} color="success">
            {I18nUtils.t('btn-add-new')}
          </Button>
        </div>
        <FilterGroupComponent
          formClass="test"
          formAction="test"
          inputTitle="Title,Email,Phone"
          select="City,District"
        />
        <div className="formTable">
          <PaginationComponent
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
          />
          <Table hover>
            <TableHeadComponent
              onSort={this.handleSort}
              theadTitle="#,Image,Title,Email,Phone,District,City,Action"
            />
            <tbody>
              {storeList.map((store, key) => {
                return (
                  <tr key={key}>
                    <td>{store.id}</td>
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
                    <td>{store.district}</td>
                    <td>{store.city}</td>
                    <td>
                      <Button
                        title={I18nUtils.t('edit')}
                        color="primary"
                        outline
                        size="sm"
                        className="btn-act"
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <Button
                        title={I18nUtils.t('delete')}
                        color="danger"
                        outline
                        size="sm"
                        className="btn-act"
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

ManageOutletStoreListPage.propTypes = {
  history: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  totalCount: PropTypes.number,
  pageSize: PropTypes.string,
  currentPage: PropTypes.string,
  outletStoreListRequest: PropTypes.func
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
    dispatch(OutletStoreActions.outletStoreListRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManageOutletStoreListPage))
