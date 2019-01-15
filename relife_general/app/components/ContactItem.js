/**
 * @author HANH TD
 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class ContactItem extends React.Component {
  render() {
    const {title, imgSrc, content} = this.props
    return (
      <div className="contact-subtitle-once">
        <h2 className="contact-subtitle">
          {title}
        </h2>
        <p>
          <img src={imgSrc} />
          {content}
        </p>
      </div>
    )
  }
}
ContactItem.propTypes = {
  title: PropTypes.string,
  imgSrc: PropTypes.string,
  content: PropTypes.string,
}
export default connect(
)(withRouter(ContactItem))
