import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'

class ContactTableTh extends React.Component {
  render () {
    let {title, required} = this.props
    return (
      <div className="contact_table_th">
        {title}
        {required && (
          <span>必須</span>
        )}
      </div>
    )
  }
}

ContactTableTh.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool
}
export default connect()(withRouter(ContactTableTh))
