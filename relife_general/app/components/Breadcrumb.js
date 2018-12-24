import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
class Breadcrumb extends React.Component {
  render() {
    return (
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
        
        </div>
      </div>
    )
  }
}
export default connect()(withRouter(Breadcrumb))
