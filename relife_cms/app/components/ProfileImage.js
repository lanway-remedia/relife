/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'reactstrap'
import defaultAvatar from '../images/user.png'
import I18nUtils from '../utils/I18nUtils'

class ProfileImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleImageChange = this.handleImageChange.bind(this)
    this.handleOpenFileUp = this.handleOpenFileUp.bind(this)
  }

  handleImageChange(e) {
    this.props.onProfileChange(e.currentTarget.files[0])
  }

  handleOpenFileUp = () => {
    this.inputElement.click()
  }

  render() {
    let { profileImage, size } = this.props
    return (
      <div className="upload-container">
        {!profileImage ? (
          <div
            className="upload-icon"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: `${size / 2}px`
            }}
          >
            <label id="uploader-icon" style={{ lineHeight: `${size - 6}px` }}>
              {!defaultAvatar ? (
                <span className="fa fa-file-image-o fa-2x" />
              ) : (
                <img alt="" src={defaultAvatar} />
              )}
            </label>
            <Button
              color="success"
              outline
              size="sm"
              onClick={this.handleOpenFileUp}
            >
              {I18nUtils.t('btn-change-avatar')}
            </Button>
            <input
              type="file"
              id="upload-icon"
              accept="image/*"
              ref={input => (this.inputElement = input)}
              onChange={this.handleImageChange}
            />
          </div>
        ) : (
          <div
            className="upload-icon"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: `${size / 2}px`
            }}
          >
            <label htmlFor="upload-icon">
              <img
                src={
                  typeof profileImage == 'string'
                    ? profileImage
                    : URL.createObjectURL(profileImage)
                }
                style={{
                  width: `${size - 2}px`,
                  height: `${size - 2}px`,
                  borderRadius: `${size / 2}px`
                }}
              />
            </label>
            <Button
              color="success"
              outline
              size="sm"
              onClick={this.handleOpenFileUp}
            >
              {I18nUtils.t('btn-change-avatar')}
            </Button>
            <input
              type="file"
              id="upload-icon"
              accept="image/*"
              ref={input => (this.inputElement = input)}
              onChange={this.handleImageChange}
            />
          </div>
        )}
      </div>
    )
  }
}

ProfileImage.propTypes = {
  profileImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  size: PropTypes.number,
  onProfileChange: PropTypes.func
}

export default connect()(withRouter(ProfileImage))
