import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import ContactTableTh from './ContactTableTh'
class ContactTableTr extends React.Component {
  render () {
    let { title, placeholder, required } = this.props
    return (
      <div className="contact_table_tr">
        <ContactTableTh title={title} required={required} />
        <div className="contact_table_td">
          <span className="contact_table_td_input">
            <input 
              type="text"
              name="your-name"
              placeholder={placeholder}
            />
          </span>
        </div>
      </div>
    )
  }
}

ContactTableTr.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool
}

export default connect()(withRouter(ContactTableTr))
