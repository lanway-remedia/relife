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
import TagActions from '../../redux/wrapper/TagsRedux'
import I18nUtils from '../../utils/I18nUtils'
import FilterGroupComponent from '../../components/FilterGroupComponent'
import TableHeadComponent from '../../components/TableHeadComponent'
import PaginationComponent from '../../components/PaginationComponent'
import { toast } from 'react-toastify'
import { DefaultValue } from '../../constants'

class ManageTagListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      page: 0,
      limit: 0,
      tagList: []
    }
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
      page: page
    }
    this.setState({
      page: data.page,
      limit: data.limit
    })
    this.props.tagListRequest(data)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetList) {
        if (response.data.count === 0) {
          toast.warn(I18nUtils.t('toast-no-record'))
        }
        this.setState({
          tagList: response.data.results,
          count: response.data.count
        })
      }
    }
  }

  handleDelete = tag => {
    this.props.show(ModalName.COMMON, {
      bodyClass: 'text-center',
      title: I18nUtils.formatMessage(
        { id: 'modal-del-header' },
        { name: tag.title }
      ),
      message: I18nUtils.t('modal-del-body'),
      okFunction: () => this.okFunction(tag)
    })
  }

  redirectToAddNew = () => {
    this.props.history.push('/add-new-tag')
  }

  redirectToEdit = tag => {
    this.props.history.push(`/edit-tag/${tag.id}`)
  }

  okFunction = tag => {
    const originTagList = this.state.tagList
    const tagList = originTagList.filter(t => t.id !== tag.id)
    const total = tagList.length

    this.setState({ tagList, total })

    this.props.tagDeleteRequest(tag.id)
    this.props.hide(ModalName.COMMON)
    toast.success(
      I18nUtils.formatMessage({ id: 'toast-del-sucess' }, { name: tag.name })
    )
  }

  render() {
    let { page, limit, count, tagList } = this.state

    return (
      <Container fluid className="manage-tag-list">
        <Helmet>
          <title>{I18nUtils.t('tag-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('tag-page-title')}
            <Button onClick={this.redirectToAddNew} color="success">
              {I18nUtils.t('btn-add-new')}
            </Button>
          </h1>
        </div>
        <FilterGroupComponent inputTitle="Name" calendarName="Created Date" />
        <div className="formTable">
          <PaginationComponent count={count} />
          <Table hover>
            <TableHeadComponent
              onSort={this.handleSort}
              theadTitle="#,Name,Action"
            />
            <tbody>
              {tagList.length === 0 && (
                <tr>
                  <td colSpan="3" className="alert alert-warning">
                    {I18nUtils.t('toast-no-record')}
                  </td>
                </tr>
              )}
              {tagList.map((tag, key) => {
                return (
                  <tr key={key}>
                    <td>{(page - 1) * limit + key + 1}</td>
                    <td>{tag.name}</td>
                    <td>
                      <Button
                        title={I18nUtils.t('edit')}
                        color="primary"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.redirectToEdit(tag)}
                      >
                        <i className="fa fa-edit" />
                      </Button>
                      <Button
                        title={I18nUtils.t('delete')}
                        color="danger"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.handleDelete(tag)}
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

ManageTagListPage.propTypes = {
  history: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  tagListRequest: PropTypes.func,
  tagDeleteRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.tags.processing,
    data: state.tags.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  tagListRequest: data => dispatch(TagActions.tagListRequest(data)),
  tagDeleteRequest: data => dispatch(TagActions.tagDeleteRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManageTagListPage))
