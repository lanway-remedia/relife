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
import SearchCondition from '../../components/SearchCondition'
import { DefaultValue } from '../../constants'
import { Helmet } from 'react-helmet'
import { ModalName } from '../../constants'

class ListAccountsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      users: []
    }
  }

  getUserList() {
    let params = new URLSearchParams(this.props.history.location.search)
    let page = params.get('page') * 1 || DefaultValue.PAGE
    let limit = params.get('limit') * 1 || DefaultValue.LIMIT
    let name = params.get('freeword')
    let group_id = params.get('group')
    let store_id = params.get('store')
    let data = {
      offset: (page - 1) * limit,
      limit: limit,
      ...(name && { name: name }),
      ...(group_id && { group_id: group_id }),
      ...(store_id && { store_id: store_id })
    }
    this.props.userListRequest(data)
  }

  componentDidMount() {
    this.getUserList()
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
      if (response.deleteUser) {
        this.forceUpdate(this.getUserList())
      }
    }
  }

  addUser = () => {
    this.props.history.push('/add-user')
  }

  editUser = id => {
    this.props.history.push(`/user/${id}`)
  }

  deleteUser = user => {
    this.props.show(ModalName.COMMON, {
      title: I18nUtils.t('modal-del-header'),
      message: I18nUtils.t('modal-del-body'),
      deleteFunction: () => this.deleteFunction(user)
    })
  }

  deleteFunction = id => {
    this.props.deleteUserRequest(id)
    this.props.hide(ModalName.COMMON)
    let users = this.state.users.filter(user => user.id !== id)
    // let count = users.length
    this.setState({ users })
  }

  render() {
    let { count, users } = this.state
    let { location } = this.props
    let isSearch
    if (location.search === '' || location.search === '?') isSearch = false
    else isSearch = true

    return (
      <Container fluid className="list-user-content">
        <Helmet>
          <title>{I18nUtils.t('la-parent-title')}</title>
        </Helmet>
        <div className="page-title">
          <h1>
            {I18nUtils.t('la-page-title')}
            <Button color="success" onClick={this.addUser}>
              {I18nUtils.t('add-user')}
            </Button>
          </h1>
        </div>
        <SearchCondition
          hasFreeword={{ title: I18nUtils.t('username') }}
          hasGroup
          hasStore
        />
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
                <TableHeadComponent theadTitle="Id,Name,Email,Store,Group,Action" />
                <tbody>
                  {users.map((user, key) => {
                    return (
                      <tr key={key}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.store ? user.store.title : ''}</td>
                        <td>{I18nUtils.t(`group-${user.group}`)}</td>
                        <td>
                          <Button
                            title={I18nUtils.t('edit')}
                            color="success"
                            size="sm"
                            className="btn-act"
                            onClick={() => this.editUser(user.id)}
                          >
                            {I18nUtils.t('edit')}
                          </Button>
                          <Button
                            title={I18nUtils.t('delete')}
                            color="secondary"
                            size="sm"
                            className="btn-act"
                            onClick={() => this.deleteUser(user.id)}
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

ListAccountsPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  processing: PropTypes.bool,
  response: PropTypes.object,
  userListRequest: PropTypes.func,
  deleteUserRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.users.processing,
    response: state.users.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  userListRequest: data => dispatch(UsersActions.userListRequest(data)),
  deleteUserRequest: id => dispatch(UsersActions.deleteUserRequest(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListAccountsPage))
