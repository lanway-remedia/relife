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
import ExhibitionActions from '../../redux/wrapper/ExhibitionsRedux'
import I18nUtils from '../../utils/I18nUtils'
import FilterGroupComponent from '../../components/FilterGroupComponent'
import TableHeadComponent from '../../components/TableHeadComponent'
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4'
import { paginate } from '../../utils/paginate'
import { toast } from 'react-toastify'

class ManageExhibitionListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageLimit: 10,
      total: 10,
      exhList: []
    }
    this.handleDeleteStore = this.handleDeleteStore.bind(this)
    this.redirectToAddNew = this.redirectToAddNew.bind(this)
    this.redirectToEdit = this.redirectToEdit.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
  }

  componentDidMount() {
    this.props.exhibitionListRequest({})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      console.log(response)
      if (response.isGetList) {
        this.setState({
          exhList: response.data,
          total: response.data.length
        })
      }
    }
  }

  handleDeleteStore = exh => {
    this.props.show(ModalName.COMMON, {
      bodyClass: 'text-center',
      title: I18nUtils.formatMessage(
        { id: 'modal-del-header' },
        { name: exh.title }
      ),
      message: I18nUtils.t('modal-del-body'),
      okFunction: () => this.okFunction(exh)
    })
  }

  redirectToAddNew = () => {
    this.props.history.push('/add-new-exhibition')
  }

  redirectToEdit = exh => {
    this.props.history.push(`/edit-exhibition/${exh.id}`)
  }

  okFunction = exh => {
    const originExhList = this.state.exhList
    const exhList = originExhList.filter(e => e.id !== exh.id)
    const total = exhList.length

    this.setState({ exhList, total })

    this.props.exhibitionDeleteRequest(exh.id)
    this.props.hide(ModalName.COMMON)
    toast.success(
      I18nUtils.formatMessage({ id: 'toast-del-sucess' }, { name: exh.title })
    )
  }

  onPageChange(page) {
    this.setState({ page })
  }

  render() {
    let { page, total, pageLimit, exhList: allExh } = this.state
    const pagesCount = Math.ceil(total / pageLimit)

    const exhList = paginate(allExh, page, pageLimit)

    return (
      <Container fluid className="manage-exhibition-list">
        <Helmet>
          <title>{I18nUtils.t('exh-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('exh-page-title')}
            <Button onClick={this.redirectToAddNew} color="success">
              {I18nUtils.t('btn-add-new')}
            </Button>
          </h1>
        </div>
        <FilterGroupComponent
          inputTitle="Title,Address,Zipcode"
          calendarName="Start Date"
        />
        <div className="formTable">
          <UltimatePagination
            currentPage={page}
            totalPages={pagesCount}
            onChange={this.onPageChange}
          />
          <Table hover>
            <TableHeadComponent
              onSort={this.handleSort}
              theadTitle="#,Image,Title,Start Date,End Date,Address, Zipcode,Action"
            />
            <tbody>
              {exhList.map((exh, key) => {
                return (
                  <tr key={key}>
                    <td>{(page - 1) * 10 + key + 1}</td>
                    <td>
                      <img
                        alt={exh.title}
                        src={exh.img_large}
                        width="150"
                        height="100"
                      />
                    </td>
                    <td>{exh.title}</td>
                    <td>{exh.start_time}</td>
                    <td>{exh.end_time}</td>
                    <td>{exh.address}</td>
                    <td>{exh.zipcode}</td>
                    <td>
                      <Button
                        title={I18nUtils.t('edit')}
                        color="primary"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.redirectToEdit(exh)}
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <Button
                        title={I18nUtils.t('delete')}
                        color="danger"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.handleDeleteStore(exh)}
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

ManageExhibitionListPage.propTypes = {
  history: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  totalCount: PropTypes.number,
  pageSize: PropTypes.string,
  currentPage: PropTypes.string,
  exhibitionListRequest: PropTypes.func,
  exhibitionDeleteRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.exhibitions.processing,
    data: state.exhibitions.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  exhibitionListRequest: data =>
    dispatch(ExhibitionActions.exhibitionListRequest(data)),
  exhibitionDeleteRequest: data =>
    dispatch(ExhibitionActions.exhibitionDeleteRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManageExhibitionListPage))
