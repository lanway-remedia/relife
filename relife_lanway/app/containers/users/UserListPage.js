/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Table } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { Button } from 'reactstrap'
import UsersActions from '../../redux/wrapper/UsersRedux'
import I18nUtils from '../../utils/I18nUtils'
import TableHeadComponent from '../../components/TableHeadComponent'
import PaginationComponent from '../../components/PaginationComponent'
import URLSearchParams from 'url-search-params'
import { DefaultValue } from '../../constants'
import { Helmet } from 'react-helmet'

class ListAccountsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortColumn: { path: 'name', order: 'asc' },
      count: 0,
      users: []
    }
  }

  componentDidMount() {
    let params = new URLSearchParams(this.props.history.location.search)
    let page = params.get('page') * 1 || DefaultValue.PAGE
    let limit = params.get('limit') *1 || DefaultValue.LIMIT
    let data = {
      offset: (page - 1) * limit,
      limit: limit
    }
    this.props.userListRequest(data)
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

  addUser = () => {
    this.props.history.push('/add-user')
  }

  editUser = (id) => {
    this.props.history.push(`/user/${id}`)
  }

  render() {
    let { sortColumn, count, users } = this.state
    return (
      <Container fluid className="list-user-content">
        <Helmet>
          <title>{I18nUtils.t('la-page-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('la-page-title')}
            <Button color="success" onClick={this.addUser}>
              {I18nUtils.t('add-user')}
            </Button>
          </h1>
        </div>
        <div className="formTable">
          <PaginationComponent count={count} />
          <Table hover>
            <TableHeadComponent
              sortColumn={sortColumn}
              onSort={this.handleSort}
              theadTitle="#,Name,Email,Store,Group,Action"
            />
            <tbody>
              {users.map((user, key) => {
                return (
                  <tr key={key}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.store ? user.store.title : ''}</td>
                    <td>{user.group}</td>
                    <td>
                      <Button
                        title={I18nUtils.t('edit')}
                        color="primary"
                        outline
                        size="sm"
                        className="btn-act"
                        onClick={() => this.editUser(user.id)}
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

ListAccountsPage.propTypes = {
  history: PropTypes.object,
  processing: PropTypes.bool,
  response: PropTypes.object,
  totalCount: PropTypes.string,
  pageSize: PropTypes.string,
  currentPage: PropTypes.string,
  userListRequest: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.users.processing,
    response: state.users.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  userListRequest: data => dispatch(UsersActions.userListRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListAccountsPage))
