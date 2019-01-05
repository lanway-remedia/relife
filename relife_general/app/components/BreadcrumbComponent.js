import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Row, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import homeIcon from '../images/home-icon.png'
class BreadcrumbComponent extends React.Component {
  render() {
    return (
      <div fluid className="breadcrumb-wrap">
        <div className="breadcrumb-inner">
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="#"><img src={homeIcon} /></a>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <a href="#">Library</a>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              Data
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
    )
  }
}
export default connect()(withRouter(BreadcrumbComponent))
