/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ProfileImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  handleImageChange(e) {
    this.props.onProfileChange(e.currentTarget.files[0])
  }

  render() {
    let { profileImage, size } = this.props
    return (
      <div>
        {
          !profileImage ?
            <div className="upload-icon" style={{ width: `${size}px`, height: `${size}px`, borderRadius: `${size / 2}px` }}>
              <label id="uploader-icon" htmlFor="upload-icon" style={{ lineHeight: `${size}px` }}>
                <span className="fa fa-file-image-o fa-2x" />
              </label>
              <input type="file" id="upload-icon" accept="image/*" onChange={this.handleImageChange} />
            </div>
            :
            <div className="upload-icon" style={{ width: `${size}px`, height: `${size}px`, borderRadius: `${size / 2}px` }}>
              <label id="uploader-icon" htmlFor="upload-icon">
                <img
                  src={typeof (profileImage) == 'string' ? profileImage : URL.createObjectURL(profileImage)}
                  style={{ width: `${size - 2}px`, height: `${size - 2}px`, borderRadius: `${size / 2}px` }}
                />
              </label>
              <input type="file" id="upload-icon" accept="image/*" onChange={this.handleImageChange} />
            </div>
        }
      </div>
    )
  }
}

ProfileImage.propTypes = {
  profileImage: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  size: PropTypes.number,
  onProfileChange: PropTypes.func
}

export default connect()(withRouter(ProfileImage))
