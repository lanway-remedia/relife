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
import UsersActions from '../redux/wrapper/UsersRedux'
import I18nUtils from '../utils/I18nUtils'
import FilterGroupComponent from './../components/FilterGroupComponent'
import TableHeadComponent from './../components/TableHeadComponent'
import PaginationComponent from './../components/PaginationComponent'

class ListAccountsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 4,
      currentPage: 1,
      sortColumn: { path: 'name', order: 'asc' },
      users: []
    }
    document.title = `${I18nUtils.t('la-page-title')}`
  }

  componentDidMount() {
    this.props.userListRequest({})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let data = nextProps.data
      if (data.listUser) {
        this.setState({
          users: data
        })
      }
    }
  }

  render() {
    let { pageSize, currentPage, sortColumn, users } = this.state
    let totalCount = users.length
    return (
      <Container fluid className="list-account-content">
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('la-page-title')}
          </h1>
        </div>
        <FilterGroupComponent
          formClass="test"
          formAction="test"
          inputTitle="Name,Phone,Email"
          calendarName="Created Date"
        />
        <div className="formTable">
          <PaginationComponent
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
          />
          <Table hover>
            <TableHeadComponent
              sortColumn={sortColumn}
              onSort={this.handleSort}
              theadTitle="#,Name,Email,Group,Action"
            />
            <tbody>
              {users.map((user, key) => {
                return (
                  <tr key={key}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.groups[0]}</td>
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
  data: PropTypes.object,
  totalCount: PropTypes.string,
  pageSize: PropTypes.string,
  currentPage: PropTypes.string,
  userListRequest: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.users.processing,
    data: state.users.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  userListRequest: (data) => dispatch(UsersActions.userListRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListAccountsPage))
