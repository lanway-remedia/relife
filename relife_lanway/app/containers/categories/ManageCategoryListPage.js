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
  Table,
  ListGroup,
  ListGroupItem,
  Badge,
  UncontrolledCollapse
} from 'reactstrap'
import { Helmet } from 'react-helmet'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { ModalName } from '../../constants'
import CateActions from '../../redux/wrapper/CategoriesRedux'
import I18nUtils from '../../utils/I18nUtils'
import FilterGroupComponent from '../../components/FilterGroupComponent'
import TableHeadComponent from '../../components/TableHeadComponent'
import PaginationComponent from '../../components/PaginationComponent'
import { toast } from 'react-toastify'
import URLSearchParams from 'url-search-params'
import { DefaultValue } from '../../constants'

class ManageCategoryListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      page: 0,
      limit: 0,
      type: 1, //Type category (1: Parent category, 2: Sub category)
      cateList: [],
      collapse: false
    }
    this.toggle = this.toggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.redirectToAddNew = this.redirectToAddNew.bind(this)
    this.redirectToEdit = this.redirectToEdit.bind(this)
  }

  componentDidMount() {
    let params = new URLSearchParams(this.props.history.location.search)
    let page = params.get('page') * 1 || DefaultValue.PAGE
    let limit = params.get('limit') * 1 || DefaultValue.LIMIT
    let data = {
      offset: (page - 1) * limit,
      limit: limit,
      page: page,
      type: this.state.type
    }
    this.setState({
      page: data.page,
      limit: data.limit
    })
    this.props.cateListRequest(data)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetList) {
        if (response.data.count === 0) {
          toast.warn(I18nUtils.t('toast-no-record'))
        }
        this.setState({
          cateList: response.data.results,
          count: response.data.count
        })
      }
    }
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse })
  }

  handleDelete = cate => {
    this.props.show(ModalName.COMMON, {
      bodyClass: 'text-center',
      title: I18nUtils.formatMessage(
        { id: 'modal-del-header' },
        { name: cate.title }
      ),
      message: I18nUtils.t('modal-del-body'),
      okFunction: () => this.okFunction(cate)
    })
  }

  addNewSubCategory = sub => {
    console.log(sub)
  }

  redirectToAddNew = () => {
    this.props.history.push('/add-new-category')
  }

  redirectToEdit = cate => {
    this.props.history.push(`/edit-category/${cate.id}`)
  }

  okFunction = cate => {
    const originCateList = this.state.cateList
    const cateList = originCateList.filter(c => c.id !== cate.id)
    const total = cateList.length

    this.setState({ cateList, total })

    this.props.cateDeleteRequest(cate.id)
    this.props.hide(ModalName.COMMON)
    toast.success(
      I18nUtils.formatMessage({ id: 'toast-del-sucess' }, { name: cate.name })
    )
  }

  render() {
    let { page, limit, count, cateList } = this.state
    console.log(cateList)

    return (
      <Container fluid className="manage-cate-list">
        <Helmet>
          <title>{I18nUtils.t('cate-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('cate-page-title')}
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
              {cateList.length === 0 && (
                <tr>
                  <td colSpan="4" className="alert alert-warning">
                    {I18nUtils.t('toast-no-record')}
                  </td>
                </tr>
              )}
              {cateList.map((cate, key) => {
                return (
                  <tr key={key}>
                    <td>{(page - 1) * limit + key + 1}</td>
                    <td className="name-style">
                      <div className="clearfix">
                        {cate.name}
                        {cate.sub_categories.length !== 0 && (
                          <Button
                            color="primary"
                            onClick={this.toggle}
                            size="sm"
                            className="float-right"
                            id={'category-' + cate.id}
                          >
                            {I18nUtils.t('cate-sub-showhide')}
                          </Button>
                        )}
                      </div>

                      {cate.sub_categories.length !== 0 && (
                        <UncontrolledCollapse
                          toggler={'category-' + cate.id}
                          // isOpen={this.state.collapse}
                        >
                          <ListGroup className="mt-3 clearfix">
                            {cate.sub_categories.map((sub, key) => {
                              return (
                                <ListGroupItem key={key}>
                                  {sub.name}
                                  <Badge pill color="primary" className="ml-2">
                                    {I18nUtils.t('order')} : {sub.order}
                                  </Badge>
                                  <Button
                                    title={I18nUtils.t('delete')}
                                    color="danger"
                                    outline
                                    size="sm"
                                    className="float-right"
                                    onClick={() => this.handleDeleteSub(sub)}
                                  >
                                    <i className="fa fa-trash" />
                                  </Button>
                                  <Button
                                    title={I18nUtils.t('edit')}
                                    color="primary"
                                    outline
                                    size="sm"
                                    className="float-right mr-2"
                                    onClick={() => this.redirectToEditSub(sub)}
                                  >
                                    <i className="fa fa-edit" />
                                  </Button>
                                </ListGroupItem>
                              )
                            })}
                          </ListGroup>
                        </UncontrolledCollapse>
                      )}
                    </td>
                    <td>{cate.order}</td>
                    <td>
                      <Button
                        title={I18nUtils.t('cate-add-sub')}
                        color="success"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.addNewSubCategory(cate)}
                      >
                        <i className="fa fa-plus" />
                      </Button>
                      <Button
                        title={I18nUtils.t('edit')}
                        color="primary"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.redirectToEdit(cate)}
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <Button
                        title={I18nUtils.t('delete')}
                        color="danger"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.handleDelete(cate)}
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

ManageCategoryListPage.propTypes = {
  history: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  cateListRequest: PropTypes.func,
  cateDeleteRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.categories.processing,
    data: state.categories.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  cateListRequest: data => dispatch(CateActions.cateListRequest(data)),
  cateDeleteRequest: data => dispatch(CateActions.cateDeleteRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManageCategoryListPage))
