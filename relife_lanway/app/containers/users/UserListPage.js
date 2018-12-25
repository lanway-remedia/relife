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

  componentDidMount() {
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
    console.log(data)
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

  editUser = id => {
    this.props.history.push(`/user/${id}`)
  }

  deleteUser = user => {
    this.props.show(ModalName.COMMON, {
      message: I18nUtils.formatMessage(
        { id: 'modal-del-header' },
        { name: user.username }
      ),
      okFunction: () => this.okFunction(user.id)
    })
  }

  okFunction = id => {
    this.props.deleteUserRequest(id)
    this.props.hide(ModalName.COMMON)
    let users = this.state.users.filter(user => user.id !== id)
    this.setState({ users })
  }

  render() {
    let { count, users } = this.state
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
          <SearchCondition
            hasFreeword={{ title: I18nUtils.t('username') }}
            hasGroup
            hasStore
          />
          <PaginationComponent count={count} />
          <Table hover responsive>
            <TableHeadComponent theadTitle="#,Name,Email,Store,Group,Action" />
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

ListAccountsPage.propTypes = {
  history: PropTypes.object,
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
