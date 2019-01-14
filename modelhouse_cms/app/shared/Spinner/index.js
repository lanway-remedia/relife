/**
 * @author Huyenbt
 * Spinner Component
 */

import React from 'react'
// import Spinner from 'react-spin'

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="loading">
        <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true" />
      </div>
    )
  }
}

Spinner.defaultProps = {
}
