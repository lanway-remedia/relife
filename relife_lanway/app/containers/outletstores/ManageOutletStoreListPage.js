/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Button, Table } from 'reactstrap'
import { Helmet } from 'react-helmet'
import I18nUtils from '../../utils/I18nUtils'
import FilterGroupComponent from '../../components/FilterGroupComponent'
import TableHeadComponent from '../../components/TableHeadComponent'
import PaginationComponent from '../../components/PaginationComponent'

class ManageOutletStoreListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 5,
      totalCount: 30,
      currentPage: 1,
      users: []
    }
  }

  redirectToAddNew = () => {
    this.props.history.push('add-new-outlet-store')
  }

  render() {
    let { pageSize, totalCount, currentPage, users } = this.state
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
          select="Status,City,District"
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
              theadTitle="#,Image,Title,Email,Phone,District,City,Status,Action"
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

ManageOutletStoreListPage.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(ManageOutletStoreListPage))
